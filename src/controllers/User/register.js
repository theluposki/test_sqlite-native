import api from "../../database/api/index.js"

export const register = (req, res) => {
    const { nickname, name, birthdate, email, password } = req.body

    const user_With_This_Nickname_Already_Exists = api.selectBy({table: 'users', where: { nickname }})
    const user_With_This_Email_Already_Exists = api.selectBy({table: 'users', where: { email }})

    if(user_With_This_Nickname_Already_Exists.nickname || user_With_This_Email_Already_Exists.email) {
        return res.status(400).json({ error: "user already exists"})
    }

    res.status(201).json({ message: "Usuário criado com sucesso!"})
}