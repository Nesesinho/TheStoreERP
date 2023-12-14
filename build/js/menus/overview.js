import { hm } from "../helpers/html.js";

export class Overview {
    constructor() {
        this.classes = "grid-area-main grid grid-cols-4 grid-rows-5 gap-3 px-2 py-2";
    }

    html() {
        return /*html */`
            <div class="bg-indigo-950 rounded-md text-white p-2 h-full">
                <h2 class="h-1/10">Valor Recebido:</h2>
                <span class="h-9/10 flex items-center justify-center text-2xl">1.542.345 $</span>
            </div>
            <div class="bg-indigo-950 rounded-md text-white p-2 h-full">
                <h2 class="h-1/10">Numero de Vendas:</h2>
                <span class="h-9/10 flex items-center justify-center text-2xl">120</span>
            </div>
            <div class="bg-indigo-950 rounded-md text-white p-2 h-full">
                <h2 class="h-1/10">Numero de Clientes:</h2>
                <span class="h-9/10 flex items-center justify-center text-2xl">30</span>
            </div>
            <div class="bg-indigo-950 rounded-md col-span-1 row-span-3 text-white p-2">
                <h2>Estoque</h2>
                <canvas id="estoque" class="w-full h-full"></canvas>
            </div>
            <div class="bg-indigo-950 rounded-md col-span-3 row-span-2 text-white flex flex-col h-full p-3">
                <h2>Lucro Periodo</h2>
                <span class="w-full">
                    <canvas id="lucro" style="height: 130%; width: 100%;"></canvas>
                </span>
            </div>
            <div class="bg-indigo-950 rounded-md col-span-3 row-span-2 text-white p-2">
                <h2>Faturamento Periodo</h2>
                <span class="w-full">
                    <canvas id="faturamento" style="height: 90%; width: 100%;"></canvas>
                </span>
            </div>
            <div class="bg-indigo-950 rounded-md col-span-1 row-span-2 text-white flex flex-col p-2 relative">
                <h2 class="h-/5">Produtos Vendidos</h2>
                <span class="flex justify-center pt-3 absolute" style="width: 90%;height: 100%;">
                    <canvas id="produtosVendidos" class="w-full h-full"></canvas>
                </span>
            </div>  
        `
    }

    init() {     
        new Chart(hm.get("#lucro"), {
          type: 'line',
          data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'julho', 'agosto', 'setembro', "outubro", 'novembro', 'dezembro'],
            datasets: [{
              label: '# of Votes',
              data: [1, 13, 3, 5, 2, 3, 32, 12, 5, 6, 34, 50],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
                    legend: {
                        display: false
                    }
            }
          }
        });

        new Chart(hm.get("#produtosVendidos"), {
            type: "pie",
            data: {
                labels: ["produto", "produto2", "produto3", "produto4", "produto5"],
                datasets: [{
                    data: [1, 10, 30 ,2 ,1],
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: "left",
                        align: "center",
                        labels: {
                            usePointStyle: true
                        }
                    }
                }
            }
        })

        new Chart(hm.get("#estoque"), {
            type: 'bar',
            data: {
                labels: ["test1", "test2", "test3"],
                datasets: [{
                    data: [1,3,5]
                }]
            },
            options: {
                indexAxis: 'y',
                elements: {
                bar: {
                    borderWidth: 2,
                }
                },
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            },
        })

        new Chart(hm.get("#faturamento"), {
            type: "bar",
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'julho', 'agosto', 'setembro', "outubro", 'novembro', 'dezembro'],
                datasets: [{
                data: [1, 13, 3, 5, 2, 3, 32, 12, 5, 6, 34, 50],
                borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        })
    }
}