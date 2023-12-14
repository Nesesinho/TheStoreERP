import { serverData } from "../controllers/dataController.js";
import { hm } from "../helpers/html.js"

export class Clients {
    constructor() {
        this.data = [];
        this.searchOptions = {
            order: "crescent",
            orderBy: "id"
        };
    }

    html() {
        return /*html*/`
            <div class="bg-slate-50 rounded-md shadow-lg col-span-3 row-span-5 flex flex-col p-3 justify-around">
                <h2 class="text-xl">Clientes</h2>
                <div class="w-full flex" id="inputs">
                </div>
                <div class="w-full p-2 flex items-center gap-2" id="selects">
                    <label>Ordenar por: </label>
                </div>
                <div id="productsTable" class="flex flex-col w-full h-5/6 overflow-y-scroll relative">                  
                </div>
            </div>
            <div class="bg-indigo-950 rounded-md text-white p-2 h-full">
                <h2 class="h-1/10">Clientes registrados:</h2>
                <spanr id="numOfClients" class="h-9/10 flex items-center justify-center text-2xl"></span>
            </div>
            <div class="bg-slate-50 rounded-md col-span-1 row-span-2 flex flex-col p-2 relative">
                <h2 class="h-/5">Estoque</h2>
                <span class="flex justify-center p-3 absolute" style="width: 90%;height: 100%;">
                    <canvas id="stock" class="w-full h-full"></canvas>
                </span>
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

            if (e.target.value === "") {
                this.loadClients(this.data)
                return
            };
            if (e.target.value.startsWith("#")) {
                this.loadClients(this.data.filter(product => {
                    return "#" + product.id === e.target.value
                }));
                return
            }
            this.loadClients(this.data.filter(product => {
                return product.name.toLocaleLowerCase().startsWith(e.target.value.toLocaleLowerCase())
            }));
        })

        const orderBySelect = hm.create("select", /*html*/`
            <option value="id">ID</option>
            <option value="name">Nome</option>
        `, "text-center")

        orderBySelect.addEventListener("change", e => {
            this.searchOptions.orderBy = e.target.value;
            this.loadClients(this.data);
        })

        const orderSelect = hm.create("select", /*html*/`
            <option value="crescent">Crescente</option>
            <option value="decreasing">Decrescente</option>
        `, "text-center")

        orderSelect.addEventListener("change", e => {
            this.searchOptions.order = e.target.value;
            this.loadClients(this.data);
        })

        const addBtn = hm.create("img", ``, "w-1/12 p-3 hover:cursor-pointer");
        addBtn.src = "./imgs/icons/add.png";

        addBtn.addEventListener("click", e => {
            if (hm.get("#addWindow")) return;
            this.loadAddWindow();
        })

        hm.append("#inputs", input);
        hm.append("#inputs", addBtn);

        hm.append("#selects", orderBySelect)
        hm.append("#selects", orderSelect)
    }

    loadAddWindow() {
        hm.inner("#productsTable", /*html */`
            <div id="addWindow" class="absolute w-full h-full flex justify-center items-center">
                <div id="addWindow-form" class="w-4/5 h-5/6 shadow-lg bg-slate-50 grid grid-cols-2 grid-rows-6">
                    <span id="header-addWindow" class="bg-indigo-950 text-white col-span-2 flex justify-between items-center p-2">
                        <h2>Novo Produto</h2>
                    </span>
                    <input id="clientName" class="my-3 mx-2 pl-2 border-indigo-950 border-b-4 transition-colors" type="text" placeholder="Nome Completo">
                    <input id="clientCpf" class="my-3 mx-2 pl-2 border-indigo-950 border-b-4 transition-colors" type="text" placeholder="Cpf">
                    <input id="clientPhone" class="my-3 mx-2 pl-2 border-indigo-950 border-b-4 transition-colors" type="text" placeholder="Telefone">
                    <div class="flex flex-col justify-around p-1">
                        <div class="border-b-4 border-slate-50">
                            <input id="clientCanBuyInstallments" type="checkbox">
                            <label>Pode comprar a prazo</label>
                        </div>
                        <div class="border-b-4 border-slate-50">
                            <input id="clientArrearage" type="checkbox">
                            <label>Possui dividas</label>
                        </div>
                    </div>
                    <input id="clientState" class="my-3 mx-2 pl-2 border-indigo-950 border-b-4 transition-colors" type="text" placeholder="Estado">
                    <input id="clientCity" class="my-3 mx-2 pl-2 border-indigo-950 border-b-4 transition-colors" type="text" placeholder="Cidade">
                    <input id="clientNeighborhood" class="my-3 mx-2 pl-2 border-indigo-950 border-b-4 transition-colors" type="text" placeholder="Bairro">
                    <input id="clientAddress" class="my-3 mx-2 pl-2 border-indigo-950 border-b-4 transition-colors" type="text" placeholder="Endereço">
                    <input id="clientCep" class="my-3 mx-2 pl-2 border-indigo-950 border-b-4 transition-colors" type="text" placeholder="Cep">
                </div> 
            </div>
        `)

        const closeBtn = hm.create("img", ``, "w-8 hover:cursor-pointer");
        closeBtn.src = "./imgs/icons/close.png";

        closeBtn.addEventListener("click", e => {
            hm.get("#addWindow").remove();
        })

        const addBtn = hm.create("button", ``, "mx-2 p-2 my-auto bg-green-600 text-white w-min hover:cursor-pointer justify-self-end");
        addBtn.innerHTML = "Adicionar";
        addBtn.addEventListener("click", e => {
            if (!this.addFormChecker()) return
            
            const clientData = {
                id: 0,
                name: hm.get("#clientName").value,
                cpf: hm.get("#clientCpf").value,
                phone: hm.get("#clientPhone").value,
                infoWindow: false,
                canBuyInstallments: !hm.get("#clientCanBuyInstallments").value,
                arrearage: !hm.get("#clientArrearage").value,
                address: {
                    state: hm.get("#clientState").value,
                    city: hm.get("#clientCity").value,
                    neighborhood: hm.get("#clientNeighborhood").value,
                    address: hm.get("#clientAddress").value,
                    cep: hm.get("#clientCep").value
                }
            };

            this.addClientTable(clientData);
            serverData.send(clientData, "add-client");
            this.data.push(clientData);
            hm.inner("#numOfClients", `${this.data.length}`, "clear");
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

    loadClients(data) {
        hm.inner("#productsTable",/*html*/`
                <div class="grid grid-template-client">
                    <h2 class="pl-3 my-auto border-l-2 grid-area-id">ID</h2>
                    <h2 class="pl-3 my-auto border-l-2 grid-area-name">Nome</h2>
                    <h2 class="pl-3 my-auto border-l-2 grid-area-cpf">CPF</h2>
                    <h2 class="pl-3 my-auto border-l-2 grid-area-phone">Telefone</h2>
                </div> 
        `, "clear");
        let newData = data.sort((a, b) => {
            if (this.searchOptions.orderBy === "name") {
                return a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase());
            }
            return a[this.searchOptions.orderBy] - b[this.searchOptions.orderBy]
        })

        if (this.searchOptions.order === "decreasing") newData.reverse();

        newData.forEach(e => {
            this.addClientTable(e);
        })
    }

    addClientTable(e) {
        const div = hm.create("div", `
                <span class="pl-3 my-auto border-l-2 grid-area-id">${e.id}</span>
                <span class="pl-3 my-auto border-l-2 grid-area-name">${e.name}</span>
                <span class="pl-3 my-auto border-l-2 grid-area-cpf">${e.cpf}</span>
                <span class="pl-3 my-auto border-l-2 grid-area-phone">${e.phone}</span>
            `, "grid grid-template-client h-1/15");
            
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
        const div = hm.create("div", /*html*/`
            <div class="flex flex-col gap-1">
                <span class="">Estado: ${data.address.state}</span>
                <span>Cidade: ${data.address.city}</span>
                <span>Bairro: ${data.address.neighborhood}</span>
                <span>CEP: ${data.address.cep}</span>
                <span>Endereço: ${data.address.address}</span>
            </div>
            <div class="flex flex-col gap-1">
                <span class="">Pode comprar a prazo: ${data.canBuyInstallments ? "Sim" : "Não"}</span>
                <span class="">Possui dividas: ${data.arrearage ? "Sim" : "Não"}</span>
            </div>
        `, "grid grid-cols-2 gap-3 bg-slate-200 p-2 relative ");

        const btnsDiv = hm.create("div", ``, "w-full flex justify-end gap-3 bottom-0 right-0 p-3 absolute");

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

    async init() {
        this.data = await serverData.get("data/clients");
        hm.inner("#numOfClients", `${this.data.length}`, "clear");
        this.loadInput();
        this.loadClients(this.data);

        new Chart(hm.get("#stock"), {
            type: "pie",
            data: {
                labels: ["Ocupado", "Livre"],
                datasets: [{
                    data: [this.data.reduce((a, b) =>{return a + b.stock}, 0), 10]
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: "bottom",
                        align: "center",
                        labels: {
                            usePointStyle: true
                        }
                    }
                }
            }
        })
    }
}