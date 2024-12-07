import { useState } from "react";
import { BackButton } from "../components/BackButton";
import { useAuth } from "../hooks/useAuth";
import "../styles/MedicSchedulePage.css";
import useFetch from "../hooks/useFetch";

type Day = {
    code: "mo" | "tu" | "we" | "th" | "fr" | "sa" | "su";
    name: string;
};

type Appointment = {
    id: string;
    patientRut: string;
    date: string;
    description: string;
    confirmed: boolean;
};

type TimeSlot = {
    id: number;
    day: "mo" | "tu" | "we" | "th" | "fr" | "sa" | "su";
    start: string;
    end: string;
    active: boolean;
    appointments: Appointment[];
};

const daysOfWeek: Day[] = [
    { code: "mo", name: "Lunes" },
    { code: "tu", name: "Martes" },
    { code: "we", name: "Miércoles" },
    { code: "th", name: "Jueves" },
    { code: "fr", name: "Viernes" },
    { code: "sa", name: "Sábado" },
    { code: "su", name: "Domingo" },
];

const timeSlots = Array.from({ length: 28 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minutes}`;
});

export default function MedicSchedulePage() {
    const { state } = useAuth();
    const [selectedSlots, setSelectedSlots] = useState<Map<string, { isLocked: boolean }>>(new Map());
    const scheduleFetchResult = useFetch<TimeSlot[]>(`/medics/${state.rut}/schedule`);

    if (state.type !== "medic") {
        return <div>No es médico.</div>;
    }

    if (scheduleFetchResult.status === "loading") {
        return <div>Loading...</div>;
    }

    if (scheduleFetchResult.status === "failed") {
        return <div>Error: {scheduleFetchResult.error}</div>;
    }

    const schedule = scheduleFetchResult.data.filter(s => s.active).map(s => ({
        id: s.id,
        day: s.day,
        time: s.start.replace(/^(\d+:\d+):00$/, "$1"),
        hasAppointments: s.appointments.length > 0,
    }));

    schedule.forEach(slot => {
        if (slot.hasAppointments) {
            selectedSlots.set(`${slot.day}-${slot.time}`, { isLocked: true });
        }
    });

    console.log(schedule, selectedSlots);

    const handleSlotClick = (day: string, time: string) => {
        const slot = `${day}-${time}`;
        const slotData = schedule.find(s => s.day === day && s.time === time);

        if (slotData && slotData.hasAppointments) {
            return;
        }

        setSelectedSlots(prev => {
            const newSlots = new Map(prev);
            if (newSlots.has(slot)) {
                newSlots.delete(slot);
            } else {
                newSlots.set(slot, { isLocked: false });
            }
            return newSlots;
        });
    };

    return (
        <div>
            <BackButton/>
            <button className={"save-changes-button"}>
                Guardar cambios
            </button>
            <h1 className="welcome">Modificar horario</h1>
            <div className="schedule-grid">
                {daysOfWeek.map(day => (
                    <div key={day.code} className="day-column">
                        <h2>{day.name}</h2>
                        {timeSlots.map(time => {
                            const slotKey = `${day.code}-${time}`;
                            const slotInfo = selectedSlots.get(slotKey);
                            const isLocked = slotInfo?.isLocked ?? false;
                            return (
                                <div
                                    key={time}
                                    className={`time-slot ${slotInfo ? "selected" : ""} ${isLocked ? "locked" : ""}`}
                                    onClick={() => handleSlotClick(day.code, time)}
                                    title={isLocked ? "Este slot tiene citas agendadas y no puede ser eliminado" : ""}
                                >
                                    {time} {isLocked && <span>&#9733;</span>}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
