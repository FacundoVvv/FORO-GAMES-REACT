import { useAuth } from "@Contexts/Auth_context";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { changePassword } from "@Utils/api/Users";
import { logout } from "@Utils/api/Auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type ChangePasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const validationSchema = Yup.object({
  currentPassword: Yup.string().required("La contraseña actual es obligatoria"),
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

export const MyAccount = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  if (!user.user) return null;

  const handleSubmit = async (
    values: ChangePasswordFormValues,
    { resetForm }: FormikHelpers<ChangePasswordFormValues>
  ) => {
    try {
      const result = await changePassword(
        values.currentPassword,
        values.newPassword,
        values.confirmPassword
      );
      if (result.ok) {
        resetForm();
        toast.success("Contraseña cambiada con éxito.");
      } else {
        toast.error("Ocurrió un error. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al cambiar contraseña", error);
      toast.error("Ocurrió un error. Intenta nuevamente.");
    }
  };

  const handleCloseSession = async () => {
    try {
      const result = await logout();
      if (result.ok) {
        setUser({ isLogged: false, user: null });
        navigate("/login");
      } else {
        toast.error("algo salió mal al cerrar sesión.");
      }
    } catch (e) {
      console.error("error:", e);
      toast.error("Error al cerrar sesión.");
    }
  };

  return (
    <main className="bg-gradient-to-br from-indigo-50 to-purple-100 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
        <h1 className="text-h2 font-extrabold text-gray-800">
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
        </section>
      </div>
    </main>
  );
};