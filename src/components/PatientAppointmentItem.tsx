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

type PatientAppointmentItemProps = {
    appointment: Appointment;
    handleCancelAppointment: (id: string) => void;
}

export default function PatientAppointmentItem({ appointment, handleCancelAppointment }: PatientAppointmentItemProps) {
    return (
        <li className={"appointment"}>
            <p><b>Fecha:</b> {appointment.date}</p>
            <p><b>Horario:</b> {appointment.slot}</p>
            <p>
                <b>Médico:</b>
                {appointment.medic.fullName} (<em>Rut: {appointment.medic.rut}</em>)
            </p>
            <p><b>Especialidad:</b> {appointment.medic.specialty}</p>
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
    );
}
