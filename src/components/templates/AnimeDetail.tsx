"use client";

import React from "react";
import { Container } from "../molecules/Container";
import { Text, TextDesc } from "../molecules/Text";
import client from "@/lib/Apollo";
import { GET_ANIME_DETAIL } from "@/services/graphql";
import { usePathname } from "next/navigation";
import AnimeDescription from "../organism/AnimeDescription";
import Input from "../molecules/Input";
import { Button } from "../molecules/Button";
import ModalCard from "../organism/ModalCard";
import _isEmpty from "lodash/isEmpty";
import _ from "lodash";
import Select from "../molecules/Select";
import Image from "next/image";

const AnimeDetail = () => {
  const [anime, setAnime] = React.useState<any>({});
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [tempName, setTempName] = React.useState<string>("");
  const [collection, setCollection] = React.useState<any>();
  const id = usePathname().split("/")[2];

  const listedCollection = collection?.filter((item: any) => {
    return item.animeId.includes(anime?.id);
  });

  const allListedCollection = listedCollection?.map((item: any) => {
    return item.name;
  });

  React.useEffect(() => {
    const localCollectionJSON = localStorage.getItem("_collection");
    const localCollection = localCollectionJSON
      ? JSON.parse(localCollectionJSON)
      : [];

    setCollection(localCollection);

    client
      .query({
        query: GET_ANIME_DETAIL(),
        variables: { id: id },
      })
      .then((res) => {
        setAnime(res.data.Media);
      });
  }, [id]);

  const handleAddCollection = () => {
    const data = { name: tempName, animeId: [anime?.id] };

    const existingItemsJSON = localStorage.getItem("_collection");
    const existingItems = existingItemsJSON
      ? JSON.parse(existingItemsJSON)
      : [];

    const existingItem = _.find(existingItems, {
      name: !_isEmpty(tempName) ? tempName : collection[0].name,
    });

    if (!_isEmpty(existingItems) && existingItem?.animeId.includes(anime?.id)) {
    } else if (existingItem) {
      existingItem.animeId.push(anime?.id);
    } else {
      existingItems.push(data);
    }

    localStorage.setItem("_collection", JSON.stringify(existingItems));

    setCollection(existingItems);
    setOpenModal(false);
  };

  return (
    <Container
      style={{
        backgroundImage: `url(${anime?.bannerImage})`,
        backgroundRepeat: "no-repeat",
        maxWidth: "none",
        width: "100%",
        marginTop: "70px",
        height: "400px",
      }}
    >
      <Container style={{ marginTop: "240px" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Image
            width={200}
            height={300}
            alt={anime?.title?.english}
            src={anime?.coverImage?.large}
            style={{ alignSelf: "center" }}
          />
          <Text
            style={{
              fontSize: "36px",
              textAlign: "center",
              alignSelf: "end",
              marginLeft: "12px",
            }}
          >
            {anime?.title?.english || anime?.title?.native}
          </Text>
        </div>

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

        {!_isEmpty(allListedCollection) && (
          <>
            <Text>
              This Anime Added to Collection:{" "}
              {allListedCollection.map((item: any) => item).join(", ")}
            </Text>
            {/* <TextDesc>
           {allListedCollection.map((item: any, index: number) => (
             <div key={index}>{item}</div>
           ))}
         </TextDesc> */}
          </>
        )}
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
          style={{ marginBottom: 80 }}
        >
          Add to My Collection
        </Button>

        {openModal && (
          <ModalCard onClose={() => setOpenModal(false)}>
            <div>
              {_isEmpty(collection) ? (
                <>
                  <Text style={{ fontSize: 24, textAlign: "center" }}>
                    You don&apos;t have collection yet, do you want to create
                    new collection?
                  </Text>
                  <Input
                    placeholder="Enter collection name"
                    onChange={(e) => {
                      setTempName(e.target.value);
                    }}
                    style={{ marginBottom: "12px" }}
                  />
                </>
              ) : (
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
              )}

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
                  onClick={() => {
                    handleAddCollection();
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
    </Container>
  );
};

export default AnimeDetail;
