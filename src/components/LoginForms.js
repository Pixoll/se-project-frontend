import React, { useState } from 'react';
import '../styles/LoginForms.css'
export default function LoginFrom(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) =>{
        e.preventDefault();
    }
    return(
        <div className='ContainerLogin'>
            <form className='FormLogin'>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Correo Electronico' required/>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña' required/>
            </form>
        </div>
        
    );
}