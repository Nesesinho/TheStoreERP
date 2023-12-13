import { hm } from "../helpers/html.js"

export class Products {
    constructor() {
        this.data = [
            {
                id: 0,
                name: "Xbox Series X",
                value: 750,
                stock: 10,
                infoWindow: false,
                buyValue: 500,
                minStock: 5,
                desc: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, harum reprehenderit? Aperiam sunt ratione iure harum non minima officia voluptate?`
            },
            {
                id: 1,
                name: "PlayStation 5",
                value: 700,
                stock: 8,
                infoWindow: false,
                buyValue: 480,
                minStock: 4,
                desc: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, harum reprehenderit? Aperiam sunt ratione iure harum non minima officia voluptate?`
            },
            {
                id: 2,
                name: "Nintendo Switch",
                value: 300,
                stock: 15,
                infoWindow: false,
                buyValue: 200,
                minStock: 7,
                desc: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, harum reprehenderit? Aperiam sunt ratione iure harum non minima officia voluptate?`
            },
            {
                id: 3,
                name: "PC Gaming",
                value: 1200,
                stock: 5,
                infoWindow: false,
                buyValue: 900,
                minStock: 2,
                desc: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, harum reprehenderit? Aperiam sunt ratione iure harum non minima officia voluptate?`
            },
            {
                id: 4,
                name: "Smartphone",
                value: 800,
                stock: 12,
                infoWindow: false,
                buyValue: 600,
                minStock: 6,
                desc: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, harum reprehenderit? Aperiam sunt ratione iure harum non minima officia voluptate?`
            },
            {
                id: 5,
                name: "Headphones",
                value: 100,
                stock: 20,
                infoWindow: false,
                buyValue: 70,
                minStock: 10,
                desc: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, harum reprehenderit? Aperiam sunt ratione iure harum non minima officia voluptate?`
            },
            {
                id: 6,
                name: "4K TV",
                value: 500,
                stock: 7,
                infoWindow: false,
                buyValue: 380,
                minStock: 3,
                desc: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, harum reprehenderit? Aperiam sunt ratione iure harum non minima officia voluptate?`
            },
            {
                id: 7,
                name: "Camera DSLR",
                value: 700,
                stock: 9,
                infoWindow: false,
                buyValue: 550,
                minStock: 4,
                desc: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, harum reprehenderit? Aperiam sunt ratione iure harum non minima officia voluptate?`
            },
            {
                id: 8,
                name: "Tablet",
                value: 250,
                stock: 14,
                infoWindow: false,
                buyValue: 180,
                minStock: 8,
                desc: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, harum reprehenderit? Aperiam sunt ratione iure harum non minima officia voluptate?`
            },
            {
                id: 9,
                name: "Fitness Tracker",
                value: 80,
                stock: 18,
                infoWindow: false,
                buyValue: 60,
                minStock: 9,
                desc: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, harum reprehenderit? Aperiam sunt ratione iure harum non minima officia voluptate?`
            }
        ]
    }
    html() {
        return `
            <div class="bg-slate-50 rounded-md shadow-lg col-span-3 row-span-5 flex flex-col p-3 justify-around">
                <h2 class="text-xl">Produtos</h2>
                <div class="w-full flex" id="inputs">
                </div>
                <div id="productsTable" class="flex flex-col w-full h-5/6 overflow-y-scroll relative">                    
                </div>
            </div>
            <div class="bg-indigo-950 rounded-md text-white p-2 h-full">
                <h2 class="h-1/10">Produtos registrados:</h2>
                <spanr id="numOfProducts" class="h-9/10 flex items-center justify-center text-2xl">1</span>
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

    loadInput() {
        const input = hm.create("input", ``, "w-11/12 py-2 pl-2 border-b-4 border-indigo-950 text-black text-lg my-2w-11/12 py-2 pl-2 border-b-4 border-indigo-950 text-black text-lg my-2");
        input.placeholder = "Digite o nome do pruduto ou adicione # junto com o numero para procurar por id";

        input.addEventListener("input", e => {
            hm.inner("#productsTable", ``, "clear");

            if (e.target.value === "") {
                this.loadProducts()
                return
            };
            if (e.target.value.startsWith("#")) {
                this.data.filter(product => {
                    return "#" + product.id === e.target.value
                }).forEach(product => {
                    this.addProductTable(product);
                })
                return
            }

            this.data.filter(product => {
                return product.name.toLocaleLowerCase().startsWith(e.target.value.toLocaleLowerCase())
            }).forEach(product => {
                this.addProductTable(product);
            })
        })

        const addBtn = hm.create("img", ``, "w-1/12 p-3 hover:cursor-pointer");
        addBtn.src = "./imgs/icons/add.png";

        addBtn.addEventListener("click", e => {
            if (hm.get("#addWindow")) return;
            this.loadAddWindow();
        })

        hm.append("#inputs", input);
        hm.append("#inputs", addBtn);
    }

    loadAddWindow() {
        hm.inner("#productsTable", `
            <div id="addWindow" class="absolute w-full h-full flex justify-center items-center">
                <div id="addWindow-form" class="w-4/5 h-4/5 shadow-lg bg-slate-50 grid grid-cols-2 grid-rows-6">
                    <span id="header-addWindow" class="bg-indigo-950 text-white col-span-2 flex justify-between items-center p-2">
                        <h2>Novo Produto</h2>
                    </span>
                    <input id="productName" type="text" placeholder="Nome" class="transition-colors pl-2 border-b-4 border-black mx-2 my-4 col-span-2"></input>
                    <input id="productValue" type="number" placeholder="Valor de Revenda" class="transition-colors pl-2 border-b-4 border-black mx-2 my-4 "></input>
                    <input id="productStock" type="number" placeholder="Estoque inicial" class="transition-colors pl-2 border-b-4 border-black mx-2 my-4 "></input>
                    <input id="productMinStock" type="number" placeholder="Estoque minimo" class="transition-colors pl-2 border-b-4 border-black mx-2 my-4 "></input>
                    <input id="productBuyValue" type="number" placeholder="Valor de Compra" class="transition-colors pl-2 border-b-4 border-black mx-2 my-4 "></input>
                    <textarea id="productDesc" name="" id="" cols="30" rows="10" placeholder="Descrição" class="transition-colors pl-2 mx-2 col-span-2"></textarea>
                </div> 
            </div>
        `)

        const closeBtn = hm.create("img", ``, "w-8 hover:cursor-pointer");
        closeBtn.src = "./imgs/icons/close.png";

        closeBtn.addEventListener("click", e => {
            hm.get("#addWindow").remove();
        })

        const addBtn = hm.create("button", ``, "mx-2 p-2 my-auto bg-green-600 text-white w-min hover:cursor-pointer");
        addBtn.innerHTML = "Adicionar";
        addBtn.addEventListener("click", e => {
            if (!this.addFormChecker()) return

            const productData = {
                id: 1,
                name: hm.get("#productName").value,
                value: hm.get("#productValue").value,
                stock: hm.get("#productStock").value,
                infoWindow: false,
                buyValue: hm.get("#productBuyValue").value,
                minStock: hm.get("#productMinStock").value,
                desc: hm.get("#productDesc").value
            };

            this.addProductTable(productData);
            this.data.push(productData);
            hm.inner("#numOfProducts", `${this.data.length}`, "clear");
            hm.get("#addWindow").remove();
        })

        hm.append("#header-addWindow", closeBtn);
        hm.append("#addWindow-form", addBtn);
    }

    addFormChecker() {
        let valid = true;
        const inputs = hm.get("#addWindow-form").querySelectorAll("input");
        inputs.forEach(e => {
            if (e.value === "") {
                e.classList.toggle("border-red-500");
                setTimeout(() => {
                    e.classList.toggle("border-red-500");
                }, 500)
                valid = false;
            };
        })

        return valid;
    }

    loadProducts() {
        this.data.forEach(e => {
            this.addProductTable(e);
        })
    }

    addProductTable(e) {
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
        hm.inner("#numOfProducts", `${this.data.length}`, "clear");
        this.loadInput();
        this.loadProducts();
    }
}