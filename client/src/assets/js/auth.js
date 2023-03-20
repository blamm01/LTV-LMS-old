import {MDCRipple} from '@material/ripple';
import {MDCTextField} from '@material/textfield';

const username = new MDCTextField(document.querySelector('.mdc-text-field.form__field--username'));
const password = new MDCTextField(document.querySelector('.mdc-text-field.form__field--password'));

const forgotPasswordRipple = new MDCRipple(document.querySelector('.form__button-forgot-pass'));
const submitButtonRipple = new MDCRipple(document.querySelector('.form__button-submit'));

const showPasswordIcon = document.querySelector(".form__field--password__show-password")
showPasswordIcon.addEventListener("click", () => {
    const passwordInput = document.querySelector('.mdc-text-field.form__field--password input')
    if(passwordInput.type == 'password')
        passwordInput.setAttribute("type", "text")
    else passwordInput.setAttribute("type", "password")
})