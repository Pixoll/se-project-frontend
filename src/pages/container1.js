import React from "react";
import { ButtonOne } from "../components/ButtonOne"; // Importa el componente ButtonOne
import "../styles/container1.css"

export default function Container1() {
  return (
    <div className="Container1">
      <div className="Column_1">
        <h1 className="welcome">Bienvenido</h1>
        <h2 className="subWelcome">¿Listo para agendar tu cita médica?</h2>
        <ButtonOne text="Ingresar como Paciente" to="/LoginFunEsp" />
        <ButtonOne text="Ingresar como Paciente" to="/patients/:rut/appointments" />
      </div>
      <div className="columna2">
        <ButtonOne text="Ingresar como Funcionario" to="/funcionario" />
        <ButtonOne text="Ingresar como Especialista" to="/doctor" />
      </div>
    </div>
  );
}
