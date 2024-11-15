import { Request } from "express";

declare module "express" {
  interface Request {
    user?: string; // Adding the user property to the Request 
  }
}

export interface User {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
