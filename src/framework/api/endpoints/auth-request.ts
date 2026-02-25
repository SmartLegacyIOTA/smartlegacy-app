import { MyApiRequest } from "../my-api";
import {
  AuthResponseDto,
  GoogleLoginDto,
  OAuthDto,
  RegisterDidDto,
  UserDto,
} from "../types/auth-types";

export function getAuthModule(request: MyApiRequest) {
  async function oauth(body: OAuthDto): Promise<AuthResponseDto> {
    const response = await request("/v1/auth/oauth", "POST", body);
    return response.json();
  }

  async function register(body: RegisterDidDto): Promise<AuthResponseDto> {
    const response = await request("/v1/auth/register", "POST", body);
    return response.json();
  }

  async function login(body: GoogleLoginDto): Promise<AuthResponseDto> {
    const response = await request("/v1/auth/login", "POST", body);
    return response.json();
  }

  async function getMe(): Promise<UserDto> {
    const response = await request("/v1/auth/me", "GET");
    return response.json();
  }

  async function refresh(): Promise<{ accessToken: string }> {
    const response = await request("/v1/auth/refresh", "POST");
    return response.json();
  }

  // Mantenemos el anterior por compatibilidad si es necesario,
  // aunque el Swagger usa /v1/auth/login
  async function google(token: string) {
    const response = await request("/user/google", "POST", { token });
    return response.json();
  }

  return {
    oauth,
    register,
    login,
    getMe,
    refresh,
    google,
  };
}
