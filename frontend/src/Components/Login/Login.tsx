import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Login.css";
import { useAuth } from "@Contexts/Auth_context";
import { resendEmailVerify, login } from "@Utils/api/Auth";
import { UserData } from "@Types/User";

type LoginFormValues = {
  username: string;
  password: string;
};

const validationSchema = Yup.object({
  username: Yup.string().required("El nombre de usuario es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});

export const LoginPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const result = await login(values.username, values.password);

      if (!result.ok) {
        // error 403 - Correo no verificado - Resend email confirm
        if (result.status === 403) {
          const errorData = result.data as { email: string };
          try {
            const emailSendFunc = await resendEmailVerify(errorData.email);
            navigate("/Confirm-email", {
              state: {
                email: errorData.email,
                message:
                  emailSendFunc.status === 200
                    ? "Tu correo no está verificado y hemos enviado el código de confirmación."
                    : "Tu correo no está verificado, pero hubo un error al enviar el código de confirmación. Por favor, intente más tarde.",
              },
            });
          } catch (error) {
            toast.error(
              "Error al intentar reenviar el correo de confirmación. Por favor, intente de nuevo más tarde."
            );
          }
          return;
        }

        if (result.status === 404) {
          toast.error("Usuario inexistente, por favor, intenta de nuevo.");
          return;
        }

        // other errors
        toast.error("Ocurrió un error inesperado. Por favor, intente de nuevo más tarde.");
        return;
      }

      // logged
      const successData = result.data as { data: UserData };
      setUser({
        user: successData.data,
        isLogged: true,
      });
      toast.success("¡Bienvenido!");
      navigate("/forum");

    } catch (e) {
      toast.error("Ocurrió un error inesperado. Por favor, revise su conexión.");
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
          <h2 className="text-h3 font-extrabold text-center mb-6 text-gray-800">
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