const header = document.querySelector('.header');
const burger = document.querySelector('.header__burger');
const mobileMenu = document.querySelector('.header__mobile');

// burger
if (burger) {
    burger.addEventListener('click', () => {
        mobileMenu.classList.contains('active') ? hide(mobileMenu) : show(mobileMenu, 'inline-flex');
        mobileMenu.classList.toggle('active');
    })
}