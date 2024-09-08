/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Task } from "../types/types";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export class TaskServices {
  private backendUrl: string;
  private token = useAuthHeader();

  constructor() {
    this.backendUrl = BACKEND_URL
      ? `${BACKEND_URL}/api/task`
      : "http://localhost:3000/api/task";
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

  async getAllTasks(): Promise<ApiResponse<any>> {
    const options: AxiosRequestConfig = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
      },
    };

    return this.fetchJson<any>(`${this.backendUrl}`, options);
  }

  async getSingleTask(taskId: number): Promise<ApiResponse<any>> {
    const options: AxiosRequestConfig = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
      },
    };

    return this.fetchJson<any>(`${this.backendUrl}/${taskId}`, options);
  }

  async createTask(data: any): Promise<ApiResponse<any>> {
    const options: AxiosRequestConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
      },
      data: JSON.stringify(data),
    };

    return this.fetchJson<any>(`${this.backendUrl}/create-task`, options);
  }

  async updateTask(
    taskId: number,
    task: Partial<Task>
  ): Promise<ApiResponse<any>> {
    const options: AxiosRequestConfig = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
      },
      data: JSON.stringify(task),
    };

    return this.fetchJson<any>(
      `${this.backendUrl}/update-task/${taskId}`,
      options
    );
  }

  async deleteTask(taskId: number): Promise<ApiResponse<any>> {
    const options: AxiosRequestConfig = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
      },
    };

    return this.fetchJson<any>(
      `${this.backendUrl}/delete-task/${taskId}`,
      options
    );
  }
}
