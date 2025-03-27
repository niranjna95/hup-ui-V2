import { injectable } from "inversify";
import { getSession } from "next-auth/react";
import IHttpService from "./interfaces/IHttpService";
import axios, { AxiosError, AxiosInstance } from "axios";

@injectable()
export default class HttpService implements IHttpService {
  private readonly baseUrl: string;
  private readonly clientId: string;

  constructor() {
    this.baseUrl = `${
      process.env.NEXT_PUBLIC_API_BASE_URL === undefined
        ? "https://hup-api-fncbczdffdbnb2dg.canadacentral-01.azurewebsites.net"
        : process.env.NEXT_PUBLIC_API_BASE_URL
    }`;
    this.clientId = `${
      process.env.NEXT_PUBLIC_API_CLIENT_ID === undefined
        ? "D95BF9406E39035D87D9EAF4AEA05017EF02ACD1629D52220CAFDD54422A6A35"
        : process.env.NEXT_PUBLIC_API_CLIENT_ID
    }`;
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

    let token = "";
    if (typeof window !== "undefined") {
      token = localStorage.getItem("at") || "";
      if (token) {
        instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      // Validate response
      instance.interceptors.response.use(
        (response) => response,
        (error: Error | AxiosError) => {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              console.log(`This is test ${error.message}`); // Need to implement
            } else if (error.response?.status === 403) {
              console.log("Call access-denied page"); // Need to implement
            }

            let statusCode: number = error.response?.status || 0;
            if (statusCode >= 400 && statusCode < 500) {
              return Promise.reject(error);
            }
          }
          return error;
        }
      );
    }

    return instance;
  }
}
