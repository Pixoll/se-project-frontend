import { useState } from "react";
import "../styles/LoginForm.css"
import { NavButton } from "./NavButton";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    // };

    return (
        <div className="login-container">
            <div className="login-div">
                <form className="login-form">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo electrónico"
                        required
                    />
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        required
                    />
                </form>
                <NavButton text={"INICIAR SESIÓN"} to={"/doctor-browser"}/>
            </div>
        </div>
    );
}
