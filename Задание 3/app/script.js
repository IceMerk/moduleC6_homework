//Выбираем элементы
const inputIn = document.querySelector('.input-text') //Поле ввода
const buttonSend = document.querySelector('.send') //Кнопка отправить
const buttonGeo = document.querySelector('.geo') //Кнопка Гео
const chat = document.querySelector('.chat') //Поле Чата
const statys = document.querySelector('.statys') //Поле статуса

//Запускаем websocket
const websocket = new WebSocket('wss://ws.postman-echo.com/raw')

websocket.onopen = evt => { sendStatus('Соединение открыто', 'green') }

websocket.onclose = evt => { sendStatus('Соединение закрыто', 'grey') }

websocket.onmessage = evt => { sendChat(evt.data, 'server') }

websocket.onerror = evt => { sendStatus('Ошибка соединения', 'red') }


//Функция вывода сообений на экран
function sendChat(text, token) {

    divText = `<div class="${token}">
    <div class="text">${text}</div>
    </div>`

    chat.insertAdjacentHTML('beforeend', divText)

    inputIn.value = ''
}

//Функция вывода статуса на экран
function sendStatus(text, color) {
    statysText = `<span class='statys-text' style="background-color: ${color};">${text}</span>`
    statys.innerHTML = statysText
}

//Функия вывода Гео-позиции
function sendGeo() {
    if (!navigator.geolocation) { sendChat('Ваш браузер не поддерживает Гео-локацию', 'server') }

    //Если есть доступ к гео, запрашиваем доступ
    else { navigator.geolocation.getCurrentPosition(trueGeo, falseGeo) }
}

//Если пользователь не дал доступ
const falseGeo = () => { sendChat('Невозможно получить местоположение', 'server') }

//Если пользователь дал доспуп, отправляем данные
const trueGeo = (position) => {
    latitude = position.coords.latitude
    longitude = position.coords.longitude

    map_url = `https://www.openstreetmap.org/#map=15/${latitude}/${longitude}`

    div_map = `<a href="${map_url}" target="_blank">Гео-локация</a>`
    text_map = `Долгота: ${latitude} | Широта: ${longitude}`

    sendChat(div_map, 'user')
    sendChat(text_map, 'server')

}

//Собитие на кнопку "Отправить"
buttonSend.addEventListener('click', () => {
    websocket.send(inputIn.value)
    sendChat(inputIn.value, 'user')
});

//Событие на клавишу "Enter"
inputIn.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        websocket.send(inputIn.value)
        sendChat(inputIn.value, 'user')
    }
})

//Событие отправки Гео-позиции
buttonGeo.onclick = sendGeo


