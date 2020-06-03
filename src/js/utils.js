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
            data['intent'] == 'cancel_schedule') {
        if (current_page !== 'schedule.html') {
            window.location.href = './schedule.html';
        }
    }
    else if (data['intent'] =='request_news') {
        if (current_page !== 'news.html') {
            window.location.href = './news.html';
        }
    }
}
