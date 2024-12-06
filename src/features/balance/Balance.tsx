import clsx from "clsx";
import { useState } from "react";
import { useBalanceQuery } from "../../app/api";
import {
  initialUntil,
  LineChartDto,
  SpinContainer,
  Subheading,
  Radio,
  RadioGroup,
  RadioField,
  Label,
  LimitLineChart,
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
      <div className="flex justify-end">
        <div className="flex items-start justify-center py-2 px-4 overflow-hidden border-slate-200 rounded-lg border dark:border-white/10">
          <RadioGroup
            className="flex items-center gap-4"
            value={quote.name}
            disabled={isFetching}
            onChange={(option) => {
              setQuote(quoteOptions.find((x) => x.name === option)!);
            }}
          >
            {quoteOptions.map((option) => (
              <RadioField key={option.name} className="!mt-0 !gap-0">
                <Radio value={option.name} disabled={isFetching} />
                <Label
                  className={clsx(
                    "pl-2",
                    isFetching ? "!text-gray-500 !dark:text-gray-600" : ""
                  )}
                >
                  {option.name}
                </Label>
              </RadioField>
            ))}
          </RadioGroup>
        </div>
      </div>
      <SpinContainer className="mt-4" spinning={isFetching}>
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
