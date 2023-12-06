import { hm } from "../helpers/html";

class MenuController {
    constructor() {

    }

    change(menuClass) {
        hm.inner("#menu", menuClass.html, "clear");
        menuClass.init();
    }
}

export const menu = new MenuController();