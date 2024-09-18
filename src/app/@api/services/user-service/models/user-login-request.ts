export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserCreateRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userName: string;
}
