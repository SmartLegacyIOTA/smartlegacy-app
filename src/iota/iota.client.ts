import { IotaClient } from "@iota/iota-sdk/client";
import {
  DEFAULT_IOTA_NETWORK,
  IOTA_NETWORK,
  type IotaNetwork,
} from "../config/iota.config";

let singleton: IotaClient | null = null;

export function getIotaClient(
  network: IotaNetwork = DEFAULT_IOTA_NETWORK,
): IotaClient {
  if (!singleton) {
    singleton = new IotaClient({ url: IOTA_NETWORK[network].rpc });
  }
  return singleton;
}
