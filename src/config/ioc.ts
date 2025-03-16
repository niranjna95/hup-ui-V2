import { Container } from "inversify";
import { TYPES } from "./types";

import IHttpService from "@/services/interfaces/IHttpService";
import IAccountService from "@/services/interfaces/IAccountService";
import IUnitOfService from "@/services/interfaces/IUnitOfService";

import HttpService from "@/services/HttpService";
import AccountService from "@/services/AccountService";
import UnitOfService from "@/services/UnitOfService";
import IUserService from "@/services/interfaces/IUserService";
import UserService from "@/services/UserService";
import IBookingService from "@/services/interfaces/IBookingService";
import BookingService from "@/services/BookingService";

const container = new Container();

container.bind<IHttpService>(TYPES.IHttpService).to(HttpService);
container.bind<IAccountService>(TYPES.IAccountService).to(AccountService);
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IBookingService>(TYPES.IBookingService).to(BookingService);

container.bind<IUnitOfService>(TYPES.IUnitOfService).to(UnitOfService);
export { container };
