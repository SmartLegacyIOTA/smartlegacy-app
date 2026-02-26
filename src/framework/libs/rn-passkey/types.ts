export type B64u = string;

export type StoredPasskey = {
  credentialIdsB64u: B64u[]; // Array de IDs
  pub33B64: string; // base64 normal
};
