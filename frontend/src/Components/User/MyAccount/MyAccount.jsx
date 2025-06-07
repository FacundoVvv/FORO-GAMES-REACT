import React, { useContext } from "react";
import { MyContext } from "@Contexts/Main_context";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NotLoggedRedirect } from "@Utils_forum_components/NotLoggedRedirect";
import * as Yup from "yup";

export const MyAccount = () => {
  const { user, setUser } = useContext(MyContext);

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required(
      "La contraseña actual es obligatoria"
    ),

    newPassword: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Debe tener al menos una minúscula, una mayúscula y un número"
      )
      .notOneOf(
        [Yup.ref("currentPassword")],
        "La nueva contraseña no puede ser igual a la actual"
      )
      .required("La nueva contraseña es obligatoria"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden")
      .required("Confirma tu nueva contraseña"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await fetch("http://localhost:3000/users/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
      resetForm();
      alert("Contraseña cambiada con éxito.");
    } catch (error) {
      console.error("Error al cambiar contraseña", error);
      alert("Ocurrió un error. Intenta nuevamente.");
    }
  };
  const handleCloseSession = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/clear-cookies", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("cleaned cookies and logout");
        window.location.reload();
      } else {
        console.log("algo salio mal.");
      }
    } catch (e) {
      console.log("error:", error);
    }
  };

  //protect route from front
  if (!user.isLogged) {
    return <NotLoggedRedirect />;
  }

  return (
    user.user &&
    user.isLogged && (
      <main className="bg-gradient-to-br from-indigo-50 to-purple-100 py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
          <h1 className="text-[32px] font-extrabold text-gray-800">
            Mi Cuenta
          </h1>

          {/* user info */}
          <section>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">
              Información Personal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  value={user.user.username || "Not found"}
                  disabled
                  className="w-full bg-gray-100 text-gray-700 rounded-lg px-4 py-2 border border-gray-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={user.user.email || "Not found"}
                  disabled
                  className="w-full bg-gray-100 text-gray-700 rounded-lg px-4 py-2 border border-gray-300"
                />
              </div>
            </div>
          </section>

          {/* change pass */}
          <section>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">
              Cambiar Contraseña
            </h2>
            <Formik
              initialValues={{
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Contraseña actual
                  </label>
                  <Field
                    name="currentPassword"
                    type="password"
                    className="w-full bg-white text-gray-700 rounded-lg px-4 py-2 border border-gray-300"
                  />
                  <ErrorMessage
                    name="currentPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Nueva contraseña
                  </label>
                  <Field
                    name="newPassword"
                    type="password"
                    className="w-full bg-white text-gray-700 rounded-lg px-4 py-2 border border-gray-300"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Confirmar contraseña
                  </label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="w-full bg-white text-gray-700 rounded-lg px-4 py-2 border border-gray-300"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="mt-4 bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-300"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </Form>
            </Formik>
          </section>

          {/* actions */}
          <section className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={handleCloseSession}
              className="bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Cerrar Sesión
            </button>
            {/* <button className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300">
                    Eliminar Cuenta
                </button> */}
          </section>
        </div>
      </main>
    )
  );
};
