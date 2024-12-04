import { Route, Routes } from "react-router-dom";
import ScheduledAppointments from "./components/ScheduledAppointments";
import Browser from "./pages/Browser";
import Container1 from "./pages/Container1";
import Especialistas from "./pages/Especialista";
import Funcionario from "./pages/Funcionario";
import LoginFunEsp from "./pages/LoginFunEspe";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Container1/>}/>
            <Route path="/funcionario" element={<Funcionario/>}/>
            <Route path="/especialistas" element={<Especialistas/>}/>
            <Route path="/patients/:rut/appointments" element={<ScheduledAppointments/>}/>
            <Route path="/LoginFunEsp" element={<LoginFunEsp/>}/>
            <Route path="/Browser" element={<Browser/>}/>
        </Routes>
    );
}
