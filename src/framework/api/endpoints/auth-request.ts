import { MyApiRequest } from "../my-api";

export function getAuthModule(request: MyApiRequest) {
  async function google(token: string) {
    const response = await request("/user/google", "POST", { token });
    return response.json();
  }

  return {
    google,
  };
}
