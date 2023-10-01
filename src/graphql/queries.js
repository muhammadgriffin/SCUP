/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getImageMetadata = /* GraphQL */ `
  query GetImageMetadata($id: ID!) {
    getImageMetadata(id: $id) {
      id
      s3Key
      description
      latitude
      longitude
      imageType
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listImageMetadata = /* GraphQL */ `
  query ListImageMetadata(
    $filter: ModelImageMetadataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImageMetadata(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        s3Key
        description
        latitude
        longitude
        imageType
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
