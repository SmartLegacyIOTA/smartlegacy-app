import { MyApiRequest } from "../my-api";
import {
  AuthResponseDto,
  BackendAuthVerifyDto,
  BackendRegisterVerifyDto,
  GoogleLoginDto,
  OAuthDto,
  RegisterDidDto,
  UserDto,
  WebAuthnChallengeDto,
  WebAuthnRegisterOptionsDto,
} from "../types/auth-types";

export function getAuthModule(
  requestAuth: MyApiRequest,
  request: MyApiRequest,
) {
  // --- Public Endpoints (No Token Required) ---

  async function oauth(body: OAuthDto): Promise<AuthResponseDto> {
    const response = await requestAuth("/v1/auth/oauth", "POST", body);
    return response.json();
  }

  async function register(body: RegisterDidDto): Promise<AuthResponseDto> {
    const response = await requestAuth("/v1/auth/register", "POST", body);
    return response.json();
  }

  async function login(body: GoogleLoginDto): Promise<AuthResponseDto> {
    const response = await requestAuth("/v1/auth/login", "POST", body);
    return response.json();
  }

  async function getAuthOptions(email?: string): Promise<WebAuthnChallengeDto> {
    const query = email ? `?email=${email}` : "";
    const response = await requestAuth(
      `/v1/passkeys/auth-options${query}`,
      "GET",
    );
    return response.json();
  }

  async function verifyAuth(
    body: BackendAuthVerifyDto,
  ): Promise<AuthResponseDto> {
    const response = await requestAuth(
      "/v1/passkeys/auth-verify",
      "POST",
      body,
    );
    return response.json();
  }

  // --- Private Endpoints (Token Required) ---

  async function getMe(): Promise<UserDto> {
    const response = await request("/v1/auth/me", "GET");
    return response.json();
  }

  async function getRegisterOptions(): Promise<WebAuthnRegisterOptionsDto> {
    const response = await request("/v1/passkeys/register-options", "GET");
    return response.json();
  }

  async function verifyRegister(
    body: BackendRegisterVerifyDto,
  ): Promise<AuthResponseDto> {
    const response = await request(
      "/v1/passkeys/register-verify",
      "POST",
      body,
    );
    return response.json();
  }

  async function approveDevice(requestId: string): Promise<void> {
    await request(`/v1/auth/approve/${requestId}`, "POST");
  }

  async function refresh(): Promise<{ accessToken: string }> {
    const response = await request("/v1/auth/refresh", "POST");
    return response.json();
  }

  return {
    // Public
    oauth,
    register,
    login,
    getAuthOptions,
    verifyAuth,
    // Private
    getMe,
    getRegisterOptions,
    verifyRegister,
    approveDevice,
    refresh,
  };
}
