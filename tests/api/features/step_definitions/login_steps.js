const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const DataFactory = require('../../../support/helpers/DataFactory');

Given('que acabo de cadastrar um usuario', async function () {
    const usuario = DataFactory.gerarUsuario("true");
    const response = await this.usersService.criar(usuario);
    expect(response.status()).toBe(201);
    
    this.dadosSalvos.email = usuario.email;
    this.dadosSalvos.password = usuario.password;
});

Given('que defino um usuario com email {string} e senha {string}', function (email, senha) {
    this.dadosSalvos.email = email;
    this.dadosSalvos.password = senha;
});

Given('que defino um usuario sem o campo obrigatorio {string}', function (campo_obrigatorio) {
    this.dadosSalvos = {};
    this.dadosSalvos[campo_obrigatorio] = undefined;
});

Then('a resposta deve conter um token de autenticacao', async function () {
    const body = await this.apiResponse.json();
    expect(body).toHaveProperty('authorization');
    this.dadosSalvos.token = body.authorization; 
});

