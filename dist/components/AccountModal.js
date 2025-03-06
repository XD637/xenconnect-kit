"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _wagmi = require("wagmi");
var _lucideReact = require("lucide-react");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// Icons

var AccountModal = function AccountModal(_ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose;
  var _useAccount = (0, _wagmi.useAccount)(),
    address = _useAccount.address,
    connector = _useAccount.connector;
  var _useDisconnect = (0, _wagmi.useDisconnect)(),
    disconnect = _useDisconnect.disconnect;
  var _useBalance = (0, _wagmi.useBalance)({
      address: address
    }),
    balance = _useBalance.data;
  var chainId = (0, _wagmi.useChainId)(); // Get chain ID instead of useNetwork()
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    copied = _useState2[0],
    setCopied = _useState2[1];
  var chainNames = {
    1: "Ethereum",
    137: "Polygon",
    10: "Optimism",
    42161: "Arbitrum",
    56: "BNB Chain",
    43114: "Avalanche"
  };
  var chainName = chainNames[chainId] || "Unknown (".concat(chainId, ")");
  if (!isOpen) return null;
  var copyAddress = function copyAddress() {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(function () {
      return setCopied(false);
    }, 3000); // Hide after 3 seconds
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
  }, "\u2715"), /*#__PURE__*/React.createElement("h2", {
    className: "text-lg font-bold text-gray-900 dark:text-white mb-4 text-center"
  }, "Wallet Info"), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center space-y-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 dark:text-white flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(_lucideReact.Wallet, {
    size: 18
  }), " ", address.slice(0, 6), "...", address.slice(-4)), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(_lucideReact.Link, {
    size: 18
  }), " Connected to ", connector === null || connector === void 0 ? void 0 : connector.name), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(_lucideReact.Database, {
    size: 18
  }), " Chain: ", chainName), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 dark:text-white font-bold mt-2 flex items-center justify-center gap-2"
  }, balance ? "".concat(parseFloat(balance.formatted).toFixed(4), " ").concat(balance.symbol) : "Loading balance..."), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center mt-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: copyAddress,
    className: "py-1 px-4 flex items-center justify-center gap-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
  }, copied ? /*#__PURE__*/React.createElement(_lucideReact.Check, {
    size: 18
  }) : /*#__PURE__*/React.createElement(_lucideReact.Copy, {
    size: 18
  }), copied ? "Copied!" : "Copy Address"))), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      disconnect();
      onClose(); // Close modal after disconnecting
    },
    className: "w-full mt-4 py-2 flex items-center justify-center gap-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
  }, /*#__PURE__*/React.createElement(_lucideReact.LogOut, {
    size: 18
  }), " Disconnect")));
};
var _default = exports["default"] = AccountModal;