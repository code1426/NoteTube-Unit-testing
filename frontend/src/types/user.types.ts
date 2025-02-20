export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  usernameEmail: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}
