import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
};

export async function googleLoginGetIdToken(params: {
  googleClientId: string; // Web Client ID (recomendado para id_token)
}) {
  const redirectUri = AuthSession.makeRedirectUri({ scheme: "smartlegacy" });

  const request = new AuthSession.AuthRequest({
    clientId: params.googleClientId,
    scopes: ["openid", "profile", "email"],
    redirectUri,
    responseType: AuthSession.ResponseType.IdToken,
    extraParams: { nonce: "nonce" }, // simple
  });

  const result = await request.promptAsync(discovery);

  if (result.type !== "success") return null;

  // id_token viene en params.id_token
  return result.params?.id_token ?? null;
}
