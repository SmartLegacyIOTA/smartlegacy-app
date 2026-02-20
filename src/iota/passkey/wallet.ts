import { PasskeyKeypair } from "@iota/iota-sdk/keypairs/passkey";
import { RNPasskeyProvider } from "@/src/libs/rn-passkey/RNPasskeyProvider";

const createWallet = async () => {
  const provider = new RNPasskeyProvider("qa-api.smartlegacy.tech");
  const signer = await PasskeyKeypair.getPasskeyInstance(provider);
};
