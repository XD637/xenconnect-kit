import React, { useState, useEffect } from "react";
import { useConnect, useAccount } from "wagmi";
import { injected, walletConnect, coinbaseWallet, metaMask } from "wagmi/connectors";
import { useXenConnect } from "./XenConnectProvider"; // Import the context

const WalletModal = ({ isOpen, onClose }) => {
  const { projectId, appName } = useXenConnect(); // Get values from context
  const { connect, isLoading } = useConnect();
  const { isConnected } = useAccount();
  const [connectingWallet, setConnectingWallet] = useState(null);

  // Get package name for CDN
  const packageName = "xenconnect"; // Make sure this matches your NPM package name
  const cdnBase = `https://cdn.jsdelivr.net/npm/${packageName}/dist/assets`;

  const wallets = [
    { name: "MetaMask", connector: metaMask(), logo: `${cdnBase}/metamask-logo.svg` },
    { name: "WalletConnect", connector: walletConnect({ projectId }), logo: `${cdnBase}/walletconnect-logo.svg` },
    { name: "Coinbase Wallet", connector: coinbaseWallet({ appName }), logo: `${cdnBase}/coinbase-logo.svg` },
    { name: "Injected", connector: injected(), logo: `${cdnBase}/polygon.svg` },
  ];

  useEffect(() => {
    if (isConnected) onClose();
  }, [isConnected, onClose]);

  if (!isOpen) return null;

  const handleConnect = async (walletName, connector) => {
    setConnectingWallet(walletName);
    try {
      await connect({ connector });
    } catch (error) {
      console.error("Connection failed:", error);
    } finally {
      setConnectingWallet(null);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
          Select Wallet
        </h2>

        <div className="space-y-3">
          {wallets.map(({ name, connector, logo }) => (
            <button
              key={name}
              onClick={() => handleConnect(name, connector)}
              className="flex items-center justify-between w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              disabled={isLoading}
            >
              <div className="flex items-center">
                <img src={logo} alt={name} width={24} height={24} className="mr-3" />
                <span>{name}</span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-gray-500 dark:text-gray-400 text-xs mt-4">
          Powered by Xennium
        </p>
      </div>
    </div>
  );
};

export default WalletModal;
