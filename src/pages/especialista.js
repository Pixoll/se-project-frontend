import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Inicio from "./Inicio";
import Calendario from "./Calendario";
import Horario from "./Horario";


function especialista() {
  return (
    <Router>
    <nav>
      <Link to="/InicioDoctor">Inicio</Link> | <Link to="/CalendarioDoctor">Calendario</Link> | <Link to="/HorarioDoctor">Días de trabajo</Link>
      </nav>
      <Routes>
        <Route path="/InicioDoctor" element={<Inicio />} />
        <Route path="/CalendarioDoctor" element={<Calendario />} />
        <Route path="/HorarioDoctor" element={<Horario />} />
        <Route path="*" element={<Navigate to="/InicioDoctor" replace />} />
      </Routes>
    </Router>
  );
}

export default especialista;
