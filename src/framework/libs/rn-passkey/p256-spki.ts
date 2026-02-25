export const PASSKEY_PUBLIC_KEY_SIZE = 33;
export const PASSKEY_UNCOMPRESSED_PUBLIC_KEY_SIZE = 65;

export const SECP256R1_SPKI_HEADER = new Uint8Array([
  0x30, 0x59, 0x30, 0x13, 0x06, 0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x02, 0x01,
  0x06, 0x08, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x03, 0x01, 0x07, 0x03, 0x42, 0x00,
] as const);

export function parseDerSPKI(derBytes: Uint8Array): Uint8Array {
  if (
    derBytes.length !==
    SECP256R1_SPKI_HEADER.length + PASSKEY_UNCOMPRESSED_PUBLIC_KEY_SIZE
  ) {
    throw new Error("Invalid DER length");
  }
  for (let i = 0; i < SECP256R1_SPKI_HEADER.length; i++) {
    if (derBytes[i] !== SECP256R1_SPKI_HEADER[i])
      throw new Error("Invalid spki header");
  }
  if (derBytes[SECP256R1_SPKI_HEADER.length] !== 0x04)
    throw new Error("Invalid point marker");
  return derBytes.slice(SECP256R1_SPKI_HEADER.length);
}
