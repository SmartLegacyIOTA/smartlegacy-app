import { useMutation } from "@tanstack/react-query";
import { useMyApi } from "../../api-provider";
import { OAuthDto } from "../../types/auth-types";
import { toastError } from "@/src/framework/lib/toast/toast";
import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";
import { logger } from "@/src/framework/utils/logger/logger";

export const useMutationOAuth = () => {
  const api = useMyApi();
  const { t } = useI18nService();
  const log = logger.scope("RQ/AUTH");

  return useMutation({
    mutationFn: (body: OAuthDto) => api.auth().oauth(body),
    onError: (error: any) => {
      toastError(t("login.error"));
      log.error("OAuth mutation failed", { message: error?.message });
    },
  });
};
