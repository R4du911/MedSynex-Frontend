export class LoginResponse {
  constructor(
    public accessToken: string,
    public firstLogin: boolean
  ) {
  }
}
