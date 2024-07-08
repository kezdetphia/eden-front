import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const setUserAuthenticated = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");

        if (token) {
          const userDetails = await SecureStore.getItemAsync("user");
          if (userDetails) {
            setUser(JSON.parse(userDetails));
            setIsAuthenticated(true);
          } else {
            setUser(null);
            setIsAuthenticated(false);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
          console.log("No user or authentication token found");
        }
      } catch (error) {
        console.error("Failed to fetch auth token", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };
    setUserAuthenticated();
  }, []);

  const setUserInfo = async (userDetails) => {
    await SecureStore.setItemAsync("user", JSON.stringify(userDetails));
    setUser(userDetails);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        authLoading,
        setUserInfo,
        setIsAuthenticated,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside an AuthContextProvider");
  }
  return value;
};
