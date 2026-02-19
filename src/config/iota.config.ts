export const IOTA_NETWORK = {
    devnet: {
        rpc: 'https://api.devnet.iota.cafe'
    },
    testnet: {
        rpc: 'https://api.testnet.iota.cafe'
    }
} as const;

export type IotaNetwork = keyof typeof IOTA_NETWORK;

export const DEFAULT_IOTA_NETWORK: IotaNetwork = 'testnet';
