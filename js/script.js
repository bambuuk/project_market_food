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

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; /* прописали стиль, 
        который не позволяет прокручивать страницу */

        clearInterval(modalTimerId); /** в случае если пользователь
        сам открыл модальное окно, мы отменяем setTimeout 
        c всплытием модального окна */
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    /** Ниже мы повесили событие на само модальное окно, 
     * при нажатии на место за пределами этого окна,
     * оно закрывается
     */
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    /** Событие нажатии кнопки в доке, при коротором
     * закрывается модальное окно
     */
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display == 'block') {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
        }
    });

    // Используем классы для карточек

    /**Создаём класс, в котором мы сохраняем инфу для построения карточек меню */
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        /**Функция, которая конвектирует доллары в грн */
        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        /**Метод, который отображает ел на странице */
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__classes';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }


            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
        
            `;
            this.parent.append(element);
        }
    }

    new MenuCard( // создаём карточку 1
        "img/tabs/vegy.jpg",
        "vegy",
        `Меню "Фитнес"`,
        `Меню "Фитнес" - это новый подход к приготовлению блюд: 
        больше свежих овощей и фруктов. Продукт активных и здоровых
         людей. Это абсолютно новый продукт с оптимальной ценой
          и высоким качеством!`,
        9,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new MenuCard( // создаём карточку 2
        "img/tabs/elite.jpg",
        "elite",
        `Меню "Премиум"`,
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, 
        но и качественное исполнение блюд. Красная рыба, морепродукты, 
        фрукты - ресторанное меню без похода в ресторан!`,
        21,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard( // создаём карточку 3
        "img/tabs/post.jpg",
        "post",
        `Меню "Постное"`,
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, 
        но и качественное исполнение блюд. Красная рыба, морепродукты, 
        фрукты - ресторанное меню без похода в ресторан!`,
        16,
        '.menu .container',
        'menu__item'
    ).render();



});