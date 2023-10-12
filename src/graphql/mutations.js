/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createImageMetadata = /* GraphQL */ `
  mutation CreateImageMetadata(
    $input: CreateImageMetadataInput!
    $condition: ModelImageMetadataConditionInput
  ) {
    createImageMetadata(input: $input, condition: $condition) {
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
export const updateImageMetadata = /* GraphQL */ `
  mutation UpdateImageMetadata(
    $input: UpdateImageMetadataInput!
    $condition: ModelImageMetadataConditionInput
  ) {
    updateImageMetadata(input: $input, condition: $condition) {
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
export const deleteImageMetadata = /* GraphQL */ `
  mutation DeleteImageMetadata(
    $input: DeleteImageMetadataInput!
    $condition: ModelImageMetadataConditionInput
  ) {
    deleteImageMetadata(input: $input, condition: $condition) {
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
export const createBadge = /* GraphQL */ `
  mutation CreateBadge(
    $input: CreateBadgeInput!
    $condition: ModelBadgeConditionInput
  ) {
    createBadge(input: $input, condition: $condition) {
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
export const updateBadge = /* GraphQL */ `
  mutation UpdateBadge(
    $input: UpdateBadgeInput!
    $condition: ModelBadgeConditionInput
  ) {
    updateBadge(input: $input, condition: $condition) {
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
export const deleteBadge = /* GraphQL */ `
  mutation DeleteBadge(
    $input: DeleteBadgeInput!
    $condition: ModelBadgeConditionInput
  ) {
    deleteBadge(input: $input, condition: $condition) {
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
export const createReward = /* GraphQL */ `
  mutation CreateReward(
    $input: CreateRewardInput!
    $condition: ModelRewardConditionInput
  ) {
    createReward(input: $input, condition: $condition) {
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
export const updateReward = /* GraphQL */ `
  mutation UpdateReward(
    $input: UpdateRewardInput!
    $condition: ModelRewardConditionInput
  ) {
    updateReward(input: $input, condition: $condition) {
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
export const deleteReward = /* GraphQL */ `
  mutation DeleteReward(
    $input: DeleteRewardInput!
    $condition: ModelRewardConditionInput
  ) {
    deleteReward(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
