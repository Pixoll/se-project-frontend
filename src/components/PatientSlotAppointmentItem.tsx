type Appointment = {
    id: string;
    medic: Medic;
    date: string;
    slot: string;
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

type PatientSlotAppointmentItemProps = {
    slot: Appointment;
    handleCancelAppointment: (id: string) => void;
}

export default function PatientSlotAppointmentItem({ slot, handleCancelAppointment }: PatientSlotAppointmentItemProps) {
    return (
        <li key={slot.id} className="time-slot">
            <div className="time-slot-header">{slot.slot}</div>
            <div className="time-slot-content">
                <div className="appointment-details">
                    <p>
                        <b>Médico:</b> {slot.medic.fullName} (<em>Rut: {slot.medic.rut}</em>)
                    </p>
                    <p><b>Especialidad:</b> {slot.medic.specialty}</p>
                    <p><b>Estado:</b> {slot.confirmed ? "Confirmado" : "Por confirmar"}</p>
                    {!slot.confirmed && (
                        <button className="cancel-button"
                                onClick={() => handleCancelAppointment(slot.id)}>
                            Cancelar Cita
                        </button>
                    )}
                </div>
            </div>
        </li>
    );
}
