function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; /* прописали стиль, 
    который не позволяет прокручивать страницу */


    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId); /** в случае если пользователь
    сам открыл модальное окно, мы отменяем setTimeout 
    c всплытием модального окна */
    }
    
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}


function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal

    const modalTrigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });


    /** Ниже мы повесили событие на само модальное окно, 
     * при нажатии на место за пределами этого окна,
     * оно закрывается
     */
    modal.addEventListener('click', (e) => {

        /** Если мы кликаем на подложку ИЛИ на какой-то крестик,
         * то закрываем модальное окно
         */
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    /** Событие нажатии кнопки в доке, при коротором
     * закрывается модальное окно
     */
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};