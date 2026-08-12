const homeCatalog = document.querySelector('#home-catalog');
const mainCatalog = document.querySelector('#main-catalog');
const isMobile = window.innerWidth <= 600;


/* Каталог на главной */
if (homeCatalog) {
    const tabsWrapper = homeCatalog.querySelector('.catalog__tabs');
    const tabs = tabsWrapper.querySelectorAll('.catalog__tab');
    const showAllATabsButton = homeCatalog.querySelector('.catalog__open');
    const tabRowsCount = new Set();
    const catalogGrid = document.querySelector('.catalog__grid');

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
    activateTab(tabs[0]);

    tabsWrapper.addEventListener('click', (e) => {
        const activeTab = e.target.closest('.catalog__tab');
        if (activeTab) {
            activateTab(activeTab);
        }
    })
    
    async function activateTab(tab) {
        // Переключение класса active
        if (tab.classList.contains('active')) {
            return;
        }
        tabs.forEach(tab => {
            tab.classList.remove('active');
        })
        tab.classList.add('active');

        
        const targetMark = tab.dataset.mark;

        // Заккоментировать или удалить. Пока для тренировки
        const gridContent = catalogGrid.innerHTML;
        // Заккоментировать или удалить. Пока для тренировки

        try {
            catalogGrid.innerHTML = '';
            catalogGrid.classList.add('loading');

            // Заккоментировать или удалить. Пока для тренировки
            const response = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        ok: true,
                        status: 200,
                        text() {
                            return Promise.resolve(gridContent);
                        }
                    });
                }, 1500);
            })
            // Заккоментировать или удалить. Пока для тренировки



            // Расскомментировать перед продом
            // const response = await fetch('/wp-admin/admin-ajax.php', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     },
            //     body: new URLSearchParams({
            //         action: 'load_cars',
            //         brand: targetMark
            //     })
            // });
            // Расскомментировать перед продом



            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const html = await response.text();
            catalogGrid.innerHTML = html;

        } catch (error) {
            console.error(error);
        } finally {
            catalogGrid.classList.remove('loading');
        }
    }

}


/* Каталог основной */
if (mainCatalog) {
    const catalogIcon = mainCatalog.querySelector('#filter-icon');
    const catalogFilter = mainCatalog.querySelector('#filter');


    catalogIcon.addEventListener('click', () => {
        catalogIcon.classList.toggle('active');
        catalogFilter.classList.toggle('active');
    })
}