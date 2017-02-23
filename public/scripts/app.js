/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//  var data = [
//   {
//     "user": {
//       "name": "Newton",

//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];


// Test / driver code (temporary)
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
$(document).ready(function(){
  function createTweetElement(tweet){
    const $tweet = $('<article>').addClass('tweet')
    const $header = $("<header>");
    const $img = $("<img>").attr('src', tweet.user.avatars.small);
    const $span = $("<span>").text(tweet.user.name);
    const $text = $("<text>").text(tweet.user.handle);
    const $pTag = $("<p>").text(tweet.content.text);
    const $footer = $("<footer>").text(tweet.created_at);
    const $fontAwesome = '<i class="fa fa-heart" aria-hidden="true"></i><i class="fa fa-retweet" aria-hidden="true"></i><i class="fa fa-flag" aria-hidden="true"></i>';

    $tweet.append($header, $pTag, $footer);
    $header.append($img, $span, $text);
    $footer.append($fontAwesome);

    return $tweet;
  }

  function renderTweets(tweets) {
    // loops through tweets
    for(everyUser of tweets){
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      $('.tweets').prepend(createTweetElement(everyUser));
    }
  }
  // renderTweets(data);

  function loadTweets() {
    $.ajax({
        url: '/tweets',
        method: 'GET',
        success: renderTweets
    });
  }
  loadTweets();

  //toggling the form element
  $('button').click(function(){
    $(".new-tweet").slideToggle(function(){
      $("textarea").focus();
    })
  });

  //form validation
  $(".new-tweet form").on("submit", function( event ) {
    event.preventDefault();
    var maxLength = 140;
    var charRemaining = maxLength - $("textarea").val().length;

    if(charRemaining === maxLength){
      $(".msg").text("you didn't input any message!");
      function removeMsg(){
        $(".msg").text("");
      }
      setTimeout(removeMsg, 2000);
    }
    if(charRemaining < 0){
      $(".msg").text("your message is too long!");
      function removeMsg(){
        $(".msg").text("");
      }
      setTimeout(removeMsg, 2000);
    }else{
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
        //grab reference of function instead of invoking
        success: loadTweets
      });
    }
  });

});

