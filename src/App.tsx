import { Route, Routes } from "react-router-dom";
import PatientHome from "./pages/PatientHome";
import AuthProvider from "./context/AuthContext";
import MedicPage from "./pages/MedicPage";
import CalendarPage from "./pages/CalendarPage";
import MedicHomePage from "./pages/MedicHomePage";
import MedicLoginPage from "./pages/MedicLoginPage";
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import HomePage from "./pages/HomePage";
import PatientLoginPage from "./pages/PatientLoginPage";
import SchedulePage from "./pages/SchedulePage";

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/admin/home" element={<AdminPage/>}/>
                <Route path="/admin/login" element={<AdminLoginPage/>}/>
                <Route path="/patient/appointments" element={<PatientHome/>}/>
                <Route path="/patient/login" element={<PatientLoginPage/>}/>
                <Route path="/medic/home" element={<MedicHomePage/>}/>
                <Route path="/medic/browser" element={<MedicPage/>}/>
                <Route path="/medic/login" element={<MedicLoginPage/>}/>
                <Route path="/medic/calendar" element={<CalendarPage/>}/>
                <Route path="/medic/schedule" element={<SchedulePage/>}/>
            </Routes>
        </AuthProvider>
    );
}
