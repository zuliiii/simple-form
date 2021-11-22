const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmpasswordEl = document.querySelector('#confirm-password');

const form = document.querySelector('#signup');


const isEmailValid = (email) => {

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
}

const isRequired = value => value === '' ? false : true;

const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {

    const formField = input.parentElement;

    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;

}



const showSuccess = (input) => {

    const formField = input.parentElement;

    formField.classList.add('succes');
    formField.classList.remove('error');


    const error = formField.querySelector('small');
    error.textContent = '';


}

const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 20;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username bos qoyula bilmez.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username uzunlugu ${min} ile ${max} arasinda olmalidir`);
    } else {
        showSuccess(usernameEl);
        valid = true;
    }

    return valid;

}

const checkEmail = () => {

    let valid = false;

    const email = emailEl.value.trim();

    if (!isRequired(email)) {
        showError(emailEl, 'Email bos qoyula bilmez.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, "Email dogru deyil");
    } else {
        showSuccess(emailEl);
        valid = true;
    }

    return valid;

}


const checkPassword = () => {

    let valid = false;

    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Parol bos qoyula bilmez.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, "Parolun uzunlugu en azi 8 olmalidir");
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;

}

const checkConfirmedPassword = () => {

    let valid = false;

    const confirmPassword = confirmpasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmpasswordEl, 'Parolu yeniden yazin.');
    } else if (password !== confirmPassword) {
        showError(confirmpasswordEl, "Parolunuz evvelki ile eyni deyil");
    } else {
        showSuccess(confirmpasswordEl);
        valid = true;
    }

    return valid;

}

form.addEventListener('submit', function (e) {

    e.preventDefault();

    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPsswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmedPassword();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPsswordValid &&
        isConfirmPasswordValid;

    if (isFormValid) {
        console.log("ela")
    }
})

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmedPassword();
            break;
    }
}));