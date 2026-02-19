import * as AppleAuthentication from 'expo-apple-authentication';

export async function appleLoginGetIdentityToken() {
    const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
    });

    // identityToken es un JWT de Apple
    return credential.identityToken ?? null;
}
