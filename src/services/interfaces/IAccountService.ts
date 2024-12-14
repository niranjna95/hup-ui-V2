import LoginDto from "@/dtos/LoginDto";
import PlainDto from "@/dtos/PlainDto";
import LoginModel from "@/models/LoginModel";
import ForgetPasswordModel from "@/models/ForgetPasswordModel";
import { AxiosResponse } from "axios";
import Response from "@/dtos/Response";
import ResetPasswordModel from "@/models/ResetPasswordModel";

export default interface IAccountService {
  login(model: LoginModel): Promise<AxiosResponse<Response<LoginDto>>>;

  forgotPassword(
    model: ForgetPasswordModel
  ): Promise<AxiosResponse<Response<PlainDto>>>;

  resetPassword(
    model: ResetPasswordModel
  ): Promise<AxiosResponse<Response<PlainDto>>>;
}
