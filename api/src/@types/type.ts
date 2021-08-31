export interface GenericObject {
  [x: string]: string | number;
}

export interface Response {
  socketId: string;
  status: string;
  message: string;
}

export interface User {
  socketId: string,
  nickName: string,
}

export interface Chat {
  socketId: string;
  message: string;
}
