export type TransactionStatus = "Completed" | "Pending" | "Failed";

export interface Transaction {
  id: string;
  date: string;
  reason: string;
  amount: string;
  status: TransactionStatus;
}

export interface WalletStats {
  balance: string;
  totalWinnings: string;
  totalDeposited: string;
}

export type WalletStep =
  | "main"
  | "deposit-option"
  | "deposit-amount"
  | "withdraw-amount"
  | "withdraw-number"
  | "withdraw-success";
