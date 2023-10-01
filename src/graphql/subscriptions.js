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
