import { User } from "@/entities/User";

export default interface IUserRepository {
  findOneByLogin(login: string): Promise<User | null>;
  save(user: User): Promise<User>;
}
