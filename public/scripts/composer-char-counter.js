$(document).ready(function() {
  var textBox = document.querySelector('textarea');
  var maxLength = 140;
  textBox.addEventListener('input', function(event){
  var charRemaining = maxLength - this.value.length;
  var counterClass = this.parentElement.getElementsByClassName('counter');
  $(counterClass).html(charRemaining);
    if (charRemaining < 0){
      $(counterClass).addClass('counter-red');
    } else {
      $(counterClass).removeClass('counter-red');
    }
  })
});


// console.log(this);
// console.log(event.target);

// TRAVERSE PARENT THEN CHILD
// this.parentElement.getElementsByClassName('counter')[0]
// IN JQUERY
// $(this).parent().children('.counter')