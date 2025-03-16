import { injectable } from "inversify";

import IHttpService from "./interfaces/IHttpService";
import axios, { AxiosError, AxiosHeaders, AxiosInstance } from "axios";

@injectable()
export default class HttpService implements IHttpService {
  private readonly baseUrl: string;
  private readonly clientId: string;
  constructor() {
    this.baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;
    this.clientId = `${process.env.NEXT_PUBLIC_API_CLIENT_ID}`;
  }

  externalCall(contentType: string = "application/json"): AxiosInstance {
    let instance = axios.create();
    instance.defaults.headers.common["Content-Type"] = contentType;
    return instance;
  }

  call(contentType: string = "application/json"): AxiosInstance {
    let instance = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true,
    });
    instance.defaults.headers.common["clientId"] = this.clientId;
    instance.defaults.headers.common["Content-Type"] = contentType;

    //validate response
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            //401 Unauthorized is the status code to return when the client provides no credentials or invalid credentials.
            console.log(error); //need to implement
          } else if (error.response?.status === 403) {
            //403 Forbidden is the status code to return when a client has valid credentials but not enough privileges to perform an action on a resource
            console.log("call access-denied page"); //need to implement
          }
        }

        //handle global error

        return Promise.reject(error);
      }
    );
    return instance;
  }
  callWithoutInterceptor(
    contentType: string = "application/json"
  ): AxiosInstance {
    let instance = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true,
    });
    instance.defaults.headers.common["clientId"] = this.clientId;
    instance.defaults.headers.common["Content-Type"] = contentType;

    return instance;
  }
}
