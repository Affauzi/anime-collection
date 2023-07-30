"use client";
import React from "react";
import { Container } from "../molecules/Container";
import _isEmpty from "lodash/isEmpty";
import _ from "lodash";
import { Button } from "../molecules/Button";
import ModalCard from "../organism/ModalCard";
import { Text } from "../molecules/Text";
import Input from "../molecules/Input";
import { Card } from "../molecules/Card";
import { CardList } from "../molecules/CardList";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

const CollectionPage = () => {
  const [collection, setCollection] = React.useState<any>();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openRemoveModal, setOpenRemoveModal] = React.useState<boolean>(false);
  const [tempName, setTempName] = React.useState<string>("");

  const router = useRouter();

  React.useEffect(() => {
    const localCollectionJSON = localStorage.getItem("_collection");
    const localCollection = localCollectionJSON
      ? JSON.parse(localCollectionJSON)
      : [];

    setCollection(localCollection);
  }, []);

  const handleAddCollection = () => {
    const data = { name: tempName, animeId: [] };
    const existingItemsJSON = localStorage.getItem("_collection");
    const existingItems = existingItemsJSON
      ? JSON.parse(existingItemsJSON)
      : [];

    const existingItemName = _.map(existingItems, "name");

    if (!_isEmpty(existingItems) && existingItemName?.includes(tempName)) {
      setOpenModal(false);
      return toast.error("Name already used", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setCollection([...collection, data]);
      existingItems.push(data);
      localStorage.setItem("_collection", JSON.stringify(existingItems));
      setOpenModal(false);
      return toast.success("Collection added", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleRemoveCollection = (name: string) => {
    const existingItemsJSON = localStorage.getItem("_collection");
    const existingItems = existingItemsJSON
      ? JSON.parse(existingItemsJSON)
      : [];

    const nameToRemove = existingItems.findIndex(
      (item: any) => item.name === name
    );

    if (nameToRemove !== -1) {
      existingItems.splice(nameToRemove, 1);

      const updatedDataString = JSON.stringify(existingItems);

      toast.success("Collection removed", {
        position: toast.POSITION.TOP_RIGHT,
      });
      localStorage.setItem("_collection", updatedDataString);
      setCollection(existingItems);
      setOpenRemoveModal(false);
    }
  };
  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "40px",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>
          My Collection
        </Text>
        <Button
          onClick={() => setOpenModal(true)}
          style={{ maxHeight: 60, fontSize: 14 }}
        >
          Add New Collection
        </Button>
      </div>
      {_isEmpty(collection) ? (
        <div style={{ marginTop: "24px" }}>
          <Text>You don&apos;t have any collection yet</Text>
        </div>
      ) : (
        <div style={{ marginTop: "24px" }}>
          <CardList style={{ justifyContent: "center" }}>
            {collection?.map((coll: any, index: number) => (
              <div key={index}>
                <Card
                  key={index}
                  style={{
                    justifyContent: "space-between",
                    cursor: "pointer",
                    zIndex: 1,
                    maxHeight: "200px",
                    minHeight: "0px",
                    minWidth: "200px",
                  }}
                  onClick={() => router.push(`/collection/${coll.name}`)}
                >
                  <div
                    style={{ maxWidth: 40 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenRemoveModal(true);
                    }}
                  >
                    <Image
                      src="/remove.svg"
                      width={30}
                      height={30}
                      alt="remove"
                    />
                  </div>
                  <div>
                    <Text style={{ fontSize: 24, textAlign: "center" }}>
                      {coll.name}
                    </Text>
                    <Text style={{ fontSize: 16, textAlign: "center" }}>
                      {coll.animeId.length} Anime
                    </Text>
                  </div>
                </Card>
                {openRemoveModal && (
                  <ModalCard onClose={() => setOpenRemoveModal(false)}>
                    <div>
                      <Text style={{ fontSize: 24, textAlign: "center" }}>
                        Are you sure want to remove this collection?
                      </Text>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          textAlign: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          style={{
                            marginRight: "12px",
                            backgroundColor: "red",
                          }}
                          onClick={() => {
                            handleRemoveCollection(coll.name);
                          }}
                        >
                          Yes
                        </Button>
                        <Button onClick={() => setOpenRemoveModal(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </ModalCard>
                )}
              </div>
            ))}
          </CardList>
        </div>
      )}

      {openModal && (
        <ModalCard onClose={() => setOpenModal(false)}>
          <div>
            <>
              <Text style={{ fontSize: 24, textAlign: "center" }}>
                Create New Collection?
              </Text>
              <Input
                placeholder="Enter collection name"
                onChange={(e) => {
                  setTempName(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (!/[0-9a-zA-Z ]/.test(e.key)) {
                    e.preventDefault();
                  }
                  if (e.key === "Enter") {
                    handleAddCollection();
                  }
                }}
                style={{ marginBottom: "12px" }}
              />
            </>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  marginRight: "12px",
                  backgroundColor: _isEmpty(tempName) ? "gray" : "#007bff",
                }}
                onClick={() => {
                  handleAddCollection();
                }}
                disabled={_isEmpty(tempName)}
              >
                Yes
              </Button>
              <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            </div>
          </div>
        </ModalCard>
      )}
    </Container>
  );
};

export default CollectionPage;
