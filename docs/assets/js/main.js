"use strict"
document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================
       Асинхронное подключение стилей
    ========================================== */
    
    const elementsWithLinks = document.querySelectorAll('[data-css]');
    if (elementsWithLinks.length) {
        elementsWithLinks.forEach(elem => {
            const linkPath = elem.dataset.css;
            createLink(linkPath);
        })
    }
    
    
    createLink('blocks/shared/universal.min.css');
    
    function createLink(path) {
        const link = document.createElement('link');
        link.rel = "stylesheet";
        link.media = "print";
        link.href = `${window.location.origin}/assets/css/${path}?ver=1.2`;
        link.setAttribute('onload', "this.media='all'");
        document.head.append(link);
    
        setTimeout(() => {
            if (link.media !== 'all') {
                link.media = 'all';
                console.log('Follback- true');
            } 
        }, 3000);
    }
    /* ==========================================
       Ленивая загрузка
    ========================================== */
    
    const lazyImages = document.querySelectorAll('[data-lazy]');
    
    if (lazyImages.length) {
        const triggerDistance = 500;
        
        if ('IntersectionObserver' in window) {
            // Если есть поддержка IntersectionObserver
            let options = {
                rootMargin: `0px 0px ${triggerDistance}px 0px`
            };
    
            let lazyImageObserver  = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let lazyImage = entry.target;
                        
                        if (lazyImage.tagName === 'IMG') {
                            // Если это картинка
                            lazyImage.src = lazyImage.dataset.lazy;
                            
                        } else {
                            // Если это блок с фоном
                            lazyImage.style = lazyImage.dataset.lazy;
                        }
    
                        observer.unobserve(lazyImage);
                    }
                })
            }, options)
        
            lazyImages.forEach( (image) => {
                lazyImageObserver.observe(image)
            })
        } else {
            // Если нет поддержки IntersectionObserver
            function lazyLoad() {
                lazyImages.forEach((lazyImage) => {
                    if (lazyImage.getBoundingClientRect().top <= triggerDistance + window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0 && !lazyImage.hasAttribute('lazy-loaded')) {
    
                        if (lazyImage.tagName === 'IMG') {
                            lazyImage.src = lazyImage.dataset.lazy;
                        } else {
                            lazyImage.style = lazyImage.dataset.lazy;
                        }
                        lazyImage.setAttribute('lazy-loaded', 'true');
                    }
                })
            }
            
            window.addEventListener('scroll', lazyLoad);
            lazyLoad();
        }
    }
    /* ==========================================
       Animation
    ========================================== */
    
    const animatedItems = document.querySelectorAll('.animated'),
          triggerDistance = 0;
    
    if (animatedItems.length) {
        if ('IntersectionObserver' in window) {
            // Если есть поддержка IntersectionObserver
            let options = {
                rootMargin: `0px 0px ${-triggerDistance}px 0px`
            };
    
            let animationObserver  = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let animatedItem = entry.target;
                        showAnimation(animatedItem);
                        observer.unobserve(animatedItem);
                    }
                })
            }, options);
    
            animatedItems.forEach( (animatedItem) => {
                animationObserver.observe(animatedItem)
            })
        } else {
            showAnimationRect();
            window.addEventListener('scroll', showAnimationRect)
        }
    }
    
    
    // Функция анимации c IntersectionObserver
    function showAnimation(animatedItem) {
        const delay = +animatedItem.dataset?.delay;
    
        setTimeout(() => {
            animatedItem.classList.add('showed');
        }, delay);
    }
    
    
    // Функция анимации без IntersectionObserver
    function showAnimationRect() {
        animatedItems.forEach( (animatedItem) => {
            const rect = animatedItem.getBoundingClientRect(),
                  itemOffsetTop = rect.top,
                  itemOffsetBottom = rect.bottom;
    
            if (itemOffsetTop <= window.innerHeight - triggerDistance  && itemOffsetBottom >= 0 && !animatedItem.classList.contains('showed')) {
                showAnimation(animatedItem);
                animatedItem.classList.add('showed');
            } 
        })
    }
    /* ==========================================
       основные функции
    ========================================== */
    
    function show(element, display) {
        element.style.transition = '0.3s ease all';
        element.style.display = 'none';
        element.style.opacity = '0';
        element.style.display = display || 'block';
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    };
    
    function hide(element) {
        element.style.transition = '0.3s ease all';
        element.style.opacity = '0';
    
        setTimeout(() => {
            element.style.display = 'none';
        }, 310);
    }
    /* ==========================================
       Fancybox
    ========================================== */
    const fancyItems = document.querySelectorAll('[data-fancybox]');
    
    if (fancyItems.length) {
        Fancybox.bind("[data-fancybox]", {});
    }
    /* ==========================================
       Fancy carousel
    ========================================== */
    
    const container = document.getElementById("myCarousel");
    const aboutFacts = document.querySelector("#about-facts");
    const aboutAdvantages = document.querySelector("#about-advantages");
    const aboutPortfolio = document.querySelector("#about__portfolio-carousel");
    const channels = document.querySelector("#channels");
    const carpageCarousel = document.querySelector("#carpage-carousel");
    
    const defOptions = {
      infinite: true,
      transition: "slide",
      center: false,
      Arrows: {
        prevTpl: "Налево епт",
        nextTpl: "Направо епт",
      },
      Autoplay: {
          pauseOnHover: false,
        },
        style: {
          "--f-progressbar-color": "#d70909",
          "--f-progressbar-height": "10px",
      },
      Dots: {
        dotTpl : "<button data-carousel-go-to=\"%i\" style=\"padding:5px;\">%d asd</button>",
        dynamicFrom: 3,
        dynamicPadd: 1,
      }
    };
    
    const aboutFactsOptions = {
      infinite: true,
      transition: "slide",
      center: true,
      slidesPerPage: 1,
      Autoplay: {
          pauseOnHover: false,
          showProgressbar: false,
          timeout: 3000
        }
    };
    
    const aboutAdvantagesOptions = {
      infinite: false,
      transition: "slide",
      center: false
    };
    
    const aboutPortfolioOptions = {
      infinite: false,
      transition: "slide",
      center: false,
      slidesPerPage: 1
    };
    
    const carpageCarouselOptions = {
      infinite: false,
      transition: "slide",
      center: false,
      slidesPerPage: 1,
      Thumbs: {
        type: "classic",
      }
    };
    
    
    
    container ? Carousel(container, defOptions, {Arrows, Dots, Autoplay, Autoscroll, Lazyload }).init() : '';
    
    aboutFacts ? Carousel(aboutFacts, aboutFactsOptions, { Autoplay }).init() : '';
    aboutAdvantages ? Carousel(aboutAdvantages, aboutAdvantagesOptions, { Arrows }).init() : '';
    aboutPortfolio ? Carousel(aboutPortfolio, aboutPortfolioOptions, { Arrows }).init() : '';
    channels ? Carousel(channels, aboutPortfolioOptions, { Arrows }).init() : '';
    carpageCarousel ? Carousel(carpageCarousel, carpageCarouselOptions, { Arrows, Lazyload, Thumbs }).init() : '';
    /* ==========================================
       Формы
    ========================================== */
    
    const consultationForms = document.querySelectorAll('[data-form="consultation"]'),
          phoneInputs = document.querySelectorAll('input[name="phone"]');
    
    if (consultationForms.length) {
        consultationForms.forEach(form => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                submitForm(form);
            });
        })
    }
    
    if (phoneInputs.length) {
        phoneInputs.forEach(phoneInput => {
            const maskOptions = {
                mask: '+{7} (000) 000-00-00'
            };
            IMask(phoneInput, maskOptions);
        })
    }
    
    function submitForm(form) {
        const phoneInput = form.querySelector('input[name="phone"]'),
            fakeInput = form.querySelector('input[name="site"]'),
            urlInput = form.querySelector('input[name="url"]'),
            formCheckboxes = form.querySelectorAll('.form__checkbox'),
            formSubmitButton = form.querySelector('button'),
            url = `${window.location.origin}/assets/php/telegram.php`;
    
        if (phoneInput.value.trim().length == 18 && fakeInput.value.trim() === '' && [...formCheckboxes].every(checkbox => checkbox.checked) ) {
    
            urlInput.value = window.location.href;
            formSubmitButton.disabled = true;
            const buttonDefText = formSubmitButton.textContent;
    
            let dots = 1;
            const loadingAnimation = setInterval(() => {
                formSubmitButton.textContent = 'Отправка данных' + '.'.repeat(dots);
    
                dots++;
    
                if (dots > 5) {
                    dots = 1;
                }
            }, 300);
    
            // new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //         resolve();
            //     }, 5000);
            // })
            fetch(url, {
                method: 'POST',
                body: new FormData(form)
            })
            .then(() => {
                formSubmitButton.disabled = false;
                clearInterval(loadingAnimation);
                formSubmitButton.textContent = buttonDefText;
                window.location.href = `${window.location.origin}/success.html`;
            })
            .catch(() => {
                alert('Ошибка сервера. Повторите позже');
                formSubmitButton.disabled = false;
            })
        } else {
            alert('Укажите номер телефона и отметьте галочки на обработку данных')
        }
    }
    /* ==========================================
       FAQ
    ========================================== */
    
    const faqWrapper = document.querySelector('#faq-wrapper');
    
    if (faqWrapper) {
        const faqItems = faqWrapper.querySelectorAll('.faq__item');
        faqItems.forEach((item, i) => {
            item.querySelector('.faq__num').innerHTML = (i < 9) ? `0${i + 1}` : i + 1;
        })
    
        faqWrapper.addEventListener('click', (e) => {
            const target = e.target;
        
            if (target.closest('.faq__item') && !target.closest('.faq__answer') ) {
                const faqItem = target.closest('.faq__item');
        
                if (faqItem.matches('.active')) {
                    hideAnswer(faqItem);
                } else {
                    showAnswer(faqItem);
                }
            }
        })
    
        function showAnswer(faqItem) {
            const faqAnswer = faqItem.querySelector('.faq__answer');
            faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
            faqItem.classList.add('active');
        }
    
        function hideAnswer(faqItem) {
            const faqAnswer = faqItem.querySelector('.faq__answer');
            faqItem.classList.remove('active');
            faqAnswer.style.maxHeight = 0;
        }
    }
    /* ==========================================
       Скролл на якорях
    ========================================== */
    let anchors = document.querySelectorAll('a[href^="#"]');
    
    if (anchors.length) {
        for (let anchor of anchors) {
            smoothScroll(anchor);
        }
    }
    
    function smoothScroll(link) {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            let anchorId = link.getAttribute('href');
            let block = document.querySelector(anchorId);
            window.scrollTo({
                top: block.getBoundingClientRect().top - 150 + window.scrollY,
                behavior: 'smooth'
            })
        })
    }

    const header = document.querySelector('.header');
    const burger = document.querySelector('.header__burger');
    const mobileMenu = document.querySelector('.header__mobile');
    
    if (header && burger && mobileMenu) {
        // burger
        burger.addEventListener('click', () => {
            mobileMenu.classList.contains('active') ? hide(mobileMenu) : show(mobileMenu, 'inline-flex');
            mobileMenu.classList.toggle('active');
        })
    
    
        // fixed header
        const triggerDistance = header.clientHeight + 20;
        let headerIsFixed = false;
    
        window.addEventListener('scroll', setHeader);
        setHeader();
    
        function setHeader() {
            const shouldBeFixed = window.scrollY > triggerDistance;
            
            if (shouldBeFixed !== headerIsFixed) {
                header.classList.toggle('header--fixed', shouldBeFixed);
                headerIsFixed = shouldBeFixed;
            } 
        }
    }
    const modalWrapper = document.querySelector('#modal-wrapper'),
          modals = modalWrapper.querySelectorAll('.modal');
    
    
    // Открытие модалок
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('[data-modal]')) {
            e.preventDefault();
            openModal(target);
        }
    })
    
    // Закрытие модалок
    modalWrapper.addEventListener('click', (e) => {
        const target = e.target;
        if (target.matches('#modal-wrapper') || target.matches('.modal-wrapper__inner') || target.closest('.modal__close')) {
            closeModal();
        }
    })
    
    
    function closeModal() {
        modals.forEach(modal => hide(modal));
        hide(modalWrapper);
        document.documentElement.style.overflowY = 'auto';
    }
    
    function openModal(item) {
        document.documentElement.style.overflowY = 'hidden';
        const targetModal = document.querySelector(item.closest('[data-modal]').dataset.modal);
        show(modalWrapper);
        show(targetModal);
    }
    const homeCatalog = document.querySelector('#home-catalog');
    const isMobile = window.innerWidth <= 600;
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
})