import { NextApiRequest } from "next";

export interface user {
  fullName: string;
  email: string;
  image?: string;
  _id: string;
}

export interface record {
  _id: string;
  recordId: string;
  title: string;
  participants?: Map<string, string>;
  active: Boolean;
}

export interface attendance {
  title: string;
  description: string;
  _id: string;
  numberOfParticipants?: number;
  numberOfRecords?: number;
  records?: record[];
  participants?: user[];
}

export interface NextApiReq extends NextApiRequest {
  user: user;
  login: (user: user, callback: (err: Error) => any) => void;
  logout: (callBack: (err: Error) => void) => void;
}
