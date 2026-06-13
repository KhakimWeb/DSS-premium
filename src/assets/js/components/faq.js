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