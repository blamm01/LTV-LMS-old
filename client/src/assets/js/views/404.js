import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("LTV LMS - Không tìm thấy trang");
    }

    async getHtml() {
        return `
        404
        `;
    }
}