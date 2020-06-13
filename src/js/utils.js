const NLP_WS = 'ws://localhost:5000/'
const NLP_HTTP = 'http://localhost:5000/cva'
const HERE_API_KEY = 'gOTlDv3usI61h9jQhUdcp8E9Yo8u9Ww1AFZ3fBmx0oE'

function appendMessage(msg, cls) {
  var message = document.createElement('div');
  var content = document.createTextNode(msg);
  $(message).append(content);
  $(message).addClass(cls);
  $('.app').append(message);
}

function navigate(data) {
  sessionStorage.setItem('utter', data['utterance']);
  sessionStorage.setItem('response', data['response'][1]);
  var path = window.location.pathname;
  var current_page = path.split("/").pop();
  if (data['intent'] == 'location' || data['intent'] == 'path') {
    sessionStorage.setItem('locations', JSON.stringify(data['metadata']));
    if (current_page !== 'path.html') {
      window.location.href = './path.html';
    }
  }
  else if (data['intent'] == 'request_schedule' ||
    data['intent'] == 'create_schedule' ||
    data['intent'] == 'cancel_schedule' ||
    data['intent'] == 'remind') {
    if (current_page !== 'schedule.html') {
      window.location.href = './schedule.html';
    }
  }
  else if (data['intent'] == 'request_news') {
    if (current_page !== 'news.html') {
      window.location.href = './news.html';
    }
  }
}


$(document).ready(function () {
  $('.device-safe-area').append('<div class="send-box"></div>');
  $('.send-box').append('<form class="message-area" action=""></form>');
  $('.message-area').append('<input id="message" autocomplete="off"/>');
  $('.message-area').append('<button id="submit">Send</button>');
  $('.message-area').append('<button id="reset">Reset</button>');
});


$(document).ready(
  function command() {
    $('#submit').click(function (e) {
      e.preventDefault(); // prevents page reloading
      var utter = $('#message').val() ? $('#message').val() : 'reset';
      data = JSON.stringify({
        topic: 'request_cva',
        user_id: '1',
        utterance: utter,
      });
      $.ajax({
        type: 'POST',
        url: NLP_HTTP,
        data: data,
        success: function (data) { console.log(data); },
        contentType: "application/json",
        dataType: 'json'
      });
      $('#message').val('');
      return false;
    });
  }
);

$(document).ready(
  function reset() {
    $('#reset').click(function (e) {
      data = JSON.stringify({
        topic: 'reset_cva'
      });
      $.ajax({
        type: 'POST',
        url: NLP_HTTP,
        data: data,
        success: function (data) { console.log(data); },
        contentType: "application/json",
        dataType: 'json'
      });
      $('#message').val('');
      window.location.href = './home.html'
      return false;
    });
  }
);
