import { useState, useCallback } from 'react';
import { setHeirAction } from '@/src/iota/services/iota.vault.service';

export function useSetHeir() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const setHeir = useCallback(async (vaultId: string, heirId: string) => {
        try {
            setLoading(true);
            setError(null);
            // if (!user) throw new Error('Not authenticated');
            // if (!signer) throw new Error('Signer not ready');
            const signer = {} as any;
            return await setHeirAction({ vaultId, heirId, signer });
        } catch (e: any) {
            setError(e?.message ?? 'Unknown error');
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    return { setHeir, loading, error };
}
