import { useEffect, useState } from "react";
import Calendar, { TileClassNameFunc } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/EmployeePage.css";

type Appointment = {
    id: number;
    date: Date;
    specialist: string;
    patient: {
        name: string;
        id: string;
        details: string;
    },
    confirmed: boolean;
}

export default function EmployeePage() {
    const [date, setDate] = useState<Date>(new Date());
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [rescheduleAppointmentId, setRescheduleAppointmentId] = useState<number | null>(null);
    const [newDate, setNewDate] = useState<Date>(new Date());
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isPatientModalOpen, setIsPatientModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchedAppointments: Appointment[] = [
            {
                id: 1,
                date: new Date(2024, 10, 14, 10, 0),
                specialist: "Dr. Smith",
                patient: { name: "Juan Pérez", id: "12.345.679-K", details: "Ficha médica" },
                confirmed: false
            },
            {
                id: 2,
                date: new Date(2024, 10, 15, 12, 0),
                specialist: "Dr. Williams",
                patient: { name: "Ana Gómez", id: "87.654.321-0", details: "Ficha médica" },
                confirmed: false
            }
        ];
        setAppointments(fetchedAppointments);
    }, []);

    const handleCancelAppointment = (id: number) => {
        setAppointments(appointments.filter(appointment => appointment.id !== id));
        alert("Cita cancelada");
    };

    const handleRescheduleClick = (id: number) => {
        setRescheduleAppointmentId(id);
        setIsModalOpen(true);
    };

    const handleRescheduleAppointment = () => {
        setAppointments(appointments.map(appointment =>
            appointment.id === rescheduleAppointmentId ? { ...appointment, date: newDate } : appointment
        ));
        alert("Cita aplazada a " + newDate.toDateString());
        setRescheduleAppointmentId(null);
        setIsModalOpen(false);
    };

    const handleConfirmAppointment = (id: number) => {
        alert("Cita confirmada");
        setAppointments(appointments.map(appointment =>
            appointment.id === id ? { ...appointment, confirmed: true } : appointment
        ));
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
            .filter(appointment => appointment.date.toDateString() === date.toDateString())
            .map(appointment => (
                <div key={appointment.id} className="appointment">
                    <p>Cita a las {appointment.date.getHours()}:00 con {appointment.specialist}</p>
                    <p>Paciente: {appointment.patient.name}</p>
                    <button className="nav-button" onClick={() => viewPatientDetails(appointment)}>
                        Ver Ficha Paciente
                    </button>
                    <button className="nav-button" onClick={() => handleRescheduleClick(appointment.id)}>
                        Aplazar Cita
                    </button>
                    <button className="nav-button" onClick={() => handleCancelAppointment(appointment.id)}>
                        Cancelar
                        Cita
                    </button>
                    <button className="nav-button" onClick={() => handleConfirmAppointment(appointment.id)}>
                        Confirmar
                        Cita
                    </button>
                </div>
            ));
    };

    const tileClassName: TileClassNameFunc = ({ date, view }) => {
        if (view === "month") {
            const hasConfirmedAppointment = appointments.some(appointment =>
                appointment.date.toDateString() === date.toDateString() && appointment.confirmed
            );
            if (hasConfirmedAppointment) {
                return "confirmed-day";
            }
            const hasAppointment = appointments.some(appointment =>
                appointment.date.toDateString() === date.toDateString()
            );
            return hasAppointment ? "highlighted-day" : null;
        }
        return null;
    };

    // const hasConfirmedAppointments = appointments.some(appointment =>
    //     appointment.date.toDateString() === date.toDateString() && appointment.confirmed
    // );

    return (
        <div className="funcionario-view">
            <h1 className="welcome">Agenda del Funcionario</h1>
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

            {/* Modal para aplazar citas */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Selecciona una nueva fecha para aplazar la cita</h3>
                        <div className="calendar-container">
                            <Calendar
                                onChange={(d) => setNewDate(d as Date)}
                                value={newDate}
                            />
                        </div>
                        <div className="button-container">
                            <button className="nav-button" onClick={handleRescheduleAppointment}>Confirmar Nueva Fecha
                            </button>
                            <button className="nav-button" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {/*Modal para la ficha del paciente*/}
            {isPatientModalOpen && selectedAppointment && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Ficha del Paciente: {selectedAppointment.patient.name}</h3>
                        <p>RUT del paciente: {selectedAppointment.patient.id}</p>
                        <p>Detalles: {selectedAppointment.patient.details}</p>
                        <div className="button-container">
                            <button className="nav-button" onClick={closePatientModal}>Cerrar Ficha</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="footer-bar"></div>
        </div>
    );
};