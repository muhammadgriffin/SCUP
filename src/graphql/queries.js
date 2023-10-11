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
      imageTypes
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
        imageTypes
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      points
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        points
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
