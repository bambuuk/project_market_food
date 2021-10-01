import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    // Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    /** Здесь мы на каждую форму добавили ф-цию postData */
    forms.forEach(item => {
        bindPostData(item);
    });

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
        openModal('.modal', modalTimerId); // открыли само модальное окно


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
            closeModal('.modal');
        }, 4000);
    }

    fetch('http://localhost:3000/menu') // отправляем запрос на db.json
        .then(data => data.json()) /** получаем ответ 
         в data и превращаем его в обычный js объект */
        .then(res => console.log(res));

}

export default forms;