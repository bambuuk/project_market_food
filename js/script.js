window.addEventListener('DOMContentLoaded', () => {

    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'), // содержит блоки информации табов  
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() { // функция, которая скрывает табы (блоки инфы)

        tabsContent.forEach(item => { // скрывает информацию раздела (таба)
            item.style.display = 'none';
        });

        tabs.forEach(item => { // удаляем активный класс
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) { // функция, которая заново показывает информацию таба (раздела)
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    /*
    ниже делаем делегирование события, которое по 
    условию смотрит есть ли полученный объект данных и 
    имеет ли он класс tabheader__item (неактивного раздела),
    если да, то он сравнивает
    полученный объект с объектами из tabs (то есть, 
    сравнивает название роздела, на которое нажал юзер, с 
    названиями разделов tabs) Если есть совпадение, то запускаются
    функции скрытия разделов и отображения необходимого раздела)
    */
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer


    const ded = new Date();
    ded.setDate(ded.getDate() + 1); // здесь создал переменную с ткущей датой +1 день
    const deadline = ded;

    /*Это функция, которая возвращает инфыу о том, сколько
    времени осталось до конца дедлайна */
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()); 
        // t - здесь прописано сколько осталось времени до конца дедлайна в миллисекундах
        const days = Math.floor(t / (1000 * 60 * 60 * 24 /*сколько в сутках миллисекунд*/)),
            /** В переменной days мы написали сколько остаётся дней
             * до конца акции. endtime - это наш дедлайн
             */
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) { // функция, которая доставляет 0 к дням и часам, если те <10
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // Функция setClock, которая будет отображать время на странице
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateCLock, 1000);

        updateCLock();

        function updateCLock() { // функция, которая будет обновлять время каждую сек
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }


    setClock('.timer', deadline);


});