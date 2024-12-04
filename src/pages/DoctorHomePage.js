import { Link, Navigate, Route, Routes } from "react-router-dom";
import CalendarPage from "./CalendarPage";
import DoctorLoginPage from "./DoctorLoginPage";
import SchedulePage from "./SchedulePage";

export default function DoctorHomePage() {
    return (
        <>
            <nav>
                <Link to="/doctor/login">Inicio</Link>
                |
                <Link to="/doctor/calendar">Calendario</Link>
                |
                <Link to="/doctor/schedule">Días de trabajo</Link>
            </nav>
            <Routes>
                <Route path="/doctor/login" element={<DoctorLoginPage/>}/>
                <Route path="/doctor/calendar" element={<CalendarPage/>}/>
                <Route path="/doctor/schedule" element={<SchedulePage/>}/>
                <Route path="*" element={<Navigate to="/doctor/login" replace/>}/>
            </Routes>
        </>
    );
}
