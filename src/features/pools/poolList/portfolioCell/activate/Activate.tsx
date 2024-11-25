import { PlusIcon } from "@heroicons/react/16/solid";
import { Transaction } from "@mysten/sui/transactions";
import { Button } from "@trade-project/ui-toolkit";
import { useActivatePoolMutation } from "../../../../../app/api";
import { OwnerPoolParams } from "../../../../../app/dto";
import { useBackupAccounts, useSignAndExecute } from "../../../../../app/hooks";
import { AccountModel } from "../../../../../app/model";

type Props = OwnerPoolParams & {
  backupAccount: AccountModel | undefined;
};

export function Activate({ backupAccount, ...params }: Props) {
  const { refetch } = useBackupAccounts();
  const [activatePool, { isLoading }] = useActivatePoolMutation();
  const { packageId, signAndExecute, isPending } = useSignAndExecute();

  return (
    <Button
      plain
      title="Add to Portfolio"
      disabled={isPending || isLoading}
      onClick={() => {
        activatePool(params)
          .unwrap()
          .then((data) => {
            if (!backupAccount) {
              const tx = new Transaction();

              tx.moveCall({
                arguments: [
                  tx.pure.u64(params.pool_id),
                  tx.pure.address(data.address),
                  tx.pure.string(data.accessKey),
                ],
                target: `${packageId}::yield_terminal::backup_account`,
              });

              signAndExecute(
                { transaction: tx },
                {
                  onSuccess: () => {
                    setTimeout(() => {
                      refetch();
                    }, 500);
                    setTimeout(() => {
                      refetch();
                    }, 1500);
                  },
                  onError: () => {
                    alert("Something went wrong");
                  },
                }
              );
            }
          });
      }}
    >
      <PlusIcon />
      Add to Portfolio
    </Button>
  );
}
