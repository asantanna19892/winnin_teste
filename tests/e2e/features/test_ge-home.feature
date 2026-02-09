@e2e
Feature: Home do GE - Test Suite
    Como usuario do portal GE
    Quero visualizar noticias e navegar pela home
    Para acessar materias e paginas de clubes

    @destaque 
    Scenario: Exibir manchetes em destaque na home
        Given que estou na home do GE
        Then devo ver as principais manchetes em destaque

    @minimo10noticias
    Scenario: Exibir noticias suficientes na pagina inicial
        Given que estou na home do GE
        When carrego mais noticias
        Then devo ver pelo menos 10 noticias na pagina

    @camposobrigatorios
    Scenario: Validar campos obrigatorios em cada noticia
        Given que estou na home do GE
        When carrego mais noticias
        Then cada noticia deve conter "titulo"
        And cada noticia deve conter "imagem"
        And cada noticia deve conter "link" 
        And cada noticia deve conter "resumo"


    @redirecionamento
    Scenario: Validar redirecionamento de materia
        Given que estou na home do GE
        When clico na primeira noticia
        Then devo ser redirecionado para a materia completa

    @navegacao_serieA
    Scenario: Acessar pagina do clube ao selecionar time da Serie A
        Given que estou na home do GE
        When seleciono o time "Flamengo" da Serie A
        Then devo ver noticias relacionadas ao time "Flamengo"