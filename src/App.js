import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container1 from './pages/container1';
import ScheduledAppointments from './components/ScheduledAppointments';  // Importa la vista de citas agendadas
import Doctor from "./pages/doctor";
import LoginFunEsp from './pages/LoginFunEspe';
import Browser from './pages/Browser';
import BrowserDoctor from './pages/BrowserDoctor';
function App() {
    return (
      <Routes>
        <Route path="/" element={<Container1 />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/patients/:rut/appointments" element={<ScheduledAppointments />} />
        <Route path='/LoginFunEsp' element={<LoginFunEsp />}/>
        <Route path='/Browser' element={<Browser/>}/>
        <Route path='/BrowserDoctor' element={<BrowserDoctor/>}/>
      </Routes>
        
    );
  }

export default App;
