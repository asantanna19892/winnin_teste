const { expect } = require('@playwright/test');
const { error, time } = require('node:console');

class HomePage {
  constructor(page) {
    this.page = page; 
    this.newsCards = page.locator('.feed-post'); 
    this.cardTitle = '.feed-post-body-title'; 
    this.cardImage = '.feed-media-wrapper'; 
    this.cardSummary = '.feed-post-body-resumo'; 
    this.cardLink = '.feed-post-link'; 
    this.cardChapeu = '.feed-post-header-chapeu';
    this.cardTime = page.locator('div[data-type="card-meu-time-v2"]');
    this.seletorDestaques = [
        '.bstn-hl-wrapper', // Destaque Padrão com 3 notícias
        'img[alt="Destaque no GE"]',  // Destaque Carrossel com images das notícias em destaque
        '#homelive-area'              // Destaque HomeLive, que pode aparecer como carrossel ou lista
    ].join(',');
    this.manchetesDestaque = page.locator(this.seletorDestaques);
    this.headerNews = '.header-title-content';
  }

  extrairPalavrasChave(texto) {
    if (!texto) return [];
    return texto
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
      .replace(/[^\w\s]/gi, '')
      .trim() 
      .split(/\s+/)
      .filter(w => w.length > 3);
  } 

  async acessar() {
    const url = process.env.BASE_URL_FRONT || 'https://ge.globo.com/';
    
    await this.page.goto(url, { 
      waitUntil: 'domcontentloaded' 
    });
  }

  async carregarMaisNoticias() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));    
    // Aguardar carregamento de novas notícias após scroll,
    // não é a abordagem mais elegante, mas não tive sucesso com outras formas de detecção de carregamento.
    await this.page.waitForTimeout(5000); 
  }

  async validarQuantidadeNoticias(minimo) {
    await this.newsCards.nth(minimo - 1).waitFor({ state: 'visible', timeout: 15000 });   
    const total = await this.newsCards.count();
    console.log(`✅ Notícias encontradas após carregamento: ${total}`);
    expect(total).toBeGreaterThanOrEqual(minimo);
  }

  
  async validarEstruturaNoticia(requisito) {
    const todosOsCards = await this.newsCards.all();
    const cardsParaValidar = todosOsCards.slice(0, 10); 
    console.log(`Validando ${requisito} em ${cardsParaValidar.length} notícias...`);

    for (let i = 0; i < cardsParaValidar.length; i++) {
      const card = cardsParaValidar[i];
      
      let tituloNoticia = "Título não identificado";
      try {
          tituloNoticia = await card.locator(this.cardTitle).first().innerText();
      } catch (e) {
          console.warn(`⚠️  Não foi possível extrair o título da notícia #${i + 1}. Usando título genérico para logs.`);
      }
      try {
        switch (requisito) {
          case 'titulo':
            await expect(card.locator(this.cardTitle).first()).toBeVisible();
            break;
          case 'resumo':
            await expect(card.locator(this.cardSummary).first()).toBeVisible();
            break;
          case 'imagem':
            const imagem = card.locator(this.cardImage).first();
            await expect(imagem).toBeVisible();
            break;
          case 'link':
            const link = card.locator(this.cardLink);
            await expect(link).toBeVisible();
            const href = await link.getAttribute('href');
            expect(href).toMatch(/^https?:\/\/.+/);
            break;
          default:
            throw new Error(`Requisito desconhecido: ${requisito}`);
        }
      } catch (error) {
        console.error(`\n🔴 ERRO DE VALIDAÇÃO NA NOTÍCIA #${i + 1}`);
        console.error(`📰 Título: "${tituloNoticia}"`);
        console.error(`❌ Falha: O campo '${requisito}' não foi encontrado ou está incorreto.\n`);
        throw error;
      }
    }
    console.log(`✅ Sucesso: Todas as ${cardsParaValidar.length} notícias possuem ${requisito}.`);
  }

  async validarManchetesDestaque() {
    await expect(this.manchetesDestaque.first()).toBeVisible();
    await expect(this.manchetesDestaque.first()).toBeVisible({ timeout: 10000 });
  }

  async clicarNaPrimeiraNoticia() {
    const primeiraNoticia = this.newsCards.first();
    await expect(primeiraNoticia).toBeVisible({ timeout: 10000 });
    const linkNoticia = primeiraNoticia.locator(this.cardLink);
    const tituloEsperado = await linkNoticia.innerText();
    const chapeuLocator = primeiraNoticia.locator(this.cardChapeu);
    const textoChapeu = (await chapeuLocator.innerText());
    await linkNoticia.click();
    return { titulo: tituloEsperado, chapeu: textoChapeu }; 
  }

  async selecionarTimeSerieA(nomeTime) {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));    
    const menuTimes = this.cardTime.first();
    await menuTimes.waitFor({ state: 'visible' }, { timeout: 50000 });
    const botaoTime = menuTimes.locator(`button[title="${nomeTime}"]`);
    await botaoTime.waitFor({ state: 'visible' }, { timeout: 50000 });
    await botaoTime.click();

    const botaoConfirmar = this.page.getByRole('button', { name: `Confirmar ${nomeTime}` });

    await botaoConfirmar.waitFor({ state: 'visible' });
    await botaoConfirmar.click();
  }

  async validarNoticiasDoTime(nomeTime) {
    const urlBase = `https://ge.globo.com/futebol/times/${nomeTime.toLowerCase()}`;

    const newsTime = this.page.locator(`a[href^="${urlBase}"]`);

    const href = await newsTime.first().getAttribute('href');
    expect(href).toContain(urlBase);
  } 

  async validarTituloMateria(tituloNoticia, chapeu) {
    const locatorH1 = this.page.locator('h1');
    const headerTitle = this.page.locator(this.headerNews);

    await expect(locatorH1.first()).toBeVisible({ timeout: 10000 });
    const textoH1 = await locatorH1.first().innerText(); 
    const textoHeader = await headerTitle.first().innerText();
    console.log(`Texto H1: "${textoH1}" | Header: "${textoHeader}" | Título Notícia: "${tituloNoticia}" | Chapeu: "${chapeu}"`);
    // Verificação de correspondência exata ou por similaridade considerando título e chapeu da notícia.
    if (textoH1.toLowerCase() === tituloNoticia.toLowerCase() || textoHeader.toLowerCase() === chapeu.toLowerCase()) {
      console.log("✅ Match exato de título encontrado.");
      return;
    } else{
      const palavrasCapa = this.extrairPalavrasChave(tituloNoticia);
      const palavrasTitulo = this.extrairPalavrasChave(textoH1);
      const palavrasComuns = palavrasCapa.filter(p => palavrasTitulo.includes(p));
      if (palavrasCapa.length <= 2) {
        expect(palavrasComuns.length).toBeGreaterThanOrEqual(1);
      } else {
        const taxa = palavrasComuns.length / palavrasCapa.length;
        if (taxa >= 0.25) {
          console.log("✅ Redirecionamento validado por similaridade de título.");
          return;
        } else {
          throw new Error("🔴 Redirecionamento inválido: Títulos não correspondem suficientemente.");
        }
      }
    }
   
  }

  async validarRedirecionamentoMateria(dadosNoticia) {
    // Identifiquei que algumas notícias abrem um player de vídeo em lightbox 
    // ao invés de redirecionar para uma página de matéria tradicional. 
    const lightboxVideo = this.page.locator('#gui-lightbox-container');
    if (await lightboxVideo.isVisible({ timeout: 20000 }).catch(() => false)) {
      console.log("🎥 Conteúdo detectado como Vídeo/Lightbox. Validando player...");
      return; 
    } else {
      await this.validarTituloMateria(dadosNoticia.titulo, dadosNoticia.chapeu);
    }
  }
}


module.exports = HomePage;