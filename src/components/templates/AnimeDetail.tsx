"use client";

import React from "react";
import { Container } from "../molecules/Container";
import { Text, TextDesc } from "../molecules/Text";
import client from "@/lib/Apollo";
import { GET_ANIME_DETAIL } from "@/services/graphql";
import { usePathname } from "next/navigation";
import AnimeDescription from "../organism/AnimeDescription";

const AnimeDetail = () => {
  const id = usePathname().split("/")[2];

  const [anime, setAnime] = React.useState<any>({});

  React.useEffect(() => {
    client
      .query({
        query: GET_ANIME_DETAIL(),
        variables: { id: id },
      })
      .then((res) => {
        setAnime(res.data.Media);
      });
  }, [id]);

  return (
    <Container>
      <Text style={{ fontSize: "36px", textAlign: "center" }}>
        {anime?.title?.english || anime?.title?.native}
      </Text>
      <img src={anime?.coverImage?.large} style={{ alignSelf: "center" }} />

      <AnimeDescription
        seasonYear={anime.seasonYear}
        status={anime.status}
        genres={anime.genres}
        averageScore={anime.averageScore}
        isAdult={anime.isAdult}
      />

      <Text
        style={{ fontSize: "14px", textAlign: "justify" }}
        dangerouslySetInnerHTML={{ __html: anime?.description }}
      />
    </Container>
  );
};

export default AnimeDetail;
