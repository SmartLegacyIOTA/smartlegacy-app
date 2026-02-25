import React, { createContext, useContext, useMemo } from "react";
import { buildMyApi, MyApiType } from "./my-api";

type MyApiContextType = {
  api: MyApiType;
};

const MyApiContext = createContext<MyApiContextType | undefined>(undefined);

export const MyApiProvider: React.FC<{
  token: string | null;
  logoutFn: () => void;
  children: React.ReactNode;
}> = ({ token, logoutFn, children }) => {
  const api = useMemo(() => buildMyApi(token, logoutFn), [token, logoutFn]);

  return (
    <MyApiContext.Provider value={{ api }}>{children}</MyApiContext.Provider>
  );
};

export const useMyApi = () => {
  const context = useContext(MyApiContext);
  if (!context) {
    throw new Error("useMyApi must be used within a MyApiProvider");
  }
  return context.api;
};
