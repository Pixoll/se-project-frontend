type DaySlot = {
    id: number;
    rut: string;
    fullName: string;
    specialty: string;
    start: string;
    end: string;
};

type NewAppointmentSlotProps = {
    slot: DaySlot;
    handleScheduleSlot: (slot: DaySlot) => void;
}

export default function NewAppointmentSlot({ slot, handleScheduleSlot }: NewAppointmentSlotProps) {
    return (
        <li key={slot.id} className="time-slot">
            <div className="time-slot-header">{slot.start} - {slot.end}</div>
            <div className="time-slot-content">
                <div className="appointment-details">
                    <p>
                        <b>Médico:</b> {slot.fullName} (<em>Rut: {slot.rut}</em>)
                    </p>
                    <p><b>Especialidad:</b> {slot.specialty}</p>
                    <button className="cancel-button" onClick={() => handleScheduleSlot(slot)}>
                        Agendar cita
                    </button>
                </div>
            </div>
        </li>
    );
}
