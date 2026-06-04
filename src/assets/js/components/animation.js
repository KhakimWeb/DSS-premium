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