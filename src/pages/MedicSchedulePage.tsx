import axios from "axios";
import { useState } from "react";
import { BackButton } from "../components/BackButton";
import { useAuth } from "../hooks/useAuth";
import "../styles/MedicSchedulePage.css";
import useFetch, { apiUrl } from "../hooks/useFetch";

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

type SelectedSlot = {
    isLocked: boolean;
    isSaved: boolean;
    isSelected: boolean;
    id?: number;
};

type NewSlot = {
    day: "mo" | "tu" | "we" | "th" | "fr" | "sa" | "su";
    start: string;
    end: string;
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
    const [selectedSlots, setSelectedSlots] = useState<Map<string, SelectedSlot>>(new Map());
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
        const key = `${slot.day}-${slot.time}`;
        if (!selectedSlots.has(key)) {
            selectedSlots.set(key, {
                id: slot.id,
                isLocked: slot.hasAppointments,
                isSaved: true,
                isSelected: true,
            });
        }
    });

    const onSaveChanges = () => {
        const newSlots: NewSlot[] = [];
        const removedSlots = new Map<number, SelectedSlot & { key: string }>();

        for (const [key, slot] of selectedSlots) {
            if (slot.isLocked || (slot.isSaved && slot.isSelected)) {
                continue;
            }

            if (slot.isSelected) {
                const [day, start] = key.split("-") as [TimeSlot["day"], string];
                const [hours, minutes] = start.split(":");
                const end = `${minutes === "30" ? +hours + 1 : hours}:${+minutes + 30}`;
                newSlots.push({ day, start, end });
            }

            if (slot.isSaved && !slot.isSelected) {
                removedSlots.set(slot.id!, { ...slot, key });
            }
        }

        if (newSlots.length > 0) {
            scheduleFetchResult.reload();
            axios.post(`${apiUrl}/medics/${state.rut}/schedule/slots`, newSlots, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                },
            }).then(response => {
                if (response.status >= 400) {
                    const error = new Error();
                    Object.assign(error, { response });
                    throw error;
                }
                console.log("saved slots", newSlots);
            }).catch((error) => {
                const message = error instanceof Error ? error.message : `${error}`;
                alert(`No se pudo guardar los nuevos slots: ${message}`);
            });
        }

        if (removedSlots.size > 0) {
            scheduleFetchResult.reload();
            console.log("deleting slots", removedSlots);
            for (const [id] of removedSlots) {
                axios.delete(`${apiUrl}/medics/${state.rut}/schedule/slots/${id}`, {
                    headers: {
                        Authorization: `Bearer ${state.token}`
                    },
                }).then(response => {
                    if (response.status >= 400) {
                        const error = new Error();
                        Object.assign(error, { response });
                        throw error;
                    }
                    console.log(`deleted slot ${id}`);
                }).catch((error) => {
                    const message = error instanceof Error ? error.message : `${error}`;
                    alert(`No se pudo eliminar el slot ${id}: ${message}`);
                });
            }
        }

        alert("Cambios guardados");
    };

    const handleSlotClick = (day: string, time: string) => {
        const slot = `${day}-${time}`;
        const slotData = schedule.find(s => s.day === day && s.time === time);

        if (slotData && slotData.hasAppointments) {
            return;
        }

        setSelectedSlots(prev => {
            const newSlots = new Map(prev);
            const currentSlot = newSlots.get(slot);
            if (currentSlot) {
                if (!currentSlot.isLocked) {
                    newSlots.set(slot, {
                        ...currentSlot,
                        isSelected: !currentSlot.isSelected,
                    });
                }
            } else {
                newSlots.set(slot, {
                    isLocked: false,
                    isSaved: false,
                    isSelected: true,
                });
            }
            return newSlots;
        });
    };

    return (
        <div>
            <BackButton/>
            <button className={"save-changes-button"} onClick={onSaveChanges}>
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
                            const isSaved = slotInfo?.isSaved ?? false;
                            const isSelected = slotInfo?.isSelected ?? false;
                            return (
                                <div
                                    key={time}
                                    className={
                                        `time-slot ${
                                            isSelected ? "selected" : ""} ${
                                            isLocked ? "locked" : ""} ${
                                            isSelected && isSaved ? "saved" : ""}`}
                                    onClick={() => handleSlotClick(day.code, time)}
                                    title={isLocked
                                        ? "Este slot tiene citas agendadas y no puede ser eliminado"
                                        : isSaved
                                            ? "Este slot no tiene citas agendadas y si puede ser eliminado"
                                            : ""}
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
