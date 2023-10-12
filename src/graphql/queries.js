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
export const getBadge = /* GraphQL */ `
  query GetBadge($id: ID!) {
    getBadge(id: $id) {
      id
      name
      icon
      description
      rewards {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listBadges = /* GraphQL */ `
  query ListBadges(
    $filter: ModelBadgeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBadges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        icon
        description
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getReward = /* GraphQL */ `
  query GetReward($id: ID!) {
    getReward(id: $id) {
      id
      badgeId
      name
      description
      value
      badge {
        id
        name
        icon
        description
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      badgeRewardsId
      __typename
    }
  }
`;
export const listRewards = /* GraphQL */ `
  query ListRewards(
    $filter: ModelRewardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRewards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        badgeId
        name
        description
        value
        createdAt
        updatedAt
        badgeRewardsId
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
      badge {
        id
        name
        icon
        description
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      userBadgeId
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
        userBadgeId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
