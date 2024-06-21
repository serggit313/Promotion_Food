document.addEventListener('DOMContentLoaded', function() {
    'use strict'


// Табы

    // Получили элементы в разметке
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    // Создали функцию скрытия контента элементов таба
    function hideTabsContent()
    {
        // Скрыли контент табов
        tabsContent.forEach(function(item){
            item.classList.add('dn');
            item.classList.remove('fade');
        })

         // Убрали класс active у таба
        tabs.forEach(function(item){
            item.classList.remove('tabheader__item_active');
        })
    }

    // Создали функцию отрисовки конкретного таба
    function showTabContent(i)
    {
        hideTabsContent();

        // Сделали нужный контент таба видимым
        tabsContent[i].classList.toggle('dn');

        // Добавили анимацию при переключении таба
        tabsContent[i].classList.add('fade');

        // Добавили нужному табу класс active
        tabs[i].classList.add('tabheader__item_active');
    }

    showTabContent(0);


    // Вешаем событие клика на родителя
    tabsParent.addEventListener('click', function(e){
        // Если есть таргет и есть класс tabheader__item, то переключаем таб
        if(e.target && e.target.classList.contains('tabheader__item'))
        {
            tabs.forEach(function(item, i){
                if(e.target == item)
                {
                    showTabContent(i);
                }
            })
        }
    })


// Конeц табов









    


// Таймер
    let endTime = '2024-09-01';
    let timer = document.querySelector('.timer');


    // Функция, которая получает дни, часы, минуты, секунды, которые остались до конечной даты
    function getTime(endTime)
    {
        // Получили милисекунды до конечной даты
        let interval = new Date(endTime) - new Date();

        // Получили дни, сколько осталось до конечной даты
        let days = Math.floor(interval / (1000 * 60 * 60 * 24));

        // Получили часы, сколько осталось до конечной даты
        let hours = Math.floor(interval / (1000 * 60 * 60) % 24);

        // Получили минуты, сколько осталось до конечной даты
        let minutes = Math.floor(interval / (1000 * 60) % 60);

        // Получили секунды, сколько осталось до конечной даты
        let seconds = Math.floor(interval / (1000) % 60);

        return {
            'interval': interval,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }       
    }


    // Функция, которая отрисовывает время в разметке
    function setTime(endTime)
    {
        // Получили дни в разметке
        let days = document.querySelector('#days');

        // Получили часы в разметке
        let hours = document.querySelector('#hours');

        // Получили минуты в разметке
        let minutes = document.querySelector('#minutes');

        // Получили секунды в разметке
        let seconds = document.querySelector('#seconds');

        let setTimeInterval = setInterval(updateTime, 1000);

        // Функция, которая обновляет время в разметке, каждую секунду
        function updateTime()
        {
            // Получили время из функции getTime
            let timeOfTimer = getTime(endTime);

            // Записали данные из объекта в функции getTime
            days.innerHTML = convertNumber(timeOfTimer.days);
            hours.innerHTML = convertNumber(timeOfTimer.hours);
            minutes.innerHTML = convertNumber(timeOfTimer.minutes);
            seconds.innerHTML = convertNumber(timeOfTimer.seconds);

            // Добавляем анимацию
            // days.classList.add('fade');
            // hours.classList.add('fade');
            // minutes.classList.add('fade');
            seconds.classList.add('fade');

            // Удаляем анимацию через каждую секунду для повтора анимации
            setTimeout(function() {
                days.classList.remove('fade');
                hours.classList.remove('fade');
                minutes.classList.remove('fade');
                seconds.classList.remove('fade');
            }, 100);

            // Останавливаем таймер
            if (timeOfTimer.interval <= 0)
            {
                days.innerHTML = '00';
                hours.innerHTML = '00';
                minutes.innerHTML = '00';
                seconds.innerHTML = '00'; 
            }
        }

        updateTime();

    }

    setTime(endTime);



    // Функция, которая будет преобразовывать числа от 0 до 9 к виду 00-09
    function convertNumber(number)
    {
        if (number >= 0 && number < 10)
        {
            return `0${number}`;
        }
        else
        {
            return number;
        }
    }


// Конец таймера 





// Модальное окно начало

    // Получаем кнопки открытия модального окна 
    let btns_open_modal = document.querySelectorAll('.open_btn_modal');

    // Получаем кнопку закрытия модального окна
    let btn_close_modal = document.querySelector('.modal__close');

    // Получаем модальное окно
    let modalWindow = document.querySelector('.modal');

    // Получили тэг body
    let body = document.querySelector('body');

    // Функция, которая открывает модальную форму
    function openModalWindow()
    {
        modalWindow.style.display = 'block';
        body.style.overflow = 'hidden';
    }

    // Функция, которая закрывает модальную форму
    function closeModalWindow()
    {
        modalWindow.style.display = 'none';
        body.style.overflow = 'visible';
    }

    // Перебрали кнопку вызова модальной формы
    btns_open_modal.forEach(function (item) {
        // Прописали событие на кнопки вызова
        item.addEventListener('click', openModalWindow);
    });
      
    // Прописали событие на кнопку закрытия
    btn_close_modal.addEventListener('click', closeModalWindow);

    // Прописали событие нажатия на overlay, при котором будет закрываться модальная форма
    modalWindow.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal') || e.target.classList.contains('modal__close')) {
            closeModalWindow();
        }
    });


    // Повесили событие при нажатии на клавишу esc
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModalWindow();
        }
        
    });



    document.addEventListener('scroll', function() {
        let scrollTop = document.documentElement.scrollTop;
        let scrollHeightPage = document.documentElement.scrollHeight;
        let clientHeight = document.documentElement.clientHeight;


       
        if (scrollTop + clientHeight >= scrollHeightPage) 
        {
            // console.log('scrollTop', scrollTop);
            // console.log('clientHeight', clientHeight);
            // console.log('scrollHeightPage', scrollHeightPage);
            // console.log('summ', scrollTop + clientHeight);
            openModalWindow();            
        }
    });
// Модальное окно конец





// Счётчик скролла

    function countScroll()
    {
        document.documentElement.scrollTop = 0;

        document.addEventListener('scroll', function() {
            let scrollTop = document.documentElement.scrollTop;
            let scrollHeightPage = document.documentElement.scrollHeight;
            let clientHeight = document.documentElement.clientHeight;
            let countHeight = document.querySelector('.countHeight');
        
            let count = Math.floor(((scrollTop + clientHeight) / scrollHeightPage) * 100);
        
            countHeight.textContent = count + '%';
        
            console.log('count', count);
            console.log('countHeight', countHeight);
            console.log('scrollTop', scrollTop);
            console.log('scrollHeightPage', scrollHeightPage);
            console.log('clientHeight', clientHeight);
        });
    }


    countScroll();

// Счётчик скролла конец





// Кнопка наверх

    // let upKey = document.querySelector('.upKey');
    

    // document.addEventListener('scroll', function() {
    //     let clientHeight = document.documentElement.clientHeight;
    //     let scrollTop = document.documentElement.scrollTop;

    //     if(scrollTop > clientHeight)
    //     {
    //         upKey.style.display = 'flex';
    //         upKey.addEventListener('click', function(){
    //             window.scrollTo(0, 0);
    //         });
    //     }
    //     else
    //     {
    //         upKey.style.display = 'none';
    //     }
    // });

// Кнопка наверх конец
});











