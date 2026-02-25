import { useMutation } from "@tanstack/react-query";
import { useMyApi } from "../../api-provider";

import { LinkStartDto } from "../../types/device-types";

export const useMutationLinkStart = () => {
  const api = useMyApi();

  return useMutation({
    mutationFn: (body: LinkStartDto) => api.devices().linkStart(body),
    onSuccess: () => {
      // Invalida listas si fuera necesario, aunque esto devuelve un token
    },
  });
};
