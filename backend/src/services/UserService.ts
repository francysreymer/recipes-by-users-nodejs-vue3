import { User } from "@/entities/User";
import IUserRepository from "@/contracts/IUserRepository";
import IUserService from "@/contracts/IUserService";
import createError from "http-errors";
import bcrypt from "bcrypt";

export class UserService implements IUserService {
  private userRepository: IUserRepository;
  private pepper: string;
  private readonly ERROR_MESSAGES = {
    USER_NOT_FOUND: "User not found",
  };

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
    this.pepper = process.env.PEPPER || "defaultPepper";
  }

  getUserByLogin = async (login: string): Promise<User | null> => {
    const user = await this.userRepository.findOneByLogin(login);
    if (!user) {
      throw createError.NotFound(this.ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return user;
  };

  createUser = async (user: User): Promise<User> => {
    // Hash the password with salt and pepper before saving the user
    const saltRounds = 10;
    const saltedPassword = user.senha + this.pepper;
    user.senha = await bcrypt.hash(saltedPassword, saltRounds);

    return await this.userRepository.save(user);
  };
}
