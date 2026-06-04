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
    link.href = `${window.location.origin}/assets/css/${path}`;
    link.setAttribute('onload', "this.media='all'");
    document.head.append(link);

    setTimeout(() => {
        if (link.media !== 'all') {
            link.media = 'all';
            console.log('Follback- true');
        } 
    }, 3000);
}