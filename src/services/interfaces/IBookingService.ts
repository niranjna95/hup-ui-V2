import { AxiosResponse } from "axios";
import Response from "@/dtos/Response";
import { BookingBaiscDto } from "@/dtos/BookingBaiscDto";
import { BookingModel } from "@/models/BookingModel";
import { BookingDto } from "@/dtos/BookingDto";
import BookingParams from "@/params/BookingParams";
export default interface IBookingService {
  get(): Promise<AxiosResponse<Response<BookingDto[]>>>;
  getbyDate(
    p: BookingParams
  ): Promise<AxiosResponse<Response<BookingBaiscDto>>>;
  post(model: BookingModel): Promise<AxiosResponse<Response<BookingDto>>>;
}
