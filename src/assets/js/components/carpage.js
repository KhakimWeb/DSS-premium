const tabsWrapper = document.querySelector('#steps');

if (tabsWrapper) {
    const tabs = tabsWrapper.querySelectorAll('.modal__tab');
    const tabsContents = tabsWrapper.querySelectorAll('.modal__content');

    // Расстановка цифр
    setNums(tabs, '.modal__tab-num');
    setNums(tabsContents, '.modal__content-num');
    function setNums(elements, className) {
        elements.forEach((element, i) => {
            element.querySelector(className).textContent = (i < 9 ? '0' : '' ) + (i + 1);
        })
    }

    // Обработчик
    tabs[0].classList.add('active');
    tabsContents[0].classList.add('active');

    tabsWrapper.addEventListener('click', (event) => {
        const target = event.target;

        if (target.closest('.modal__tab')) {
            const currentTab = target.closest('.modal__tab');
            if (currentTab.classList.contains('active')) return ;

            tabs.forEach( (tab, i) => {
                if (currentTab == tab) {
                    currentTab.classList.add('active');
                    showTabsContent(i);
                } else {
                    tab.classList.remove('active');
                }

            })
        }
    })

    function showTabsContent(i) {
        tabsContents.forEach(tabsContent => {
            tabsContent.classList.remove('active');
        });
        tabsContents[i].classList.add('active');
    }
}