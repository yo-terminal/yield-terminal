import { CoinStruct } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";

export const SUI_TYPE_ARG = "0x2::sui::SUI";

function buildTransferSuiCoinTxb(
  txb: Transaction,
  amount: bigint,
  recipient: string
) {
  // split the coin to be sent from the gas coins
  const coin = txb.splitCoins(txb.gas, [txb.pure.u64(amount)]);
  txb.transferObjects([coin], txb.pure.address(recipient));
  return txb;
}

function buildTransferCustomCoinTxb(
  txb: Transaction,
  coins: CoinStruct[],
  coinType: string,
  amount: bigint,
  recipient: string,
  reserve: number
) {
  // split the primary coin and merge the rest
  const [primaryCoin, ...mergeCoins] = coins.filter(
    (coin) => coin.coinType === coinType
  );
  // TODO: pass the object instead of the id
  const primaryCoinInput = txb.object(primaryCoin.coinObjectId);
  if (mergeCoins.length) {
    // TODO: This could just merge a subset of coins that meet the balance requirements instead of all of them.
    txb.mergeCoins(
      primaryCoinInput,
      mergeCoins.map((coin) => txb.object(coin.coinObjectId))
    );
  }
  // TODO: pass gas coin object instead of pure amount, which can avoid unnecessary network calls
  const coin = txb.splitCoins(primaryCoinInput, [txb.pure.u64(amount)]);
  txb.transferObjects([coin], txb.pure.address(recipient));

  if (reserve < 0.5) {
    buildTransferSuiCoinTxb(txb, 1_000_000_000n, recipient);
  }

  return txb;
}

/**
 * Create a transaction block for transferring a type of coin.
 * @param ownedCoins coins owned by the sender.
 * @param coinType The type of coin to transfer.
 * @param amount The amount of coins to transfer.
 * @param recipient The recipient of the coins.
 */
export function createTransferCoinTxb(
  ownedCoins: CoinStruct[],
  coinType: string, // such as 0x2::sui::SUI
  amount: bigint,
  recipient: string,
  reserve: number
) {
  const txb = new Transaction();

  if (coinType === SUI_TYPE_ARG) {
    return buildTransferSuiCoinTxb(txb, amount, recipient);
  } else {
    return buildTransferCustomCoinTxb(
      txb,
      ownedCoins,
      coinType,
      amount,
      recipient,
      reserve
    );
  }
}

export function getBalanceBigInt(ownedCoins: CoinStruct[], coinType: string) {
  const coins = ownedCoins.filter((coin) => coin.coinType === coinType);
  let balance = 0n;
  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i];
    balance += BigInt(coin.balance);
  }
  return balance;
}

export function getBalance(
  ownedCoins: CoinStruct[],
  coinType: string,
  decimals: number
) {
  return Number(getBalanceBigInt(ownedCoins, coinType)) / 10 ** decimals;
}

export function getMaxBalance(
  ownedCoins: CoinStruct[],
  coinType: string,
  decimals: number
) {
  const balance = getBalance(ownedCoins, coinType, decimals);
  if (coinType === SUI_TYPE_ARG) {
    return Math.max(0, balance - 0.5);
  }
  return balance;
}

export function getGasDeposit(ownedCoins: CoinStruct[], coinType: string) {
  if (ownedCoins.length === 0) {
    return 0;
  }
  if (
    coinType === SUI_TYPE_ARG &&
    getBalanceBigInt(ownedCoins, SUI_TYPE_ARG) < 500_000_000n
  ) {
    return 1;
  }
  return 0;
}
