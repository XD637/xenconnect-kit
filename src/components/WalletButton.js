import React from "react";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import WalletModal from "./WalletModal";
import AccountModal from "./AccountModal";

const WalletButton = ({ label = "Connect Wallet", style = "px-4 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition shadow-md hover:shadow-lg active:shadow-sm active:translate-y-[1px]" }) => {
  const { address, isConnected } = useAccount();
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [isAccountModalOpen, setAccountModalOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <button className={style}>{label}</button>;
  }

  const toggleModal = () => {
    if (isConnected) {
      setAccountModalOpen(true);
    } else {
      setWalletModalOpen(true);
    }
  };

  return (
    <>
      <button onClick={toggleModal} className={style}>
        {isConnected ? `${address.slice(0, 6)}...${address.slice(-4)}` : label}
      </button>

      {/* Wallet Connection Modal */}
      <WalletModal isOpen={isWalletModalOpen} onClose={() => setWalletModalOpen(false)} />

      {/* Account Modal */}
      <AccountModal isOpen={isAccountModalOpen} onClose={() => setAccountModalOpen(false)} />
    </>
  );
};

export default WalletButton;
