export type authUserType = {
  id: number;
  name: string;
  email: string;
};

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  createdAt: string;
}
