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
                <NavButton text="Agendar una cita" to="/new-appointment"/>
                {state.type === "patient"
                    ? <NavButton text="Ir a panel Paciente" to="/patient/home" style={{ marginBottom: "10vh" }}/>
                    : <NavButton text="Ingresar como Paciente" to="/patient/login" style={{ marginBottom: "10vh" }}/>}
            </div>
            <div className="home-page-col-2">
                {state.type === "admin"
                    ? <NavButton text="Ir a panel Funcionario" to="/admin/home" style={{ margin: "10vh" }}/>
                    : <NavButton text="Ingresar como Funcionario" to="/admin/login" style={{ margin: "10vh" }}/>}
                {state.type === "medic"
                    ? <NavButton text="Ir a panel Especialista" to="/medic/home" style={{ margin: "10vh" }}/>
                    : <NavButton text="Ingresar como Especialista" to="/medic/login" style={{ margin: "10vh" }}/>}
            </div>
            {state.isAuthenticated && (
                <button className={"logout-button"} onClick={logout}>
                    Cerrar sesión
                </button>
            )}
        </div>
    );
}
