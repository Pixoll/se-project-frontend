import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/ScheduledAppointments.css';

const ScheduledAppointments = () => {
    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newAppointment, setNewAppointment] = useState({ time: '', specialist: '' });

    useEffect(() => {
        const fetchedAppointments = [
            { id: 1, date: new Date(2024, 10, 14, 10, 0), specialist: 'Dr. Smith' },
            { id: 2, date: new Date(2024, 10, 15, 12, 0), specialist: 'Dr. Williams' }
        ];
        setAppointments(fetchedAppointments);
    }, []);

    const handleCancelAppointment = (id) => {
        setAppointments(appointments.filter(appointment => appointment.id !== id));
        alert('Cita cancelada');
    };

    const handleAddAppointment = () => {
        const appointmentDate = new Date(date);
        appointmentDate.setHours(parseInt(newAppointment.time.split(':')[0]), parseInt(newAppointment.time.split(':')[1]));

        const newId = appointments.length ? Math.max(...appointments.map(app => app.id)) + 1 : 1;
        const newApp = { id: newId, date: appointmentDate, specialist: newAppointment.specialist };

        setAppointments([...appointments, newApp]);
        setShowForm(false);
        setNewAppointment({ time: '', specialist: '' });
        alert('Cita agendada');
    };

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

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const hasAppointment = appointments.some(appointment =>
                appointment.date.toDateString() === date.toDateString()
            );
            return hasAppointment ? 'highlighted-day' : null;
        }
        return null;
    };

    const hasAppointments = appointments.some(appointment => appointment.date.toDateString() === date.toDateString());

    return (
        <div className="scheduled-appointments">
            <h1 className="welcome">Tus Citas Agendadas</h1>
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
            {!hasAppointments && (
                <button className="ButtonOne" onClick={() => setShowForm(true)}>Agendar Cita</button>
            )}
            {showForm && (
                <div className="appointment-form">
                    <h3>Agendar Nueva Cita</h3>
                    <label>
                        Hora:
                        <input
                            type="time"
                            value={newAppointment.time}
                            onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                        />
                    </label>
                    <label>
                        Especialista:
                        <input
                            type="text"
                            value={newAppointment.specialist}
                            onChange={(e) => setNewAppointment({ ...newAppointment, specialist: e.target.value })}
                        />
                    </label>
                    <button className="ButtonOne" onClick={handleAddAppointment}>Confirmar Cita</button>
                    <button className="ButtonOne" onClick={() => setShowForm(false)}>Cancelar</button>
                </div>
            )}
            <div className="footer-bar"></div>
        </div>
    );
};

export default ScheduledAppointments;