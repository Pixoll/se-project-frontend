import { useState } from "react";
import { BackButton } from "../components/BackButton";
import { useAuth } from "../hooks/useAuth";
import "../styles/MedicSchedulePage.css";

type Day = {
    code: "mo" | "tu" | "we" | "th" | "fr" | "sa" | "su";
    name: string;
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
    const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());

    if (state.type !== "medic") {
        return <div>No es médico.</div>;
    }

    console.log(selectedSlots);

    const handleSlotClick = (day: string, time: string) => {
        const slot = `${day}-${time}`;
        setSelectedSlots(prev => {
            const newSlots = new Set(prev);
            if (newSlots.has(slot)) {
                newSlots.delete(slot);
            } else {
                newSlots.add(slot);
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
                        {timeSlots.map(time => (
                            <div
                                key={time}
                                className={`time-slot ${selectedSlots.has(`${day.code}-${time}`) ? "selected" : ""}`}
                                onClick={() => handleSlotClick(day.code, time)}
                            >
                                {time}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
