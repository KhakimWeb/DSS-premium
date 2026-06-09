const homeCatalog = document.querySelector('#home-catalog');
const isMobile = window.innerWidth <= 600;
if (homeCatalog) {
    const tabsWrapper = homeCatalog.querySelector('.catalog__tabs');
    const tabs = tabsWrapper.querySelectorAll('.catalog__tab');
    const showAllATabsButton = homeCatalog.querySelector('.catalog__open');
    const tabRowsCount = new Set();

    // Скрытие табов на мобилке
    if (isMobile) {
        window.addEventListener('load', () => {
            tabs.forEach(tab => {
                tabRowsCount.add(tab.offsetTop);
            })
    
            if (tabRowsCount.size > 2) {
                tabsWrapper.classList.add('hidden');
                showAllATabsButton.style = '';
            }
    
            showAllATabsButton.addEventListener('click', () => {
                tabsWrapper.style.maxHeight = tabsWrapper.scrollHeight + 'px';
                setTimeout(() => {
                    showAllATabsButton.style.display = 'none';
                }, 100);
            })
        })
    }

    // Переключение табов
    tabs[0].classList.add('active');
}