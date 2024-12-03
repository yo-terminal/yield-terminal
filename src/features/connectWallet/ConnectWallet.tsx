import { ConnectButton } from "@mysten/dapp-kit";
import { Text, Heading } from "@trade-project/ui-toolkit";

export function ConnectWallet() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pb-32 lg:pt-32">
      <Heading>
        <div className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
          Welcome to{" "}
          <span className="font-light tracking-wide text-blue-600 dark:text-blue-500">
            Yield Terminal
          </span>
        </div>
      </Heading>
      <Text className="mx-auto mt-10 max-w-2xl text-lg tracking-tight">
        To start working with the terminal, please connect the SUI wallet.
      </Text>
      <div className="my-10 flex gap-4 justify-center items-center flex-wrap">
        <ConnectButton className="!bg-slate-800 dark:!bg-slate-600 !text-white !py-2.5 !px-10" />
        {/* <Text>Please connect to wallet.</Text> */}
      </div>
    </div>
  );
}
