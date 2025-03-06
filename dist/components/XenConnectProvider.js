"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useXenConnect = exports.XenConnectProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _wagmi = require("wagmi");
var _reactQuery = require("@tanstack/react-query");
var _chains = require("wagmi/chains");
var _connectors = require("wagmi/connectors");
var _viem = require("viem");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Create a context to store XenConnect configuration
var XenConnectContext = /*#__PURE__*/(0, _react.createContext)(null);

// Custom hook for easy access to XenConnect config
var useXenConnect = exports.useXenConnect = function useXenConnect() {
  var context = (0, _react.useContext)(XenConnectContext);
  if (!context) {
    throw new Error("useXenConnect must be used within XenConnectProvider");
  }
  return context;
};
var queryClient = new _reactQuery.QueryClient();
var XenConnectProvider = exports.XenConnectProvider = function XenConnectProvider(_ref) {
  var children = _ref.children,
    projectId = _ref.projectId,
    appName = _ref.appName;
  var wagmiConfig = (0, _wagmi.createConfig)({
    autoConnect: true,
    connectors: [(0, _connectors.injected)(), (0, _connectors.walletConnect)({
      projectId: projectId
    }), (0, _connectors.coinbaseWallet)({
      appName: appName
    })],
    chains: [_chains.mainnet],
    transports: _defineProperty({}, _chains.mainnet.id, (0, _viem.http)())
  });
  return /*#__PURE__*/_react["default"].createElement(XenConnectContext.Provider, {
    value: {
      projectId: projectId,
      appName: appName
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactQuery.QueryClientProvider, {
    client: queryClient
  }, /*#__PURE__*/_react["default"].createElement(_wagmi.WagmiProvider, {
    config: wagmiConfig
  }, children)));
};