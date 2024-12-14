import IAccountService from "./IAccountService";
import IHttpService from "./IHttpService";
import IUserService from "./IUserService";

export default interface IUnitOfService {
  HttpService: IHttpService;
  AccountService: IAccountService;
  UserService: IUserService;
}
