/* ==========================================
   Fancybox
========================================== */
const fancyItems = document.querySelectorAll('[data-fancybox]');

if (fancyItems.length) {
    Fancybox.bind("[data-fancybox]", {});
}