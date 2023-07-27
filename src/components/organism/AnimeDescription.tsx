"use client";

import { Table, Td, Tr } from "../molecules/Table";

type AnimeDescriptionProps = {
  status: string;
  seasonYear: number;
  genres: string[];
  averageScore: number;
  isAdult: boolean;
};

const AnimeDescription = ({
  status,
  seasonYear,
  genres,
  averageScore,
  isAdult,
}: AnimeDescriptionProps) => {
  return (
    <div style={{ marginTop: 24 }}>
      <Table>
        <tbody>
          <Tr>
            <Td style={{ width: 100 }}>Status</Td>
            <Td>:</Td>
            <Td>{status}</Td>
          </Tr>
          <Tr>
            <Td style={{ width: 100 }}>Released Year</Td>
            <Td>:</Td>
            <Td>{seasonYear}</Td>
          </Tr>
          <Tr>
            <Td style={{ width: 100 }}>Genre</Td>
            <Td>:</Td>
            <Td>{genres?.map((genre: any) => genre).join(", ")}</Td>
          </Tr>
          <Tr>
            <Td style={{ width: 100 }}>Score</Td>
            <Td>:</Td>
            <Td>{averageScore}</Td>
          </Tr>
          {isAdult && (
            <Tr>
              <Td>18+</Td>
            </Tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AnimeDescription;
