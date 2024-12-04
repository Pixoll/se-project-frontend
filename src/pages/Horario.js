import { useEffect, useState } from "react";

export default function Horario() {
    // Paso 1: Recuperar el estado del localStorage o usar el estado predeterminado
    const [buttonColors, setButtonColors] = useState(
        JSON.parse(localStorage.getItem("buttonColors")) || [false, false, false, false, false]
    );

    // Paso 2: Función para manejar el clic de un botón
    const handleClick = (index) => {
        const newColors = [...buttonColors];
        newColors[index] = !newColors[index]; // Alternar entre seleccionado y no seleccionado
        setButtonColors(newColors);
    };

    // Paso 3: Guardar el estado de los botones en localStorage cada vez que se actualiza
    useEffect(() => {
        localStorage.setItem("buttonColors", JSON.stringify(buttonColors));
    }, [buttonColors]); // Ejecutar cada vez que `buttonColors` cambie

    const buttonLabels = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO"];

    return (
        <div>
            <h1>Días de trabajo</h1>
            <div style={{ display: "flex", gap: "10px" }}>
                {buttonLabels.map((label, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(index)}
                        style={{
                            backgroundColor: buttonColors[index] ? "green" : "blue",
                            color: "white",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
