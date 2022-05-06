import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  save(user: User): Promise<User> {
      throw new Error("Method not implemented.");
  }
  users: User[] = [];

  async create({
    email,
    name,
    password,
    isAdmin,
  }: ICreateUsersDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      email,
      name,
      password,
      isAdmin,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}

export { UsersRepositoryInMemory };
