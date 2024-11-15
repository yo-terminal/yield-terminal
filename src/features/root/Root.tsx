import { useCurrentAccount } from "@mysten/dapp-kit";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSearchQuery } from "./rootSlice";
import { Input, InputGroup } from "@trade-project/ui-toolkit";
import { PoolList } from "./poolList/PoolList";

export function Root() {
  const dispatch = useAppDispatch();
  const account = useCurrentAccount();
  const searchQuery = useAppSelector((state) => state.root.searchQuery);

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <div className="mt-4 flex max-w-xl gap-4 items-center">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input
                  type="search"
                  name="search"
                  placeholder="Search&hellip;"
                  value={searchQuery}
                  onChange={(e) => {
                    dispatch(setSearchQuery(e.target.value));
                  }}
                />
              </InputGroup>
            </div>
            {/* <div>
              <Select name="sort_by">
                <option value="">Sort by...</option>
                <option value="date:up">Date up</option>
                <option value="date:down">Date down</option>
              </Select>
            </div> */}
          </div>
        </div>
      </div>
      {account && <PoolList className="mt-8" owner={account.address} />}
    </>
  );
}
