import { TYPES } from "@/config/types";
import IHttpService from "./interfaces/IHttpService";
import IUnitOfService from "./interfaces/IUnitOfService";
import { container } from "@/config/ioc";
import { injectable } from "inversify";
import IAccountService from "./interfaces/IAccountService";
import IUserService from "./interfaces/IUserService";

@injectable()
export default class UnitOfService implements IUnitOfService {
  public HttpService: IHttpService;
  public AccountService: IAccountService;
  public UserService: IUserService;

  constructor(
    httpService = container.get<IHttpService>(TYPES.IHttpService),
    accountService = container.get<IAccountService>(TYPES.IAccountService),
    userService = container.get<IUserService>(TYPES.IUserService)
  ) {
    this.HttpService = httpService;
    this.AccountService = accountService;
    this.UserService = userService;
  }
}
