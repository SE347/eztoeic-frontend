"use client";
import { LoginFormValues } from "@/interface/Form";
import User from "@/interface/User";
import { signIn } from "@/services/AuthService";
// import { setupAxiosInterceptors } from "@/services/Axios";
import { isTokenExpired } from "@/utils/Jwt";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextData = {
  user: User | null;
  login: (data: LoginFormValues) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export interface DataStorage {
  user: User;
  isAuthenticated: boolean;
  accessToken: string;
}

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const login = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await signIn(data);
      const { user, accessToken } = response;
      const dataStorage: DataStorage = {
        user: user,
        isAuthenticated: true,
        accessToken: accessToken,
      };
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("dataStorage", JSON.stringify(dataStorage));
      setUser(user);
      setIsAuthenticated(true);
      setIsLoading(false);
      // setupAxiosInterceptors(logout);
      router.push("/");
    } catch (error) {
      setIsLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("dataStorage");
  };
  useEffect(() => {
    const dataStorage = localStorage.getItem("dataStorage");
    if (dataStorage !== null) {
      const data: DataStorage = JSON.parse(dataStorage);
      // console.log(data.accessToken);
      if (isTokenExpired(data.accessToken)) {
        logout();
        return;
      }
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      // setupAxiosInterceptors(logout);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
