import { secp256r1 } from "@noble/curves/p256";
import {
  parseDerSPKI,
  PASSKEY_PUBLIC_KEY_SIZE,
  PASSKEY_UNCOMPRESSED_PUBLIC_KEY_SIZE,
} from "./p256-spki";

export function normalizePasskeyPublicKeyToCompressed33(
  pkBytes: Uint8Array,
): Uint8Array {
  if (pkBytes.length === PASSKEY_PUBLIC_KEY_SIZE) return pkBytes;

  // DER SPKI: header(26) + 65 = 91
  if (pkBytes.length === 26 + PASSKEY_UNCOMPRESSED_PUBLIC_KEY_SIZE) {
    const uncompressed65 = parseDerSPKI(pkBytes);
    return secp256r1.ProjectivePoint.fromHex(uncompressed65).toRawBytes(true);
  }

  // 65 bytes 04||x||y
  if (
    pkBytes.length === PASSKEY_UNCOMPRESSED_PUBLIC_KEY_SIZE &&
    pkBytes[0] === 0x04
  ) {
    return secp256r1.ProjectivePoint.fromHex(pkBytes).toRawBytes(true);
  }

  // 64 raw XY
  if (pkBytes.length === 64) {
    const uncompressed65 = new Uint8Array(65);
    uncompressed65[0] = 0x04;
    uncompressed65.set(pkBytes, 1);
    return secp256r1.ProjectivePoint.fromHex(uncompressed65).toRawBytes(true);
  }

  throw new Error(`Unsupported public key format/length: ${pkBytes.length}`);
}
