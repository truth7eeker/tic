
export interface IUser {
  id: string;
  login: string;
  firstname: string;
  lastname: string;
  birthday: Date ;
  city: string;
  token?: string;
}

export interface ILoginData {
  login: string;
  password: string;
}
