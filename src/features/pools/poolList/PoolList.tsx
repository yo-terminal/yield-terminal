import {
  Avatar,
  Badge,
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
import {
  BalanceValue,
  ProfitValue,
  SpinContainer,
} from "../../../common/components";

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
              {/* <TableHeader>Pool number</TableHeader> */}
              <TableHeader>Name</TableHeader>
              <TableHeader>Profit (30d)</TableHeader>
              <TableHeader>TVL</TableHeader>

              {/* <TableHeader>Asset</TableHeader> */}
              <TableHeader className="text-right">Portfolio</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((pool) => (
              <TableRow key={pool._id} title={`Order #${pool._id}`}>
                {/* <TableCell>{pool._id}</TableCell> */}
                {/* <TableCell className="text-slate-500">{pool.name}</TableCell> */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <Avatar src={pool.asset_url} className="size-6" />
                      <Avatar src={pool.quote_url} className="size-6" />
                    </div>
                    <span>
                      {pool.asset_symbol} - {pool.quote_symbol}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <ProfitValue value={pool.profit_30d} color percent />
                </TableCell>
                <TableCell>
                  <BalanceValue value={pool.tvl} symbol={pool.quote_symbol} />
                </TableCell>

                {/* <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar src={pool.asset_url} className="size-6" />
                  <span>{pool.asset_symbol}</span>
                </div>
              </TableCell> */}
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
