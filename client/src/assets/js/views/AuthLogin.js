import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("LTV LMS - Đăng nhập");
        this.scripts = [
            `/assets/dist/scripts/AuthLogin.js`
        ]
    }

    async getHtml() {
        return `
        <form class="login-form">
        <img class="form__icon" src="/assets/imgs/logo.ico" alt="">
        <div class="form__inputs">
            <label class="mdc-text-field mdc-text-field--outlined form__field form__field--username">
                <span class="mdc-notched-outline">
                    <span class="mdc-notched-outline__leading"></span>
                    <span class="mdc-notched-outline__notch">
                        <span class="mdc-floating-label" id="username">Tài khoản</span>
                    </span>
                    <span class="mdc-notched-outline__trailing"></span>
                </span>
                <input type="text" class="mdc-text-field__input" aria-labelledby="username" required>
            </label>
            <label class="mdc-text-field mdc-text-field--outlined form__field form__field--password">
                <span class="mdc-notched-outline">
                    <span class="mdc-notched-outline__leading"></span>
                    <span class="mdc-notched-outline__notch">
                        <span class="mdc-floating-label" id="password">Mật khẩu</span>
                    </span>
                    <span class="mdc-notched-outline__trailing"></span>
                </span>
                <input type="password" class="mdc-text-field__input" aria-labelledby="password" required>
                <span class="form__field--password__show-password material-icons mdc-text-field__icon mdc-text-field__icon--leading" tabindex="0"
                    role="button">visibility</span>
            </label>
        </div>
        <div class="form__button-container form__button-container--left">
            <button type="button" class="form__button-support mdc-button mdc-button-default mdc-button--leading" type="submit">
                <span class="mdc-button__ripple"></span>
                <span class="mdc-button__label">Trợ giúp</span>
            </button>
        </div>
        <div class="form__button-container form__button-container--right">
            <button class="form__button-submit mdc-button mdc-button--raised mdc-button--leading" type="submit">
                <span class="mdc-button__ripple"></span>
                <span class="mdc-button__label">Đăng nhập</span>
            </button>
        </div>
    </form>
        `;
    }
}