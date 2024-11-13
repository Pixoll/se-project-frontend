import './Container1.css';

function ButtonOne({ text, route }) {
    return (
        <button className="ButtonOne">
            <span className="text-button">{text}</span>
        </button>
    );
}

export default function Container1() {
    return (
        <div className="Container1">
            <div className="Columna1_1">
                <h1 className="welcome">Bienvenido</h1>
                <h2 className="subWelcome">¿Listo para agendar tu cita médica?</h2>
                <ButtonOne text="Ingresar Como Paciente" route="/paciente/agendadas" />
            </div>
            <div className="Columna1_2">
                <ButtonOne text="Ingresar como Funcionario" route="/funcionario" />
                <ButtonOne text="Ingresar como Especialista" route="/especialista" />
            </div>
        </div>
    );
}
