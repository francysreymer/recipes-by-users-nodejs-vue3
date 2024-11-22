import { User } from '@/entities/User';

export default interface IUserService {
  getUserByLogin(login: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
}
