const APIUtil = require('./api_util')
const FollowToggle = require('./follow_toggle');

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