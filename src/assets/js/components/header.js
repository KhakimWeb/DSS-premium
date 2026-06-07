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