import { inject, injectable } from "tsyringe";
import bcrypt from 'bcrypt';
import { AppError } from "@shared/errors/AppError";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

interface Data 
{
  id: string;
  email: string;
  name: string;
  password: string;
  old_password?: string;
}

@injectable()
class UpdateUserUseCase 
{
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    id,
    email,
    name,
    password,
    old_password,
  }: Data): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) 
    {
      throw new AppError('User not found');
    }

    const userAlreadyExists = await this.usersRepository.findByEmail( email );

    if ( userAlreadyExists ) 
    {
      throw new AppError("User already exists");
    }

    user.name = name;
    user.email = email;

    if ( password && !old_password) 
    {
      throw new AppError(
        'You need to inform  the old password to set a new password.',
      );
    }

    if (password && old_password) 
    {
      const checkOldPassword = await bcrypt.compare(
        old_password,
        user.password,
      );

      if (!checkOldPassword) 
      {
        throw new AppError('Old password does not match.');
      }

      user.password = await bcrypt.hash(password, 8);
    }

    return this.usersRepository.save(user);
  }
}

export { UpdateUserUseCase };
