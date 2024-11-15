import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { useParams, useNavigate } from "react-router-dom";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { OwnerPool } from "./ownerPool/OwnerPool";

export function Pool() {
  const { id } = useParams();
  const pool_id = Number(id);
  const navigate = useNavigate();
  const account = useCurrentAccount();

  return (
    <>
      <div className="flex gap-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 text-base sm:text-sm/6 text-slate-500 dark:text-slate-400"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ChevronLeftIcon className="size-5 sm:size-4 fill-slate-400 dark:fill-slate-500" />
          Back
        </button>
      </div>
      {account && <OwnerPool pool_id={pool_id} owner={account.address} />}
    </>
  );
}
