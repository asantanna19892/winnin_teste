const { Given, When, Then } = require('@cucumber/cucumber');
const DataFactory = require('../../../support/helpers/DataFactory');

Given('que defino um usuario novo com dados validos', function () {
    this.payloadUsuario = DataFactory.gerarUsuario("true");
});

Given('que defino um usuario novo com dados email invalido {string}', function (emailInvalido) {
    this.payloadUsuario = DataFactory.gerarUsuario("true");
    this.payloadUsuario.email = emailInvalido;
});

Given('que defino um usuario novo com administrador {string}', function (adminStatus) {
    this.payloadUsuario = DataFactory.gerarUsuario(adminStatus);
});

Given('que defino um usuario novo sem o campo obrigatorio {string}', function (campo_obrigatorio) {
    this.payloadUsuario = DataFactory.gerarUsuario("true");
    delete this.payloadUsuario[campo_obrigatorio];
});

Then('salvo o ID do usuario criado', async function () {
    const body = await this.apiResponse.json();
    this.dadosSalvos.idUsuario = body._id;
});