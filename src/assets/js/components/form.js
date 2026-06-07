/* ==========================================
   Формы
========================================== */

const consultationForms = document.querySelectorAll('[data-form="consultation"]'),
      phoneInputs = document.querySelectorAll('input[name="phone"]');

if (consultationForms.length) {
    consultationForms.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            submitForm(form);
        });
    })
}

if (phoneInputs.length) {
    phoneInputs.forEach(phoneInput => {
        const maskOptions = {
            mask: '+{7} (000) 000-00-00'
        };
        IMask(phoneInput, maskOptions);
    })
}

function submitForm(form) {
    const phoneInput = form.querySelector('input[name="phone"]'),
        fakeInput = form.querySelector('input[name="site"]'),
        urlInput = form.querySelector('input[name="url"]'),
        formCheckboxes = form.querySelectorAll('.form__checkbox'),
        formSubmitButton = form.querySelector('button'),
        formSubmitButtonText = formSubmitButton.querySelector('.button__text'),
        url = `${window.location.origin}/assets/php/telegram.php`;

    if (phoneInput.value.trim().length == 18 && fakeInput.value.trim() === '' && [...formCheckboxes].every(checkbox => checkbox.checked) ) {

        urlInput.value = window.location.href;
        formSubmitButton.disabled = true;
        const buttonDefText = formSubmitButtonText.textContent;

        let dots = 1;
        const loadingAnimation = setInterval(() => {
            formSubmitButtonText.textContent = 'Отправка данных' + '.'.repeat(dots);

            dots++;

            if (dots > 5) {
                dots = 1;
            }
        }, 300);

        // new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve();
        //     }, 5000);
        // })
        fetch(url, {
            method: 'POST',
            body: new FormData(form)
        })
        .then(() => {
            formSubmitButton.disabled = false;
            clearInterval(loadingAnimation);
            formSubmitButtonText.textContent = buttonDefText;
            window.location.href = `${window.location.origin}/success.html`;
        })
        .catch(() => {
            alert('Ошибка сервера. Повторите позже');
            formSubmitButton.disabled = false;
        })
    } else {
        alert('Укажите номер телефона и отметьте галочки на обработку данных')
    }
}