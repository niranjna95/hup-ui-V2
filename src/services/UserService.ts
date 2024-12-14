import { TYPES } from "@/config/types";
import IUserService from "./interfaces/IUserService";
import IHttpService from "./interfaces/IHttpService";
import { container } from "@/config/ioc";
import { AxiosHeaders, AxiosResponse } from "axios";
import { injectable } from "inversify";
import UserDto from "@/dtos/UserDto";
import Response from "@/dtos/Response";

@injectable()
export default class UserService implements IUserService {
  private readonly httpService: IHttpService;
  constructor(httpService = container.get<IHttpService>(TYPES.IHttpService)) {
    this.httpService = httpService;
  }

  getUser(userId: string): Promise<AxiosResponse<Response<UserDto>>> {
    let result = this.httpService
      .call()
      .get<UserDto, AxiosResponse<Response<UserDto>>>(`/User?userId=${userId}`);

    return result;
  }

  getCurrentUser(): Promise<AxiosResponse<Response<UserDto>>> {
    let result = this.httpService
      .call()
      .get<UserDto, AxiosResponse<Response<UserDto>>>(`/User/GetCurrentUser`);

    return result;
  }
}
