
import { useState } from "react";
import { useAccount, useDisconnect, useBalance, useChainId } from "wagmi";
import { Copy, Check, LogOut, Wallet, Link, Database } from "lucide-react"; // Icons

const AccountModal = ({ isOpen, onClose }) => {
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const chainId = useChainId(); // Get chain ID instead of useNetwork()
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
    setTimeout(() => setCopied(false), 3000); // Hide after 3 seconds
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
        {/* Close Button */}
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
          {/* Wallet Address */}
          <p className="text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <Wallet size={18} /> {address.slice(0, 6)}...{address.slice(-4)}
          </p>

          {/* Connected Wallet Name */}
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center gap-2">
            <Link size={18} /> Connected to {connector?.name}
          </p>

          {/* Chain Name */}
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center gap-2">
            <Database size={18} /> Chain: {chainName}
          </p>

          {/* Balance (Correctly Formatted) */}
          <p className="text-gray-900 dark:text-white font-bold mt-2 flex items-center justify-center gap-2">
            {balance
              ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`
              : "Loading balance..."}
          </p>

          {/* Copy Address Button (Now Centered) */}
          <div className="flex justify-center mt-2">
            <button
              onClick={copyAddress}
              className="py-1 px-4 flex items-center justify-center gap-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copied!" : "Copy Address"}
            </button>
          </div>
        </div>

        {/* Disconnect Button */}
        <button
          onClick={() => {
            disconnect();
            onClose(); // Close modal after disconnecting
          }}
          className="w-full mt-4 py-2 flex items-center justify-center gap-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          <LogOut size={18} /> Disconnect
        </button>
      </div>
    </div>
  );
};

export default AccountModal;
