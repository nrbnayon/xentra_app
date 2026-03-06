import {
  DepositAmount,
  DepositOption,
  WalletMain,
  WithdrawAmount,
  WithdrawNumber,
  WithdrawSuccess,
} from "@/components/Screens/Wallet";
import { WalletSkeleton } from "@/components/Skeleton/WalletSkeleton";
import {
  MOCK_TRANSACTIONS,
  MOCK_WALLET_STATS,
  PAYMENT_METHODS,
} from "@/data/mockWallet";
import { WalletStep } from "@/types/wallet";
import { useEffect, useState } from "react";

export default function WalletTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState<WalletStep>("main");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [currentNumber, setCurrentNumber] = useState("");
  const [activeFlow, setActiveFlow] = useState<"deposit" | "withdraw">(
    "deposit",
  );
  const [transactionStatus, setTransactionStatus] = useState<
    "success" | "failure"
  >("success");

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading && step === "main") {
    return <WalletSkeleton />;
  }

  const resetFlow = () => {
    setCurrentAmount("");
    setSelectedMethod("");
    setCurrentNumber("");
    setStep("main");
  };

  // 1. Amount Step (Image 1 & 2)
  if (step === "deposit-amount") {
    return (
      <DepositAmount
        onBack={() => setStep("main")}
        onConfirm={(amt) => {
          setCurrentAmount(amt);
          setActiveFlow("deposit");
          setStep("deposit-option");
        }}
      />
    );
  }

  if (step === "withdraw-amount") {
    return (
      <WithdrawAmount
        onBack={() => setStep("main")}
        onNext={(amt) => {
          setCurrentAmount(amt);
          setActiveFlow("withdraw");
          setStep("withdraw-option");
        }}
      />
    );
  }

  // 2. Option Step (Image 3 & 4)
  if (step === "deposit-option" || step === "withdraw-option") {
    const isDeposit = step === "deposit-option";
    return (
      <DepositOption
        title={isDeposit ? "Deposit Option" : "Withdraw Option"}
        buttonLabel={isDeposit ? "Deposit" : "Withdraw"}
        methods={PAYMENT_METHODS}
        onBack={() => setStep(isDeposit ? "deposit-amount" : "withdraw-amount")}
        onNext={(method) => {
          setSelectedMethod(method);
          setStep(isDeposit ? "deposit-number" : "withdraw-number");
        }}
      />
    );
  }

  // 3. Number Step (Image 5)
  if (step === "deposit-number" || step === "withdraw-number") {
    const isDeposit = step === "deposit-number";
    return (
      <WithdrawNumber
        title={isDeposit ? "Deposit Amount" : "Withdraw Amount"}
        buttonLabel={isDeposit ? "Deposit" : "Withdraw"}
        onBack={() => setStep(isDeposit ? "deposit-option" : "withdraw-option")}
        onSubmit={(num) => {
          setCurrentNumber(num);
          setTransactionStatus("success");
          setStep("success");
        }}
      />
    );
  }

  // 4. Success Step
  if (step === "success") {
    return (
      <WithdrawSuccess
        status={transactionStatus}
        amount={currentAmount}
        method={selectedMethod}
        accountNumber={currentNumber}
        onDone={resetFlow}
      />
    );
  }

  // Main Wallet Dashboard
  return (
    <WalletMain
      stats={MOCK_WALLET_STATS}
      transactions={MOCK_TRANSACTIONS}
      onDeposit={() => {
        setActiveFlow("deposit");
        setStep("deposit-amount");
      }}
      onWithdraw={() => {
        setActiveFlow("withdraw");
        setStep("withdraw-amount");
      }}
    />
  );
}
