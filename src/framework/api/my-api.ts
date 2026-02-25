import HttpError from "../utils/errors/http-error";
import { getAuthModule } from "./endpoints/auth-request";

// Usamos process.env ya que react-native-config no parece estar instalado,
// o podemos usar variables de entorno de Expo.
export const API_URL =
  (process.env.EXPO_PUBLIC_API_URL || "https://qa-api.smartlegacy.tech/") +
  "api";

export type API_METHODS = "GET" | "PUT" | "POST" | "DELETE" | "PATCH";

export type MyApiType = ReturnType<typeof buildMyApi>;

export type MyApiRequest = (
  url: string,
  method: API_METHODS,
  body?: unknown,
  signal?: AbortSignal,
) => Promise<Response>;

export function buildMyApi(
  token: string | null,
  closeAndRemoveSession: () => void,
) {
  const myApiHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    myApiHeaders["Authorization"] = `Bearer ${token}`;
  }

  const myApiAuthHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  async function myFetch(
    url: string,
    method: API_METHODS,
    body: unknown,
    headers: Record<string, string>,
    stringifyBody: boolean = true,
  ) {
    return await fetch(API_URL + url, {
      method: method,
      headers: headers,
      body: stringifyBody ? JSON.stringify(body) : (body as BodyInit | null),
    });
  }

  async function requestAuth(url: string, method: API_METHODS, body?: unknown) {
    const response = await myFetch(url, method, body, myApiAuthHeaders);
    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      const parsedBody =
        contentType && contentType.includes("application/json")
          ? await response.json()
          : await response.text();

      const errorMessage =
        parsedBody?.error || parsedBody?.message || parsedBody || "error";
      throw new HttpError(response.status, response.statusText, errorMessage);
    }

    return response;
  }

  async function request(url: string, method: API_METHODS, body?: unknown) {
    const isMultipart = body instanceof FormData;
    const currentHeaders = { ...myApiHeaders };
    if (isMultipart) {
      delete currentHeaders["Content-Type"];
    }

    const response = await myFetch(
      url,
      method,
      body,
      currentHeaders,
      !isMultipart,
    );

    if (!response.ok) {
      if (response.status === 401) {
        closeAndRemoveSession();
      }
      const contentType = response.headers.get("content-type");

      const parsedBody =
        contentType && contentType.includes("application/json")
          ? await response.json()
          : await response.text();

      const errorMessage =
        parsedBody?.error || parsedBody?.message || parsedBody || "error";

      console.error(
        `🚨 Error: Status code ${response.status} for URL: ${url}  errorMessage: ${errorMessage} 🚨`,
      );

      throw new HttpError(response.status, response.statusText, errorMessage);
    }

    return response;
  }

  function auth() {
    return getAuthModule(requestAuth);
  }

  return {
    auth,
  };
}
