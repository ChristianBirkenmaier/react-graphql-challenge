import { useState } from "react";
import { IssueState, useRepositoryQuery } from "../../generated/graphql";

export const RepositoryContainer = () => {
  const [name, setName] = useState<string>();
  const [owner, setOwner] = useState<string>();
  const [first, setFirst] = useState<number>();
  const [states, setStates] = useState<IssueState>(IssueState.Open);
  const { data, error, loading, refetch } = useRepositoryQuery({
    variables: {
      name: "react",
      owner: "facebook",
      first: 2,
      states: IssueState.Open,
    },
  });

  console.log({ data, error, loading });
  console.log({ name, owner, first, states });

  const handleClick = () => {
    refetch({
      first,
      name,
      owner,
      states,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  return (
    <div>
      <form action="">
        <input
          type="text"
          placeholder="Repository name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Repository owner"
          onChange={(e) => setOwner(e.target.value)}
        />
        <input
          type="number"
          placeholder="First"
          onChange={(e) => setFirst(Number(e.target.value))}
        />
        <select
          name="states"
          id="states"
          onChange={(e) => setStates(e.target.value as IssueState)}
        >
          <option value={IssueState.Open}>OPEN</option>
          <option value={IssueState.Closed}>CLOSED</option>
        </select>
      </form>
      <h3>Repository</h3>
      <p>{data.repository?.issues.totalCount}</p>
      <ol>
        {data.repository?.issues.nodes?.map((issue) => (
          <li>
            <ol>
              <li>{issue?.title}</li>
              <li>{issue?.body}</li>
            </ol>
          </li>
        ))}
      </ol>
      <button onClick={handleClick}>Refetch</button>
    </div>
  );
};
