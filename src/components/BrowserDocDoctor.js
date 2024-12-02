import React, { useState } from 'react';
import Calendario from '../pages/Calendario';
import Horario from '../pages/Horario';
import Inicio from '../pages/Inicio';
import "../styles/BrowserDoc.css";

function BrowserDocDoctor() {
    const [currentComponent, setCurrentComponent] = useState('Inicio');

    const renderComponent = () => {
        switch (currentComponent) {
            case 'Calendario':
                return <Calendario />;
            case 'Horario':
                return <Horario />;
            case 'Inicio':
                default:
                return <Inicio />;    
        }
    };

    return (
        <div className='ContainerBrowerDoctor'>
            <h1>¿Qué desea ver?</h1>
            <nav>
                <button onClick={() => setCurrentComponent('Inicio')}>Inicio</button>
                <button onClick={() => setCurrentComponent('Calendario')}>Calendario</button>
                <button onClick={() => setCurrentComponent('Horario')}>Días de Trabajo</button>
            </nav>
            <div className='FormBrowser'>
                {renderComponent()}
            </div>
        </div>
    );
}

export default BrowserDocDoctor;
