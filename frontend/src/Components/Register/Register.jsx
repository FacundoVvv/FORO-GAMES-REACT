import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
export const RegisterPage = () => {

    const navigate = useNavigate();

    const initialValues = {
        username: '',
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
            .max(20, 'El nombre de usuario no puede tener más de 20 caracteres')
            .required('El nombre de usuario es obligatorio'),
        email: Yup.string()
            .email('Correo electrónico inválido')
            .required('El correo electrónico es obligatorio'),
        password: Yup.string()
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe contener al menos una letra minúscula, una mayúscula y un número')
            .required('La contraseña es obligatoria'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            // Hacer la solicitud POST
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            });
    
            
            if (!response.ok) {
                const errorData = await response.json();
                console.log('Error durante el registro:', errorData.message);
                return;
            }
            
            await response.json();
            navigate('/Confirm-email', { state: { email: values.email } });
            return;
    
        } catch (e) {
            console.log('Error en la solicitud:', e.error);
        } finally {
            setSubmitting(false);
        }
    };
    
    return (
        <section className="register-page">
            <div className="register-image-container">
                <div className="register-image-overlay"></div>
                <div className="register-text-container">
                    <h1 className="register-title animate-slide-in">SFRP Registro</h1>
                    <p className="register-subtitle animate-slide-in-delayed">¡Comienza tu nueva aventura!</p>
                </div>
            </div>
            <div className="register-form-container">
                <div className="register-form-content">
                    <h2 className="register-form-title">
                        Registro de <span className="register-form-title-highlight">Usuario</span>
                    </h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="register-form">
                                <div className="form-group">
                                    <div className="input-container">
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
                                    <div className="input-container">
                                        <Field
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Correo electrónico"
                                            className="form-input"
                                        />
                                        <FaEnvelope className="input-icon" />
                                    </div>
                                    <ErrorMessage name="email" component="div" className="error-message" />
                                </div>
                                <div className="form-group">
                                    <div className="input-container">
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
                                        {isSubmitting ? 'Registrando...' : 'Registrarme'}
                                    </button>
                                </div>
                                <div className="login-link-container">
                                    <p>¿Ya tienes una cuenta? <Link to="/login" className="login-link">Iniciar sesión</Link></p>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
};
