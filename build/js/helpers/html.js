class Html {
    constructor() {

    }

    get(selector) {
        return document.querySelector(selector);
    }

    inner(selector, content, clear) {
        if (clear === "clear") this.get(selector).innerHTML = content;
        this.get(selector).innerHTML += content;
    }
}

export const hm = new Html();