"use client";
import React from "react";
import { Container } from "../molecules/Container";
import _isEmpty from "lodash/isEmpty";
import _ from "lodash";

const CollectionPage = () => {
  const [collection, setCollection] = React.useState<any>([
    { collectionName: "", collectionItems: [] },
  ]);

  if (typeof window !== "undefined") {
    // Perform localStorage action
    const getLocalCollection = localStorage.getItem("_collection");
  }

  React.useEffect(() => {
    const getLocalCollection = localStorage.getItem("_collection");
    if (getLocalCollection) {
      setCollection(JSON.parse(getLocalCollection));
    }
  }, []);

  return (
    <Container>
      <h1>Collection</h1>

      {!_isEmpty(collection) && (
        <div>
          {collection.map((item: any) => (
            <div>
              <h3>{item?.collectionName}</h3>
              <div>
                {item?.collectionItems?.map((item: any) => (
                  <div>
                    <h4>{item?.title.romaji}</h4>
                    <img src={item?.coverImage.medium} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default CollectionPage;
