import { menu } from "./controllers/menuController.js";
import { nexum } from "./controllers/nexumController.js";
import { hm } from "./helpers/html.js";

menu.change(menu.classes.clients);

hm.get("#menus").querySelectorAll("li").forEach((element, index) => {
    element.addEventListener("click", e => {
        menu.change(menu.classes[["overview", "clients", "products"][index]]);
    })
});

nexum.init();