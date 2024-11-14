import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';

const ConfirmEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/auth/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, email }),
            });
            const data = await response.json();

            if (data.success) {
                setMessage('Email verificado correctamente');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setMessage(data.message || 'Código incorrecto. Inténtalo de nuevo.');
            }
        } catch (error) {
            setMessage('Error al verificar el código. Inténtalo de nuevo.');
            console.error('Error:', error);
        }
    };

    const handleResendCode = async () => {
        setMessage('Enviando nuevo código...');
    };

    return (
        <section className="relative flex h-screen overflow-hidden">
            <div className="blob-motion">
                <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#8B5CF6" d="M43.2,-48.1C54.6,-39.2,61.6,-24,64.4,-7.8C67.2,8.4,65.8,25.6,57.4,38.3C49,51,33.6,59.2,17.8,61.9C1.9,64.5,-14.5,61.7,-31.1,55.1C-47.7,48.6,-64.5,38.3,-69.7,23.9C-74.9,9.5,-68.5,-9,-59.4,-23.8C-50.2,-38.7,-38.2,-49.9,-25.4,-57.5C-12.6,-65.1,0.9,-69.1,13.4,-65.6C25.9,-62,31.8,-50.9,43.2,-48.1Z" transform="translate(100 50)" />
                </svg>
            </div>

            <div className="w-1/2 bg-purple-600 relative z-10">
                <div className="absolute inset-0 flex flex-col justify-center items-center p-12">
                    <h1 className="text-4xl font-extrabold mb-4 text-white animate-[slideIn_0.5s_ease-out]">Confirma tu Email</h1>
                    <p className="text-xl text-purple-200 animate-[slideIn_0.5s_ease-out_0.2s]">¡Estás a un paso de comenzar tu aventura!</p>
                </div>
            </div>

            <div className="w-1/2 flex justify-center items-center p-8 bg-purple-50 relative z-10">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl transform transition-all hover:scale-105 duration-300">
                    <div className="text-center">
                        <FaEnvelope className="text-5xl text-purple-600 mx-auto mb-4" />
                        <h2 className="text-3xl font-extrabold mb-4 text-gray-800">
                            Verifica tu <span className="text-purple-600">Correo Electrónico</span>
                        </h2>
                        {email ? (
                            <p className="mb-4 text-lg text-gray-700">
                                Hemos enviado un correo de confirmación a <strong className="text-purple-600">{email}</strong>.
                            </p>
                        ) : (
                            <p className="mb-4 text-lg text-gray-700">
                                Hemos enviado un correo de confirmación a tu dirección de email.
                            </p>
                        )}
                        <form onSubmit={handleSubmit} className="mb-4">
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Ingresa el código de verificación"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 mb-4"
                                required
                            />
                            <button type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-purple-700 transition duration-300 transform hover:scale-105">
                                Verificar Código
                            </button>
                        </form>
                        {message && <p className="text-sm text-purple-600 mb-4">{message}</p>}
                        <div className="text-sm text-gray-600 mb-6">
                            <p>¿No has recibido el correo? Revisa tu carpeta de spam o solicita un nuevo correo de verificación.</p>
                        </div>
                        <button onClick={handleResendCode} className="w-full bg-purple-100 text-purple-600 py-2 px-4 rounded-lg font-bold hover:bg-purple-200 transition duration-300 transform hover:scale-105">
                            Reenviar correo de verificación
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConfirmEmail;