"use client";

import Image from "next/image";
import { Container } from "../molecules/Container";
import { Text } from "../molecules/Text";

const Footer = () => {
  return (
    <Container
      style={{
        backgroundColor: "black",
        maxWidth: "none",
        bottom: 0,
        margin: "0px auto",
        padding: "8px 0px",
        textAlign: "center",
        position: "fixed",
        zIndex: 1000,
      }}
    >
      <Text style={{ color: "white" }}>Created by: Ahmad Fakhrul Fauzi</Text>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "auto",
          gap: "16px",
        }}
      >
        <Image
          src="/github-logo.svg"
          width={40}
          height={40}
          alt="github"
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            cursor: "pointer",
          }}
          onClick={() => {
            window.open("https://github.com/Affauzi/anime-collection");
          }}
        />
        <Image
          src="/linkedin-logo.svg"
          width={40}
          height={40}
          alt="linkedin"
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            cursor: "pointer",
          }}
          onClick={() => {
            window.open("https://www.linkedin.com/in/ahmad-fakhrul/");
          }}
        />
      </div>
    </Container>
  );
};

export default Footer;
