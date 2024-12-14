import Response from "@/dtos/Response";
import UserDto from "@/dtos/UserDto";
import { AxiosResponse } from "axios";

export default interface IUserService {
  getUser(userId: string): Promise<AxiosResponse<Response<UserDto>>>;
  getCurrentUser(): Promise<AxiosResponse<Response<UserDto>>>;
}
