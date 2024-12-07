import axios from "axios";
import { useState } from "react";
import Calendar, { TileClassNameFunc } from "react-calendar";
import { BackButton } from "../components/BackButton";
import { useAuth } from "../hooks/useAuth";
import useFetch, { apiUrl } from "../hooks/useFetch";

type Appointment = {
    id: string;
    patientRut: string;
    patientFullName: string;
    patientBirthDate: string;
    patientEmail: string;
    patientPhone: number;
    date: string;
    start: string;
    end: string;
    description: string;
    confirmed: boolean;
};

export default function MedicHomePage() {
    const { state } = useAuth();
    const [date, setDate] = useState<Date>(new Date());
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [isPatientModalOpen, setIsPatientModalOpen] = useState<boolean>(false);
    const appointmentsFetchResult = useFetch<Appointment[]>(`/medics/${state.rut}/appointments`);

    if (state.type !== "medic") {
        return <div>No es médico.</div>;
    }

    if (appointmentsFetchResult.status === "loading") {
        return <div>Loading...</div>;
    }

    if (appointmentsFetchResult.status === "failed") {
        return <div>Error: {appointmentsFetchResult.error}</div>;
    }

    const appointments = appointmentsFetchResult.data;

    const handleCancelAppointment = (appointment: Appointment) => {
        axios.delete(`${apiUrl}/patients/${appointment.patientRut}/appointments/${appointment.id}`, {
            headers: {
                Authorization: `Bearer ${state.token}`
            },
        }).then(response => {
            if (response.status >= 400) {
                const error = new Error();
                Object.assign(error, { response });
                throw error;
            }

            appointmentsFetchResult.reload();
            alert("Cita cancelada");
        }).catch((error) => {
            const message = error instanceof Error ? error.message : `${error}`;
            alert(`No se pudo cancelar la cita: ${message}`);
        });
        alert("Cita cancelada");
    };

    const handleConfirmAppointment = (appointment: Appointment) => {
        axios.patch(`${apiUrl}/patients/${appointment.patientRut}/appointments/${appointment.id}`, {
            confirmed: true,
        }, {
            headers: {
                Authorization: `Bearer ${state.token}`
            },
        }).then(response => {
            if (response.status >= 400) {
                const error = new Error();
                Object.assign(error, { response });
                throw error;
            }

            appointmentsFetchResult.reload();
            alert("Cita confirmada");
        }).catch((error) => {
            const message = error instanceof Error ? error.message : `${error}`;
            alert(`No se pudo confirmada la cita: ${message}`);
        });
    };

    const viewPatientDetails = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setIsPatientModalOpen(true);
    };

    const closePatientModal = () => {
        setSelectedAppointment(null);
        setIsPatientModalOpen(false);
    };

    const renderAppointments = () => {
        return appointments
            .filter(appointment => appointment.date === toDateString(date))
            .map(appointment => (
                <div key={appointment.id} className="appointment">
                    <p>Cita a las {appointment.start}</p>
                    <p>Paciente: {appointment.patientFullName}</p>
                    <p>Descripción: {appointment.description}</p>
                    <button className="nav-button" onClick={() => viewPatientDetails(appointment)}>
                        Ver Ficha Paciente
                    </button>
                    {!appointment.confirmed && <>
                        <button className="nav-button" onClick={() => handleCancelAppointment(appointment)}>
                            Cancelar Cita
                        </button>
                        <button className="nav-button" onClick={() => handleConfirmAppointment(appointment)}>
                            Confirmar Cita
                        </button>
                    </>}
                </div>
            ));
    };

    const tileClassName: TileClassNameFunc = ({ date, view }) => {
        if (view === "month") {
            const filtered = appointments
                .filter(appointment => appointment.date === toDateString(date));
            const hasAppointment = filtered.length > 0;

            const hasConfirmedAppointment = hasAppointment && filtered
                .every(appointment => appointment.confirmed);

            if (hasConfirmedAppointment) {
                return "confirmed-day";
            }

            return hasAppointment ? "highlighted-day" : null;
        }
        return null;
    };

    return (
        <div className="funcionario-view">
            <BackButton/>
            <h1 className="welcome">Agenda del médico</h1>
            <div className="calendar-container">
                <Calendar
                    onChange={(d) => setDate(d as Date)}
                    value={date}
                    tileClassName={tileClassName}
                />
            </div>
            <h2 className="sub-welcome">Citas para el {date.toDateString()}</h2>
            <div className="appointments-list">
                {renderAppointments()}
            </div>

            {isPatientModalOpen && selectedAppointment && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Ficha del Paciente: {selectedAppointment.patientFullName}</h3>
                        <p>RUT del paciente: {selectedAppointment.patientRut}</p>
                        <p>Fecha de nacimiento: {selectedAppointment.patientBirthDate}</p>
                        <p>Correo electrónico: {selectedAppointment.patientEmail}</p>
                        <p>Teléfono: {selectedAppointment.patientPhone}</p>
                        <div className="button-container">
                            <button className="nav-button" onClick={closePatientModal}>Cerrar Ficha</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="footer-bar"></div>
        </div>
    );
}

function toDateString(date: Date): string {
    return date.toLocaleDateString("es-CL").split("-").reverse().join("-");
}

