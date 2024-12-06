import { createContext, FunctionComponent, ReactNode, useCallback, useEffect, useReducer } from "react";

const initialState: AuthState = {
    isAuthenticated: false,
    type: null,
    rut: null,
    token: null,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "login":
            return {
                ...state,
                isAuthenticated: true,
                ...action.payload,
            };
        case "logout":
            return {
                isAuthenticated: false,
                type: null,
                rut: null,
                token: null,
            };
        default:
            return state;
    }
};

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const type = localStorage.getItem("token-type") as TokenType | null;
        const rut = localStorage.getItem("token-rut");
        if (token && type && rut) {
            dispatch({
                type: "login",
                payload: {
                    type,
                    rut,
                    token,
                },
            });
        }
    }, []);

    useEffect(() => {
        if (state.isAuthenticated) {
            localStorage.setItem("token", state.token);
            localStorage.setItem("token-type", state.type);
            localStorage.setItem("token-rut", state.rut);
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("token-type");
            localStorage.removeItem("token-rut");
        }
    }, [state.isAuthenticated, state.token, state.type, state.rut]);

    const login = useCallback((type: TokenType, rut: string, token: string) => {
        dispatch({
            type: "login",
            payload: {
                type,
                rut,
                token,
            },
        });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("token-type");
        dispatch({
            type: "logout",
        });
    }, []);

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export type TokenType = "patient" | "medic" | "admin";

type AuthState = {
    isAuthenticated: true;
    type: TokenType;
    rut: string;
    token: string;
} | {
    isAuthenticated: false;
    type: null;
    rut: null;
    token: null;
};

type AuthAction = {
    type: "login";
    payload: {
        type: TokenType;
        rut: string;
        token: string;
    };
} | {
    type: "logout";
};

type AuthContextType = {
    state: AuthState;
    login: (type: TokenType, rut: string, token: string) => void;
    logout: () => void;
};

type AuthProviderProps = {
    children: ReactNode;
};
