import { RepositoryContainer } from "../../components/Repository";
// import { LaunchListContainer } from "../../components/LaunchList";

// const GET_REPOSITORY = gql`
//   query GetRepository {
//     repository(name: "react", owner: "facebook") {
//       issues(states: OPEN) {
//         totalCount
//       }
//       id
//     }
//   }
// `;

// interface Repository {
//   id: number;
//   issues: { totalCount: number };
// }

// interface RepositoryData {
//   repository: Repository;
// }

// interface RepositoryVars {}

export const App = () => {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      <RepositoryContainer />
    </div>
  );
};
