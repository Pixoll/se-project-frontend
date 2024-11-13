import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ScheduledAppointments.css'; // Asegúrate de crear este archivo para los estilos específicos del componente

const ScheduledAppointments = () => {
    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);

    // Simular las citas agendadas (estas deberían venir del backend)
    useEffect(() => {
        const fetchedAppointments = [
            { id: 1, date: new Date(2024, 10, 14, 10, 0), specialist: 'Dr. Smith' },
            { id: 2, date: new Date(2024, 10, 15, 12, 0), specialist: 'Dr. Williams' }
        ];
        setAppointments(fetchedAppointments);
    }, []);

    // Función para manejar la cancelación de citas
    const handleCancelAppointment = (id) => {
        setAppointments(appointments.filter(appointment => appointment.id !== id));
        alert('Cita cancelada');
    };

    // Función para mostrar las citas en una fecha específica
    const renderAppointments = () => {
        return appointments
            .filter(appointment => appointment.date.toDateString() === date.toDateString())
            .map(appointment => (
                <div key={appointment.id} className="appointment">
                    <p>Cita a las {appointment.date.getHours()}:00 con {appointment.specialist}</p>
                    <button className="ButtonOne" onClick={() => handleCancelAppointment(appointment.id)}>Cancelar Cita</button>
                </div>
            ));
    };

    return (
        <div className="scheduled-appointments">
            <h1 className="welcome">Tus Citas Agendadas</h1>
            <div className="calendar-container">
                <Calendar onChange={setDate} value={date} />
            </div>
            <h2 className="subWelcome">Citas para el {date.toDateString()}</h2>
            <div className="appointments-list">
                {renderAppointments()}
            </div>
        </div>
    );
};

export default ScheduledAppointments;
