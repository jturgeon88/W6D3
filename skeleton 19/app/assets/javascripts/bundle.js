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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);

//callback should call your constructor once for each
// button.follow-toggle element

$(function () {
  $('button.follow-toggle').each( (i, btn) => new FollowToggle(btn) );
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class FollowToggle {
  contructor(el) {
    this.$el = $(el);
    this.userId = $el.data('user-id');
    this.followState = $el.data('initial-follow-state');


    this.render();
    this.$el.on('click', this.handleClick.bind(this));
  }

  render() {
    if (this.followState === "unfollowed") {
      this.$el.html = $('Follow!');
    } else if (this.followState === "followed") {
      this.$el.html = $('Unfollow!');
    }
  }

  handleClick(event) {
    const followToggle = this;

    e.preventDefault();

    if (this.followState === "unfollowed") {
      this.followState = 'following';
      this.render();
      $.ajax ({
        url: `/users/${this.userId}/follow`,
        datatype: 'json',
        method: 'POST'
      }).then(() => {
        followToggle.followState = 'followed';
        followToggle.render();
      })
    } else {
      this.followState = 'unfollowing';
      this.render();
      $.ajax ({
        url: `/users/${id}/follow`,
        datatype: 'json',
        method: 'DELETE'
      }).then(() => {
        followToggle.followState = 'unfollowed';
        followToggle.render();
      })
    }
  }
}

module.exports = FollowToggle;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map