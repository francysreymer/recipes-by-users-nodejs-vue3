export default interface IAuthService {
  authenticate(login: string, password: string): Promise<string>;
}
