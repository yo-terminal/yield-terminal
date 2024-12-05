import {
  // Avatar,
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
import { PoolName } from "../../../common/components";
import { Empty } from "./empty/Empty";

type Props = {
  className?: string;
  owner: string;
};

export function PoolList({ owner }: Props) {
  const { data = [], isFetching, isLoading } = usePoolsQuery({ owner });
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
              {/* <TableHeader>Status</TableHeader> */}
              <TableHeader>Name</TableHeader>
              {/* <TableHeader>Protocol</TableHeader> */}
              <TableHeader>Profit</TableHeader>
              <TableHeader>Balance</TableHeader>
              {/* <TableHeader>Address</TableHeader> */}
              <TableHeader className="text-right">Action</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolioPools.map((pool) => (
              <TableRow key={pool._id} title={`Pool #${pool._id}`}>
                {/* <TableCell>
                <Badge color={pool.status === "Active" ? "lime" : "slate"}>
                  {pool.status}
                </Badge>
              </TableCell> */}
                <TableCell>
                  <PoolName
                    asset={pool.asset_symbol}
                    quote={pool.quote_symbol}
                  />
                </TableCell>
                {/* <TableCell>
                  <Avatar
                    src={`/protocols/${pool.protocol}.png`}
                    className="size-6"
                  />
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
                  <AddressView address={pool.position!.address} />
                </TableCell> */}
                <TableCell className="text-right">
                  <ActionCell pool={pool} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {portfolioPools.length === 0 && !isLoading && <Empty />}
      </SpinContainer>
    </>
  );
}
