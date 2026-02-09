const { Before, After, Status } = require('@cucumber/cucumber');
const HomePage = require('../e2e/pages/HomePage');

Before(async function (scenario) {
  await this.init(scenario); 
  if (this.page) {
      this.home = new HomePage(this.page);
  }
});

After(async function (scenario) {
    if (scenario.result?.status === 'FAILED' && this.apiResponse) {
        const responseBody = await this.apiResponse.json();
        const responseStatus = this.apiResponse.status();
        await this.attach(
            `Erro na API - Status: ${responseStatus}\nResponse: ${JSON.stringify(responseBody, null, 2)}`, 
            'text/plain'
        );
        console.log("📄 Resposta da API anexada ao relatório.");
    }

    if (scenario.result.status === Status.FAILED) {
        if (this.page && !this.page.isClosed()) {
            try {
                console.log("📸 Capturando evidência de falha...");
                const screenshot = await this.page.screenshot({ fullPage: true, type: 'png' });
                await this.attach(screenshot, 'image/png');
            } catch (error) {
                console.log("⚠️ Falha no screenshot:", error.message);
            }
        }
    }

    if (this.browser) {
        await this.close();
    }
});