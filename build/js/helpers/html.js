class Html {
    constructor() {

    }

    get(selector) {
        return document.querySelector(selector);
    }

    inner(selector, content, clear) {
        if (clear === "clear") {
            this.get(selector).innerHTML = content
            return
        };
        this.get(selector).innerHTML += content;
    }

    append(selector, content) {
        document.querySelector(selector).appendChild(content);
    }
    
    create(tag, content) {
        const el = document.createElement(tag);
        el.innerHTML = content;
        return el;
    }
}

export const hm = new Html();