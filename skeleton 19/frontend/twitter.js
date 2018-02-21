const FollowToggle = require('./follow_toggle');

//callback should call your constructor once for each
// button.follow-toggle element

$(function () {
  $('nav.users-search').each( (i, nav) => new UsersSearch(nav) );


  $('button.follow-toggle').each( (i, btn) => new FollowToggle(btn, {}) );
});
