import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "@Contexts/Main_context";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NotLoggedRedirect } from "@Utils/NotLoggedRedirect";
// Validaciones con Yup
const validationSchema = Yup.object({
  title: Yup.string()
    .required("El título es obligatorio.")
    .max(100, "El título es demasiado largo.")
    .test(
      "no-script",
      "El título contiene contenido no permitido.",
      (value) => !/<script>/i.test(value || "")
    ),
  content: Yup.string()
    .required("El contenido es obligatorio.")
    .max(2000, "El contenido es demasiado largo.")
    .test(
      "no-script",
      "El contenido contiene contenido no permitido.",
      (value) => !/<script>/i.test(value || "")
    ),
});

export const CreatePost = () => {
  const { user, socket, isSocketReady } = useContext(MyContext);
  const { section } = useParams();
  const [newPost, setNewPost] = useState(null);

  // wait socket context update to connecttt
  useEffect(() => {
    const socketRef = socket.current;
    if (socketRef && isSocketReady && newPost !== null) {
      socketRef.emit("newPost", { section, post: newPost });
      console.log("nuevo post emitido", newPost);
      setNewPost(null);
    }
  }, [isSocketReady, newPost, section]);

  const handleSubmit = async (values, { resetForm }) => {
    if (!user.user) {
      alert("Debes iniciar sesión para publicar.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/forum/posts/create-post/${section}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", 
          body: JSON.stringify({
            title: values.title,
            content: values.content,
            author: user.user._id,
          }),
        }
      );

      if (response.ok) {
        const savedPost = await response.json();
        resetForm();
        setNewPost(savedPost.post);
        alert("Post publicado correctamente");
      } else {
        const errorData = await response.json();
        alert(
          "Error al crear posteo: " + (errorData.message || response.statusText)
        );
      }
    } catch (error) {
      alert("Error al crear posteo: " + error);
      setNewPost(null);
    }
  };

    //protect route from front
    if (!user.user || !user.isLogged) {
      return <NotLoggedRedirect />;
    }

  return (
    socket.current && (
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-10">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
          Crear <span className="text-purple-600">post</span> en{" "}
          <strong>{section}</strong>
        </h2>

        <Formik
          initialValues={{ title: "", content: "" }}
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
                name="content"
                rows={6}
                placeholder="Escribí el contenido del post"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <ErrorMessage
                name="content"
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
