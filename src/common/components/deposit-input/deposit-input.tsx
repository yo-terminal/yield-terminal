import "./index.css";
import Slider from "rc-slider";
import React, { forwardRef } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { number } from "../../utils";

const marks = {
  0: "0%",
  25: "25%",
  50: "50%",
  75: "75%",
  100: "100%",
};

type Props = {
  value: number;
  onChange: (value: number) => void;
  minDeposit: number;
  maxBalance: number;
  decimals: number;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

function getPercent(value: number, minDeposit: number, maxBalance: number) {
  if (minDeposit >= maxBalance) {
    return 0;
  }
  if (value < minDeposit) {
    return 0;
  }
  if (value > maxBalance) {
    return 100;
  }
  return Math.round(((value - minDeposit) / (maxBalance - minDeposit)) * 100);
}

export const DepositInput = forwardRef(function DepositInput(
  { value, onChange, minDeposit, maxBalance, decimals, onBlur }: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const percent = getPercent(value, minDeposit, maxBalance);
  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <Input
          ref={ref}
          value={value}
          onChange={(e) => {
            onChange(Number(e.target.value));
          }}
          onBlur={onBlur}
        />
        <div className="absolute right-[3px] top-[3px]">
          <Button
            onClick={() => {
              onChange(maxBalance);
            }}
          >
            Max
          </Button>
        </div>
      </div>
      <div className="px-2.5 pb-6">
        <Slider
          value={percent}
          min={0}
          max={100}
          marks={marks}
          step={1}
          onChange={(val) => {
            onChange(
              number.round(
                minDeposit + ((maxBalance - minDeposit) * Number(val)) / 100,
                decimals
              )
            );
          }}
        />
      </div>
    </div>
  );
});
