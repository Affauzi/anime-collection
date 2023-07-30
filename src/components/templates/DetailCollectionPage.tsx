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
import { Button } from "../molecules/Button";
import ModalCard from "../organism/ModalCard";
import { toast } from "react-toastify";

const DetailCollectionPage = () => {
  const detail = usePathname().split("/")[2].split("%20").join(" ");
  const [collectionDetail, setCollectionDetail] = React.useState<any>([]);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [selectedId, setSelectedId] = React.useState<number>(0);

  const router = useRouter();

  const removeAnime = (id: number) => {
    const existingItemsJSON = localStorage.getItem("_collection");
    const existingItems = existingItemsJSON
      ? JSON.parse(existingItemsJSON)
      : [];
    const existingItem = _.find(existingItems, {
      name: detail,
    });

    const filteredAnime = existingItem.animeId.findIndex((item: any) => {
      return item === id;
    });

    const filteredCollection = existingItems.findIndex((item: any) => {
      return item.name === detail;
    });

    if (filteredAnime !== -1) {
      existingItem.animeId.splice(filteredAnime, 1);

      existingItems.splice(filteredCollection, 1, existingItem);

      localStorage.setItem("_collection", JSON.stringify(existingItems));
      setCollectionDetail((prev: any) => {
        return prev.filter((item: any) => {
          return item.id !== id;
        });
      });
      setOpenModal(false);
      return toast.success("Anime removed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      return toast.error("Anime not found", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

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
            <div key={index}>
              <Card
                style={{
                  justifyContent: "space-between",
                  cursor: "pointer",
                  zIndex: 1,
                }}
                onClick={() => {
                  router.push(`/detail/${media.id}`);
                }}
              >
                <div
                  style={{ maxWidth: 40 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(media.id);
                    setOpenModal(true);
                  }}
                >
                  <Image
                    src="/remove.svg"
                    width={30}
                    height={30}
                    alt="remove"
                  />
                </div>
                <Image
                  width={200}
                  height={300}
                  src={media?.coverImage?.large}
                  alt={media?.title?.english}
                  style={{ borderRadius: "8px", maxHeight: 300 }}
                />
                <Text style={{ textAlign: "center" }}>
                  {media?.title?.english || media?.title?.native}
                </Text>
              </Card>
            </div>
          ))}
        </CardList>
      )}
      {openModal && (
        <ModalCard onClose={() => setOpenModal(false)}>
          <div>
            <Text style={{ fontSize: 24, textAlign: "center" }}>
              Are you sure want to remove this from your collection?
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
                style={{ marginRight: "12px", backgroundColor: "#ff0000" }}
                onClick={(e) => {
                  e.stopPropagation();

                  removeAnime(selectedId);
                }}
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

export default DetailCollectionPage;
