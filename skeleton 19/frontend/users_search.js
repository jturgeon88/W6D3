const APIUtil = require('./api_util')

class UsersSearch {
  constructor (el) {
    this.$el = $(el);
    this.$input = this.$el.find('input[name=username]');
    this.$ul = this.$el.find('.users');
  }

  handleInput (event) {
    // if (this.$input.val() === '') {
    //   return [];
    // }

    APIUtil.searchUsers(this.$input.val()).then(users)
  }

}