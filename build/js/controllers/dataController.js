class Data {
    constructor() {
        this.serverUrl = "http://localhost:3000/";
    }

    makeRequestOptions(data) {
        return {
            method: 'POST', // Método HTTP
            headers: {
              'Content-Type': 'application/json', // Tipo de conteúdo (JSON no exemplo)
            },
            body: JSON.stringify(data), // Dados a serem enviados (convertidos para JSON)
          }
    }

    send(data, route) {
        fetch(this.serverUrl + route, this.makeRequestOptions(data))
            .then((response) => {
                if (!response.ok) {
                throw new Error('Erro na solicitação para o servidor');
                }
                return response.json(); // Se você espera uma resposta em JSON
            })
            .then((data) => {
                // Manipular a resposta do servidor aqui
                console.log('Resposta do servidor:', data);
            })
            .catch((error) => {
                console.error('Erro:', error);
            });
    }

    async get(route) {
        try {
            const response = await fetch(this.serverUrl + route);
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Erro ao obter dados do servidor:', error);
        }
    }
}

export const serverData = new Data();