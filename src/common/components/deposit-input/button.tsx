import * as Headless from "@headlessui/react";
import { TouchTarget } from "@trade-project/ui-toolkit";
import clsx from "clsx";
import React, { forwardRef } from "react";

const styles = {
  base: [
    // Base
    "relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold",
    // Sizing
    "px-[calc(theme(spacing[3.5])-4px)] py-[calc(theme(spacing[2.5])-4px)] sm:px-[calc(theme(spacing.3)-4px)] sm:py-[calc(theme(spacing[1.5])-4px)] sm:text-sm/6",
    // Focus
    "focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500",
    // Disabled
    "data-[disabled]:opacity-50",
  ],
  plain: [
    // Base
    "border-transparent text-slate-950 data-[active]:bg-slate-950/5 data-[hover]:bg-slate-950/5",
    // Dark mode
    "dark:text-white dark:data-[active]:bg-white/10 dark:data-[hover]:bg-white/10",
  ],
};

type ButtonProps = { className?: string; children: React.ReactNode } & Omit<
  Headless.ButtonProps,
  "as" | "className"
>;

export const Button = forwardRef(function Button(
  { className, children, ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  const classes = clsx(className, styles.base, styles.plain);

  return (
    <Headless.Button
      {...props}
      className={clsx(classes, "cursor-pointer")}
      ref={ref}
    >
      <TouchTarget>{children}</TouchTarget>
    </Headless.Button>
  );
});

