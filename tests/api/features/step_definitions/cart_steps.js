const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const DataFactory = require('../../../support/helpers/DataFactory');

Given('que estou logado com um usuario comum', async function () {
    const usuario = DataFactory.gerarUsuario("false");
    await this.usersService.criar(usuario);
    const loginRes = await this.loginService.logar(usuario.email, usuario.password);
    const body = await loginRes.json();
    this.dadosSalvos.token = body.authorization;
});

Given('que existe um produto cadastrado no sistema', async function () {
    const adminUser = DataFactory.gerarUsuario("true");
    await this.usersService.criar(adminUser);    
    const loginAdmin = await this.loginService.logar(adminUser.email, adminUser.password);
    const tokenAdmin = (await loginAdmin.json()).authorization;
    const produto = DataFactory.gerarProduto();
    const prodRes = await this.productsService.criar(produto, tokenAdmin);
    const bodyProd = await prodRes.json();
    
    this.dadosSalvos.idProduto = bodyProd._id; 
});

When('defino um produto existente com quantidade valida', function () {
    this.payloadCarrinho = {
        produtos: [
            {
                idProduto: this.dadosSalvos.idProduto,
                quantidade: 1 // Quantidade válida
            }
        ]
    };
});

When('defino um produto existente com quantidade invalida', function () {
    this.payloadCarrinho = {
        produtos: [
            {
                idProduto: this.dadosSalvos.idProduto,
                quantidade: -5 // Quantidade inválida menor que zero
            }
        ]
    };
});



Then('a resposta deve conter o parametro {string} do produto adicionado ao carrinho', async function (param) {
    const body = await this.apiResponse.json();
    expect(JSON.stringify(body)).toContain(param);
});