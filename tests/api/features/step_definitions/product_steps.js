const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const DataFactory = require('../../../support/helpers/DataFactory');

Given('que estou logado com um usuario administrador', async function () {
    const usuario = DataFactory.gerarUsuario("true");
    await this.usersService.criar(usuario);
    const loginRes = await this.loginService.logar(usuario.email, usuario.password);
    const body = await loginRes.json();
    
    this.dadosSalvos.token = body.authorization;
});

Given('que defino um produto novo com dados validos', function () {
    this.payloadProduto = DataFactory.gerarProduto();
});

Given('que defino um produto novo com valor invalido', function () {
    this.payloadProduto = DataFactory.gerarProduto();
    this.payloadProduto.preco = -50; // Preço inválido menor que zero
});


Given('que tento cadastrar um produto sem o campo {string}', function (campoRemovido) {
    this.payloadProduto = DataFactory.gerarProduto();
    delete this.payloadProduto[campoRemovido];
});

Then('salvo o ID do produto criado', async function () {
    const body = await this.apiResponse.json();
    this.dadosSalvos.idProduto = body._id;
});


