import { Transaction, WalletStats } from "@/types/wallet";

export const MOCK_WALLET_STATS: WalletStats = {
  balance: "1,200 HTG",
  totalWinnings: "1,200 HTG",
  totalDeposited: "1,200 HTG",
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "t1",
    date: "1/1/2026",
    reason: "Deposit",
    amount: "100 HTG",
    status: "Completed",
  },
  {
    id: "t2",
    date: "1/1/2026",
    reason: "Withdraw",
    amount: "100 HTG",
    status: "Pending",
  },
  {
    id: "t3",
    date: "1/1/2026",
    reason: "Deposit",
    amount: "100 HTG",
    status: "Completed",
  },
  {
    id: "t4",
    date: "1/1/2026",
    reason: "Deposit",
    amount: "100 HTG",
    status: "Completed",
  },
];

export const PAYMENT_METHODS = ["Moncash", "Natcash"];
