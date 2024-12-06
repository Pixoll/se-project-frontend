import { useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import NewAppointmentSlot from "../components/NewAppointmentSlot";
import useFetch from "../hooks/useFetch";
import "../styles/SelectNewAppointmentPage.css";

type Medic = {
    rut: string;
    fullName: string;
    email: string;
    phone: number;
    specialty: string;
};

type Specialty = {
    id: number;
    name: string;
};

type TimeSlot = {
    id: number;
    day: "mo" | "tu" | "we" | "th" | "fr" | "sa" | "su";
    start: string;
    end: string;
    appointmentDates: string[];
};

type GroupedTimeSlots = {
    rut: string;
    fullName: string;
    specialty: string;
    slots: TimeSlot[];
};

type DaySlot = {
    id: number;
    rut: string;
    fullName: string;
    specialty: string;
    start: string;
    end: string;
};

const days: Array<TimeSlot["day"]> = ["su", "mo", "tu", "we", "th", "fr", "sa"];

export default function SelectNewAppointmentPage() {
    const navigation = useNavigate();
    const [date, setDate] = useState(new Date());
    const [medics, setMedics] = useState<string[]>([]);
    const [specialties, setSpecialties] = useState<number[]>([]);
    const medicsFetchResult = useFetch<Medic[]>("/medics");
    const specialtiesFetchResult = useFetch<Specialty[]>("/specialties");
    const scheduleFetchResult = useFetch<GroupedTimeSlots[]>(
        `/schedule?medics=${medics.join(",")}&specialties=${specialties.join(",")}`
    );

    if (medicsFetchResult.status === "loading"
        || specialtiesFetchResult.status === "loading"
        || scheduleFetchResult.status === "loading"
    ) {
        return <div>Loading...</div>;
    }

    if (medicsFetchResult.status === "failed"
        || specialtiesFetchResult.status === "failed"
        || scheduleFetchResult.status === "failed"
    ) {
        // @ts-ignore
        const message = appointmentsFetchResult.error ?? medicsFetchResult.error ?? scheduleFetchResult.error;
        return <div>Error: {message}</div>;
    }

    const fetchedMedics = medicsFetchResult.data;
    const fetchedSpecialties = specialtiesFetchResult.data;
    const scheduleData = scheduleFetchResult.data;

    const handleMedicChange = (rut: string) => {
        setMedics(prevMedics =>
            prevMedics.includes(rut) ? prevMedics.filter(m => m !== rut) : [...prevMedics, rut]
        );
    };

    const handleSpecialtyChange = (id: number) => {
        setSpecialties(prevSpecialties =>
            prevSpecialties.includes(id) ? prevSpecialties.filter(s => s !== id) : [...prevSpecialties, id]
        );
    };

    const handleScheduleSlot = (slot: DaySlot) => {
        navigation("/new-appointment/schedule", {
            state: {
                slotId: slot.id,
                date: toDateString(date),
                medic: {
                    rut: slot.rut,
                    fullName: slot.fullName,
                    specialty: slot.specialty,
                },
            },
        });
    };

    const dateString = toDateString(date);
    const dayName = days[date.getDay()];
    const daySlots: DaySlot[] = [];

    scheduleData.forEach(group => {
        group.slots.forEach(slot => {
            if (
                slot.day !== dayName
                || slot.appointmentDates.includes(dateString)
                || new Date(`${dateString} ${slot.start}`).getTime() <= Date.now()
            ) return;

            daySlots.push({
                id: slot.id,
                rut: group.rut,
                fullName: group.fullName,
                specialty: group.specialty,
                start: slot.start,
                end: slot.end,
            });
        });
    });

    return <>
        <BackButton/>
        <h1 className="welcome">Agendar nueva cita</h1>
        <div className={"calendar-and-schedule"}>

            <div className="filter-container">
                <div>
                    <label>Seleccionar médicos:</label>
                    {fetchedMedics.map(medic => (
                        <div key={medic.rut} className="filter-item">
                            <input
                                type="checkbox"
                                id={`medic-${medic.rut}`}
                                value={medic.rut}
                                checked={medics.includes(medic.rut)}
                                onChange={() => handleMedicChange(medic.rut)}
                            />
                            <label htmlFor={`medic-${medic.rut}`}>{medic.fullName}</label>
                        </div>
                    ))}
                </div>
                <div>
                    <label>Seleccionar especialidades:</label>
                    {fetchedSpecialties.map(specialty => (
                        <div key={specialty.id} className="filter-item">
                            <input
                                type="checkbox"
                                id={`specialty-${specialty.id}`}
                                value={specialty.id}
                                checked={specialties.includes(specialty.id)}
                                onChange={() => handleSpecialtyChange(specialty.id)}
                            />
                            <label htmlFor={`specialty-${specialty.id}`}>{specialty.name}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="calendar-container">
                <Calendar
                    onChange={(d) => setDate(d as Date)}
                    value={date}
                    minDate={new Date()}
                />
            </div>
            <div className="schedule-container">
                <h2 className="sub-welcome">Horario {date.toLocaleDateString()}</h2>
                <ul className="time-slots">
                    {daySlots.length > 0 ? daySlots.map((slot) => (
                        <NewAppointmentSlot
                            key={slot.id}
                            slot={slot}
                            handleScheduleSlot={handleScheduleSlot}
                        />
                    )) : <p className="no-appointment">Sin horarios disponibles</p>}
                </ul>
            </div>
        </div>
    </>;
}

function toDateString(date: Date): string {
    return date.toLocaleDateString("es-CL").split("-").reverse().join("-");
}
