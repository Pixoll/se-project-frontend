import "../styles/LoginForm.css";
import axios from "axios";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { TokenType } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import useForm from "../hooks/useForm";

type LoginFormProps = {
    type: TokenType;
    redirectTo: string;
};

export default function LoginForm({ type, redirectTo }: LoginFormProps) {
    const { formState, onInputChange, onResetForm } = useForm({
        rut: "",
        password: "",
    });
    const navigate = useNavigate();
    const { login } = useAuth();

    const onLogin = (e: FormEvent) => {
        console.log("submit");
        e.preventDefault();

        axios
            .post(`http://localhost:3000/api/v1/${type}s/${formState.rut}/session`, {
                password: formState.password,
            })
            .then((response) => {
                if (response.status >= 400) {
                    console.error("login failed:", response.data);
                    return;
                }

                const token = response.data.token as string;
                login(type, formState.rut, token);
                onResetForm();
                navigate(`/${type + (redirectTo.startsWith("/") ? redirectTo : "/" + redirectTo)}`);
            })
            .catch((error) => {
                console.log("login failed:", error.response.data);
            });
    };

    return (
        <div className="login-container">
            <div className="login-div">
                <form className="login-form" onSubmit={onLogin}>
                    <label htmlFor="rut">Rut</label>
                    <input
                        type="text"
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
                    <button type="submit" className="nav-button">
                        INICIAR SESIÓN
                    </button>
                </form>
            </div>
        </div>
    );
}
