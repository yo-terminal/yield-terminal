import {
  Avatar,
  BalanceValue,
  ProfitValue,
  SpinContainer,
  // Badge,
  Subheading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@trade-project/ui-toolkit";
import { usePoolsQuery } from "../../../app/api";
import { ActionCell } from "./actionCell/ActionCell";
import { usePoolAccounts } from "../../../app/hooks";
import { isPortfolio } from "../../../common/utils";

type Props = {
  className?: string;
  owner: string;
};

export function PoolList({ owner }: Props) {
  const { data = [], isFetching } = usePoolsQuery({ owner });
  const { accountMap } = usePoolAccounts();

  const portfolioPools = data.filter((pool) =>
    isPortfolio(pool, accountMap[pool._id])
  );

  return (
    <>
      <Subheading>Portfolio</Subheading>
      <SpinContainer className="mt-4 min-h-40" spinning={isFetching}>
        <Table className="[--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
          <TableHead>
            <TableRow>
              {/* <TableHeader>Pool number</TableHeader> */}
              {/* <TableHeader>Status</TableHeader> */}
              <TableHeader>Name</TableHeader>
              <TableHeader>Profit</TableHeader>
              <TableHeader>Balance</TableHeader>

              {/* <TableHeader>Asset</TableHeader> */}
              <TableHeader className="text-right">Action</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolioPools.map((pool) => (
              <TableRow key={pool._id} title={`Pool #${pool._id}`}>
                {/* <TableCell>{pool._id}</TableCell> */}
                {/* <TableCell className="text-slate-500">{pool.name}</TableCell> */}
                {/* <TableCell>
                <Badge color={pool.status === "Active" ? "lime" : "slate"}>
                  {pool.status}
                </Badge>
              </TableCell> */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <Avatar
                        src={`/coins/${pool.asset_symbol}.png`}
                        className="size-6"
                      />
                      <Avatar
                        src={`/coins/${pool.quote_symbol}.png`}
                        className="size-6"
                      />
                    </div>
                    <span>
                      {pool.asset_symbol} - {pool.quote_symbol}
                    </span>
                  </div>
                </TableCell>
                {/* <TableCell>
                <ProfitValue value={pool.position!.profit} color percent /> (
                <BalanceValue
                  value={pool.position!.profitValue}
                  symbol={pool.quote_symbol}
                  profit
                />
                )
              </TableCell> */}
                <TableCell>
                  <BalanceValue
                    value={pool.position!.profitValue}
                    symbol={pool.quote_symbol}
                    profit
                  />{" "}
                  (<ProfitValue value={pool.position!.profit} color percent />)
                </TableCell>
                <TableCell>
                  <BalanceValue
                    value={pool.position!.balance}
                    symbol={pool.quote_symbol}
                  />
                </TableCell>

                {/* <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar src={pool.asset_url} className="size-6" />
                  <span>{pool.asset_symbol}</span>
                </div>
              </TableCell> */}
                <TableCell className="text-right">
                  <ActionCell pool={pool} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SpinContainer>
    </>
  );
}
