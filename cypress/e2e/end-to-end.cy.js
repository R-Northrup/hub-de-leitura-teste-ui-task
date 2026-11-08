/// <reference types = "cypress"/>
import { faker, fakerPT_BR } from '@faker-js/faker'
import Cadastrar from '../support/pages/cadastro-page'
import Login from '../support/pages/login-page'

describe('Testes End To End do fluxo de cadastro e login', () => {

    /* 
    Testes End To End ou Testes de ponta a ponta, ligam uma série de funcionalidades de um sistema,
    simulando o comportamento do usuário final. Esses testes verificam se diferentes partes do sistema
    funcionam corretamente quando integradas, garantindo que o fluxo completo de uma funcionalidade
    funcione como esperado.
    Aqui iremos criar um teste end to end que cobre o fluxo de cadastro e login de um usuário em um sistema web.
    Em apenas um teste, ou seja, em um único "it", iremos:
    1. Acessar a página de cadastro.
    2. Preencher o formulário de cadastro com dados válidos.
    3. Submeter o formulário e verificar se o cadastro foi bem-sucedido.
    4. Acessar a página de login.
    5. Preencher o formulário de login com as credenciais do usuário recém-cadastrado.
    6. Submeter o formulário de login e verificar se o login foi bem-sucedido.

    Use as boas práticas aprendidas até agora para estruturar o teste.
    */

    beforeEach(() => {
       cy.visit('register.html')
    });


    it('Deve fazer o cadastro e validar o login com o usuário cadastrado', () => {
       //Criando massa de dados
        let nome1 = fakerPT_BR.person.firstName()
        let nome2 = fakerPT_BR.person.lastName()
        let email = fakerPT_BR.internet.email({firstName: nome1, lastName: nome2})
        let telefone = fakerPT_BR.phone.number()
        let senha = fakerPT_BR.internet.password({length: 20})
        let confirmarSenha = senha
        //Cadastrar
        Cadastrar.fazerCadastro(
            `${nome1} ${nome2}`,
            email,
            telefone,
            senha,
            confirmarSenha)
        //Confirmar o cadastro
        cy.url().should('include', 'dashboard')
        cy.get('.user-info').should('contain', `${nome1} ${nome2}`)
        //Garantir que não está logado
        cy.get('.user-actions > .btn-outline-danger').click()
        //Fazer login com o usuário recém cadastrado
        Login.fazerLogin(email, senha)
        //Login bem sucedido ou não
        cy.url().should('include', 'dashboard')
        cy.get('.user-info').should('contain', `${nome1} ${nome2}`)
    });
});