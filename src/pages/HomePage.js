import { NavButton } from "../components/NavButton";
import "../styles/HomePage.css"

export default function HomePage() {
    return (
        <div className="home-page">
            <div className="home-page-col-1">
                <h1 className="welcome">Bienvenido</h1>
                <h2 className="sub-welcome">¿Listo para agendar tu cita médica?</h2>
                <NavButton text="Ingresar como Paciente" to="/patient/login"/>
                <NavButton text="Ingresar como Paciente" to="/appointments"/>
            </div>
            <div className="home-page-col-2">
                <NavButton text="Ingresar como Funcionario" to="/employee"/>
                <NavButton text="Ingresar como Especialista" to="/doctor"/>
            </div>
        </div>
    );
}
