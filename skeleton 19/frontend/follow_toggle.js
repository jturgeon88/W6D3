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