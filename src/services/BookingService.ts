import { AxiosResponse } from "axios";
import Response from "@/dtos/Response";
import { BookingBaiscDto } from "@/dtos/BookingBaiscDto";
import { BookingModel } from "@/models/BookingModel";
import { BookingDto } from "@/dtos/BookingDto";
import BookingParams from "@/params/BookingParams";
import { injectable } from "inversify";
import IBookingService from "./interfaces/IBookingService";
import IHttpService from "./interfaces/IHttpService";

import { container } from "@/config/ioc";
import { TYPES } from "@/config/types";

@injectable()
export default class BookingService implements IBookingService {
  private readonly httpService: IHttpService;
  constructor(httpService = container.get<IHttpService>(TYPES.IHttpService)) {
    this.httpService = httpService;
  }

  get(): Promise<AxiosResponse<Response<BookingDto[]>>> {
    console.log(`Url: ${this.httpService.call()}`);
    const result = this.httpService
      .call()
      .get<BookingDto[], AxiosResponse<Response<BookingDto[]>>>(`/bookings`);
    return result;
  }

  getbyDate(
    p: BookingParams
  ): Promise<AxiosResponse<Response<BookingBaiscDto>>> {
    const result = this.httpService
      .call()
      .get<BookingBaiscDto, AxiosResponse<Response<BookingBaiscDto>>>(
        `/bookings/getbydate`,
        {
          params: p,
        }
      );
    return result;
  }
  post(model: BookingModel): Promise<AxiosResponse<Response<BookingDto>>> {
    const result = this.httpService
      .call()
      .post<BookingDto, AxiosResponse<Response<BookingDto>>>(
        `/bookings`,
        model
      );
    return result;
  }
}
