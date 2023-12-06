import { hm } from "../helpers/html.js";
import { Overview } from "../menus/overview.js";

class MenuController {
    constructor() {
        this.classes = {
            overview: new Overview()
        }
    }

    change(menuClass) {
        hm.inner("#menu", menuClass.html(), "clear");
        menuClass.init();
    }
}

export const menu = new MenuController();