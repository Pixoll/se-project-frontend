import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/funcionario.css';

const Funcionario = () => {
    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null); // Para ver la ficha del paciente
    const [rescheduleAppointmentId, setRescheduleAppointmentId] = useState(null); // Almacena la cita a aplazar
    const [newDate, setNewDate] = useState(new Date()); // Nueva fecha para aplazar la cita
    const [isModalOpen, setIsModalOpen] = useState(false); // Controla la visibilidad del modal
    const [isPatientModalOpen, setIsPatientModalOpen] = useState(false); // Controla la visibilidad del modal

    useEffect(() => {
        // Simulación de obtener citas desde un servidor
        const fetchedAppointments = [
            {
                id: 1,
                date: new Date(2024, 10, 14, 10, 0),
                specialist: 'Dr. Smith',
                patient: { name: 'Juan Pérez', id: '12.345.679-K', details: 'Ficha médica' },
                confirmed: false
            },
            {
                id: 2,
                date: new Date(2024, 10, 15, 12, 0),
                specialist: 'Dr. Williams',
                patient: { name: 'Ana Gómez', id: '87.654.321-0', details: 'Ficha médica' },
                confirmed: false
            }
        ];
        setAppointments(fetchedAppointments);
    }, []);

    const handleCancelAppointment = (id) => {
        setAppointments(appointments.filter(appointment => appointment.id !== id));
        alert('Cita cancelada');
    };

    const handleRescheduleClick = (id) => {
        setRescheduleAppointmentId(id); // Guardamos el ID de la cita que se quiere aplazar
        setIsModalOpen(true); // Abrimos el modal
    };

    const handleRescheduleAppointment = () => {
        setAppointments(appointments.map(appointment =>
            appointment.id === rescheduleAppointmentId ? { ...appointment, date: newDate } : appointment
        ));
        alert('Cita aplazada a ' + newDate.toDateString());
        setRescheduleAppointmentId(null);
        setIsModalOpen(false); // Cerrar el modal después de confirmar
    };

    const handleConfirmAppointment = (id) => {
        alert('Cita confirmada');
        setAppointments(appointments.map(appointment =>
            appointment.id === id ? { ...appointment, confirmed: true } : appointment
        ));
    };

    const viewPatientDetails = (appointment) => {
        setSelectedAppointment(appointment);
        setIsPatientModalOpen(true);
    };

    const closePatientModal = () => {
        setSelectedAppointment(null);
        setIsPatientModalOpen(false); // Cerrar el modal después de confirmar
    }

    const renderAppointments = () => {
        return appointments
            .filter(appointment => appointment.date.toDateString() === date.toDateString())
            .map(appointment => (
                <div key={appointment.id} className="appointment">
                    <p>Cita a las {appointment.date.getHours()}:00 con {appointment.specialist}</p>
                    <p>Paciente: {appointment.patient.name}</p>
                    <button className="ButtonOne" onClick={() => viewPatientDetails(appointment)}>Ver Ficha Paciente</button>
                    <button className="ButtonOne" onClick={() => handleRescheduleClick(appointment.id)}>Aplazar Cita</button>
                    <button className="ButtonOne" onClick={() => handleCancelAppointment(appointment.id)}>Cancelar Cita</button>
                    <button className="ButtonOne" onClick={() => handleConfirmAppointment(appointment.id)}>Confirmar Cita</button>
                </div>
            ));
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const hasConfirmedAppointment = appointments.some(appointment =>
                appointment.date.toDateString() === date.toDateString() && appointment.confirmed
            );
            if (hasConfirmedAppointment) {
                return 'confirmed-day';
            }
            const hasAppointment = appointments.some(appointment =>
                appointment.date.toDateString() === date.toDateString()
            );
            return hasAppointment ? 'highlighted-day' : null;
        }
        return null;
    };

    const hasConfirmedAppointments = appointments.some(appointment => appointment.date.toDateString() === date.toDateString() && appointment.confirmed);

    return (
        <div className="funcionario-view">
            <h1 className="welcome">Agenda del Funcionario</h1>
            <div className="calendar-container">
                <Calendar
                    onChange={setDate}
                    value={date}
                    tileClassName={tileClassName}
                />
            </div>
            <h2 className="subWelcome">Citas para el {date.toDateString()}</h2>
            <div className="appointments-list">
                {renderAppointments()}
            </div>

            {/* Modal para aplazar citas */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Selecciona una nueva fecha para aplazar la cita</h3>
                        <div className="calendar-container">
                            <Calendar
                                onChange={setNewDate}
                                value={newDate}
                            />
                        </div>
                        <div className="button-container">
                            <button className="ButtonOne" onClick={handleRescheduleAppointment}>Confirmar Nueva Fecha</button>
                            <button className="ButtonOne" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {/*Modal para la ficha del paciente*/}
            {isPatientModalOpen && selectedAppointment && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Ficha del Paciente: {selectedAppointment.patient.name}</h3>
                        <p>RUT del paciente: {selectedAppointment.patient.id}</p>
                        <p>Detalles: {selectedAppointment.patient.details}</p>
                        <div className="button-container">
                            <button className="ButtonOne" onClick={closePatientModal}>Cerrar Ficha</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="footer-bar"></div>
        </div>
    );
};

export default Funcionario;
