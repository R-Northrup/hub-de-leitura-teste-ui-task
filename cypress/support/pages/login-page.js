class Login {

    //seletores
    campoEmail() { return cy.get('#email') }
    campoSenha() { return cy.get('#password') }
    botaoEntrar() { return cy.get('#login-btn') }

    //métodos
    fazerLogin(email, senha) {
        if (email) this.campoEmail().clear().type(email)
        if (senha) this.campoSenha().clear().type(senha, {log: false})
        this.botaoEntrar().click()
    }
}
export default new Login()
