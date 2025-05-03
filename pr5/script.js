// Отримання елементів форми
const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const phone = document.getElementById('phone');
const birthdate = document.getElementById('birthdate');
const terms = document.getElementById('terms');
const successMessage = document.getElementById('formSuccess');

// Функція відображення помилки
function showError(input, message) {
    const errorElement = document.getElementById(input.id + 'Error');
    errorElement.textContent = message;
    input.classList.add('invalid');
}

// Функція очищення помилки
function clearError(input) {
    const errorElement = document.getElementById(input.id + 'Error');
    errorElement.textContent = '';
    input.classList.remove('invalid');
}

// Валідація імені користувача
function validateUsername() {
    let valid = true;
    
    if (username.value.trim() === '') {
        showError(username, "Ім'я користувача обов'язкове");
        valid = false;
    } else if (username.value.length < 3) {
        showError(username, "Ім'я користувача має бути не менше 3 символів");
        valid = false;
    } else {
        clearError(username);
    }
    
    return valid;
}

// Валідація email
function validateEmail() {
    let valid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email.value.trim() === '') {
        showError(email, 'Email обов\'язковий');
        valid = false;
    } else if (!emailPattern.test(email.value)) {
        showError(email, 'Введіть коректний email');
        valid = false;
    } else {
        clearError(email);
    }
    
    return valid;
}

// Валідація пароля
function validatePassword() {
    let valid = true;
    const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    
    if (password.value === '') {
        showError(password, 'Пароль обов\'язковий');
        valid = false;
    } else if (!passwordPattern.test(password.value)) {
        showError(password, 'Пароль має містити мінімум 8 символів, включаючи цифру та велику літеру');
        valid = false;
    } else {
        clearError(password);
    }
    
    return valid;
}

// Перевірка співпадіння паролів
function validateConfirmPassword() {
    let valid = true;
    
    if (confirmPassword.value === '') {
        showError(confirmPassword, 'Підтвердження пароля обов\'язкове');
        valid = false;
    } else if (confirmPassword.value !== password.value) {
        showError(confirmPassword, 'Паролі не співпадають');
        valid = false;
    } else {
        clearError(confirmPassword);
    }
    
    return valid;
}

// Валідація телефону
function validatePhone() {
    let valid = true;
    const phonePattern = /^\+380\d{9}$/;
    
    if (phone.value.trim() === '') {
        showError(phone, 'Телефон обов\'язковий');
        valid = false;
    } else if (!phonePattern.test(phone.value)) {
        showError(phone, 'Введіть коректний номер телефону у форматі +380XXXXXXXXX');
        valid = false;
    } else {
        clearError(phone);
    }
    
    return valid;
}

// Валідація дати народження
function validateBirthdate() {
    let valid = true;
    
    if (birthdate.value === '') {
        showError(birthdate, 'Дата народження обов\'язкова');
        valid = false;
    } else {
        const today = new Date();
        const birthDate = new Date(birthdate.value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        if (age < 18) {
            showError(birthdate, 'Вам має бути не менше 18 років');
            valid = false;
        } else {
            clearError(birthdate);
        }
    }
    
    return valid;
}

// Валідація згоди з умовами
function validateTerms() {
    let valid = true;
    
    if (!terms.checked) {
        showError(terms, 'Ви маєте погодитися з умовами користування');
        valid = false;
    } else {
        clearError(terms);
    }
    
    return valid;
}

// Функція валідації всієї форми
function validateForm() {
    let isUsernameValid = validateUsername();
    let isEmailValid = validateEmail();
    let isPasswordValid = validatePassword();
    let isConfirmPasswordValid = validateConfirmPassword();
    let isPhoneValid = validatePhone();
    let isBirthdateValid = validateBirthdate();
    let isTermsValid = validateTerms();
    
    return isUsernameValid && isEmailValid && isPasswordValid && 
           isConfirmPasswordValid && isPhoneValid && isBirthdateValid && isTermsValid;
}

// Обробник події відправки форми
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        successMessage.style.display = 'block';
        form.reset();
        
        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 3000);
    }
});

// Додавання слухачів подій для валідації при введенні
username.addEventListener('blur', validateUsername);
email.addEventListener('blur', validateEmail);
password.addEventListener('blur', validatePassword);
confirmPassword.addEventListener('blur', validateConfirmPassword);
phone.addEventListener('blur', validatePhone);
birthdate.addEventListener('blur', validateBirthdate);
terms.addEventListener('change', validateTerms); 