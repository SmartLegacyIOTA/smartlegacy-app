import { getIotaClient } from '../iota.client';

export async function iotaPing() {
    const client = getIotaClient();
    // Llamada típica de “¿estás vivo?”
    // Si tu SDK no expone getRpcApiVersion, usa getChainIdentifier o getLatestCheckpointSequenceNumber.
    const chainId = await client.getChainIdentifier();
    return { chainId };
}
