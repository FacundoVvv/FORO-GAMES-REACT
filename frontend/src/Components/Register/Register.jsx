import { React, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { NewError } from '@Utils_forum_components/NewError';
export const RegisterPage = () => {

    const navigate = useNavigate();
    const [error, setError] = useState("");
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
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Debe tener al menos una minúscula, una mayúscula y un número')
            .required('La contraseña es obligatoria'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setError("");
        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                if(response.status === 404){
                    setError("El nombre de usuario o el correo electronico ya estan en uso.")
                    return;
                }else{
                    setError("Hubo un problema al procesar la solicitud. Intentelo más tarde.")
                    return;
                }

            }
            
            await response.json();
            navigate('/Confirm-email', { state: { email: values.email } });

        } catch (e) {
            setError("Hubo un problema al procesar la solicitud. Intentelo más tarde.")
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen flex">
            <div className="register-img-container hidden lg:flex lg:w-1/2 bg-gray-300 items-center justify-center relative">
                <div className="absolute inset-0 bg-black opacity-100 register-img"></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-3xl font-bold text-white tracking-wide">SFRP Registro</h1>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 bg-gradient-to-br from-blue-100 to-indigo-100">
                <div className="w-full max-w-md">
                    <h2 className="text-[26px] font-extrabold text-center mb-6 text-gray-800">
                        Registro de <span className="text-purple-600">Usuario</span>
                    </h2>
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
                                 {error && <NewError message={error} />}
                                <div className="form-group">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="submit-button"
                                    >
                                        {isSubmitting ? 'Registrando...' : 'Registrarme'}
                                    </button>
                                </div>
                                <div className="register-link-container text-center text-[14px]">
                                    <p>¿Ya tienes una cuenta? <Link to="/login" className="register-link pointer font-bold text-[#7C3AED]">Iniciar sesión</Link></p>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
};
