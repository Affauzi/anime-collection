import { gql } from "@apollo/client";

export const GET_COLLECTIONS = () => gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
      }
      media(type: ANIME, sort: [TRENDING_DESC, POPULARITY_DESC, SCORE_DESC]) {
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

export const GET_ANIME_DETAIL = () => gql`
  query ($id: Int) {
    Media(id: $id) {
      id
      title {
        english
        native
      }
      coverImage {
        large
      }
      bannerImage
      description
      episodes
      genres
      status
      averageScore
      seasonYear
      isAdult
    }
  }
`;
