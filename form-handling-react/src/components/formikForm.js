import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const FormikForm = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      alert("User registered successfully!");
      resetForm();
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Register (Formik)</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Username</label><br />
              <Field name="username" type="text" />
              <ErrorMessage name="username" component="div" style={{ color: "red" }} />
            </div>

            <div>
              <label>Email</label><br />
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" style={{ color: "red" }} />
            </div>

            <div>
              <label>Password</label><br />
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" style={{ color: "red" }} />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;