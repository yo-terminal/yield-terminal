import clsx from "clsx";
import { memo, PropsWithChildren } from "react";
import { Spin } from "./spin";

type Props = {
  className?: string;
  spinning?: boolean;
  dark?: boolean;
};

export const SpinContainer = memo(function SpinContainer({
  className,
  children,
  spinning,
  dark,
}: PropsWithChildren<Props>) {
  return (
    <div className={clsx(className, "relative")}>
      {spinning && (
        <div
          className={clsx(
            "absolute inset-0 z-10 opacity-20",
            dark ? "bg-slate-600" : "bg-slate-100 dark:bg-slate-600"
          )}
        />
      )}
      {spinning && (
        <div className="absolute inset-0 z-20 flex justify-center items-center">
          <Spin dark={dark} />
        </div>
      )}
      {children}
    </div>
  );
});
