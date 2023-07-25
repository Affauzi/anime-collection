"use client";

import client from "@/lib/Apollo";
import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import React from "react";

const GET_COLLECTIONS = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
      }
      media(type: ANIME) {
        id
        title {
          english
          native
        }
        coverImage {
          large
        }
      }
    }
  }
`;

const HomePage = () => {
  const [collections, setCollections] = React.useState<any[]>([]);
  React.useEffect(() => {
    client
      .query({ query: GET_COLLECTIONS, variables: { page: 1, perPage: 10 } })
      .then((res) => {
        setCollections(res.data.Page.media);
      });
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        {collections.map((media: any) => (
          <div key={media.id}>
            <img src={media.coverImage.large} alt={media.title.english} />
            <h3>{media.title.english || media.title.native}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
