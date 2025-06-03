import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Login.css";
import { MyContext } from "@Contexts/Main_context";
import { useNavigate } from "react-router-dom";
import { resendEmailVerify } from "@Utils/resendEmailVerify";
import { NewError } from "@Utils_forum_components/NewError";

export const LoginPage = () => {
  const { setUser } = useContext(MyContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("El nombre de usuario es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        // error 403 - Correo no verificado - Resend email confirm
        if (response.status === 403) {
          try {
            const emailSendFunc = await resendEmailVerify(data.email);

            navigate("/Confirm-email", {
              state: {
                email: data.email,
                message:
                  emailSendFunc.status === 200
                    ? "Tu correo no está verificado y hemos enviado el código de confirmación."
                    : "Tu correo no está verificado, pero hubo un error al enviar el código de confirmación. Por favor, intente más tarde.",
              },
            });
          } catch (error) {
            setError(
              "Error al intentar reenviar el correo de confirmación. Por favor, intente de nuevo más tarde."
            );
          }
          return;
        }

        if (response.status === 404) {
          setError("Usuario inexistente, por favor, intenta de nuevo.");
          return;
        }
        // other errors
        setError(
          "Ocurrió un error inesperado. Por favor, intente de nuevo más tarde."
        );
        return;
      }

      // logged
      setUser({
        user: data.user,
        isLogged: true,
      });
      navigate("/forum");
      // window.location.reload();
    } catch (e) {
      setError("Ocurrió un error insperado.Por favor, revise su conexión.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex">
      <div className="login-img-container hidden lg:flex lg:w-1/2 bg-gray-300 items-center justify-center relative">
        <div className="absolute inset-0 bg-black opacity-100 login-img"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            SFRP Inicio de Sesión
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 bg-gradient-to-br from-blue-100 to-indigo-100">
        <div className="w-full max-w-md">
          <h2 className="text-[26px] font-extrabold text-center mb-6 text-gray-800">
            Inicio de <span className="text-purple-600">Sesión</span>
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
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
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error-message"
                  />
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
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>
                {error && <NewError message={error} />}
                <div className="form-group">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-button"
                  >
                    {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
                  </button>
                </div>
                <div className="register-link-container text-center text-[14px]">
                  <p>
                    ¿No tienes una cuenta?{" "}
                    <Link
                      to="/register"
                      className="register-link pointer font-bold text-[#7C3AED]"
                    >
                      Registrarse
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};
