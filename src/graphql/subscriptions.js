/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateImageMetadata = /* GraphQL */ `
  subscription OnCreateImageMetadata(
    $filter: ModelSubscriptionImageMetadataFilterInput
  ) {
    onCreateImageMetadata(filter: $filter) {
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
export const onUpdateImageMetadata = /* GraphQL */ `
  subscription OnUpdateImageMetadata(
    $filter: ModelSubscriptionImageMetadataFilterInput
  ) {
    onUpdateImageMetadata(filter: $filter) {
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
export const onDeleteImageMetadata = /* GraphQL */ `
  subscription OnDeleteImageMetadata(
    $filter: ModelSubscriptionImageMetadataFilterInput
  ) {
    onDeleteImageMetadata(filter: $filter) {
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
export const onCreateBadge = /* GraphQL */ `
  subscription OnCreateBadge($filter: ModelSubscriptionBadgeFilterInput) {
    onCreateBadge(filter: $filter) {
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
export const onUpdateBadge = /* GraphQL */ `
  subscription OnUpdateBadge($filter: ModelSubscriptionBadgeFilterInput) {
    onUpdateBadge(filter: $filter) {
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
export const onDeleteBadge = /* GraphQL */ `
  subscription OnDeleteBadge($filter: ModelSubscriptionBadgeFilterInput) {
    onDeleteBadge(filter: $filter) {
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
export const onCreateReward = /* GraphQL */ `
  subscription OnCreateReward($filter: ModelSubscriptionRewardFilterInput) {
    onCreateReward(filter: $filter) {
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
export const onUpdateReward = /* GraphQL */ `
  subscription OnUpdateReward($filter: ModelSubscriptionRewardFilterInput) {
    onUpdateReward(filter: $filter) {
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
export const onDeleteReward = /* GraphQL */ `
  subscription OnDeleteReward($filter: ModelSubscriptionRewardFilterInput) {
    onDeleteReward(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
