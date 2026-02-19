// src/iota/passkey/types.ts
export type RegistrationCredential = {
    credentialId: Uint8Array; // rawId
    publicKeySpkiDer: Uint8Array; // SPKI DER (o formato que te dé la lib)
};

export type AuthenticationCredential = {
    credentialId: Uint8Array;
    authenticatorData: Uint8Array;
    clientDataJSON: Uint8Array;
    signatureDer: Uint8Array; // DER de P-256
};
