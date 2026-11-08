/// <reference types = "cypress"/>
import { faker, fakerPT_BR } from '@faker-js/faker'
import Cadastrar from '../support/pages/cadastro-page'
import Login from '../support/pages/login-page'

describe('Testes End To End do fluxo de cadastro e login', () => {
    beforeEach(() => {
        cy.visit('register.html')
    });


    it('Deve fazer o cadastro e validar o login com o usuário cadastrado', () => {
        //Criando massa de dados
        let nome1 = fakerPT_BR.person.firstName()
        let nome2 = fakerPT_BR.person.lastName()
        let email = fakerPT_BR.internet.email({ firstName: nome1, lastName: nome2 })
        let telefone = fakerPT_BR.phone.number()
        let senha = fakerPT_BR.internet.password({ length: 20 })
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
        cy.visit('login.html')
        cy.get('#alert-container > .d-flex > div > .btn-outline-danger').click()
        //Fazer login com o usuário recém cadastrado
        Login.fazerLogin(email, senha)
        //Login bem sucedido ou não
        cy.url().should('include', 'dashboard')
        cy.get('.user-info').should('contain', `${nome1} ${nome2}`)
    });
});