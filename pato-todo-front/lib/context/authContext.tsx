"use client";

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useRef,
} from "react";
import { usePathname, useRouter } from "next/navigation";

interface AuthContextType {
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
  id: number | null;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const previousTokenRef = useRef<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken !== previousTokenRef.current) {
      previousTokenRef.current = storedToken;

      if (storedToken) {
        const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));
        const userEmail = decodedToken.email;
        const userId = decodedToken.userId;
        setEmail(userEmail);
        setId(userId);
        setToken(storedToken);
        if (pathname != `/user/${userEmail}`) router.push(`/user/${userEmail}`);
      } else {
        setEmail(null);
        setToken(null);
        router.push("/");
      }
    }
  }, [pathname, email]);

  const logOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("toDoList");
    setEmail(null);
    setToken(null);
    setId(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ email, setEmail, token, setToken, logOut, id, setId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
