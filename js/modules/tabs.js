function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Tabs
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector), // содержит блоки информации табов  
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() { // функция, которая скрывает табы (блоки инфы)

        tabsContent.forEach(item => { // скрывает информацию раздела (таба)
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => { // удаляем активный класс
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) { // функция, которая заново показывает информацию таба (раздела)
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
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

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

}

export default tabs;