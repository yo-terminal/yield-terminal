import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import type { RootState, AppDispatch } from "./store";
import { useNetworkVariable } from "./networkConfig";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useOwnedObjects<T>(type: string) {
  const packageId = useNetworkVariable("packageId");
  const account = useCurrentAccount();
  const { data, isPending, error, refetch } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
      options: {
        showType: true,
        showContent: true,
      },
    },
    {
      enabled: !!account,
    }
  );

  const objects = useMemo(() => {
    return (
      (
        data?.data.filter(
          (object) => object.data?.type === `${packageId}::yield_terminal::${type}`
        ) || []
      )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((x) => (x.data!.content as any).fields as T)
    );
  }, [data?.data, packageId, type]);

  return {
    objects,
    isPending,
    error,
    refetch,
  };
}

export function useSignAndExecute() {
  const packageId = useNetworkVariable("packageId");
  const suiClient = useSuiClient();
  const {
    mutate: signAndExecute,
    isPending,
    error,
  } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          // Raw effects are required so the effects can be reported back to the wallet
          showRawEffects: true,
          showEffects: true,
        },
      }),
  });

  return {
    packageId,
    signAndExecute,
    isPending,
    error,
  };
}
