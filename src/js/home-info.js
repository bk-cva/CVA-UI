function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time-bar').innerHTML =
    h + ":" + m + ":" + s;
    document.getElementById('time-bar').style.fontSize = "xx-large"
    var t = setTimeout(startTime, 500);
    months = ['Tháng Giêng','Tháng 2','Tháng 3','Tháng 4','Tháng 5',
             'Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10',
             'Tháng 11','Tháng Chạp'],
    days = ['Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7','Chủ Nhật'];
    document.getElementById('date-bar').innerHTML = days[today.getDay()] + ', '
                                                  + today.getDate() + ' ' + months[today.getMonth()]
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

// Get weather information
const apiKey = "4d8fb5b93d4af21d66a2948710284366";
const url = `https://api.openweathermap.org/data/2.5/weather?q=HO CHI MINH CITY&appid=${apiKey}&units=metric`;
const list = document.querySelector(".ajax-section .city");


fetch(url)
.then(response => response.json())
.then(data => {
    const { main, name, sys, weather } = data;
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
    weather[0]["icon"]
    }.svg`;

    console.log(data);

    const markup = `
    <h2 data-name="${name},${sys.country}">
        <span class="city-name">${name}</span>
        <sup>${sys.country}</sup>
    </h2>
    <div class="weather-info">
        <div class="city-temp">
            <span>${Math.round(main.temp)}</span>
            <sup>°C</sup>
        </div>
        <figure class="weather-figure">
            <img src="${icon}" alt="${
        weather[0]["description"]
        }">
            <figcaption class="weather-caption">${weather[0]["description"]}</figcaption>
        </figure>
    </div>
    `;
    list.innerHTML = markup;
    // list.appendChild(li);
})
.catch(() => {
    console.log('reach catch');
});

