import "../dist/tailwind.css"; // Import the precompiled Tailwind CSS

import React from "react";
import { XenConnectProvider, useXenConnect } from "./components/XenConnectProvider.js";
import WalletButton from "./components/WalletButton.js";
import WalletModal from "./components/WalletModal.js";
import AccountModal from "./components/AccountModal.js";

export {
  XenConnectProvider,
  useXenConnect,
  WalletButton,
  WalletModal,
  AccountModal
};
