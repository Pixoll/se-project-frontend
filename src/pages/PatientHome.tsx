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
    slot: string;
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
        slot: `${a.start.replace(/^(\d+:\d+):00$/, "$1")} - ${a.end.replace(/^(\d+:\d+):00$/, "$1")}`,
        description: a.description,
        confirmed: a.confirmed,
    }));

    const selectedDayAppointments = appointments.filter(a => a.date === toDateString(date));

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

    return (
        <div className="scheduled-appointments">
            <h1 className="welcome">Tus citas agendadas</h1>
            <div className="calendar-and-schedule">
                <div className={"appointment-list-container"}>
                    <h2 className={"sub-welcome"}>Lista de citas</h2>
                    <ul>
                        {appointments.map(appointment => (
                            <li key={appointment.id} className={"appointment"}>
                                <p><b>Fecha:</b> {appointment.date}</p>
                                <p><b>Horario:</b> {appointment.slot}</p>
                                <p>
                                    <b>Especialista:</b>
                                    {appointment.medic.fullName} (<em>Rut: {appointment.medic.rut}</em>)
                                </p>
                                <p><b>Estado:</b> {appointment.confirmed ? "Confirmado" : "Por confirmar"}</p>
                                {!appointment.confirmed && <>
                                    <button
                                        className={"cancel-button"}
                                        onClick={() => handleCancelAppointment(appointment.id)}
                                    >
                                        Cancelar cita
                                    </button>
                                </>}
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
                    <h2 className="sub-welcome">Horario {date.toLocaleDateString()}</h2>
                    <ul className="time-slots">
                        {selectedDayAppointments.length > 0 ? selectedDayAppointments.map((appointment) => (
                            <li key={appointment.id} className="time-slot">
                                <div className="time-slot-header">{appointment.slot}</div>
                                <div className="time-slot-content">
                                    <div className="appointment-details">
                                        <p>
                                            <b>Especialista:</b> {appointment.medic.fullName} (<em>Rut: {appointment.medic.rut}</em>)
                                        </p>
                                        <p><b>Estado:</b> {appointment.confirmed ? "Confirmado" : "Por confirmar"}</p>
                                        {!appointment.confirmed && (
                                            <button className="cancel-button"
                                                    onClick={() => handleCancelAppointment(appointment.id)}>
                                                Cancelar Cita
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </li>
                        )) : <p className="no-appointment">Sin citas</p>}
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
