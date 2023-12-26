
var $messages = $('.messages-content'),
  d, h, m,
  i = 0;
var name = prompt("What is your chat username?");
var user = document.getElementById("user");
user.innerHTML = "Hello, " + name + "!";
const socket = io();
var randomNumber = Math.floor(Math.random() * 100) + 1;
var image = "https://picsum.photos/200/300?" + randomNumber

$(window).load(function () {
  $messages.mCustomScrollbar();

});
var myImage = document.querySelector("#avatarU");
myImage.src = "https://st2.depositphotos.com/3867453/6986/v/600/depositphotos_69864645-stock-illustration-letter-m-logo-icon-design.jpg";

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate() {
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}


function insertMessage() {
  console.log(image)
  msg = $('.message-input').val();
  const message = {
    username: name,
    message: msg,
    image: image,
  };


  if ($.trim(msg) == '') {
    return false;
  }
  socket.emit('new-message', message);

  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();

}

$('.message-submit').click(function () {
  insertMessage();
});

$(window).on('keydown', function (e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

socket.on('new-message', (data) => {
  if (data.username == name) { return false }

  $('<div class="message loading new"><figure class="avatar"><img src=' + data.image + ' /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();
  setTimeout(function () {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src=' + data.image + ' /></figure><div class="user">' + data.username + '</div>' + data.message + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();

    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 0) * 0);
});


if (!('webkitSpeechRecognition' in window)) {
  alert('Your browser does not support speech recognition. Please use Another browser.');
} else {
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = function () {
    console.log('Voice recognition started. Speak into the microphone.');
  };

  recognition.onerror = function (event) {
    console.error('Speech recognition error detected: ' + event.error);
  };

  recognition.onend = function () {
    console.log('Voice recognition ended.');
  };

  recognition.onresult = function (event) {
    var transcript = event.results[0][0].transcript;
    $('.message-input').val(transcript);
    insertMessage(); // This function sends the messag
    // in case you want to see the transcript before sending it 
    //$('.message-input').val(transcript);
  };

  $('.microphone-button').click(function () {
    recognition.start();
  });
}