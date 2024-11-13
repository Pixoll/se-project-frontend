import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container1 from './components/Container1';  // Asegúrate que la ruta de Container1 sea correcta
import ScheduledAppointments from './components/ScheduledAppointments';  // Importa la vista de citas agendadas

function App() {
    return (
        <Router>
            <Routes>
                {/* Ruta para la página principal */}
                <Route path="/" element={<Container1 />} />

                {/* Ruta para la vista de citas agendadas del paciente */}
                <Route path="/paciente/citas" element={<ScheduledAppointments />} />
            </Routes>
        </Router>
    );
}

export default App;
