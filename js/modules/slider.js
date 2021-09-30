function slider() {
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
        // return +str.replace(/\D/g, '');
            return +str.substring(0, str.length-2);     
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
            console.log(offset);
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

}

module.exports = slider;