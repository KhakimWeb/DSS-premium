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