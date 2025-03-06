import React from "react";
import { createContext, useContext } from "react";
import { WagmiProvider, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet } from "wagmi/chains";
import { injected, walletConnect, coinbaseWallet } from "wagmi/connectors";
import { http } from "viem";

// Create a context to store XenConnect configuration
const XenConnectContext = createContext(null);

// Custom hook for easy access to XenConnect config
export const useXenConnect = () => {
  const context = useContext(XenConnectContext);
  if (!context) {
    throw new Error("useXenConnect must be used within XenConnectProvider");
  }
  return context;
};

const queryClient = new QueryClient();

export const XenConnectProvider = ({ children, projectId, appName }) => {
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
      injected(),
      walletConnect({ projectId }),
      coinbaseWallet({ appName }),
    ],
    chains: [mainnet],
    transports: {
      [mainnet.id]: http(),
    },
  });

  return (
    <XenConnectContext.Provider value={{ projectId, appName }}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    </XenConnectContext.Provider>
  );
};
