import { useState } from "react";
import "../styles/LoginForms.css"
import { ButtonOne } from "./ButtonOne";

export default function LoginFrom() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    // };

    return (
        <div className="ContainerG">
            <div className="ContainerLogin">
                <form className="FormLogin">
                    <label htmlFor="email">RUT o Correo Electronico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo Electronico"
                        required
                    />
                    <label htmlFor="password">Contraseñx</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        required
                    />
                </form>
                <ButtonOne text={"INICIAR SESIÓN"} to={"/Browser"}/>
            </div>
        </div>
    );
}
