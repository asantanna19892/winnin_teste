@api @user
Feature: Gerenciamento de Usuários (API)
    Como administrador do sistema
    Quero criar e gerenciar usuários através da API
    Para garantir que apenas usuários autorizados tenham acesso ao sistema      

    @newUser
    Scenario: Criar usuário com sucesso
        Given que defino um usuario novo com dados validos
        When envio uma requisicao POST para "/usuarios"
        Then o status code deve ser 201
        And a resposta deve conter a mensagem "Cadastro realizado com sucesso"
        And salvo o ID do usuario criado

    @invalidEmail
    Scenario: Tentar criar usuário com email invalido
        Given que defino um usuario novo com dados email invalido "emailinvalido.com"
        When envio uma requisicao POST para "/usuarios"
        Then o status code deve ser 400
        And a resposta deve conter a mensagem "email deve ser um email válido"  

    @administradorFalse
    Scenario: Tentar criar usuário com valor incorreto para campo "administrador"
        Given que defino um usuario novo com administrador "teste"
        When envio uma requisicao POST para "/usuarios"
        Then o status code deve ser 400
        And a resposta deve conter a mensagem "administrador deve ser 'true' ou 'false'"    

    @camposobrigatoriosausentes
    Scenario Outline: Tentar criar usuário com campos obrigatorios ausentes
        Given que defino um usuario novo sem o campo obrigatorio "<campo_obrigatorio>"
        When envio uma requisicao POST para "/usuarios"
        Then o status code deve ser 400
        And a resposta deve conter a mensagem "<mensagem_erro>"
        
        Examples:
        | campo_obrigatorio | mensagem_erro               |
        | nome              | nome é obrigatório          |
        | email             | email é obrigatório         |
        | password          | password é obrigatório      |
        | administrador     | administrador é obrigatório |


    