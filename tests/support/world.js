require('dotenv').config();

const { setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium , request } = require('@playwright/test');

const UsersService = require('../api/services/UsersService');
const LoginService = require('../api/services/LoginService');
const ProductsService = require('../api/services/ProductsService');
const CartsService = require('../api/services/CartsService'); 

setDefaultTimeout(20 * 1000);

class CustomWorld {
  constructor({ attach, parameters }) {
    this.attach = attach;
    this.parameters = parameters;

    // Contextos para API e E2E
    this.browser = null;
    this.context = null;
    this.page = null;
    
    this.api = null;
    this.apiResponse = null;

    // Page Objects
    this.home = null; 
    
    // Dados compartilhados entre steps
    this.dadosSalvos = {};
  }

async init(scenario) {
    const isApiTest = scenario.pickle.tags.some(tag => tag.name === '@api');

    if (isApiTest) {
        const urlAlvo = process.env.API_URL || 'https://serverest.dev';
        this.api = await request.newContext({ baseURL: urlAlvo });
      
        this.usersService = new UsersService(this.api);
        this.loginService = new LoginService(this.api);
        this.productsService = new ProductsService(this.api);
        this.cartsService = new CartsService(this.api);
    } else {
        const isHeadless = process.env.HEADLESS === 'true';
        this.browser = await chromium.launch({ 
          headless: isHeadless,
          slowMo: isHeadless ? 0 : 100 
        });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }
  }

  async close() {
    if (this.api) await this.api.dispose();
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);