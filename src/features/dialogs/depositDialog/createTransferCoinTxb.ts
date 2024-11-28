import { CoinStruct } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";

const SUI_TYPE_ARG = "0x2::sui::SUI";

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
  recipient: string
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

  buildTransferSuiCoinTxb(txb, 1_000_000_000n, recipient);

  return txb;
}

/**
 * Create a transaction block for transferring a type of coin.
 * @param ownedCoins coins owned by the sender.
 * @param coinType The type of coin to transfer.
 * @param amount The amount of coins to transfer.
 * @param recipient The recipient of the coins.
 */
export default function createTransferCoinTxb(
  ownedCoins: CoinStruct[],
  coinType: string, // such as 0x2::sui::SUI
  amount: bigint,
  recipient: string
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
      recipient
    );
  }
}
