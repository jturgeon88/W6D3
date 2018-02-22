const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');
const TweetCompose = require('./tweet_compose')
//callback should call your constructor once for each
// button.follow-toggle element

$(function () {
  $('nav.users-search').each( (i, nav) => new UsersSearch(nav) );
  $('form.tweet-compose').each( (i, form) => new TweetCompose(form) );
  $('button.follow-toggle').each( (i, btn) => new FollowToggle(btn, {}) );
});
