# 🚀 Test Automation Framework \- Winnin QA Challenge

Este projeto contém a solução para o desafio técnico de QA da Winnin, abrangendo testes de **\*\*API (ServeRest)\*\*** e **\*\*E2E (Portal GE)\*\***. A arquitetura foi desenhada seguindo os princípios de Page Object Model (POM) e Service Layer, garantindo resiliência e fácil manutenção.

---

## 🏗️ Estrutura do Projeto

A organização separa claramente a infraestrutura da lógica de teste:

```text  
 
├── .github/workflows/    \# Pipeline CI/CD (GitHub Actions)  
├── tests/  
│   ├── api/  
│   │   ├── features/     \# Cenários Gherkin de Backend  
│   │   ├── services/     \# Camada de Requisições (Axios/Playwright Request)  
│   │   └── step\_definitions/  
│   ├── e2e/  
│   │   ├── features/     \# Cenários Gherkin de Frontend  
│   │   ├── pages/        \# Page Objects (Elementos e ações)  
│   │   └── step\_definitions/  
│   └── support/  
│       ├── hooks.js      \# Setup/Teardown e Screenshots  
│       └── world.js      \# Gerenciamento de estado global e Injeção de Dep.  
├── reports/              \# Relatórios JSON e HTML com evidências  
├── cucumber.json         \# Configuração de mapeamento do Cucumber  
├── generate-report.js    \# Script de geração do dashboard visual  
└── package.json          \# Gerenciamento de dependências e scripts
```
---

## **🛠️ Tecnologias e Estratégias**

* **Linguagem:** Node.js v24  
* **BDD:** Cucumber JS (@cucumber/cucumber)  
* **Automação UI:** Playwright  
* **Massa de Dados:** Faker.js (Geração dinâmica para evitar conflitos de dados)  
* **Resiliência (Anti-Flakiness):** \* **Fuzzy Matching:** Validação de manchetes dinâmicas por semelhança de strings.  
  * **Screenshots Automáticos:** Captura de tela em tempo real apenas em falhas de UI.  
* **Ambiente:** Dotenv para gestão de URLs e configurações.

---

## **⚙️ Instalação e Execução**

### **1\. Setup**

```bash
npm install && npx playwright install chromium
```

### **2\. Execução** 

| Comando | Descrição |
| :---- | :---- |
| npm run test:api:local | Roda API contra localhost:3000 (necessário ServeRest rodando) |
| npm run test:api:public | Roda API contra o ambiente de staging oficial |
| npm run test:e2e:headless | Executa UI tests em background (Padrão CI) |
| npm run test:e2e:headed | Executa UI tests com navegador visível |
| npm run report | Gera o dashboard visual a partir dos resultados |
| npm run test:all | Executa a suíte completa sequencialmente |

---

## **⚙️ CI/CD (GitHub Actions)**

A pipeline em .github/workflows/pipeline.yml permite execuções paralelas e disparos manuais.

**Funcionalidades da Pipeline:**

* **Execução Paralela:** Jobs de API e E2E rodam em máquinas virtuais distintas simultaneamente.  
* **Workflow Dispatch:** Possibilidade de rodar tags específicas pelo GitHub.  
  * *Exemplo:* Digite @api para validar o backend ou @destaque para testar apenas as manchetes.  
* **Artifacts:** Os relatórios e screenshots ficam disponíveis para download após a conclusão.

---

## **✅ Cobertura de Testes**

### **Testes de API (ServeRest)**

| Funcionalidade | Descrição |
| :---- | :---- |
| **Usuários** | Fluxo de cadastro e Fluxo de erros (usando Massa Dinâmica). |
| **Login** | Validação de token JWT e fluxos de erro. |
| **Produtos** | Fluxo de Cadastro, Fluxo de erros e teste de contrato. |
| **Carrinhos** | Testes de fluxo de compra e persistência de dados. |

### 

### **Testes E2E (Portal GE)**

| Funcionalidade | Tag | Descrição |
| :---- | :---- | :---- |
| **Destaques** | @destaque | Valida visibilidade das manchetes principais. |
| **Listagem** | @minimo10noticias | Valida carregamento via scroll infinito. |
| **Integridade** | @camposobrigatorios | Valida presença de Título, Resumo, Imagem e Link. |
| **Navegação** | @redirecionamento | Verifica integridade da URL ao clicar na matéria. |
| **Clube** | @navegacao\_serieA | Valida filtro e busca por times específicos. |

---

## **📊 Evidências e Reports**

Ao final das execuções, o framework gera um relatório em reports/cucumber\_report.html. Em caso de falha de interface, a evidência em imagem estará embutida diretamente no passo que falhou.

---

## 🐞 Bugs Encontrados

Durante a execução da suíte de testes automatizados, foi identificado um comportamento inesperado no ambiente. A evidência detalhada, incluindo passos para reprodução e impacto, pode ser consultada no link abaixo:

* [**Relatório de Bug: Falha na validação de X**](./BUG_REPORT.md)


---
