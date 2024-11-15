import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";

export function OwnedObjects() {
  const account = useCurrentAccount();
  const { data, isPending, error } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
      options: {
        showType: true,
        showContent: true,
      }
    },
    {
      enabled: !!account,
    },
  );

  if (!account) {
    return;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.data.length === 0 ? (
        <div>No objects owned by the connected wallet</div>
      ) : (
        <h4>Objects owned by the connected wallet</h4>
      )}
      {data.data.map((object) => (
        <div key={object.data?.objectId}>
          <pre>{JSON.stringify(object.data, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}
