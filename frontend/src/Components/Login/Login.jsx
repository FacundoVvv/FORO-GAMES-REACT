import React, {useContext, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Login.css';
import { MyContext } from '@Contexts/Main_context';
import  { user_front }  from '@Models/Users/user_front';
import { useNavigate } from 'react-router-dom';
import { resendEmailVerify } from '@Utils/resendEmailVerify';
export const LoginPage = () => {

    const { setUser } = useContext(MyContext);
    const navigate = useNavigate();

    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('El nombre de usuario es obligatorio'),
        password: Yup.string().required('La contraseña es obligatoria'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            });
    
            const data = await response.json();
    
            if (!response.ok) {

                // error 403 - Correo no verificado - Resend email confirm
                if (response.status === 403) {
                    navigate('/Confirm-email', { state: { email: data.email } });
                    try {
                        const emailSendFunc = await resendEmailVerify(data.email);
                        if (!emailSendFunc.status) {
                            console.log('Error al reenviar el correo, código:', emailSendFunc.status);
                            return;
                        }else{
                            console.log('exito reenviando correo!.')
                        }
                    } catch (error) {
                        console.error('Error al enviar el correo de confirmación:', error);
                        throw error;
                    }
                    return; 
                }
    
                // other errors
                console.error('Error desconocido:', response.status);
                return;
            }
    
            // logged
            setUser(data.data.user);
            localStorage.setItem('token', data.data.token);
        } catch (e) {
            console.error('Error al procesar la solicitud:', e);
            throw 'Error al procesar solicitud.';
        }
    
        setTimeout(() => {
            setSubmitting(false);
        }, 400);
    };
    

    return (
        <section className="min-h-screen flex">
            <div className="login-img-container hidden lg:flex lg:w-1/2 bg-gray-300 items-center justify-center relative">
                <div className="absolute inset-0 bg-black opacity-100 login-img"></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-3xl font-bold text-white tracking-wide">SFRP Inicio de Sesión</h1>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 bg-gradient-to-br from-blue-100 to-indigo-100">
                <div className="w-full max-w-md">
                    <h2 className="text-[26px] font-extrabold text-center mb-6 text-gray-800">Inicio de <span className="text-purple-600">Sesión</span></h2>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ isSubmitting }) => (
                            <Form className="space-y-6">
                                <div className="form-group">
                                    <div className="relative">
                                        <Field
                                            type="text"
                                            name="username"
                                            id="username"
                                            placeholder="Nombre de usuario"
                                            className="form-input"
                                        />
                                        <FaUser className="input-icon" />
                                    </div>
                                    <ErrorMessage name="username" component="div" className="error-message" />
                                </div>
                                <div className="form-group">
                                    <div className="relative">
                                        <Field
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Contraseña"
                                            className="form-input"
                                        />
                                        <FaLock className="input-icon" />
                                    </div>
                                    <ErrorMessage name="password" component="div" className="error-message" />
                                </div>
                                <div className="form-group">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="submit-button"
                                    >
                                        {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
                                    </button>
                                </div>
                                <div className="register-link-container text-center text-[14px]">
                                    <p>¿No tienes una cuenta? <Link to="/register" className="register-link pointer font-bold text-[#7C3AED]">Registrarse</Link></p>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
};
