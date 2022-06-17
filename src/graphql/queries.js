/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getListing = /* GraphQL */ `
  query GetListing($id: ID!) {
    getListing(id: $id) {
      id
      title
      categoryName
      categoryID
      ingredients
      directions
      images
      userID
      commonID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listListings = /* GraphQL */ `
  query ListListings(
    $filter: ModelListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listListings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        categoryName
        categoryID
        ingredients
        directions
        images
        userID
        commonID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const gettingListingByCreatedAt = /* GraphQL */ `
  query GettingListingByCreatedAt(
    $commonID: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gettingListingByCreatedAt(
      commonID: $commonID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        categoryName
        categoryID
        ingredients
        directions
        images
        userID
        commonID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
