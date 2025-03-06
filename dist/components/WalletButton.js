"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _wagmi = require("wagmi");
var _WalletModal = _interopRequireDefault(require("./WalletModal"));
var _AccountModal = _interopRequireDefault(require("./AccountModal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var WalletButton = function WalletButton(_ref) {
  var _ref$label = _ref.label,
    label = _ref$label === void 0 ? "Connect Wallet" : _ref$label,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? "px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition" : _ref$style;
  var _useAccount = (0, _wagmi.useAccount)(),
    address = _useAccount.address,
    isConnected = _useAccount.isConnected;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isWalletModalOpen = _useState2[0],
    setWalletModalOpen = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isAccountModalOpen = _useState4[0],
    setAccountModalOpen = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    hydrated = _useState6[0],
    setHydrated = _useState6[1];
  (0, _react.useEffect)(function () {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return /*#__PURE__*/React.createElement("button", {
      className: style
    }, label);
  }
  var toggleModal = function toggleModal() {
    if (isConnected) {
      setAccountModalOpen(true);
    } else {
      setWalletModalOpen(true);
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: toggleModal,
    className: style
  }, isConnected ? "".concat(address.slice(0, 6), "...").concat(address.slice(-4)) : label), /*#__PURE__*/React.createElement(_WalletModal["default"], {
    isOpen: isWalletModalOpen,
    onClose: function onClose() {
      return setWalletModalOpen(false);
    }
  }), /*#__PURE__*/React.createElement(_AccountModal["default"], {
    isOpen: isAccountModalOpen,
    onClose: function onClose() {
      return setAccountModalOpen(false);
    }
  }));
};
var _default = exports["default"] = WalletButton;