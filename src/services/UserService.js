import { database } from "../database/database.js";

class UserService {
  constructor() {}

  getUserByNickname(nickname) {

    console.log("=> ",nickname)

    const result = database
      .prepare("SELECT * FROM users WHERE nickname = ?")
      .get(String(nickname));

      if(result) {
        return JSON.parse(JSON.stringify(result));
      }
      return null;
  }

  async register({ nickname, name, birthdate, email, password }) {
    const userAlreadyExists =  this.getUserByNickname(nickname);

    if(userAlreadyExists) return "Usuário ja existe!!!"

    const query =
      "INSERT INTO users (nickname, name, birthdate, email, password) VALUES (?, ?, ?, ?, ?);";

    const result = database
      .prepare(query)
      .run(String(nickname), String(name), String(birthdate), String(email), String(password));

    if(result.changes === 1) {
      return "Usuário criado com sucesso!"
    }
  }
}

export default UserService;
