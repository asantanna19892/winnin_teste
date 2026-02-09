@api @cart
Feature: Gerenciamento de Carrinho do cliente (API)
    Como um cliente autenticado
    Eu quero ser capaz de adicionar produtos ao meu carrinho
    Para que eu possa finalizar minhas compras posteriormente

Background: Pre-requisitos de Carrinho
    Given que estou logado com um usuario comum
    And que existe um produto cadastrado no sistema

@addToCart
Scenario: Adicionar produto ao carrinho com sucesso
    When defino um produto existente com quantidade valida
    And envio uma requisicao POST para "/produtos"
    And envio uma requisicao POST para "/carrinho/adicionar"
    Then o status code deve ser 201
    And a resposta deve conter a mensagem "Cadastro realizado com sucesso"
    And a resposta deve conter o parametro "_id" do produto adicionado ao carrinho  

@invalidQuantity
Scenario: Tentar adicionar produto ao carrinho com quantidade invalida
    When defino um produto existente com quantidade invalida
    And envio uma requisicao POST para "/carrinho/adicionar"
    Then o status code deve ser 400
    And a resposta deve conter a mensagem "quantidade deve ser um número positivo"  

