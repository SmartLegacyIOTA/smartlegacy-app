import {
  createContext,
  type PropsWithChildren,
  use,
  useState,
  useEffect,
} from "react";
import { useStorageState } from "@/src/framework/hooks/use-storage";
import { UserDto } from "../api/types/auth-types";
import { logger } from "@/src/framework/utils/logger/logger";

export interface UserData extends UserDto {
  trustedDevices: string[];
}

const UserContext = createContext<{
  user?: UserData | null;
  setUser: (user: UserData | null) => void;
  isLoading: boolean;
}>({
  setUser: () => null,
  user: null,
  isLoading: false,
});

// Use this hook to access the user info.
export function useCurrentUser() {
  const value = use(UserContext);
  if (!value) {
    throw new Error("useUser must be wrapped in a <UserProvider />");
  }

  return value;
}

export function UserProvider({ children }: PropsWithChildren) {
  const [[isLoading, storedUser], setStoredUser] = useStorageState("user");
  const [user, setUserState] = useState<UserData | null>(null);

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

  const setUser = (userData: UserData | null) => {
    setUserState(userData);
    setStoredUser(userData ? JSON.stringify(userData) : null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
