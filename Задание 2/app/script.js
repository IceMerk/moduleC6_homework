//Ищем элементы
const button = document.querySelector('.button')
const textWindow = document.querySelector('.text-window')

function writeWindow() {
    //Без скрола
    alert(`Ширина экрана ${document.documentElement.clientWidth}, Высота экрана ${document.documentElement.clientHeight}`)

    //Со скролом
    //alert(`Ширина экрана ${window.innerWidth}, Высота экрана ${window.innerHeight}`)

    //Размеры монитора
    //alert(`Ширина экрана ${window.screen.width}, Высота экрана ${window.screen.height}`)
}

//Событие
button.addEventListener('click', writeWindow)

