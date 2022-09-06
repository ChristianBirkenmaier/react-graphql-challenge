import { gql } from "@apollo/client";

export const QUERY_REPOSITORY = gql`
  query Repository(
    $name: String!
    $owner: String!
    $first: Int!
    $states: [IssueState!]
  ) {
    repository(name: $name, owner: $owner) {
      issues(first: $first, states: $states) {
        totalCount
        nodes {
          body
          title
        }
      }
    }
  }
`;
