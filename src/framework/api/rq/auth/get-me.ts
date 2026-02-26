import { queryOptions, useQuery } from "@tanstack/react-query";
import { useMyApi } from "../../api-provider";
import { userKeys } from "../../queryKeys/user/user-keys";
import { useEffect } from "react";
import { useAuth } from "@/src/framework/providers/auth";
import { MyApiType } from "../../my-api";

const getMeQueryOptions = (api: MyApiType, enabled: boolean) =>
  queryOptions({
    queryKey: userKeys.me(),
    queryFn: () => api.auth().getMe(),
    enabled,
  });

export function useQueryGetMe(enabled: boolean = true) {
  const api = useMyApi();
  const { user, setUser } = useAuth();

  const { isLoading, data, isError } = useQuery(
    getMeQueryOptions(api, enabled),
  );

  useEffect(() => {
    if (!data) return;

    setUser({
      ...user,
      ...data,
      nextStep: data.nextStep || user?.nextStep,
      trustedDevices: user?.trustedDevices || [],
    });
  }, [data]);

  return {
    isLoading,
    isError,
    user: data,
  };
}
