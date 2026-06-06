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