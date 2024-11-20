import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container1 from './pages/container1';
import ScheduledAppointments from './components/ScheduledAppointments';  // Importa la vista de citas agendadas
import Funcionario from "./pages/funcionario";
import Especialistas from "./pages/especialista";
function App() {
    return (
      <Routes>
        <Route path="/" element={<Container1 />} />
        <Route path="/funcionario" element={<Funcionario />} />
        <Route path="/especialistas" element={<Especialistas />} />
        <Route path="/patients/:rut/appointments" element={<ScheduledAppointments />} />
      </Routes>
    );
  }

export default App;
