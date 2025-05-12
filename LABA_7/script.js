const next = document.getElementById('next');
const prev = document.getElementById('prev');

const step1 = document.getElementById('step_1');
const step2 = document.getElementById('step_2');
const step3 = document.getElementById('step_3');

const regForm = document.forms[0];
let countStep = 1;

// Инициализация - скрываем все шаги кроме первого
updateContext();

function updateContext() {
    step1.style.display = countStep === 1 ? 'flex' : 'none';
    step2.style.display = countStep === 2 ? 'flex' : 'none';
    step3.style.display = countStep === 3 ? 'flex' : 'none';
    
    // Настройка видимости кнопок
    if(countStep === 1) {
        prev.classList.remove('visible');
    } else {
        prev.classList.add('visible');
    }

    next.textContent = countStep === 3 ? 'Отправить' : 'Далее';
}

next.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(countStep == 1){
        if(validEmail()) {
            countStep++;
            updateContext();
        }
    } else if (countStep == 2){
        if(validLogin()) {
            countStep++;
            updateContext();
        }
    } else {
        if(validMessage()) {
            sendMessage();
        }
    }
});

prev.addEventListener('click', (e) => {
    e.preventDefault();
    countStep--;
    updateContext();
});

function validEmail() {
    const emailField = regForm.email;
    const emailVal = emailField.value.trim();
    const error = document.querySelector('[name="emailError"]');

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) { 
        error.style.display = 'block';
        error.textContent = 'Введите корректный email адрес';
        return false;
    } else {
        error.style.display = 'none';
        return true;
    }
}

function validLogin() {
    const loginField = regForm.login;
    const loginVal = loginField.value.trim();
    const error = document.getElementById('loginError');

    if(loginVal.length < 3) {
        error.style.display = 'block';
        error.textContent = 'Имя должно содержать минимум 3 символа';
        return false;
    } else if(!/^[a-zA-Zа-яА-Я]+$/.test(loginVal)) {
        error.style.display = 'block';
        error.textContent = 'Имя может содержать только буквы';
        return false;
    } else {
        error.style.display = 'none';
        return true;
    }
}

function validMessage() {
    const messageField = regForm.message;
    const messageVal = messageField.value.trim();
    const error = document.getElementById('messageError');

    if(messageVal.length < 10) {
        error.style.display = 'block';
        error.textContent = 'Сообщение должно содержать минимум 10 символов';
        return false;
    } else {
        error.style.display = 'none';
        return true;
    }
}

function sendMessage() {
    // Здесь можно добавить отправку формы на сервер
    const isConfirmed = confirm('Вы точно хотите отправить форму?');
    
    if (isConfirmed) {
        // Здесь можно добавить реальную отправку формы на сервер

        regForm.reset();
        countStep = 1;
        updateContext();

    }
}
