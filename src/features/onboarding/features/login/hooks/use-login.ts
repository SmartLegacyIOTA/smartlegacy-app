import { useSession } from '@/src/providers/session';
import { useCurrentUser } from '@/src/providers/user';
import { useEffect, useState } from 'react';

export const useLogin = () => {
    const { signIn } = useSession();
    const { setUser } = useCurrentUser();

    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loadingApple, setLoadingApple] = useState(false);
    const [token, setToken] = useState();

    // const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID!;
    const GOOGLE_WEB_CLIENT_ID = 'xxxxx.apps.googleusercontent.com';

    useEffect(() => {
        // ensureInit()
    }, []);

    const onGoogle = async () => {
        signIn('123');
        // TODO: Remove this mock data and use real backend response
        // Mock user data for testing - simulating a new device that needs authorization
        setUser({
            userId: 'u_123',
            hasPasskey: false,
            trustedDevices: [],
            securityLevel: 'UNSECURED',
            isNewDevice: true
        });
        // try {
        //     setLoadingGoogle(true);
        //     const idToken = await googleLoginGetIdToken({ googleClientId: GOOGLE_WEB_CLIENT_ID });
        //     if (!idToken) return;
        //
        //     const { accessToken, userData } = await exchangeGoogleIdTokenForJwt(idToken);
        //     setToken(accessToken);
        //     signIn(accessToken);
        //
        //     // Get current device ID
        //     const currentDeviceId = await getCurrentDeviceId();
        //
        //     // Check if current device is trusted
        //     const isNewDevice = !userData.hasPasskey &&
        //                        !userData.trustedDevices.includes(currentDeviceId);
        //
        //     // Save user data from backend response
        //     setUser({
        //         userId: userData.userId,
        //         hasPasskey: userData.hasPasskey,
        //         trustedDevices: userData.trustedDevices,
        //         securityLevel: userData.securityLevel,
        //         isNewDevice,
        //         deviceInfo: isNewDevice ? userData.deviceInfo : undefined
        //     });
        //
        //     // Navigation will be handled automatically by _layout.tsx based on user state
        //     // If isNewDevice is true, user will be shown device-authorization screen
        // } catch (e: any) {
        //     Alert.alert('Login error', e?.message ?? 'Unknown');
        // } finally {
        //     setLoadingGoogle(false);
        // }
    };

    const onApple = async () => {
        signIn('123');
        // TODO: Remove this mock data and use real backend response
        // Mock user data for testing - simulating a trusted device with passkey
        setUser({
            userId: 'u_123',
            hasPasskey: true,
            trustedDevices: ['device-123'],
            securityLevel: 'SECURED',
            isNewDevice: false
        });
        // try {
        //     setLoadingApple(true);
        //     const identityToken = await appleLoginGetIdentityToken();
        //     if (!identityToken) return;
        //
        //     const { accessToken, userData } = await exchangeAppleIdentityTokenForJwt(identityToken);
        //     setToken(accessToken);
        //     signIn(accessToken);
        //
        //     // Get current device ID
        //     const currentDeviceId = await getCurrentDeviceId();
        //
        //     // Check if current device is trusted
        //     const isNewDevice = !userData.hasPasskey &&
        //                        !userData.trustedDevices.includes(currentDeviceId);
        //
        //     // Save user data from backend response
        //     setUser({
        //         userId: userData.userId,
        //         hasPasskey: userData.hasPasskey,
        //         trustedDevices: userData.trustedDevices,
        //         securityLevel: userData.securityLevel,
        //         isNewDevice,
        //         deviceInfo: isNewDevice ? userData.deviceInfo : undefined
        //     });
        //
        //     // Navigation will be handled automatically by _layout.tsx based on user state
        //     // If isNewDevice is true, user will be shown device-authorization screen
        // } catch (e: any) {
        //     Alert.alert('Login error', e?.message ?? 'Unknown');
        // } finally {
        //     setLoadingApple(false);
        // }
    };

    return {
        onGoogle,
        onApple,
        loadingGoogle,
        loadingApple
    };
};
