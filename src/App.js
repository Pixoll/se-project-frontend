import { Route, Routes } from "react-router-dom";
import ScheduledAppointments from "./components/ScheduledAppointments";
import BrowserPage from "./pages/BrowserPage";
import HomePage from "./pages/HomePage";
import DoctorHomePage from "./pages/DoctorHomePage";
import EmployeePage from "./pages/EmployeePage";
import LoginPage from "./pages/LoginPage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/employee" element={<EmployeePage/>}/>
            <Route path="/doctor" element={<DoctorHomePage/>}/>
            <Route path="/appointments" element={<ScheduledAppointments/>}/>
            <Route path="/patient/login" element={<LoginPage/>}/>
            <Route path="/doctor-browser" element={<BrowserPage/>}/>
        </Routes>
    );
}
