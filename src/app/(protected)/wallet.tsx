import {
  DepositAmount,
  DepositOption,
  WalletMain,
  WithdrawAmount,
  WithdrawNumber,
  WithdrawSuccess,
} from "@/components/Screens/Wallet";
import {
  MOCK_TRANSACTIONS,
  MOCK_WALLET_STATS,
  PAYMENT_METHODS,
} from "@/data/mockWallet";
import { WalletStep } from "@/types/wallet";
import { useState } from "react";

export default function WalletTab() {
  const [step, setStep] = useState<WalletStep>("main");
  const [depositMethod, setDepositMethod] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawNumber, setWithdrawNumber] = useState("");

  // ── Deposit flow ──
  if (step === "deposit-option") {
    return (
      <DepositOption
        methods={PAYMENT_METHODS}
        onBack={() => setStep("main")}
        onNext={(method) => {
          setDepositMethod(method);
          setStep("deposit-amount");
        }}
      />
    );
  }

  if (step === "deposit-amount") {
    return (
      <DepositAmount
        onBack={() => setStep("deposit-option")}
        onConfirm={() => {
          // In a real app, logic to process deposit would go here
          setStep("main");
        }}
      />
    );
  }

  // ── Withdraw flow ──
  if (step === "withdraw-amount") {
    return (
      <WithdrawAmount
        onBack={() => setStep("main")}
        onNext={(amount) => {
          setWithdrawAmount(amount);
          setStep("withdraw-number");
        }}
      />
    );
  }

  if (step === "withdraw-number") {
    return (
      <WithdrawNumber
        onBack={() => setStep("withdraw-amount")}
        onSubmit={(number) => {
          setWithdrawNumber(number);
          setStep("withdraw-success");
        }}
      />
    );
  }

  if (step === "withdraw-success") {
    return (
      <WithdrawSuccess
        amount={withdrawAmount}
        method="Moncash"
        accountNumber={withdrawNumber}
        onDone={() => {
          setWithdrawAmount("");
          setWithdrawNumber("");
          setStep("main");
        }}
      />
    );
  }

  // ── Main wallet ──
  return (
    <WalletMain
      stats={MOCK_WALLET_STATS}
      transactions={MOCK_TRANSACTIONS}
      onDeposit={() => setStep("deposit-option")}
      onWithdraw={() => setStep("withdraw-amount")}
    />
  );
}
