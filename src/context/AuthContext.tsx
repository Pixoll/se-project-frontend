import { createContext, FunctionComponent, ReactNode, useCallback, useEffect, useReducer } from "react";

const initialState: AuthState = {
    isAuthenticated: false,
    type: null,
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
                ...state,
                isAuthenticated: false,
                type: null,
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
        if (token && type) {
            dispatch({
                type: "login",
                payload: {
                    type,
                    token,
                },
            });
        }
    }, []);

    useEffect(() => {
        if (state.isAuthenticated) {
            localStorage.setItem("token", state.token);
            localStorage.setItem("token-type", state.type);
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("token-type");
        }
    }, [state.isAuthenticated, state.token, state.type]);

    const login = useCallback((type: TokenType, token: string) => {
        dispatch({
            type: "login",
            payload: {
                type,
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
    token: string;
} | {
    isAuthenticated: false;
    type: null;
    token: null;
};

type AuthAction = {
    type: "login";
    payload: {
        type: TokenType;
        token: string;
    };
} | {
    type: "logout";
};

type AuthContextType = {
    state: AuthState;
    login: (type: TokenType, token: string) => void;
    logout: () => void;
};

type AuthProviderProps = {
    children: ReactNode;
};
