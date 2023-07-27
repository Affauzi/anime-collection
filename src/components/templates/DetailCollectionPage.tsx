"use client";

import { usePathname, useRouter } from "next/navigation";
import { Container } from "../molecules/Container";
import React from "react";
import client from "@/lib/Apollo";
import _, { set } from "lodash";
import _isEmpty from "lodash/isEmpty";
import { GET_ANIME_DETAIL } from "@/services/graphql";
import { Text } from "../molecules/Text";
import { CardList } from "../molecules/CardList";
import { Card } from "../molecules/Card";
import Image from "next/image";

const DetailCollectionPage = () => {
  const detail = usePathname().split("/")[2].split("%20").join(" ");
  const [collectionDetail, setCollectionDetail] = React.useState<any>([]);

  const router = useRouter();

  React.useEffect(() => {
    const existingItemsJSON = localStorage.getItem("_collection");
    const existingItems = existingItemsJSON
      ? JSON.parse(existingItemsJSON)
      : [];
    const existingItem = _.find(existingItems, {
      name: detail,
    });

    existingItem.animeId.map((item: any) => {
      client
        .query({
          query: GET_ANIME_DETAIL(),
          variables: { id: item },
        })
        .then((res) => {
          setCollectionDetail((prev: any) =>
            _isEmpty(prev) ? [res.data.Media] : [...prev, res.data.Media]
          );
        });
    });
  }, [detail]);

  return (
    <Container>
      <Text style={{ fontSize: 48, textAlign: "center" }}>
        {detail} Collection
      </Text>

      {_isEmpty(collectionDetail) ? (
        <div>
          <Text>You don&apos;t have any anime list</Text>
        </div>
      ) : (
        <CardList style={{ marginBottom: "24px" }}>
          {collectionDetail.map((media: any, index: number) => (
            <Card
              key={index}
              style={{
                justifyContent: "space-between",
                cursor: "pointer",
                zIndex: 1,
              }}
              onClick={() => {
                router.push(`/detail/${media.id}`);
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
            </Card>
          ))}
        </CardList>
      )}
    </Container>
  );
};

export default DetailCollectionPage;
