$(document).ready(function() {
  console.log('js is ready')

  $('textarea').on("keyup", function() { 
    let $counter = $('.counter');
    let characters = 140 - $(this).val().length;
      $counter.text(characters)
      if(characters < 0){
        $counter.addClass('red');
      } else if(characters >= 0){
        $counter.removeClass('red');
      }
    })

});

