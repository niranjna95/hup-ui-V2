import { TYPES } from "@/config/types";
import IHttpService from "./interfaces/IHttpService";
import IUnitOfService from "./interfaces/IUnitOfService";
import { container } from "@/config/ioc";
import { injectable } from "inversify";
import IAccountService from "./interfaces/IAccountService";
import IUserService from "./interfaces/IUserService";
import IBookingService from "./interfaces/IBookingService";

@injectable()
export default class UnitOfService implements IUnitOfService {
  public HttpService: IHttpService;
  public AccountService: IAccountService;
  public UserService: IUserService;
  public BookingService: IBookingService;

  constructor(
    httpService = container.get<IHttpService>(TYPES.IHttpService),
    accountService = container.get<IAccountService>(TYPES.IAccountService),
    userService = container.get<IUserService>(TYPES.IUserService),
    bookingService = container.get<IBookingService>(TYPES.IBookingService)
  ) {
    this.HttpService = httpService;
    this.AccountService = accountService;
    this.UserService = userService;
    this.BookingService = bookingService;
  }
}
