export const vaultKeys = {
  all: ["vault"] as const,
  status: () => [...vaultKeys.all, "status"] as const,
};
