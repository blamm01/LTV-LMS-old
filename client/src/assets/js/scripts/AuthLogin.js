import {MDCRipple} from '@material/ripple';
import {MDCTextField} from '@material/textfield';
import '../../scss/Auth.scss'

const username = new MDCTextField(document.querySelector('.mdc-text-field.form__field--username'));
const password = new MDCTextField(document.querySelector('.mdc-text-field.form__field--password'));

const supportRiddle = new MDCRipple(document.querySelector('.form__button-support'));
const submitButtonRipple = new MDCRipple(document.querySelector('.form__button-submit'));

const showPasswordIcon = document.querySelector(".form__field--password__show-password")
showPasswordIcon.addEventListener("click", () => {
    const passwordInput = document.querySelector('.mdc-text-field.form__field--password input')
    if(passwordInput.type == 'password') {
        passwordInput.setAttribute("type", "text")
        showPasswordIcon.innerHTML = "visibility_off"
    }
    else {
        passwordInput.setAttribute("type", "password")
        showPasswordIcon.innerHTML = "visibility"
    }
})