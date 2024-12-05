import clsx from "clsx";
import copy from "copy-to-clipboard";
import { Button } from "@trade-project/ui-toolkit";
import { Square2StackIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

type Props = {
  className?: string;
  text: string;
};

export function ClipboardButton({ className, text }: Props) {
  const [iconClass, setIconClass] = useState('');
  return (
    <Button
      plain
      className={clsx(className)}
      onClick={() => {
        copy(text, {
          debug: true,
          message: "Press #{key} to copy",
        });
        setIconClass('fill-blue-600 dark:fill-blue-500');
        setTimeout(() => {
          setIconClass('');
        }, 350)
      }}
    >
      <Square2StackIcon className={iconClass} />
    </Button>
  );
}
