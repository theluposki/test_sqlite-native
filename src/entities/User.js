import { hashPassword, validation } from "../utils/index.js";
import UserService from "../services/UserService.js";

const userService = new UserService();

class User {
  constructor({ nickname, name, birthdate, email, password }) {
    this.nickname = nickname;
    this.name = name;
    this.birthdate = birthdate;
    this.email = email;
    this.password = password;
  }

  async generatePassword(password) {
    return await hashPassword.hash(password);
  }

  async new() {
    if (
      validation.isRequired(
        {
          nickname: this.nickname,
          name: this.name,
          birthdate: this.birthdate,
          email: this.email,
          password: this.password,
        },
        ["nickname", "name", "birthdate", "email", "password"]
      )
    ) {
      return validation.isRequired(
        {
          nickname: this.nickname,
          name: this.name,
          birthdate: this.birthdate,
          email: this.email,
          password: this.password,
        },
        ["nickname", "name", "birthdate", "email", "password"]
      );
    }

    if (validation.isEmail(this.email)) {
      return validation.isEmail(this.email);
    }

    if (validation.isValidAge(this.birthdate)) {
      return validation.isValidAge(this.birthdate);
    }

    if (validation.isValidPassword(this.password)) {
      return validation.isValidPassword(this.password);
    }

    return {
      nickname: this.nickname,
      name: this.name,
      birthdate: this.birthdate,
      email: this.email,
      password: await this.generatePassword(this.password),
    };
  }
}

export default User;
