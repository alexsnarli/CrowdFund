"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./ethereum/web3.js":
/*!**************************!*\
  !*** ./ethereum/web3.js ***!
  \**************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3 */ \"./node_modules/web3/lib/index.js\");\n/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(web3__WEBPACK_IMPORTED_MODULE_0__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\nvar web3;\nif ( true && typeof window.ethereum !== \"undefined\") {\n    window.ethereum.request({\n        method: \"eth_requestAccounts\"\n    });\n    web3 = new (web3__WEBPACK_IMPORTED_MODULE_0___default())(window.ethereum);\n} else {\n    var provider = new (web3__WEBPACK_IMPORTED_MODULE_0___default().providers.HttpProvider)(\"https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c\");\n    web3 = new (web3__WEBPACK_IMPORTED_MODULE_0___default())(provider);\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (web3);\n\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ldGhlcmV1bS93ZWIzLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBdUI7QUFFdkIsR0FBRyxDQUFDQyxJQUFJO0FBRVIsRUFBRSxFQUFFLEtBQTZCLElBQUksTUFBTSxDQUFDQyxNQUFNLENBQUNDLFFBQVEsS0FBSyxDQUFXLFlBQUUsQ0FBQztJQUM1RUQsTUFBTSxDQUFDQyxRQUFRLENBQUNDLE9BQU8sQ0FBQyxDQUFDO1FBQUNDLE1BQU0sRUFBRSxDQUFxQjtJQUFDLENBQUM7SUFDekRKLElBQUksR0FBRyxHQUFHLENBQUNELDZDQUFJLENBQUNFLE1BQU0sQ0FBQ0MsUUFBUTtBQUNqQyxDQUFDLE1BQU0sQ0FBQztJQUNOLEdBQUssQ0FBQ0csUUFBUSxHQUFHLEdBQUcsQ0FBQ04sb0VBQTJCLENBQzlDLENBQStEO0lBRWpFQyxJQUFJLEdBQUcsR0FBRyxDQUFDRCw2Q0FBSSxDQUFDTSxRQUFRO0FBQzFCLENBQUM7QUFFRCwrREFBZUwsSUFBSSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2V0aGVyZXVtL3dlYjMuanM/OTY3YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViMyBmcm9tIFwid2ViM1wiO1xuXG5sZXQgd2ViMztcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHdpbmRvdy5ldGhlcmV1bSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICB3aW5kb3cuZXRoZXJldW0ucmVxdWVzdCh7IG1ldGhvZDogXCJldGhfcmVxdWVzdEFjY291bnRzXCIgfSk7XG4gIHdlYjMgPSBuZXcgV2ViMyh3aW5kb3cuZXRoZXJldW0pO1xufSBlbHNlIHtcbiAgY29uc3QgcHJvdmlkZXIgPSBuZXcgV2ViMy5wcm92aWRlcnMuSHR0cFByb3ZpZGVyKFxuICAgIFwiaHR0cHM6Ly9yaW5rZWJ5LmluZnVyYS5pby92My8xNWMxZDMyNTgxODk0Yjg4YTkyZDhkOWU1MTllNDc2Y1wiXG4gICk7XG4gIHdlYjMgPSBuZXcgV2ViMyhwcm92aWRlcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdlYjM7XG4iXSwibmFtZXMiOlsiV2ViMyIsIndlYjMiLCJ3aW5kb3ciLCJldGhlcmV1bSIsInJlcXVlc3QiLCJtZXRob2QiLCJwcm92aWRlciIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./ethereum/web3.js\n");

/***/ })

});