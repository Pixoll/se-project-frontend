import { ButtonOne } from "../components/ButtonOne";
import "../styles/HomePage.css"

export default function HomePage() {
    return (
        <div className="home-page">
            <div className="home-page-col-1">
                <h1 className="welcome">Bienvenido</h1>
                <h2 className="sub-welcome">¿Listo para agendar tu cita médica?</h2>
                <ButtonOne text="Ingresar como Paciente" to="/LoginFunEsp"/>
                <ButtonOne text="Ingresar como Paciente" to="/patients/:rut/appointments"/>
            </div>
            <div className="home-page-col-2">
                <ButtonOne text="Ingresar como Funcionario" to="/funcionario"/>
                <ButtonOne text="Ingresar como Especialista" to="/especialista"/>
            </div>
        </div>
    );
}
