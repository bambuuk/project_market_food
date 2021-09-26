window.addEventListener('DOMContentLoaded', () => {

    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'), // содержит блоки информации табов  
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() { // функция, которая скрывает табы (блоки инфы)

        tabsContent.forEach(item => { // скрывает информацию раздела (таба)
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => { // удаляем активный класс
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) { // функция, которая заново показывает информацию таба (раздела)
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
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

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
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
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }


    /** Ниже мы повесили событие на само модальное окно, 
     * при нажатии на место за пределами этого окна,
     * оно закрывается
     */
    modal.addEventListener('click', (e) => {

        /** Если мы кликаем на подложку ИЛИ на какой-то крестик,
         * то закрываем модальное окно
         */
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    /** Событие нажатии кнопки в доке, при коротором
     * закрывается модальное окно
     */
     document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

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
                this.classes = "menu__item";
                element.classList.add(this.classes);
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

    const getResource = async (url) => {

        // В переменной res мы получаем промис
        const res = await fetch(url);

        /** Здесь мы создаём ошибкуб если статус запроса неудачный */
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json(); // возвращаем промис в формате json
    };

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         /** в методе forEach мы используем деструктиризацию объекта */
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    axios.get('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });


    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    /** Здесь мы на каждую форму добавили ф-цию postData */
    forms.forEach(item => {
        bindPostData(item);
    });

    // Постинг данных
    const postData = async (url, data) => {

        // В переменной res мы получаем промис
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                    'Content-type': 'application/json'
                },
            body: data // data - данные, которые будут постится
        });

        return await res.json(); // возвращаем проми с формате json
    };

    /** Привязываем постинг данных */
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); /** Отменяем стандартное поведение формы */

            /** Здесь мы создаём новый ел, в который помещаем инфу
             * о статусе запроса
             */
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            

            const formData = new FormData(form); /** пишем форму, 
            которая принимает данные от пользователя и делает данные 
            в формате ключ-значение */


            /** Преобразум formData в json формат */
            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)
            .then(data => {
                    console.log(data); /** data - это те данные, 
                    которые возвращаются из промиса, которые 
                    вернул сервер */

                    showThanksModal(message.success);
                    /** Когда наш запрос успешно отработал, мы выводим 
                     * модалку-благодарку
                     */

                    statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure); /** Если запрос 
                не успешный, то выводим соответствующую модалку */
                
            }).finally(() => {
                form.reset(); // обнуляем введённые значения в формах 
            });
        });
    }

    /** Функция, которая выводит модалку благодарку */
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide'); // скрыли то, что на модалке
        openModal(); // открыли само модальное окно


        /** Создаём новую начинку модального окна */

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class='modal__content'>
                <div class='modal__close' data-close>&times;</div>
                <div class='modal__title'>${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);/**
        добавили новое содержимое модалки на страницу */

        /** Прописали функционал, который после благодарки
         * возвразает прежнее содержимое модалки
         */
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu') // отправляем запрос на db.json
        .then(data => data.json()) /** получаем ответ 
        в data и превращаем его в обычный js объект */
        .then(res => console.log(res));

    
    // Slider

    // Мой вариант слайдера

    // const sliderNext = document.querySelector('.offer__slider-next'),
    //       sliderPrev = document.querySelector('.offer__slider-prev'),
    //       curentCounter = document.querySelector('#current'),
    //       sliderImages = document.querySelectorAll('.offer__slide');


    // function renderImg() {
    //     sliderImages.forEach((item, i) => {
    //         if (i == curentCounter.textContent-1) {
    //             item.style.display = 'block';    
    //         } else {
    //             item.style.display = 'none';
    //         }
    //     });
    // }

    // renderImg();

    // const useNextSlider = () => {

    //     if (+curentCounter.textContent >= 1 && +curentCounter.textContent <= 3) {
    //         curentCounter.textContent = `0${+curentCounter.textContent + 1}`;
    //         renderImg();
    //     } else {
    //         curentCounter.textContent = '01';
    //         renderImg();
    //     }
    // };

    // const usePreviousSlider = () => {

    //     if (+curentCounter.textContent > 1 && +curentCounter.textContent <= 4) {
    //         curentCounter.textContent = `0${curentCounter.textContent - 1}`;
    //         renderImg();
    //     } else {
    //         curentCounter.textContent = '04';
    //         renderImg();
    //     }
    // };
    
    // sliderNext.addEventListener('click', () => {
    //     useNextSlider();
    // });

    // sliderPrev.addEventListener('click', () => {
    //     usePreviousSlider();
    // });




    // Первый способ создания слайдера - 61 урок

    // const slides = document.querySelectorAll('.offer__slide'),
    //     prev = document.querySelector('.offer__slider-prev'),
    //     next = document.querySelector('.offer__slider-next'),
    //     total = document.querySelector('#total'),
    //     current = document.querySelector('#current');

    // let slideIndex = 1;

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach((item) => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
        
    // }

    // function plusSlides (n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', function(){
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', function(){
    //     plusSlides(1);
    // });




    // Второй способ создания слайда

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    /**  Здесь мы выставляем ширину блока, 
    в котором расположены картинки для слайдера */
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';



    /** Ниже мы установили одинаковою ширину слайдов */
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];
    
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function dotActive() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function showActualCounte() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function moveSliderOX() {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    function deleteNotDigits(str) {
        str = +str.replace(/\D/g, '');
        return str;
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        moveSliderOX();

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        showActualCounte();

        dotActive();
    });


    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        moveSliderOX();

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        showActualCounte();

        dotActive();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            moveSliderOX();

            showActualCounte();

            dotActive();
        });
    });


    // Calc

    const result = document.querySelector('.calculating__result span');
    let sex = 'female',
        height, weight, age,
        ratio = 1.375;

    function calcTotal() {

        // Если не хватает каких-то данных от пользователя - выводим пустую строку 
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____'; // Можете придумать что угодно
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                } else {
                    sex = e.target.getAttribute('id');
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');

});