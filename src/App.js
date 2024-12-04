import { Route, Routes } from "react-router-dom";
import ScheduledAppointments from "./components/ScheduledAppointments";
import BrowserPage from "./pages/BrowserPage";
import CalendarPage from "./pages/CalendarPage";
import DoctorHomePage from "./pages/DoctorHomePage";
import DoctorLoginPage from "./pages/DoctorLoginPage";
import EmployeePage from "./pages/EmployeePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SchedulePage from "./pages/SchedulePage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/employee" element={<EmployeePage/>}/>
            <Route path="/doctor" element={<DoctorHomePage/>}/>
            <Route path="/appointments" element={<ScheduledAppointments/>}/>
            <Route path="/patient/login" element={<LoginPage/>}/>
            <Route path="/doctor-browser" element={<BrowserPage/>}/>
            <Route path="/doctor/login" element={<DoctorLoginPage/>}/>
            <Route path="/doctor/calendar" element={<CalendarPage/>}/>
            <Route path="/doctor/schedule" element={<SchedulePage/>}/>
        </Routes>
    );
}
