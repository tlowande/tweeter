
$(document).ready(function () {


  $(document).scroll(function(){
    var y = $(this).scrollTop()
    if(y > 200){
    $('.scroll').fadeIn();
    $('nav div').fadeOut('slow');
    } else { 
      $('.scroll').fadeOut('slow');
      $('nav div').fadeIn();
    }
  })

  $('.scroll').click(function(){
    event.preventDefault();
    $('html, body').animate({scrollTop:0}, 600);
    $('.hide-n-seek').show();
    $('textarea').focus();
  })

  $('#action').click(function () {
    $('.hide-n-seek').toggle('slow');
    $('textarea').focus();
  })

  //This function is Jim's courtesy :)
  const elapseTime = function (data) {
    let timeDiff = new Date().getTime() - new Date(data).getTime();
    let seconds = timeDiff / 1000;
    let time = seconds;
  
    if (seconds > 60 * 60 * 24 * 7 * 52) {
      time = Math.floor(seconds / 52 / 7 / 24 / 60 / 60);
      return `${time} year${time > 1 ? 's' : ''} ago`;
    } else if (seconds > 60 * 60 * 24 * 7) {
      time = Math.floor(seconds / 7 / 24 / 60 / 60);
      return `${time} week${time > 1 ? 's' : ''} ago`;
    } else if (seconds > 60 * 60 * 24) {
      time = Math.floor(seconds / 24 / 60 / 60);
      return `${time} day${time > 1 ? 's' : ''} ago`;
    } else if (seconds > 60 * 60) {
      time = Math.floor(seconds / 60 / 60);
      return `${time} hour${time > 1 ? 's' : ''} ago`;
    } else if (seconds > 60 ) {
      time = Math.floor(seconds / 60);
      return `${time} minute${time > 1 ? 's' : ''} ago`;
    } else if (seconds < 60) {
      time = Math.floor(seconds);
      return `${time >= 1 ? time : 1 } second${time > 1 ? 's' : ''} ago`;
    }
  }

  const createTweetElement = function (tweet) {
    const escape = function (str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    const date = elapseTime(tweet.created_at);

    let markup = `<article class="tweet">
    <header>
    <div class="user-avatar">
    <img class='avatars' src=${tweet.user.avatars}> 
    <span class='name'>${tweet.user.name}</span>
    </div> 
    <div class='handle'>
    ${tweet.user.handle}
    </div>
    </header>
    <p class='content'>${escape(tweet.content.text)}</p>
    <footer>
    <div class='created_at'>${date}</div>
    <div>
    <i class="fas fa-heart"></i> 
    <i class="fas fa-flag"></i> 
    <i class="fas fa-retweet"></i>
    </div>
    </footer> 
    </article>`;

    return markup;
  }

  const renderTweets = function (tweets) {
    $('.container #myTweets').empty();
    for (let t of tweets.reverse()) {
      let chunck = createTweetElement(t)
      $('.container #myTweets').append(chunck)
    }
  }

  $('form').submit(function (event) {
    event.preventDefault();
    const $tweet = $(this).find('textarea').val();
    if (!$tweet) {
      $('.error-msg').slideUp(function(){
        $('.error-msg').text('If You\'re not thinking about anything DON\'T TWEET (please type something)').slideDown()
      })
    } else if ($tweet.length > 140) {
      $('.error-msg').slideUp(function(){
      $('.error-msg').text('Oops, for messages greater than 140 characters you should write a book').slideDown()
      })
    } else {
      const input = $(this).serialize();
      $.ajax('/tweets', { method: 'POST', data: input })
        .then(loadTweets);
      $(this).find('textarea').val('');
      $('.error-msg').slideUp()
    }
  })

  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(renderTweets)

  }

  loadTweets();

})