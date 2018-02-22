const APIUtil = require('./api_util');

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


