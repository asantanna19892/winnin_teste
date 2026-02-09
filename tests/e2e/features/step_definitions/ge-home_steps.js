const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const HomePage = require('../../pages/HomePage.js');


Given('que estou na home do GE', async function () {
  await this.home.acessar();
});

When('carrego mais noticias', async function () {
  await this.home.carregarMaisNoticias();
});

Then('devo ver pelo menos {int} noticias na pagina', async function (quantidade) {
  await this.home.validarQuantidadeNoticias(quantidade);
});


Then('devo ver as principais manchetes em destaque', async function () {
  await this.home.validarManchetesDestaque();
});

When('clico na primeira noticia', async function () {
  this.dadosNoticia = await this.home.clicarNaPrimeiraNoticia();
});

When('seleciono o time {string} da Serie A', async function (nomeTime) {
  await this.home.selecionarTimeSerieA(nomeTime);
});

Then('cada noticia deve conter {string}', async function (requisito) {
  await this.home.validarEstruturaNoticia(requisito);
});


Then('devo ser redirecionado para a materia completa', async function () {
  await this.home.validarRedirecionamentoMateria(this.dadosNoticia);
});

Then('devo ver noticias relacionadas ao time {string}', async function (time) {
  await this.home.validarNoticiasDoTime(time);
});

