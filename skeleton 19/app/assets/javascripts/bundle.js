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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(1);

class FollowToggle {
  constructor(el, options) {
    this.$el = $(el);
    this.userId = this.$el.data('user-id') || options.userId;
    this.followState = this.$el.data('initial-follow-state') || options.followState;


    this.render();
    this.$el.on('click', this.handleClick.bind(this));
  }

  handleClick(event) {
    const followToggle = this;

    event.preventDefault();

    if (this.followState === 'followed') {
      this.followState = 'unfollowing';
      this.render();
      APIUtil.unfollowUser(this.userId).then(() => {
        followToggle.followState = 'unfollowed';
        followToggle.render();
      });
    } else if (this.followState === 'unfollowed') {
      this.followState = 'following';
      this.render();
      APIUtil.followUser(this.userId).then(() => {
        followToggle.followState = 'followed';
        followToggle.render();
      });
    }
  }


  render() {
    switch (this.followState) {
      case 'followed':
        this.$el.prop('disabled', false);
        this.$el.html('Unfollow!');
        break;
      case 'unfollowed':
        this.$el.prop('disabled', false);
        this.$el.html('Follow!');
        break;
      case 'following':
        this.$el.prop('disabled', true);
        this.$el.html('Following...');
        break;
      case 'unfollowing':
        this.$el.prop('disabled', true);
        this.$el.html('Unfollowing...');
        break;
    }
  }
}

module.exports = FollowToggle;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

const APIUtil = {

  followUser: id => APIUtil.changeFollowStatus(id, 'POST'),

  unfollowUser: id => APIUtil.changeFollowStatus(id, 'DELETE'),

  changeFollowStatus: (id, method) => (
    $.ajax({
      url: `/users/${id}/follow`,
      dataType: 'json',
      method
    })
  ),

  //I believe this returns an array of users
  searchUsers: (query) => (
    $.ajax({
      url: '/users/search',
      dataType: 'json',
      method: 'GET',
      data: { query }
    })
  ),

  createTweet: (data) => {
    return $.ajax ({
      url: "/tweets",
      method: "POST",
      dataType: "json",
      data
    });
  }
};

module.exports = APIUtil;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(0);
const UsersSearch = __webpack_require__(3);
const TweetCompose = __webpack_require__(4)
//callback should call your constructor once for each
// button.follow-toggle element

$(function () {
  $('nav.users-search').each( (i, nav) => new UsersSearch(nav) );
  $('form.tweet-compose').each( (i, form) => new TweetCompose(form) );
  $('button.follow-toggle').each( (i, btn) => new FollowToggle(btn, {}) );
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(1)
const FollowToggle = __webpack_require__(0);

class UsersSearch {
  constructor (el) {
    this.$el = $(el);
    this.$input = this.$el.find('input[name=username]');
    this.$ul = this.$el.find('.users');

    this.$input.on('input', this.handleInput.bind(this));
  }

  handleInput (event) {
    // if (this.$input.val() === '') {
    //   return [];
    // }

    //I believe this gets and array of users, THEN passes that array to this.renderResults
    APIUtil.searchUsers(this.$input.val())
      .then((users) => this.renderResults(users));
  }

  // This is for our promise success handler
  renderResults (users) {
    // First, empty out ul.users:
    this.$ul.empty();

    //iterate through the fetched array of users
    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      //for each result, use jQuery to build an li containing an anchor tag 
      //linking the user
      let $a = $('<a></a>');
      $a.text(`@${user.username}`);
      $a.attr('href', `/users/${user.id}`);

      // followToggle button for each user
      // first, create a followToggle button
      const $followToggle = $('<button></button>');
      // creat a new FollowToggle object
      new FollowToggle($followToggle, {
        userId: user.id,
        followState: user.followed ? 'followed' : 'unfollowed'
      });
      $a.append($followToggle);

      const $li = $('<li></li>');
      $li.append($a);
      this.$ul.append($li);
    }
  }
}

module.exports = UsersSearch;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(1);

class TweetCompose {
  constructor (el) {
    this.$el = $(el);
    
    this.$el.on('submit', (event) => {
      this.submit(event)
    });

    this.$textarea = this.$el.find('textarea[name=tweet\\[content\\]]');
    // this.$textarea = this.$el.find('textarea');

    // console.log(this.$textarea);
  }

  submit (event) {
    event.preventDefault();
    const data = this.$el.serializeJSON();

    this.$el.find(':input').prop('disabled', true);

    APIUtil.createTweet(data).then(tweet => this.handleSuccess(tweet));

  }

  clearInput () {
    // empty all the inputs after a tweet is successfully created (i.e. this should be 
    //called in a promise immediately after the form is submitted )
    this.$el.find(':input').prop('disabled', false);
    this.$textarea.val('');

    // Insert the created tweet into the list of all tweets.

  }

  handleSuccess (data) {
    this.clearInput();


    const $ul = $(this.$el.data('tweets-ul'));
    const stringTweet = JSON.stringify(data);
    const $li = $('<li>').html(stringTweet)

    $ul.prepend($li);

    this.$el.find(':input').prop('disabled', false);
    // Should call clear input and re-enable the form


  }

}

  

  // }


module.exports = TweetCompose;




/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map