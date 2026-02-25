import { useQuery } from "@tanstack/react-query";
import { useMyApi } from "../../api-provider";
import { vaultKeys } from "../../queryKeys/vault/vault-query-keys";

export const useQueryVaultStatus = () => {
  const api = useMyApi();

  return useQuery({
    queryKey: vaultKeys.status(),
    queryFn: () => api.vault().getStatus(),
  });
};
