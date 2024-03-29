import { Field, Form, Formik } from "formik";
import * as yup from "yup";

import styles from "./MyTextarea.module.css";

interface ITextarea {
  submitForm: (value: string) => void;
}

export const MyTextarea: React.FC<ITextarea> = ({ submitForm }) => {
  const validationSchema = yup.object().shape({
    messageBody: yup.string().required("✘ the field is empty"),
  });

  const myTextarea = (props: any) => {
    return <textarea {...props.field} {...props} />;
  };

  return (
    <Formik
      initialValues={{ messageBody: "" }}
      onSubmit={(values: { messageBody: string }, { setSubmitting }) => {
        setTimeout(() => {
          submitForm(values.messageBody);
          values.messageBody = "";
          setSubmitting(true);
        }, 400);
      }}
      validationSchema={validationSchema}
    >
      {({ ...props }) => (
        <Form>
          <div className={styles.error}>
            {props.touched.messageBody && props.errors.messageBody}
          </div>
          <Field
            className={
              props.errors.messageBody
                ? styles.myTextarea + " " + styles.errorField
                : styles.myTextarea
            }
            component={myTextarea}
            type="text"
            name="messageBody"
            onChange={props.handleChange}
            placeholder="Your message..."
            onBlur={props.handleBlur}
          />
          <button className={styles.button} type="submit">
            Send Message
          </button>
        </Form>
      )}
    </Formik>
  );
};
