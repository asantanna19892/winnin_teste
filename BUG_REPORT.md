# Relatório de Bugs Encontrados

## 🐛 Bug 001 - Inconsistência na exibição do Resumo nas notícias da Home

**Severidade:** Média
**Prioridade:** Alta (Impacta Critério de Aceite)

### Descrição
Durante a execução dos testes automatizados de validação da Home Page, foi identificado que diversos cards de notícias não apresentam o campo "Resumo" (texto descritivo abaixo do título), violando o critério de aceite estabelecido.

### Critério de Aceite (BDD)
> "Cada notícia deve conter: Título, Imagem destacada, **Resumo**"

### Comportamento Atual
Cards de notícias são renderizados na Home apenas com Título, Imagem e Metadados (Chapéu), omitindo o resumo.

### Evidência Técnica
O teste automatizado falha ao buscar o seletor `.feed-post-body-resumo`em cards específicos.

<img width="637" height="322" alt="falha_redirecionamento" src="https://github.com/user-attachments/assets/5029f8ac-9eef-4f96-8eae-a2b9c1228934" />


**Exemplo de Log de Falha:**
```text
🔴 ERRO DE VALIDAÇÃO NA NOTÍCIA #5
📰 Título: "Flamengo e Corinthians buscam acerto em negócio por Allan"
❌ Falha: O campo 'resumo' não foi encontrado ou está incorreto.
