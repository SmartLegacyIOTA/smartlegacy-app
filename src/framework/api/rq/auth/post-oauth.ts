import { useMutation } from "@tanstack/react-query";
import { useMyApi } from "../../api-provider";
import { OAuthDto } from "../../types/auth-types";

export const useMutationOAuth = () => {
  const api = useMyApi();

  return useMutation({
    mutationFn: (body: OAuthDto) => api.auth().oauth(body),
  });
};
