import React, {
  createContext,
  PropsWithChildren,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useStorageState } from "@/src/framework/hooks/use-storage";
import { UserDto } from "@/src/framework/api/types/auth-types";
import { useQueryClient } from "@tanstack/react-query";
import { logger } from "@/src/framework/utils/logger/logger";

export interface UserData extends UserDto {
  trustedDevices: string[];
}

export type AuthContextType = {
  token: string | null;
  user: UserData | null;
  isLoading: boolean;
  // setters
  setToken: (token: string | null) => void;
  setUser: (user: UserData | null) => void;
  // helpers
  signIn: (token: string, user?: UserData | null) => void;
  closeAndRemoveSession: () => Promise<void>;
  clearUserAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [[loadingToken, storedToken], setStoredToken] =
    useStorageState("session");
  const [[loadingUser, storedUser], setStoredUser] = useStorageState("user");

  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<UserData | null>(null);

  const queryClient = useQueryClient();
  const log = logger.scope("AUTH");

  // hydrate from storage
  useEffect(() => {
    if (!loadingToken) setTokenState(storedToken);
  }, [loadingToken, storedToken]);

  useEffect(() => {
    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch (error: any) {
        const log = logger.scope("USER");
        log.error("Error parsing stored user", { message: error?.message });
        setUserState(null);
      }
    }
  }, [storedUser]);

  const setToken = useCallback(
    (value: string | null) => {
      setTokenState(value);
      setStoredToken(value);
    },
    [setTokenState, setStoredToken],
  );

  const setUser = useCallback(
    (userData: UserData | null) => {
      setUserState(userData);
      setStoredUser(userData ? JSON.stringify(userData) : null);
    },
    [setUserState, setStoredUser],
  );

  const signIn = useCallback(
    (newToken: string, newUser?: UserData | null) => {
      setToken(newToken);
      if (newUser !== undefined) setUser(newUser);
    },
    [setToken, setUser],
  );

  const clearRQ = useCallback(() => {
    try {
      queryClient.clear();
      queryClient.removeQueries();
    } catch (e: any) {
      log.warn("Failed to clear React Query cache", { message: e?.message });
    }
  }, [queryClient, log]);

  const clearUserAuth = useCallback(async () => {
    try {
      setUser(null);
    } catch (e: any) {
      log.warn("clearUserAuth failure", { message: e?.message });
    }
  }, [log, setUser]);

  const closeAndRemoveSession = useCallback(async () => {
    try {
      setToken(null);
      await clearUserAuth();
      clearRQ();
    } catch (e: any) {
      log.error("closeAndRemoveSession error", { message: e?.message });
    }
  }, [clearRQ, clearUserAuth, log, setToken]);

  const value = useMemo<AuthContextType>(
    () => ({
      token,
      user,
      isLoading: loadingToken || loadingUser,
      setToken,
      setUser,
      signIn,
      closeAndRemoveSession,
      clearUserAuth,
    }),
    [
      token,
      user,
      loadingToken,
      loadingUser,
      setToken,
      setUser,
      signIn,
      closeAndRemoveSession,
      clearUserAuth,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = use(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
