import * as Passkeys from "react-native-passkeys";

export class RNPasskeyProvider {
  constructor(private rpId: string) {}

  async create(): Promise<any> {
    return await Passkeys.create({
      challenge: new TextEncoder().encode("Create IOTA Passkey Wallet"),
      rp: {
        id: this.rpId, // IMPORTANTÍSIMO: tu dominio HTTPS (rpId)
        name: "SmartLegacy",
      },
      user: {
        id: "test", // base64url
        name: "david", // username
        displayName: "David (demo)",
      },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 }, // ES256
      ],
      authenticatorSelection: {
        residentKey: "required",
        userVerification: "required",
      },
    });
  }

  async get(
    challenge: Uint8Array,
    allowCredentialIds?: Uint8Array[],
  ): Promise<any> {
    return await Passkeys.get({
      challenge,
      rpId: this.rpId,
      userVerification: "required",
      allowCredentials: allowCredentialIds?.map((id) => ({
        id,
        type: "public-key",
      })),
    });
  }
}
