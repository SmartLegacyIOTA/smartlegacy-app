import * as Passkeys from "react-native-passkeys";

export class RNPasskeyProvider {
  async create(args: {
    rpId: string;
    challengeB64u: string;
    user: { idB64u: string; name: string; displayName: string };
  }): Promise<any> {
    return await Passkeys.create({
      challenge: args.challengeB64u, // 👈 STRING base64url
      rp: {
        id: args.rpId,
        name: process.env.EXPO_PUBLIC_APP_NAME || "SmartLegacy",
      },
      user: {
        id: args.user.idB64u, // 👈 STRING base64url
        name: args.user.name,
        displayName: args.user.displayName,
      },
      pubKeyCredParams: [{ type: "public-key", alg: -7 }],
      authenticatorSelection: {
        residentKey: "required",
        userVerification: "required",
      },
      attestation: "none",
      timeout: 60000,
    });
  }

  async get(args: {
    rpId: string;
    challengeB64u: string;
    allowCredentialIdsB64u?: string[];
  }): Promise<any> {
    return await Passkeys.get({
      challenge: args.challengeB64u, // 👈 STRING base64url
      rpId: args.rpId,
      userVerification: "required",
      allowCredentials: args.allowCredentialIdsB64u?.map((id) => ({
        id, // 👈 base64url
        type: "public-key",
      })),
      timeout: 60000,
    });
  }
}
