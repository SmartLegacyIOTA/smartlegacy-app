import { useMutation } from "@tanstack/react-query";
import { useMyApi } from "../../api-provider";

export const useMutationGoogle = () => {
  const api = useMyApi();

  return useMutation({
    mutationFn: (token: string) => api.auth().google(token),
    onSuccess: (data) => {
      // TODO: Implementar lógica de éxito
      console.log("Google login success:", data);
    },
    onError: (error) => {
      // TODO: Implementar lógica de error
      console.error("Google login error:", error);
    },
  });
};
