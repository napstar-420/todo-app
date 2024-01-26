export interface AuthDto {
  accessToken?: string;
  user?: UserDto;
}

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}
