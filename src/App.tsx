import { Route, Routes } from "react-router-dom";
import SelectNewAppointmentPage from "./pages/SelectNewAppointmentPage";
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
import MedicSchedulePage from "./pages/MedicSchedulePage";

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/new-appointment" element={<SelectNewAppointmentPage/>}/>
                <Route path="/admin/home" element={<AdminPage/>}/>
                <Route path="/admin/login" element={<AdminLoginPage/>}/>
                <Route path="/patient/home" element={<PatientHome/>}/>
                <Route path="/patient/login" element={<PatientLoginPage/>}/>
                <Route path="/medic/home" element={<MedicHomePage/>}/>
                <Route path="/medic/browser" element={<MedicPage/>}/>
                <Route path="/medic/login" element={<MedicLoginPage/>}/>
                <Route path="/medic/calendar" element={<CalendarPage/>}/>
                <Route path="/medic/schedule" element={<MedicSchedulePage/>}/>
            </Routes>
        </AuthProvider>
    );
}
