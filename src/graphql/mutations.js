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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      totalPoints
      createdAt
      updatedAt
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
      username
      totalPoints
      createdAt
      updatedAt
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
      username
      totalPoints
      createdAt
      updatedAt
      __typename
    }
  }
`;
