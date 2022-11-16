import { NextApiRequest } from "next";

export interface user {
  fullName: string;
  email: string;
  id: string;
}

export interface NextApiReq extends NextApiRequest {
  user: user;
  login: (user: user, callback: (err: Error) => any) => void;
  logout: (callBack: (err: Error) => void) => void;
}
