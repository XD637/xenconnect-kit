import React from "react";
import { useState } from "react";
import { useAccount, useDisconnect, useBalance, useChainId } from "wagmi";

const AccountModal = ({ isOpen, onClose }) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const chainId = useChainId();
  const [copied, setCopied] = useState(false);

  const chainNames = {
    1: "Ethereum",
    137: "Polygon",
    10: "Optimism",
    42161: "Arbitrum",
    56: "BNB Chain",
    43114: "Avalanche",
  };

  const chainName = chainNames[chainId] || `Unknown (${chainId})`;

  if (!isOpen) return null;

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
          Wallet Info
        </h2>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center space-y-3">
          <p className="text-gray-900 dark:text-white flex items-center justify-center gap-2">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>

          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center gap-2">
            Chain: {chainName}
          </p>

          <p className="text-gray-900 dark:text-white font-bold mt-2 flex items-center justify-center gap-2">
          {balance ? `${(Number(balance.value) / 10 ** balance.decimals).toFixed(4)} ${balance.symbol}` : "Loading balance..."}

          </p>

          <div className="flex justify-center mt-2">
            <button
              onClick={copyAddress}
              className="py-1 px-4 flex items-center justify-center gap-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
            >
              {copied ? (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              ) : (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="9" y="9" width="13" height="13" rx="2"></rect>
                  <path d="M15 9V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4"></path>
                </svg>
              )}
              {copied ? "Copied!" : "Copy Address"}
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            disconnect();
            onClose();
          }}
          className="w-full mt-4 py-2 flex items-center justify-center gap-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};

export default AccountModal;
