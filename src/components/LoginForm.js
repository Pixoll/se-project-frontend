import "../styles/LoginForm.css"
// import { useAuth } from "../hooks/useAuth";
// import useRequest from "../hooks/useRequest";
import useForm from "../hooks/useForm";

/**
 * @param {{ type: import("../context/AuthContext").TokenType }} props
 * @returns {JSX.Element}
 * @constructor
 */
export default function LoginForm({ type }) {
    const { formState, onInputChange, onResetForm } = useForm({
        rut: "",
        password: "",
    });
    // const { state, login, logout } = useAuth();
    //
    // /** @type {(e: import("react").FormEvent) => void} */
    // const onLogin = (e) => {
    //     e.preventDefault();
    //
    //     useRequest("post", `/${type}s/${formState.rut}/session`)
    // };

    return (
        <div className="login-container">
            <div className="login-div">
                <form className="login-form">
                    <label htmlFor="rut">Rut</label>
                    <input
                        name="rut"
                        value={formState.rut}
                        onChange={onInputChange}
                        placeholder="Rut"
                        required
                    />
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={formState.password}
                        onChange={onInputChange}
                        placeholder="Contraseña"
                        required
                    />
                </form>
                <button type="submit" className="nav-button">
                    INICIAR SESIÓN
                </button>
            </div>
        </div>
    );
}
