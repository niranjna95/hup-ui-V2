import IAccountService from "./IAccountService";
import IHttpService from "./IHttpService";
import IUserService from "./IUserService";
import IBookingService from "./IBookingService";

export default interface IUnitOfService {
  HttpService: IHttpService;
  AccountService: IAccountService;
  UserService: IUserService;
  BookingService: IBookingService;
}
