module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./article/loader.md":
/*!***************************!*\
  !*** ./article/loader.md ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>Webpack中loader文件处理器是一个CommonJs风格的函数，该函数接收一个 String/Buffer 类型的入参，并返回一个 String/Buffer 类型的返回值。</p>\n<pre><code class=\"language-js\">import { getOptions } from &#39;loader-utils&#39;;\nimport { validateOptions } from &#39;schema-utils&#39;;\nmodule.exports = function(content, map, meta) {\n // 获取 options\n  const options = getOptions(this);\n  // 检验loader的options是否合法\n  validateOptions(schema, options, &#39;Demo Loader&#39;);\n   // 在这里写转换 loader 的逻辑\n  // ...\n}</code></pre>\n<ul>\n<li>content: 表示源文件字符串或者buffer</li>\n<li>map: 表示sourcemap对象</li>\n<li>meta: 表示元数据，辅助对象</li>\n</ul>\n<h2 id=\"loader-的配置\">loader 的配置</h2>\n<p>方案1:</p>\n<pre><code class=\"language-js\">\n// webpack.config.js\nmodule.exports = {\n  ...\n  module: {\n    rules: [{\n      test: /.vue$/,\n      loader: &#39;vue-loader&#39;\n    }, {\n      test: /.scss$/,\n      // 先经过 sass-loader，然后将结果传入 css-loader，最后再进入 style-loader。\n      use: [\n        &#39;style-loader&#39;,//从JS字符串创建样式节点\n        &#39;css-loader&#39;,// 把  CSS 翻译成 CommonJS\n        {\n          loader: &#39;sass-loader&#39;,\n          options: {\n            data: &#39;$color: red;&#39;// 把 Sass 编译成 CSS\n          }\n        }\n      ]\n    }]\n  }\n  ...\n}</code></pre>\n<p>方法2（右到左地被调用）</p>\n<pre><code class=\"language-js\">// module\nimport a from &#39;raw-loader!../../utils.js&#39;</code></pre>\n<p>三、loader 的一些开发技巧\n1、单一任务\n只做一件事情，做好一件事情。loader 的管道（pipeline）设计正是希望能够将任务拆解并独立成一个个子任务，由多个 loader 分别处理，以此来保证每个 loader 的可复用性。因此我们在开发 loader 前一定要先给 loader 一个准确的功能定位，从通用的角度出发去设计，避免做多余的事。</p>\n<p>2、无状态\nloader 应该是不保存状态的。这样的好处一方面是使我们 loader 中的数据流简单清晰，另一方面是保证 loader 具有良好可测性。因此我们的 loader 每次运行都不应该依赖于自身之前的编译结果，也不应该通过除出入参外的其他方式与其他编译模块进行数据交流。当然，这并不代表 loader 必须是一个无任何副作用的纯函数，loader 支持异步，因此是可以在 loader 中有 I/O 操作的。</p>\n<p>3、尽可能使用缓存\n在开发时，loader 可能会被不断地执行，合理的缓存能够降低重复编译带来的成本。loader 执行时默认是开启缓存的，这样一来， webpack 在编译过程中执行到判断是否需要重编译 loader 实例的时候，会直接跳过 rebuild 环节，节省不必要重建带来的开销。</p>\n<p>当且仅当有你的 loader 有其他不稳定的外部依赖（如 I/O 接口依赖）时，可以关闭缓存：</p>\n<pre><code class=\"language-js\">this.cacheable&amp;&amp;this.cacheable(false);</code></pre>\n<p> 这样一来，我们需要的 md-loader，就只做一件事情：将 md 的数据转化成为一个 JSON 字符串。因此，我们可以很简单地实现这样一个 md-loader：</p>\n";

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _article_loader_md__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../article/loader.md */ "./article/loader.md");
/* harmony import */ var _article_loader_md__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_article_loader_md__WEBPACK_IMPORTED_MODULE_0__);

console.log(_article_loader_md__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ })

/******/ });
//# sourceMappingURL=index.js.map