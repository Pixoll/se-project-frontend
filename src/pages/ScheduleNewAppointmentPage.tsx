import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { useAuth } from "../hooks/useAuth";
import useFetch, { apiUrl } from "../hooks/useFetch";
import useForm from "../hooks/useForm";
import "../styles/ScheduleNewAppointmentPage.css";

type ScheduleNewAppointmentPageState = {
    slotId: number;
    date: string;
    medic: {
        rut: string;
        fullName: string;
        specialty: string;
    };
};

type NewAppointmentForm = {
    reason: string;
    rut?: string;
    firstName?: string;
    secondName?: string;
    firstLastName?: string;
    secondLastName?: string;
    email?: string;
    phone?: string;
    birthDate?: string;
    gender?: string;
    insuranceTypeId?: string;
    password?: string;
};

type InsuranceType = {
    id: number;
    name: string;
};

export default function ScheduleNewAppointmentPage() {
    const { formState, onInputChange } = useForm<NewAppointmentForm>({ reason: "" });
    const { state: authState, login } = useAuth();
    const { slotId, date, medic } = useLocation().state as ScheduleNewAppointmentPageState;
    const navigate = useNavigate();
    const insuranceTypesFetchResult = useFetch<InsuranceType[]>("/insurance_types");

    const [error, setError] = useState("");

    console.log(slotId, date, medic);

    if (insuranceTypesFetchResult.status === "loading") {
        return <div>Loading...</div>;
    }

    if (insuranceTypesFetchResult.status === "failed") {
        return <div>Error: {insuranceTypesFetchResult.error}</div>;
    }

    const insuranceTypes = insuranceTypesFetchResult.data;

    const onScheduleAppointment = (e: FormEvent) => {
        console.log("submit");
        e.preventDefault();
        setError("");

        if (authState.isAuthenticated) {
            createAppointment(authState.rut, authState.token, date, slotId, formState.reason, navigate, setError);
            return;
        }

        axios.post(`${apiUrl}/patients/${formState.rut}`, {
            ...formState,
            phone: +(formState.phone ?? 0),
            insuranceTypeId: +(formState.insuranceTypeId ?? 0),
        }).then(response => {
            if (response.status >= 400) {
                const error = new Error();
                Object.assign(error, { response });
                throw error;
            }

            const token = response.data.token as string;
            login("patient", formState.rut!, token);
            createAppointment(formState.rut!, token, date, slotId, formState.reason, navigate, setError);
        }).catch(error => {
            setError(error.response.data?.reason ?? "Unknown error");
            console.log("patient creation failed:", error.response.data);
        });
    };

    return <>
        <BackButton/>
        <div className={"new-appointment-header"}>
            <h2>Agendar nueva cita para {date}</h2>
            <p><b>Médico:</b> {medic.fullName} (<em>Rut: {medic.rut}</em>)</p>
            <p><b>Especialidad:</b> {medic.specialty}</p>
        </div>
        <div className="new-appointment-container">
            <div className="new-appointment-div">
                <form className="new-appointment-form" onSubmit={onScheduleAppointment}>
                    <label htmlFor="reason">Razón de la visita</label>
                    <input
                        type="text"
                        name="reason"
                        value={formState.reason}
                        onChange={onInputChange}
                        placeholder="Razón"
                        required
                    />
                    {!authState.isAuthenticated && <>
                        <label htmlFor="rut">Rut</label>
                        <input
                            type="text"
                            name="rut"
                            value={formState.rut}
                            onChange={onInputChange}
                            placeholder="Rut"
                            required
                        />
                        <label htmlFor="firstName">Primer nombre</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formState.firstName}
                            onChange={onInputChange}
                            placeholder="Primer nombre"
                            required
                        />
                        <label htmlFor="secondName">Segundo nombre</label>
                        <input
                            type="text"
                            name="secondName"
                            value={formState.secondName}
                            onChange={onInputChange}
                            placeholder="Segundo nombre"
                            required
                        />
                        <label htmlFor="firstLastName">Primer apellido</label>
                        <input
                            type="text"
                            name="firstLastName"
                            value={formState.firstLastName}
                            onChange={onInputChange}
                            placeholder="Primer apellido"
                            required
                        />
                        <label htmlFor="secondLastName">Segundo apellido</label>
                        <input
                            type="text"
                            name="secondLastName"
                            value={formState.secondLastName}
                            onChange={onInputChange}
                            placeholder="Segundo apellido"
                            required
                        />
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={onInputChange}
                            placeholder="Correo electrónico"
                            required
                        />
                        <label htmlFor="phone">Teléfono</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formState.phone}
                            onChange={onInputChange}
                            placeholder="Teléfono"
                            required
                        />
                        <label htmlFor="birthDate">Fecha de nacimiento</label>
                        <input
                            type="date"
                            name="birthDate"
                            value={formState.birthDate}
                            onChange={onInputChange}
                            placeholder="Fecha de nacimiento"
                            required
                        />
                        <label htmlFor="gender">Género</label>
                        <input
                            type="text"
                            name="gender"
                            value={formState.gender}
                            onChange={onInputChange}
                            placeholder="Género"
                            required
                        />
                        <label htmlFor="insuranceTypeId">Tipo de previsión</label>
                        <select
                            name="insuranceTypeId"
                            value={formState.insuranceTypeId}
                            onChange={onInputChange as unknown as (e: ChangeEvent<HTMLSelectElement>) => void}
                            required
                        >
                            <option value="">Seleccione un tipo de previsión</option>
                            {insuranceTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formState.password}
                            onChange={onInputChange}
                            placeholder="Contraseña"
                            required
                        />
                    </>}
                    <button type="submit" className="nav-button">
                        Agendar cita
                    </button>
                </form>
                {error && (
                    <span style={{ color: "red" }}>{error}</span>
                )}
            </div>
        </div>
    </>;
}

function createAppointment(
    rut: string,
    token: string,
    date: string,
    timeSlotId: number,
    description: string,
    navigate: NavigateFunction,
    setError: (v: string) => void
) {
    axios.post(`${apiUrl}/patients/${rut}/appointments`, {
        date: date,
        timeSlotId,
        description,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(response => {
        if (response.status >= 400) {
            const error = new Error();
            Object.assign(error, { response });
            throw error;
        }

        navigate("/patient/home");
    }).catch(error => {
        setError(error.response.data?.message ?? "Unknown error");
        console.log("appointment creation failed:", error.response.data);
    });
}
