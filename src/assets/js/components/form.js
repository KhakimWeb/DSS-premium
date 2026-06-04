/* ==========================================
   Формы
========================================== */

const consultationForms = document.querySelectorAll('[data-element="consultation-form"]'),
      maskedInputs = document.querySelectorAll('input[name="phone"]');

if (consultationForms.length) {
    consultationForms.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            submitForm(form);
        });
    })
}

if (maskedInputs.length) {
    maskedInputs.forEach(maskedInput => {
        maskedInput.addEventListener('focus', (event) => {
            maskInput(event)
        });

        maskedInput.addEventListener('input', (event) => {
            maskInput(event)
        });
    })
}

function submitForm(form) {
    const phoneInput = form.querySelector('input[name="phone"]'),
        fakeInput = form.querySelector('input[name="site"]'),
        urlInput = form.querySelector('input[name="url"]'),
        formCheckbox = form.querySelector('.form__checkbox'),
        formSubmitButton = form.querySelector('button'),
        buttonTextDiv = formSubmitButton.querySelector('div'),
        buttonSpinner = formSubmitButton.querySelector('img');

    if (phoneInput.value.trim().length == 18 && fakeInput.value.trim() === '' && formCheckbox.checked ) {

        const url = `${window.location.origin}/wp-content/themes/theme-name/assets/php/telegram.php`;
        const buttonText = buttonTextDiv.textContent;

        buttonTextDiv.textContent = 'Отправка данных...';
        show(buttonSpinner);

        urlInput.value = window.location.href;
        formSubmitButton.disabled = true;
        formSubmitButton.style.backgroundColor = '#4a4a4a';

        fetch(url, {
            method: 'POST',
            body: new FormData(form)
        })
        .then(() => {
            formSubmitButton.disabled = false;
            formSubmitButton.style.backgroundColor = '';
            buttonTextDiv.textContent = buttonText;
            hide(buttonSpinner);

            window.location.href = `${window.location.origin}/success/`;
        })

        .catch(() => {
            alert('Ошибка сервера. Повторите позже');
                formSubmitButton.disabled = false;
                formSubmitButton.style.backgroundColor = '';
                formSubmitButton.value = formSubmitButton.value ? buttonText : '';
                formSubmitButton.textContent = formSubmitButton.textContent ? buttonText : '';
        })
    } else {
        alert('Укажите номер телефона и согласитесь с политикой обработки данных')
    }
}

function maskInput(event) {
    let input = event.target.value.replace(/\D/g, ''); // Удаление всех нецифровых символов

    // Обрабатываем форматирование
    let formattedNumber = '+7';
    
    if (input.length > 1) {
      formattedNumber += ' (' + input.slice(1, 4); // Код города
    }
    if (input.length >= 4) {
      formattedNumber += ') ' + input.slice(4, 7); // Первая часть номера
    }
    if (input.length >= 7) {
      formattedNumber += '-' + input.slice(7, 9); // Вторая часть номера
    }
    if (input.length >= 9) {
      formattedNumber += '-' + input.slice(9, 11); // Третья часть номера
    }
  
    event.target.value = formattedNumber;
}