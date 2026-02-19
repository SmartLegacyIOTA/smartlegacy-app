import { Transaction } from '@iota/iota-sdk/transactions';
import { IotaSigner } from '@/src/iota/iota.types';
import { authBiometricOrThrow } from '@/src/security/biometric/biometric.service';
import { getIotaClient } from '@/src/iota/iota.client';
import { i18n } from '@/src/libs/i18n';

const PACKAGE_ID = process.env.EXPO_PUBLIC_IOTA_PACKAGE_ID!;

export function buildCreateVaultTx(inactivityDays: number) {
    const tx = new Transaction();
    tx.moveCall({
        target: `${PACKAGE_ID}::vault::create_vault`,
        arguments: [tx.pure.u64(inactivityDays)]
    });
    return tx;
}

function buildSetHeirTx(vaultId: string, heirAddress: string) {
    const tx = new Transaction();
    tx.moveCall({
        target: `${PACKAGE_ID}::vault::set_heir`,
        arguments: [tx.object(vaultId), tx.pure.address(heirAddress)]
    });
    return tx;
}

type SetHeirArgs = {
    vaultId: string;
    heirId: string; // o heirAddress / heirDid
    signer: IotaSigner;
};

export async function setHeirAction({ vaultId, heirId, signer }: SetHeirArgs) {
    // 1) Gate biométrico
    await authBiometricOrThrow({
        reason: i18n.t('biometric.confirmAssignHeir')
    });

    // 2) Preflight on-chain (opcional pero muy recomendable)
    const client = getIotaClient();
    const obj = await client.getObject({
        id: vaultId,
        options: { showType: true, showContent: true }
    });
    if (!obj?.data) throw new Error(i18n.t('iota.vaultNotFound'));

    const tx = buildSetHeirTx(vaultId, heirId);

    return await signer.signAndExecuteTransaction(tx);
}

export function buildClaimTx({ vaultId }: { vaultId: string }) {
    const tx = new Transaction();
    tx.moveCall({
        target: `${PACKAGE_ID}::vault::claim`,
        arguments: [tx.object(vaultId)]
    });
    return tx;
}
