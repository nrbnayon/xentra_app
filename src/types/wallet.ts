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
  | "deposit-amount"
  | "deposit-option"
  | "deposit-number"
  | "withdraw-amount"
  | "withdraw-option"
  | "withdraw-number"
  | "success";
