import { createContext, useContext } from "react";
import { useAuthProvider } from "./hooks/useAuth";

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const auth = useAuthProvider();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth(){
    return useContext(AuthContext);
}