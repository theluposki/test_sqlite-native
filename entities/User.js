import  { hashPassword } from '../utils/index.js'

class User {
    constructor(nickname, nome, idade, email, senha) {
        this.nickname = nickname
        this.nome = nome
        this.idade = idade 
        this.email = email
        this.senha = senha
    }

    async generatePassword (password) {
        return await hashPassword.hash(password);
    }

    async new() {
        return {
            nickname: this.nickname,
            nome: this.nome,
            idade: this.idade,
            email: this.email,
            senha: await this.generatePassword(this.senha)
        }
    }
}

export default User