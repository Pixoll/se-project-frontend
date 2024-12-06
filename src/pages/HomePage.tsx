import { NavButton } from "../components/NavButton";
import "../styles/HomePage.css";
import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
    const { state, logout } = useAuth();

    return (
        <div className="home-page">
            <div className="home-page-col-1">
                <h1 className="welcome">Bienvenido</h1>
                <h2 className="sub-welcome">¿Listo para agendar tu cita médica?</h2>
                {state.type === "patient"
                    ? <NavButton text="Ir a panel Paciente" to="/patient/home"/>
                    : <NavButton text="Ingresar como Paciente" to="/patient/login"/>}
                {/*<NavButton text="Ingresar como Paciente" to="/appointments"/>*/}
            </div>
            <div className="home-page-col-2">
                {state.type === "admin"
                    ? <NavButton text="Ir a panel Funcionario" to="/admin/home"/>
                    : <NavButton text="Ingresar como Funcionario" to="/admin/login"/>}
                {state.type === "medic"
                    ? <NavButton text="Ir a panel Especialista" to="/medic/home"/>
                    : <NavButton text="Ingresar como Especialista" to="/medic/login"/>}
            </div>
            {state.isAuthenticated && (
                <button className={"logout-button"} onClick={logout}>
                    Cerrar sesión
                </button>
            )}
        </div>
    );
}
