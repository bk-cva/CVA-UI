const NLP_WS = 'ws://118.69.144.206:5050/';
const NLP_HTTP = 'http://118.69.144.206:5050/cva';
const HERE_API_KEY = 'gOTlDv3usI61h9jQhUdcp8E9Yo8u9Ww1AFZ3fBmx0oE';
const MY_LOCATION = [10.760338,106.6613418];

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
  else if (data['intent'] == 'music') {
    if (current_page !== 'player.html') {
      window.location.href = './player.html';
    }
  }
  else if (data['intent'] == 'control_aircon' ||
    data['intent'] == 'control_radio' ||
    data['intent'] == 'control_door' ||
    data['intent'] == 'control_window') {
      if (current_page !== 'command.html') {
        window.location.href = './command.html';
      }
    }
}

function getLocationsviewUrl(locations) {
  mapview_url = 'https://image.maps.ls.hereapi.com/mia/1.6/mapview';
  list_location = '';
  for (add of locations) {
    resp = appendMessage(add['address'], 'reply cva-reply');
    list_location = list_location +
      add['latitude'] +
      ',' + add['longitude'] + ',';
  }
  list_location = list_location.replace(/(,$)/g, '');
  full_mapview_url = `${mapview_url}?poi=${list_location}&apiKey=${HERE_API_KEY}`
  return full_mapview_url;
}

function getRoutingviewUrl(location) {
  routing_url = 'https://image.maps.ls.hereapi.com/mia/1.6/routing' +
                      `?apiKey=${HERE_API_KEY}` +
                      `&waypoint0=${MY_LOCATION[0]},${MY_LOCATION[1]}` +
                      `&waypoint1=${location[0]['latitude']},${location[0]['longitude']}` +
                      `&poix0=${MY_LOCATION[0]},${MY_LOCATION[1]};00a3f2;00a3f2;11;.` +
                      `&poix1=${location[0]['latitude']},${location[0]['longitude']};white;white;11;.` +
                      '&lc=1652B4' +
                      '&lw=6' +
                      '&t=0' +
                      '&ppi=320' +
                      '&w=400' +
                      '&h=600';
    return routing_url;
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
        success: function (data) { console.log('Submit success!'); },
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
        success: function (data) { console.log('Reset success'); },
        contentType: "application/json",
        dataType: 'json'
      });
      $('#message').val('');
      window.location.href = './home.html'
      return false;
    });
  }
);
