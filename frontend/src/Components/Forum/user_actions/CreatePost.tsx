import { useEffect, useState } from "react";
import { useAuth } from "@Contexts/Auth_context";
import { useSocket } from "@Contexts/Socket_context";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { NotLoggedRedirect } from "@Utils_forum_components/NotLoggedRedirect";
import { createPost } from "@Utils/api/Posts";
import { Post } from "@Types/Forum/Post";

type CreatePostFormValues = {
  title: string;
  description: string;
};

const validationSchema = Yup.object({
  title: Yup.string()
    .required("El título es obligatorio.")
    .max(100, "El título es demasiado largo.")
    .test(
      "no-script",
      "El título contiene contenido no permitido.",
      (value) => !/<script>/i.test(value || "")
    ),
  description: Yup.string()
    .required("El contenido es obligatorio.")
    .max(2000, "El contenido es demasiado largo.")
    .test(
      "no-script",
      "El contenido contiene contenido no permitido.",
      (value) => !/<script>/i.test(value || "")
    ),
});

export const CreatePost = () => {
  const { user } = useAuth();
  const { socket, isSocketReady } = useSocket();
  const { section } = useParams<{ section: string }>();
  const [newPost, setNewPost] = useState<Post | null>(null);

  // wait socket context update to connect
  useEffect(() => {
    const socketRef = socket.current;
    if (socketRef && isSocketReady && newPost !== null) {
      socketRef.emit("newPost", { section, post: newPost });
      setNewPost(null);
    }
  }, [isSocketReady, newPost, section]);

  const handleSubmit = async (
    values: CreatePostFormValues,
    { resetForm }: FormikHelpers<CreatePostFormValues>
  ) => {
    if (!user.user) {
      toast.error("Debes iniciar sesión para publicar.");
      return;
    }

    try {
      const savedPost = await createPost(
        section!,
        values.title,
        values.description,
        user.user._id
      );
      resetForm();
      setNewPost(savedPost);
      toast.success("Post publicado correctamente");
    } catch (error) {
      toast.error("Error al crear posteo: " + error);
      setNewPost(null);
    }
  };

  return (
    socket.current && (
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-10">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
          Crear <span className="text-purple-600">post</span> en{" "}
          <strong>{section}</strong>
        </h2>

        <Formik
          initialValues={{ title: "", description: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <Field
                type="text"
                name="title"
                placeholder="Escribí el título del post"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contenido
              </label>
              <Field
                as="textarea"
                name="description"
                rows={6}
                placeholder="Escribí el contenido del post"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition"
              >
                Publicar
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    )
  );
};