import React, { createContext, Dispatch, ReactNode, useCallback, useEffect, useReducer, } from "react";

/** @type {AuthState} */
const initialState = {
    isAuthenticated: false,
    type: null,
    token: null,
};

/** @type {React.Context<AuthContextType | undefined>} */
export const AuthContext = createContext(undefined);

/**
 * @param {AuthState} state
 * @param {AuthAction} action
 * @returns {AuthState}
 */
const authReducer = (state, action) => {
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

/**
 * @type {React.FC<AuthProviderProps>}
 */
const AuthProvider = ({ children }) => {
    // noinspection JSCheckFunctionSignatures
    const [state, dispatch] = /** @type {[AuthState, React.Dispatch<AuthAction>]} */ (
        useReducer(authReducer, initialState)
    );

    useEffect(() => {
        const token = localStorage.getItem("token");
        const type = localStorage.getItem("token-type");
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
    }, [state.isAuthenticated, state.token]);

    const login = useCallback(
        /**
         * @param {TokenType} type
         * @param {string} token
         */
        (type, token) => {
            dispatch({
                type: "login",
                payload: {
                    type,
                    token,
                },
            });
        },
        []
    );

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

/**
 * @typedef {"patient" | "medic" | "admin"} TokenType
 */

/**
 * @typedef {{
 *     isAuthenticated: boolean;
 *     type: TokenType | null;
 *     token: string | null;
 * }} AuthState
 */

/**
 * @typedef {{
 *     type: "login";
 *     payload: {
 *         type: TokenType;
 *         token: string;
 *     };
 * } | {
 *     type: "logout";
 * }} AuthAction
 */

/**
 * @typedef {{
 *     state: AuthState;
 *     login: (type: TokenType, token: string) => void;
 *     logout: () => void;
 * }} AuthContextType
 */

/**
 * @typedef {{
 *     children: ReactNode;
 * }} AuthProviderProps
 */