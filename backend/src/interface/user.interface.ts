export interface user {
  first_name: string;
  last_name?: string;
  email: string;

  password: string;
}

export interface responseUserData extends user {
  _id: string;
  hash: string;
}
