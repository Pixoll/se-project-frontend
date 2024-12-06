import { useState } from "react";
import Calendar, { TileClassNameFunc } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/PatientHome.css";
import { useAuth } from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";

type Appointment = {
    id: string;
    medicRut: string;
    date: string;
    start: string;
    end: string;
    description: string;
    confirmed: boolean;
};

type Medic = {
    rut: string;
    fullName: string;
    email: string;
    phone: number;
    specialty: string;
};

type ParsedAppointment = {
    id: string;
    medic: Medic;
    date: string;
    start: string;
    end: string;
    description: string;
    confirmed: boolean;
};

export default function PatientHome() {
    const { state } = useAuth();
    const [date, setDate] = useState(new Date());
    const appointmentsFetchResult = useFetch<Appointment[]>(`/patients/${state.rut}/appointments`);
    const medicsFetchResult = useFetch<Medic[]>("/medics");

    if (appointmentsFetchResult.status === "loading" || medicsFetchResult.status === "loading") {
        return <div>Loading...</div>;
    }

    if (appointmentsFetchResult.status === "failed" || medicsFetchResult.status === "failed") {
        // @ts-ignore
        return <div>Error: {appointmentsFetchResult.error ?? medicsFetchResult.error}</div>;
    }

    const medics = new Map(medicsFetchResult.data.map(m => [m.rut, m]));

    const appointments: ParsedAppointment[] = appointmentsFetchResult.data.map(a => ({
        id: a.id,
        medic: medics.get(a.medicRut)!,
        date: a.date,
        start: a.start,
        end: a.end,
        description: a.description,
        confirmed: a.confirmed,
    }));

    const handleCancelAppointment = (id: string) => {
        // setAppointments(appointments.filter(appointment => appointment.id !== id));
        alert("Cita cancelada");
    };

    const tileClassName: TileClassNameFunc = ({ date, view }) => {
        if (view === "month") {
            const hasConfirmedAppointment = appointments.some(appointment =>
                appointment.date === toDateString(date) && appointment.confirmed
            );
            if (hasConfirmedAppointment) {
                return "confirmed-day";
            }
            const hasAppointment = appointments.some(appointment =>
                appointment.date === toDateString(date)
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

        const appointment = appointments.find(app => app.date === toDateString(startDateTime));
        return appointment ? (
            <div className="appointment-details">
                <p>Con: {appointment.medic.fullName}</p>
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
            <h1 className="welcome">Tus citas agendadas</h1>
            <div className="calendar-and-schedule">
                <div className={"appointment-list-container"}>
                    <h2 className={"sub-welcome"}>Lista de citas</h2>
                    <ul>
                        {appointments.map(appointment => (
                            <li key={appointment.id} className={"appointment"}>
                                <p>Fecha: {appointment.date}</p>
                                <p>Especialista: {appointment.medic.fullName}</p>
                                <button className={"nav-button"}
                                        onClick={() => handleCancelAppointment(appointment.id)}>
                                    Cancelar cita
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

function toDateString(date: Date): string {
    return date.toLocaleDateString("es-CL").split("-").reverse().join("-");
}
