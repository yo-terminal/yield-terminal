import {
  Avatar,
  Badge,
  BalanceValue,
  ProfitValue,
  SpinContainer,
  Subheading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@trade-project/ui-toolkit";
import { usePoolsQuery } from "../../../app/api";
import { PortfolioCell } from "./portfolioCell/PortfolioCell";
import { EMPTY_OWNER } from "../../../app/constants";
import { PoolName } from "../../../common/components";

type Props = {
  className?: string;
  owner: string;
};

export function PoolList({ owner }: Props) {
  const { data = [], isFetching } = usePoolsQuery({ owner });

  return (
    <>
      <Subheading>Pools</Subheading>
      <SpinContainer className="mt-4 min-h-40" spinning={isFetching}>
        <Table className="[--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Protocol</TableHeader>
              <TableHeader>Profit (30d)</TableHeader>
              <TableHeader>TVL</TableHeader>
              <TableHeader className="text-right">Portfolio</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((pool) => (
              <TableRow key={pool._id} title={`Pool #${pool._id}`}>
                <TableCell>
                  <PoolName
                    asset={pool.asset_symbol}
                    quote={pool.quote_symbol}
                  />
                </TableCell>
                <TableCell>
                  <Avatar
                    src={`/protocols/${pool.protocol}.png`}
                    className="size-6"
                  />
                </TableCell>
                <TableCell>
                  <ProfitValue value={pool.profit_30d} color percent />
                </TableCell>
                <TableCell>
                  <BalanceValue value={pool.tvl} symbol={pool.quote_symbol} />
                </TableCell>
                <TableCell className="text-right">
                  {owner !== EMPTY_OWNER ? (
                    <PortfolioCell pool={pool} owner={owner} />
                  ) : (
                    <Badge color="slate" title="Wallet is not connected">
                      Disconnected
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SpinContainer>
    </>
  );
}
