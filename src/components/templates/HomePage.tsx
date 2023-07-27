"use client";

import client from "@/lib/Apollo";
import { GET_COLLECTIONS } from "@/services/graphql";
import React from "react";
import { Container } from "../molecules/Container";
import { Card } from "../molecules/Card";
import { CardList } from "../molecules/CardList";
import { Button } from "../molecules/Button";
import { Text } from "../molecules/Text";
import { useRouter } from "next/navigation";
import ModalCard from "../organism/ModalCard";
import Select from "../molecules/Select";
import _isEmpty from "lodash/isEmpty";
import _ from "lodash";
import Image from "next/image";

const HomePage = () => {
  const [animeLists, setAnimeLists] = React.useState<any[]>([]);
  const [collection, setCollection] = React.useState<any>();
  const [page, setPage] = React.useState<number>(1);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [tempName, setTempName] = React.useState<string>("");
  const [selectedAnime, setSelectedAnime] = React.useState<any>({} as any);

  const router = useRouter();

  React.useEffect(() => {
    const localCollectionJSON = localStorage.getItem("_collection");
    const localCollection = localCollectionJSON
      ? JSON.parse(localCollectionJSON)
      : [];

    setCollection(localCollection);

    client
      .query({
        query: GET_COLLECTIONS(),
        variables: { page: page, perPage: 10 },
      })
      .then((res) => {
        setAnimeLists(res.data.Page.media);
      });
  }, [page]);

  const handleAddCollection = (id: number) => {
    const data = { name: tempName, animeId: [selectedAnime.id] };

    const existingItemsJSON = localStorage.getItem("_collection");
    const existingItems = existingItemsJSON
      ? JSON.parse(existingItemsJSON)
      : [];

    const existingItem = _.find(existingItems, {
      name: !_isEmpty(tempName) ? tempName : collection[0].name,
    });

    if (existingItem?.animeId.includes(selectedAnime.id)) {
    } else if (existingItem) {
      existingItem.animeId.push(selectedAnime.id);
    } else {
      existingItems.push(data);
    }

    localStorage.setItem("_collection", JSON.stringify(existingItems));

    setCollection(existingItems);
    setOpenModal(false);
  };

  return (
    <Container style={{ maxWidth: "none" }}>
      <Text style={{ fontSize: 48, textAlign: "center" }}>
        Anime Collection
      </Text>
      <CardList style={{ maxWidth: 1200, margin: "0px auto 40px" }}>
        {animeLists.map((media: any, index: number) => (
          <Card
            key={media.id}
            style={{
              justifyContent: "space-between",
              cursor: "pointer",
              zIndex: 1,
            }}
            onClick={() => {
              if (!openModal) {
                router.push(`/detail/${media.id}`);
              }
            }}
          >
            <div>
              <Image
                width={200}
                height={300}
                src={media.coverImage.large}
                alt={media.title.english}
                style={{ borderRadius: "8px", maxHeight: 300 }}
              />
              <Text style={{ textAlign: "center" }}>
                {media.title.english || media.title.native}
              </Text>
            </div>

            {!_isEmpty(collection) && (
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedAnime(media);
                  setOpenModal(true);
                }}
                style={{ zIndex: 10 }}
              >
                Add to Collection
              </Button>
            )}

            {openModal && (
              <ModalCard onClose={() => setOpenModal(false)}>
                <div>
                  <Text style={{ fontSize: 24, textAlign: "center" }}>
                    Add this to your collection?
                  </Text>
                  <Image
                    width={200}
                    height={300}
                    src={selectedAnime.coverImage.large}
                    alt={selectedAnime.title.english}
                    style={{ borderRadius: "8px", maxHeight: 300 }}
                  />
                  <Text style={{ textAlign: "center" }}>
                    {selectedAnime.title.english || selectedAnime.title.native}
                  </Text>

                  <>
                    <Text style={{ fontSize: 24, textAlign: "center" }}>
                      Choose your collection
                    </Text>
                    <Select
                      style={{ width: "200px", marginBottom: "12px" }}
                      onChange={(e) => {
                        setTempName(e.target.value);
                      }}
                      value={tempName || collection[0].name}
                    >
                      {collection.map((item: any, index: number) => (
                        <option value={item.name} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </Select>
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
                      style={{ marginRight: "12px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddCollection(media.id);
                      }}
                    >
                      Yes
                    </Button>
                    <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                  </div>
                </div>
              </ModalCard>
            )}
          </Card>
        ))}
      </CardList>
      <Container
        style={{
          flexDirection: "row",
          display: "flex",
          margin: "auto",
          justifyContent: "center",
          maxWidth: "min-content",
        }}
      >
        <Button
          style={{
            marginRight: "12px",
            cursor: page === 1 ? "not-allowed" : "pointer",
            backgroundColor: page === 1 ? "#ccc" : "#007bff",
          }}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </Button>
        <Button
          onClick={() => setPage(page + 1)}
          style={{
            cursor: page === 50 ? "not-allowed" : "pointer",
            backgroundColor: page === 50 ? "#ccc" : "#007bff",
          }}
          disabled={page === 50}
        >
          Next
        </Button>
      </Container>
    </Container>
  );
};

export default HomePage;
