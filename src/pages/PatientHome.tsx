import { useEffect, useState } from "react";
import Calendar, { TileClassNameFunc } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/PatientHome.css";

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


export default function PatientHome() {
    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(""); // colocar url
                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                console.error("Error al cargar citas:", error);
            }
        };

        fetchAppointments();
    }, []);

    const handleCancelAppointment = (id: number) => {
        setAppointments(appointments.filter(appointment => appointment.id !== id));
        alert("Cita cancelada");
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

    const generateTimeSlots = () => {
        const slots = [];
        const start = 8;
        const end = 22;
        for (let hour = start; hour < end; hour++) {
            slots.push(`${hour}:00 - ${hour}:30`);
            slots.push(`${hour}:30 - ${hour + 1}:00`);
        }
        return slots;
    };

    const getAppointmentForSlot = (slot: string) => {
        const [startHour, startMinute] = slot.split("-")[0].split(":");
        const startDateTime = new Date(date);
        startDateTime.setHours(parseInt(startHour, 10), parseInt(startMinute, 10), 0, 0);

        const appointment = appointments.find(app => app.date.getTime() === startDateTime.getTime());
        return appointment ? (
            <div className="appointment-details">
                <p>Con: {appointment.specialist}</p>
                <button className="nav-button" onClick={() => handleCancelAppointment(appointment.id)}>
                    Cancelar Cita
                </button>
            </div>
        ) : (
            <p className="no-appointment">Sin citas</p>
        );
    };

    return (
        <div className="scheduled-appointments">
            <h1 className="welcome">Tus Citas Agendadas</h1>
            <div className="calendar-and-schedule">
                <div className={"appointment-list-container"}>
                    <h2 className={"sub-welcome"}>Lista de Citas</h2>
                    <ul>
                        {appointments.map(appointment => (
                            <li key={appointment.id} className={"appointment"}>
                                <p>Fecha: {appointment.date.toLocaleDateString()}</p>
                                <p>Especialista: {appointment.specialist}</p>
                                <p>Paciente: {appointment.patient.name}</p>
                                <button className={"nav-button"} onClick={() => handleCancelAppointment(appointment.id)}>
                                    Cancelar Cita
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="calendar-container">
                    <Calendar
                        onChange={(d) => setDate(d as Date)}
                        value={date}
                        tileClassName={tileClassName}
                    />
                </div>
                <div className="schedule-container">
                    <h2 className="sub-welcome">Horario</h2>
                    <ul className="time-slots">
                        {generateTimeSlots().map((slot, index) => (
                            <li key={index} className="time-slot">
                                <div className="time-slot-header">{slot}</div>
                                <div className="time-slot-content">
                                    {getAppointmentForSlot(slot)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="footer-bar"></div>
        </div>
    );
};
