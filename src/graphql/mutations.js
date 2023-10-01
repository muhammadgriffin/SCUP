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
