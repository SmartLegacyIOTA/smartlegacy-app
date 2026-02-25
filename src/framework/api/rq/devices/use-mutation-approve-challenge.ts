import { useMutation } from "@tanstack/react-query";
import { useMyApi } from "../../api-provider";
import { ApproveChallengeDto } from "../../types/device-types";
import { toastError } from "@/src/framework/lib/toast/toast";
import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";

export const useMutationApproveChallenge = () => {
  const api = useMyApi();
  const { t } = useI18nService();

  return useMutation({
    mutationFn: (body: ApproveChallengeDto) =>
      api.devices().approveChallenge(body),
    onError: (error: any) => {
      toastError(t("login.error"), {
        description: error?.message || error?.errorMessage,
      });
    },
  });
};
