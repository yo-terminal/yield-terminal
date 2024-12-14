import { useState } from "react";
import { useBalanceQuery } from "../../app/api";
import {
  initialUntil,
  LineChartDto,
  SpinContainer,
  Subheading,
  LimitLineChart,
  ToolBar,
  ToolRadioGroup,
  ToolRadio,
} from "@trade-project/ui-toolkit";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Empty } from "./empty/Empty";

const defaultData: LineChartDto = {
  name: "",
  labels: [],
  dataset: [],
};

const quoteOptions = [
  { name: "USD", value: 0 },
  { name: "SUI", value: 1 },
];

const initialOption = quoteOptions[0];

export function Balance() {
  const account = useCurrentAccount();
  const [quote, setQuote] = useState(initialOption);
  const [until, setUntil] = useState(initialUntil);
  const {
    data = defaultData,
    isFetching,
    isLoading,
  } = useBalanceQuery(
    { index: quote.value, until, owner: account?.address || "" },
    { skip: !account }
  );

  return (
    <>
      <Subheading>Balance</Subheading>
      <div className="flex justify-end gap-2">
        <ToolBar>
          <ToolRadioGroup value={quote} disabled={isFetching} onChange={setQuote}>
            {quoteOptions.map((option) => (
              <ToolRadio key={option.name} value={option} disabled={isFetching}>
                {option.name}
              </ToolRadio>
            ))}
          </ToolRadioGroup>
        </ToolBar>
      </div>
      <SpinContainer className="mt-2" spinning={isFetching}>
        {data.dataset.length === 0 && !isLoading ? (
          <Empty />
        ) : (
          <LimitLineChart
            data={data}
            disabled={isFetching}
            onChangeUntil={setUntil}
          />
        )}
      </SpinContainer>
    </>
  );
}
