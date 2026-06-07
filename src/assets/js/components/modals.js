/* const modalWrapper = document.querySelector('#modal-wrapper'),
      modals = modalWrapper.querySelectorAll('.modal'),
      callModalBtn = document.querySelectorAll('[data-modal]');


// Открытие модалок
document.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('[data-modal]')) {
        e.preventDefault();

        if (target.dataset.modal === '#service-modal') {
            const serviceName = target.closest('.services__card').querySelector('.service__name').textContent;
            document.querySelector('#current-service').textContent = serviceName;
        }

        openModal(target);
    }
})

// Закрытие модалок
modalWrapper.addEventListener('click', (e) => {
    const target = e.target;

    if (target.matches('#modal-wrapper') || target.closest('.modal__close')) {
        closeModal()
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
    show(modalWrapper, 'flex');
    show(targetModal);
} */