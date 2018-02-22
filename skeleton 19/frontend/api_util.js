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