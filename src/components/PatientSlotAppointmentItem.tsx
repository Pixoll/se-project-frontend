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
    appointment: Appointment;
    handleCancelAppointment: (id: string) => void;
}

export default function PatientSlotAppointmentItem({ appointment, handleCancelAppointment }: PatientSlotAppointmentItemProps) {
    return (
        <li key={appointment.id} className="time-slot">
            <div className="time-slot-header">{appointment.slot}</div>
            <div className="time-slot-content">
                <div className="appointment-details">
                    <p>
                        <b>Médico:</b> {appointment.medic.fullName} (<em>Rut: {appointment.medic.rut}</em>)
                    </p>
                    <p><b>Especialidad:</b> {appointment.medic.specialty}</p>
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
    );
}
