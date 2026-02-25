import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMyApi } from "../../api-provider";
import { vaultKeys } from "../../queryKeys/vault/vault-query-keys";
import { CreateVaultDto } from "../../types/vault-types";
import { toastSuccess } from "@/src/framework/lib/toast/toast";
import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";

export const useMutationCreateVault = () => {
  const api = useMyApi();
  const queryClient = useQueryClient();
  const { t } = useI18nService();

  return useMutation({
    mutationFn: (body: CreateVaultDto) => api.vault().createVault(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vaultKeys.status() });
      toastSuccess(t("home.vaultCreated"));
    },
    onError: (error: any) => {
      // toastError(t("addHeir.errorSubmitFailed"), {
      //   description: error?.message || error?.errorMessage,
      // });
    },
  });
};
