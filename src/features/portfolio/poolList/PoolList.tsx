import { Duration } from "luxon";
import {
  AddressView,
  BalanceValue,
  ProfitBadge,
  SpinContainer,
  Subheading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
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

export function PoolList({ owner, className }: Props) {
  const { data = [], isFetching, isLoading } = usePoolsQuery({ owner });
  const { accountMap } = usePoolAccounts();

  const portfolioPools = data.filter((pool) =>
    isPortfolio(pool, accountMap[pool._id])
  );

  return (
    <div className={className}>
      <Subheading>Positions</Subheading>
      <SpinContainer className="mt-4 min-h-40" spinning={isFetching}>
        <Table className="[--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Open</TableHeader>
              <TableHeader>Profit</TableHeader>
              <TableHeader>Balance</TableHeader>
              <TableHeader>Account</TableHeader>
              <TableHeader className="text-right">Action</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolioPools.map((pool) => (
              <TableRow key={pool._id} title={`Pool #${pool._id}`}>
                <TableCell>
                  <PoolName
                    asset={pool.asset_symbol}
                    quote={pool.quote_symbol}
                    fee={pool.fee}
                    asset_type={pool.asset_type}
                  />
                </TableCell>
                <TableCell>
                  <Text>
                    {Duration.fromMillis(Date.now() - pool.position!.time)
                      .shiftTo("days")
                      .toHuman({ maximumFractionDigits: 0 })}{" "}
                    ago
                  </Text>
                </TableCell>
                <TableCell>
                  <ProfitBadge value={pool.position!.profit} percent />{" "}
                  <BalanceValue
                    value={pool.position!.profitValue}
                    symbol={pool.quote_symbol}
                    profit
                  />
                </TableCell>
                <TableCell>
                  <BalanceValue
                    value={pool.position!.balance}
                    symbol={pool.quote_symbol}
                  />
                </TableCell>
                <TableCell>
                  <AddressView address={pool.position!.address} />
                </TableCell>
                <TableCell className="text-right">
                  <ActionCell pool={pool} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {portfolioPools.length === 0 && !isLoading && <Empty />}
      </SpinContainer>
    </div>
  );
}
