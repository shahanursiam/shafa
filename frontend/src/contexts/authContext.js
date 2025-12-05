import { createContext } from "react";

export const AuthContext = createContext({
    isLogigedIn: false,
    userType: null,
});