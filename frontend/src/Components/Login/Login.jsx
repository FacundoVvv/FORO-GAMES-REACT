import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Login.css';

const LoginPage = () => {
    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('El nombre de usuario es obligatorio'),
        password: Yup.string().required('La contraseña es obligatoria'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try{
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            console.log(response)
            if(!response.ok){
                console.log('fetch error');
                return;
            }
            const token = data.token;
            console.log(token);

        }catch(e){
            console.log('error al procesar solicitud.')
        }
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    };

    return (
        <section className="min-h-screen flex">
            <div className="login-img-container hidden lg:flex lg:w-1/2 bg-gray-300 items-center justify-center relative">
                <div className="absolute inset-0 bg-black opacity-100 login-img"></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-6xl font-bold text-white">SFRP Inicio de Sesión</h1>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 bg-gradient-to-br from-blue-100 to-indigo-100">
                <div className="w-full max-w-md">
                    <h2 className="text-4xl font-extrabold text-center mb-6 text-gray-800">Inicio de <span className="text-purple-600">Sesión</span></h2>
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
                                <div className="register-link-container text-center">
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

export default LoginPage;
