import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./pages/Dashboard";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  gql,
} from "@apollo/client";
import { GRAPHQL_URI } from "./config/constants";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: GRAPHQL_URI,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query getRepo {
//         repository(name: "react", owner: "facebook") {
//           issues(states: OPEN) {
//             totalCount
//           }
//           id
//         }
//       }
//     `,
//   })
//   .then(console.log);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
