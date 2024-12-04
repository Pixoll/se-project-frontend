import { Context, FunctionComponent, ReactNode } from "react";

export type TokenType = "patient" | "medic" | "admin";

export type AuthState = {
    isAuthenticated: boolean;
    type: TokenType | null;
    token: string | null;
};

export type AuthAction = {
    type: "login";
    payload: {
        type: TokenType;
        token: string;
    };
} | {
    type: "logout";
};

export type AuthContextType = {
    state: AuthState;
    login: (type: TokenType, token: string) => void;
    logout: () => void;
};

export type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext: Context<AuthContextType | undefined>;

declare const AuthProvider: FunctionComponent<AuthProviderProps>;

export default AuthProvider;
