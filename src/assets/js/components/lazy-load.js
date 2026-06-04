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