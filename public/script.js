
var $messages = $('.messages-content'),
    d, h, m,
    i = 0;
    var name = prompt("What is your chat username?");
    var user = document.getElementById("user");
      user.innerHTML = "Hello, " + name + "!";
    const socket = io();
$(window).load(function() {
  $messages.mCustomScrollbar();
 
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
    msg = $('.message-input').val();
    const message = {
        username: name,
        message: msg,
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

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

var Fake = [
  'Hi there, I\'m Fabio and you?',
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'That\'s awesome',
  'Codepen is a nice place to stay',
  'I think you\'re a nice person',
  'Why do you think that?',
  'Can you explain?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure chat with you',
  'Time to make a new codepen',
  'Bye',
  ':)'
]


 

  socket.on('new-message', (data) => {
  if(data.username==name){return false}

    $('<div class="message loading new"><figure class="avatar"><img src="https://res.cloudinary.com/dnnhnqiym/image/upload/v1649708204/samples/people/boy-snow-hoodie.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    updateScrollbar();
    setTimeout(function() {
        $('.message.loading').remove();
        $('<div class="message new"><figure class="avatar"><img src="https://res.cloudinary.com/dnnhnqiym/image/upload/v1649708204/samples/people/boy-snow-hoodie.jpg" /></figure>' + data.message + '</div>').appendTo($('.mCSB_container')).addClass('new');
        setDate();
        updateScrollbar();
        i++;
      }, 1000 + (Math.random() * 0) * 0);

 /*  const messages = document.getElementById('messages');
  const item = document.createElement('li');
  item.textContent = `${data.username}: ${data.message}`;
  messages.appendChild(item); */
});


