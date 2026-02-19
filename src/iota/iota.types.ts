import type { Transaction } from '@iota/iota-sdk/transactions';

export type IotaTxDigest = string;

export type IotaSigner = {
    getAddress(): Promise<string>;
    signAndExecuteTransaction(tx: Transaction): Promise<{ digest: IotaTxDigest }>;
};
