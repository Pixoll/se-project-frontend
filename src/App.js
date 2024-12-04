import { Route, Routes } from "react-router-dom";
import ScheduledAppointments from "./components/ScheduledAppointments";
import Browser from "./pages/Browser";
import HomePage from "./pages/HomePage";
import Especialistas from "./pages/Especialista";
import Funcionario from "./pages/Funcionario";
import LoginFunEsp from "./pages/LoginFunEspe";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/funcionario" element={<Funcionario/>}/>
            <Route path="/especialistas" element={<Especialistas/>}/>
            <Route path="/patients/:rut/appointments" element={<ScheduledAppointments/>}/>
            <Route path="/LoginFunEsp" element={<LoginFunEsp/>}/>
            <Route path="/Browser" element={<Browser/>}/>
        </Routes>
    );
}
