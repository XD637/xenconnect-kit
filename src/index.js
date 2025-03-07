
import React from "react";
import { XenConnectProvider, useXenConnect } from "./components/XenConnectProvider.js";
import WalletButton from "./components/WalletButton.js";
import WalletModal from "./components/WalletModal.js";
import AccountModal from "./components/AccountModal.js";

// Dynamically inject Tailwind styles if in a browser environment
import tailwindStyles from "./tailwind.js";

if (typeof document !== "undefined") {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = tailwindStyles;
  document.head.appendChild(styleTag);
}

export {
  XenConnectProvider,
  useXenConnect,
  WalletButton,
  WalletModal,
  AccountModal
};
