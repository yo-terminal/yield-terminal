import {
  Avatar,
  Badge,
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
} from "@trade-project/ui-toolkit";
import { usePoolsQuery } from "../../../app/api";
import { PortfolioCell } from "./portfolioCell/PortfolioCell";
import { EMPTY_OWNER } from "../../../app/constants";
import { PoolName } from "../../../common/components";

type Props = {
  className?: string;
  owner: string;
};

export function PoolList({ owner, className }: Props) {
  const { data = [], isFetching } = usePoolsQuery({ owner });

  return (
    <div className={className}>
      <Subheading>Pools</Subheading>
      <SpinContainer className="mt-4 min-h-40" spinning={isFetching}>
        <Table className="[--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Protocol</TableHeader>
              <TableHeader>
                <span
                  title="Avg Profit"
                  className="underline decoration-dotted"
                >
                  30d
                </span>
              </TableHeader>
              <TableHeader>
                <span
                  title="Avg Profit"
                  className="underline decoration-dotted"
                >
                  7d
                </span>
              </TableHeader>
              <TableHeader>
                <span
                  title="Avg Profit"
                  className="underline decoration-dotted"
                >
                  24h
                </span>
              </TableHeader>
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
                    fee={pool.fee}
                    asset_type={pool.asset_type}
                  />
                </TableCell>
                <TableCell>
                  <a
                    href={`https://app.cetus.zone/liquidity/analytics?poolAddress=${pool.address}`}
                    target="_blank"
                  >
                    <Avatar
                      src={`https://assets.terminal.mobi/protocols/${pool.protocol}.png`}
                      className="size-6 saturate-50"
                    />
                  </a>
                </TableCell>
                <TableCell>
                  <ProfitBadge value={pool.profit_30d} percent />
                </TableCell>
                <TableCell>
                  <ProfitBadge value={pool.profit_7d} percent />
                </TableCell>
                <TableCell>
                  <ProfitBadge value={pool.profit_24h} percent />
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
    </div>
  );
}
