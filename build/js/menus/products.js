import { hm } from "../helpers/html.js"

export class Products {
    constructor() {
        this.data = [
            {
                id: 1,
                name: "Xbox Series X",
                value: 750,
                stock: 10,
                infoWindow: false,
                buyValue: 500,
                minStock: 5,
                desc: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, harum reprehenderit? Aperiam sunt ratione iure harum non minima officia voluptate?`
            }
        ]
    }
    html() {
        return `
            <div class="bg-slate-50 rounded-md shadow-lg col-span-3 row-span-5 flex flex-col p-3 justify-around">
                <h2 class="text-xl">Produtos</h2>
                <div class="w-full flex">
                    <input placeholder="Digite o nome do pruduto ou adicione # junto com o numero para procurar por id" type="text" class="w-11/12 py-2 pl-2 border-b-4 border-indigo-950 text-black text-lg my-2">
                    <img src="./imgs/icons/add.png" alt="" class="w-1/12 p-3 hover:cursor-pointer">
                </div>
                <div id="productsTable" class="flex flex-col w-full h-5/6 overflow-y-scroll ">
                </div>
            </div>
            <div class="bg-indigo-950 rounded-md text-white p-2 h-full">
                <h2 class="h-1/10">Produtos registrados:</h2>
                <span class="h-9/10 flex items-center justify-center text-2xl">1</span>
            </div>
            <div class="bg-slate-50 rounded-md shadow-lg row-span-2 p-2">
                <h2>Estoque: </h2>
            </div>
            <div class="bg-slate-50 rounded-md shadow-lg row-span-2 p-2 h-full overflow-y-scroll">
                <h2>Alertas: </h2>
                <ul class="w-full">
                    <li class="w-full bg-red-300 rounded-md p-2 text-red-950">O produto #01 está com o estoque abaixo do minimo</li>
                </ul>
            </div>
        `
    }

    loadProducts() {
        this.data.forEach(e => {
            const div = hm.create("div", `
                <span class="pl-3 my-auto border-l-2 grid-area-id">${e.id}</span>
                <span class="pl-3 my-auto border-l-2 grid-area-name">${e.name}</span>
                <span class="pl-3 my-auto border-l-2 grid-area-value">${e.value} $</span>
                <span class="pl-3 my-auto border-l-2 grid-area-stock">${e.stock}</span>
            `, "grid grid-template-productItem h-1/15");
            
            const img = document.createElement("img");
            img.src = "./imgs/icons/menu-table.png";
            img.className = "grid-area-menuBtn h-full py-2 hover:cursor-pointer";
            img.addEventListener("click", () => {
                if (e.infoWindow) return;
                hm.addBefore(div, this.moreInfo(e));
                e.infoWindow = true;
            });

            div.appendChild(img);
            hm.append("#productsTable", div);
        })
    }

    moreInfo(data) {
        const div = hm.create("div", `
            <span class="">Quantidade minima necessaria no estoque: ${data.minStock}</span>
            <span class="">Valor da compra da ultima reposição: ${data.buyValue}</span>
            <span class="">Descrição: ${data.desc}</span>
        `, "flex flex-col gap-3 bg-slate-200 p-2");

        const btnsDiv = hm.create("div", ``, "w-full flex justify-end gap-3");

        [["delete", this.delItem], ["close", this.closeInfo]].forEach(e => {
            const img = hm.create("img", ``, "w-7 hover:cursor-pointer");
            img.src = `./imgs/icons/${e[0]}.png`;

            img.addEventListener("click", event => {
                e[1](div, data);
            })

            btnsDiv.appendChild(img)
        })

        div.appendChild(btnsDiv);
        return div;
    }

    delItem(element, data) {
        element.remove();
        data.infoWindow = false;
    }

    closeInfo(element, data) {
        element.remove();
        data.infoWindow = false;
    }

    init() {
        this.loadProducts();
    }
}