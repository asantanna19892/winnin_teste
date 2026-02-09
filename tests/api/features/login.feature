@api @login
Feature: Gerenciamento de Login (API)
    Como usuario do sistema
    Quero realizar login através da API
    Para acessar funcionalidades restritas do sistema

    @sucessLogin
    Scenario: Realizar login com sucesso
        Given que acabo de cadastrar um usuario
        When envio uma requisicao POST para "/login"
        Then o status code deve ser 200
        And a resposta deve conter um token de autenticacao
        And a resposta deve conter a mensagem "Login realizado com sucesso"
  
    @invalidPassword
    Scenario: Tentar realizar login com senha incorreta
        Given que defino um usuario com email "admin@winnin.com" e senha "senhaerrada"
        When envio uma requisicao POST para "/login"
        Then o status code deve ser 401
        And a resposta deve conter a mensagem "Email e/ou senha inválidos" 

    @invalidEmail
    Scenario: Tentar realizar login com email inexistente
        Given que defino um usuario com email "usuarioinexistente@winnin.com" e senha "123456"
        When envio uma requisicao POST para "/login"
        Then o status code deve ser 401
        And a resposta deve conter a mensagem "Email e/ou senha inválidos"  
    
    @missingFields
     Scenario Outline: Tentar realizar login sem preencher os campos obrigatorios
        Given que defino um usuario sem o campo obrigatorio "<campo_obrigatorio>"
        When envio uma requisicao POST para "/login"
        Then o status code deve ser 400
        And a resposta deve conter a mensagem "<mensagem_erro>"

        Examples:
        | campo_obrigatorio | mensagem_erro               |
        | email             | email é obrigatório         |
        | password          | password é obrigatório      |


    