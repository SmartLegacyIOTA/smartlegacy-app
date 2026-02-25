import * as LocalAuthentication from "expo-local-authentication";
import { i18n } from "@/src/framework/libs/i18n";

type BiometricGateOptions = {
  reason?: string;
  fallbackLabel?: string; // iOS (puede ignorarse en Android)
};

export async function authBiometricOrThrow(options?: BiometricGateOptions) {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) throw new Error(i18n.t("biometric.notAvailable"));

  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  if (!isEnrolled) throw new Error(i18n.t("biometric.notEnrolled"));

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: options?.reason ?? i18n.t("biometric.defaultPrompt"),
    // iOS: permite PIN fallback si el sistema lo ofrece. Si quieres forzar solo biometría:
    disableDeviceFallback: false,
    // Android: si quieres permitir fallback a credencial del dispositivo:
    // (Expo lo gestiona según plataforma)
  });

  if (!result.success) {
    // Cancel, lockout, fail, etc.
    throw new Error(result.error ?? i18n.t("biometric.failed"));
  }
}
