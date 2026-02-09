const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');


When('envio uma requisicao POST para {string}', async function (endpoint) {
    console.log(`Router direcionando para: ${endpoint}`);

    if (endpoint === '/usuarios') {
        this.apiResponse = await this.usersService.criar(this.payloadUsuario);
    } 
    else if (endpoint === '/login') {
        const email = this.dadosSalvos.email;
        const password = this.dadosSalvos.password;
        this.apiResponse = await this.loginService.logar(email, password);
    }
    else if (endpoint === '/produtos') {
        this.apiResponse = await this.productsService.criar(this.payloadProduto, this.dadosSalvos.token);
    }
    else if (endpoint.includes('carrinho')) {
        this.apiResponse = await this.cartsService.cadastrar(this.payloadCarrinho, this.dadosSalvos.token);
    }
    else {
        throw new Error(`Endpoint não mapeado no Router: ${endpoint}`);
    }
});

Then('o status code deve ser {int}', function (statusCode) {
    expect(this.apiResponse.status()).toBe(statusCode);
});

Then('a resposta deve conter a mensagem {string}', async function (mensagem) {
    const body = await this.apiResponse.json();
    const bodyString = JSON.stringify(body);
    expect(bodyString).toContain(mensagem);
});

Then('a resposta deve conter os campos {string} e {string}', async function (campo1, campo2) {
    const body = await this.apiResponse.json();
    expect(body).toHaveProperty(campo1);
    expect(body).toHaveProperty(campo2);
});


Then('o campo {string} deve ser do tipo {string}', async function (campo, type) {
    const body = await this.apiResponse.json();
    expect(typeof body[campo]).toBe(type);
});
