import { useMemo } from 'react';
import type { IotaSigner } from '../iota.types';

export function useIotaSigner(): IotaSigner | null {
    // Aquí enchufas el signer real (zkLogin)
    return useMemo(() => null, []);
}
