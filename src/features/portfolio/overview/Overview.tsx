import {
  SpinContainer,
  Subheading,
  ToolBar,
  ToolRadio,
  ToolRadioGroup,
} from "@trade-project/ui-toolkit";
import { useOwnerOverviewQuery } from "../../../app/api";
import { Stat } from "../../../common/components";
import { useState } from "react";

const quoteOptions = [
  { name: "USD", value: 0 },
  { name: "SUI", value: 1 },
];

const initialOption = quoteOptions[0];

type Props = {
  className?: string;
  owner: string;
};

export function Overview({ owner, className }: Props) {
  const [quote, setQuote] = useState(initialOption);
  const {
    data = { balance: 0, deposit: 0, profit: 0, profitValue: 0 },
    isFetching,
  } = useOwnerOverviewQuery({ owner, index: quote.value });

  return (
    <SpinContainer className={className} spinning={isFetching}>
      <Subheading>Overview</Subheading>
      <div className="mt-1 flex justify-end">
        <ToolBar>
          <ToolRadioGroup
            value={quote}
            disabled={isFetching}
            onChange={setQuote}
          >
            {quoteOptions.map((option) => (
              <ToolRadio key={option.name} value={option} disabled={isFetching}>
                {option.name}
              </ToolRadio>
            ))}
          </ToolRadioGroup>
        </ToolBar>
      </div>
      <div className="mt-2 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Net Value" value={data.balance} />
        <Stat title="Deposit" value={data.deposit} />
        <Stat
          title="Net Profit"
          value={data.profitValue}
          change={data.profit}
          percent
        />
      </div>
    </SpinContainer>
  );
}
