export const authKeys = {
  all: ["auth"] as const,
  google: () => [...authKeys.all, "google"] as const,
};
