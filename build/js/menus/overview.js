class Overview {
    constructor() {
        this.classes = "grid-area-main grid grid-cols-4 grid-rows-5 gap-3 px-2 py-2";
    }

    html() {
        return `
            <div class="bg-indigo-950 rounded-md text-white">Valor Recebido</div>
            <div class="bg-indigo-950 rounded-md text-white"></div>
            <div class="bg-indigo-950 rounded-md text-white">Numero de Vendas</div>
            <div class="bg-indigo-950 rounded-md col-span-1 row-span-3 text-white">Estoque</div>
            <div class="bg-indigo-950 rounded-md col-span-3 row-span-2 text-white">Lucro Periodo</div>
            <div class="bg-indigo-950 rounded-md col-span-3 row-span-2 text-white">Faturamento Periodo</div>
            <div class="bg-indigo-950 rounded-md col-span-1 row-span-2 text-white">Produtos Vendidos</div>
        `
    }

    init() {
    }
}
