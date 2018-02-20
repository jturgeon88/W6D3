const FollowToggle = require('./follow_toggle');

//callback should call your constructor once for each
// button.follow-toggle element

$(function () {
  $('button.follow-toggle').each( (i, btn) => new FollowToggle(btn) );
});
