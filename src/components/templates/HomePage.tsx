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

const HomePage = () => {
  const [animeLists, setAnimeLists] = React.useState<any[]>([]);
  const [collection, setCollection] = React.useState<any>();
  const [page, setPage] = React.useState<number>(1);
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const router = useRouter();

  React.useEffect(() => {
    client
      .query({
        query: GET_COLLECTIONS(),
        variables: { page: page, perPage: 10 },
      })
      .then((res) => {
        setAnimeLists(res.data.Page.media);
      });
  }, [page]);

  const handleAddCollection = () => {
    const existingItemsJSON = localStorage.getItem("_collection");
    const existingItems = existingItemsJSON
      ? JSON.parse(existingItemsJSON)
      : [];

    existingItems.push(collection);

    localStorage.setItem("_collection", JSON.stringify(existingItems));
  };

  return (
    <Container style={{ maxWidth: "none" }}>
      <Text style={{ fontSize: 48, textAlign: "center" }}>
        Anime Collection
      </Text>
      <CardList style={{ marginBottom: "24px" }}>
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
              <img
                src={media.coverImage.large}
                alt={media.title.english}
                style={{ borderRadius: "8px", maxHeight: 300 }}
              />
              <Text style={{ textAlign: "center" }}>
                {media.title.english || media.title.native}
              </Text>
            </div>

            <Button
              onClick={(event) => {
                event.stopPropagation();
                setCollection(media);
                setOpenModal(true);
              }}
              style={{ zIndex: 10 }}
            >
              Add to Collection
            </Button>
            {openModal && (
              <ModalCard onClose={() => setOpenModal(false)}>
                <div>
                  <Text style={{ fontSize: 24, textAlign: "center" }}>
                    Add this to your collection?
                  </Text>
                  <img
                    src={collection.coverImage.large}
                    alt={collection.title.english}
                    style={{ borderRadius: "8px", maxHeight: 300 }}
                  />
                  <Text style={{ textAlign: "center" }}>
                    {collection.title.english || collection.title.native}
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
                      style={{ marginRight: "12px" }}
                      onClick={handleAddCollection}
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
