export default class {
    constructor(params) {
        this.params = params;
    }

    setTitle(title) {
        document.title = title;
    }

    getScripts() {
        return this.scripts
    }

    async getHtml() {
        return "";
    }
}