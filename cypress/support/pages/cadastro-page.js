class Cadastrar {

    //Seletores
    campoNome () {return cy.get('#name')}
    campoEmail() {return cy.get('#email')}
    campoTelefone() {return cy.get('#phone')}
    campoSenha() {return cy.get('#password')}
    campoConfirmarSenha() {return cy.get('#confirm-password')}
    checkTermos() {return cy.get('#terms-agreement')}
    botaoCriarConta() {return cy.get('#register-btn')}


    //Métodos
    fazerCadastro (nome, email, telefone, senha, confirmarSenha){
         if(nome) this.campoNome().clear().type(nome)
         if(email) this.campoEmail().clear().type(email)
        this.campoTelefone().clear().type(telefone)
         if(senha) this.campoSenha().clear().type(senha, {log: false})
         if(confirmarSenha) this.campoConfirmarSenha().clear().type(confirmarSenha, {log: false})
        this.checkTermos().check()
        this.botaoCriarConta().click()
    }
    }
export default new Cadastrar()