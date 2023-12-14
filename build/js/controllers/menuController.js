import { hm } from "../helpers/html.js";
import { Clients } from "../menus/clients.js";
import { Overview } from "../menus/overview.js";
import { Products } from "../menus/products.js";

class MenuController {
    constructor() {
        this.classes = {
            overview: new Overview(),
            products: new Products(),
            clients: new Clients()
        }
    }

    change(menuClass) {
        hm.inner("#menu", menuClass.html(), "clear");
        menuClass.init();
    }
}

export const menu = new MenuController();