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

const HomePage = () => {
  const [collections, setCollections] = React.useState<any[]>([]);
  const [page, setPage] = React.useState<number>(1);

  const router = useRouter();

  React.useEffect(() => {
    client
      .query({
        query: GET_COLLECTIONS(),
        variables: { page: page, perPage: 10 },
      })
      .then((res) => {
        setCollections(res.data.Page.media);
      });
  }, [page]);

  return (
    <Container style={{ maxWidth: "none" }}>
      <Text style={{ fontSize: 48, textAlign: "center" }}>
        Anime Collection
      </Text>
      <CardList style={{ marginBottom: "24px" }}>
        {collections.map((media: any) => (
          <Card
            key={media.id}
            style={{ justifyContent: "center", cursor: "pointer" }}
            onClick={() => router.push(`/detail/${media.id}`)}
          >
            <img
              src={media.coverImage.large}
              alt={media.title.english}
              style={{ borderRadius: "8px", maxHeight: 300 }}
            />
            <Text style={{ textAlign: "center" }}>
              {media.title.english || media.title.native}
            </Text>
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
