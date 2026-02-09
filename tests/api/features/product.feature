@api @product
Feature: Gerenciamento de Produtos (API)
    Como um administrador do sistema
    Eu quero ser capaz de criar produtos
    Para que eu possa disponibilizá-los para os clientes

    Background:
        Given que estou logado com um usuario administrador

    @newProduct
    Scenario: Criar produto com sucesso
        Given que defino um produto novo com dados validos
        When envio uma requisicao POST para "/produtos"
        Then o status code deve ser 201
        And a resposta deve conter a mensagem "Cadastro realizado com sucesso"
        And salvo o ID do produto criado

    @invalidPrice
    Scenario: Tentar criar produto com preço invalido
        Given que defino um produto novo com valor invalido
        When envio uma requisicao POST para "/produtos"
        Then o status code deve ser 400
        And a resposta deve conter a mensagem "preco deve ser um número positivo"

    @missingFields
    Scenario Outline: Validar campos obrigatórios ausentes no cadastro de produto
        Given que tento cadastrar um produto sem o campo "<campo_removido>"
        When envio uma requisicao POST para "/produtos"
        Then o status code deve ser 400
        And a resposta deve conter a mensagem "<mensagem_erro>"

        Examples:
        | campo_removido | mensagem_erro            |
        | nome           | nome é obrigatório       |
        | preco          | preco é obrigatório      |
        | descricao      | descricao é obrigatório  |
        | quantidade     | quantidade é obrigatório |

    @contractValidation
    Scenario: Validar contrato da resposta ao criar produto
        Given que defino um produto novo com dados validos
        When envio uma requisicao POST para "/produtos"
        Then o status code deve ser 201
        And a resposta deve conter os campos "message" e "_id"
        And o campo "message" deve ser do tipo "string"
        And o campo "_id" deve ser do tipo "string"

