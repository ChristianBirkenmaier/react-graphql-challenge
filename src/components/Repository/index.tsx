import { useState } from "react";
import {
  IssueState,
  useRepositoryLazyQuery,
  useRepositoryQuery,
} from "../../generated/graphql";

export const RepositoryContainer = () => {
  const [name, setName] = useState<string>("react");
  const [owner, setOwner] = useState<string>("facebook");
  const [first, setFirst] = useState<number>(2);
  const [states, setStates] = useState<IssueState>(IssueState.Open);
  const [search, setSearch] = useState<string>();

  const [loadData, { data, error, loading }] = useRepositoryLazyQuery({
    variables: { name, owner, first, states },
  });

  console.log({ data, error, loading });
  console.log({ name, owner, first, states });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadData({ variables: { name, first, owner, states } });
  };

  const Data = () => {
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error ...</p>;
    if (!data) return null;
    return (
      <>
        <h3>Repository</h3>
        <p>{data.repository?.issues.totalCount}</p>
        <ol>
          {data.repository?.issues.nodes
            ?.filter((issue) => {
              if (!search) return true;
              if (issue?.body.includes(search) || issue?.title.includes(search))
                return true;
              return false;
            })
            .map((issue) => (
              <li>
                <ul>
                  <li>{issue?.title}</li>
                  <li>{issue?.body}</li>
                </ul>
              </li>
            ))}
        </ol>
      </>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Repository name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Repository owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <input
          type="number"
          placeholder="First"
          value={first}
          onChange={(e) => setFirst(Number(e.target.value))}
        />
        <select
          name="states"
          id="states"
          value={states}
          onChange={(e) => setStates(e.target.value as IssueState)}
        >
          <option value={IssueState.Open}>OPEN</option>
          <option value={IssueState.Closed}>CLOSED</option>
        </select>
        <input
          type="text"
          name=""
          id=""
          placeholder="Filter search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Fetch</button>
      </form>
      <Data />
    </div>
  );
};
