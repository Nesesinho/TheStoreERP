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
    
    create(tag, content, classes) {
        const el = document.createElement(tag);
        el.innerHTML = content;
        if (classes) el.className = classes;
        return el;
    }

    addBefore(element, elementBefore) {
        element.parentNode.insertBefore(elementBefore, element.nextSibling);
    }
}

export const hm = new Html();