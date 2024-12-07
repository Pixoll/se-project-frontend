import { Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import MedicHomePage from "./pages/MedicHomePage";
import MedicLoginPage from "./pages/MedicLoginPage";
import MedicSchedulePage from "./pages/MedicSchedulePage";
import PatientHome from "./pages/PatientHome";
import PatientLoginPage from "./pages/PatientLoginPage";
import ScheduleNewAppointmentPage from "./pages/ScheduleNewAppointmentPage";
import SelectNewAppointmentPage from "./pages/SelectNewAppointmentPage";

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/new-appointment" element={<SelectNewAppointmentPage/>}/>
                <Route path="/new-appointment/schedule" element={<ScheduleNewAppointmentPage/>}/>
                <Route path="/admin/home" element={<AdminPage/>}/>
                <Route path="/admin/login" element={<AdminLoginPage/>}/>
                <Route path="/patient/home" element={<PatientHome/>}/>
                <Route path="/patient/login" element={<PatientLoginPage/>}/>
                <Route path="/medic/home" element={<MedicHomePage/>}/>
                <Route path="/medic/login" element={<MedicLoginPage/>}/>
                <Route path="/medic/schedule" element={<MedicSchedulePage/>}/>
            </Routes>
        </AuthProvider>
    );
}
