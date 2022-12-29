export interface IUser {
  full_name: string;
  mobile_phone_number: string;
  email: string;
  password: string;
  nationality: string;
  order: [string];
  generateAuthToken(isAdmin: boolean): string;
}

export interface IValidateUser {
  full_name: string;
  mobile_phone_number: string;
  email: string;
  password: string;
  nationality: string;
  isAdmin: boolean;
}

export interface IValidateAuth {
  email: string;
  password: string;
}
