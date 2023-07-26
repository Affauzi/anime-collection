"use client";

import React from "react";
import { Modal, ModalContent } from "../molecules/Modal";
import { Button } from "../molecules/Button";

interface IModalCard {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalCard = ({ children, onClose }: IModalCard) => {
  return (
    <Modal>
      <ModalContent>
        <Button onClick={onClose} style={{ marginBottom: 12 }}>
          X
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            textAlign: "center",
          }}
        >
          {children}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ModalCard;
