/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://voosh-task-manager-1.onrender.com";

export class AuthServices {
  private backendUrl: string;

  constructor() {
    this.backendUrl = BACKEND_URL
      ? `${BACKEND_URL}/api/auth`
      : "https://voosh-task-manager-1.onrender.com/api/auth";
  }

  private async handleResponse<T>(
    response: AxiosResponse<T>
  ): Promise<ApiResponse<T>> {
    if (response.status >= 200 && response.status < 300) {
      return { data: response.data };
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      //@ts-ignore
      return { error: response.data?.message || "Request failed" };
    }
  }

  private async fetchJson<T>(
    url: string,
    options: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await axios(url, options);
      return this.handleResponse<T>(response);
    } catch (error) {
      // console.error("Fetch error:", error);
      if (axios.isAxiosError(error) && error.response) {
        return { error: error.response.data?.message || "Network error" };
      }
      return { error: "Network error" };
    }
  }

  async registerUser(data: any): Promise<ApiResponse<any>> {
    const options: AxiosRequestConfig = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
    };

    return this.fetchJson<any>(`${this.backendUrl}/register`, options);
  }

  async loginUser(data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<any>> {
    const options: AxiosRequestConfig = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
    };

    return this.fetchJson<any>(`${this.backendUrl}/login`, options);
  }
}
