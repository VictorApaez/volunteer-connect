import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/FormikForm.css";

function FormikForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email required"),
      password: Yup.string().required("Password required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password does not match")
        .required("Confirm password required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleChange = (e) => {
    formik.handleChange(e);
    formik.setFieldTouched(e.target.name, true, false);
  };

  return (
    <form className="formik-form">
      <label htmlFor="email" className="formik-form__label">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={formik.values.email}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        className="formik-form__input"
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="formik-form__error">{formik.errors.email}</div>
      ) : null}

      <label htmlFor="password" className="formik-form__label">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        value={formik.values.password}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        className="formik-form__input"
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="formik-form__error">{formik.errors.password}</div>
      ) : null}

      <label htmlFor="confirmPassword" className="formik-form__label">
        Confirm Password
      </label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        className="formik-form__input"
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div className="formik-form__error">
          {formik.errors.confirmPassword}
        </div>
      ) : null}
      <div className="formik-form__label-checkbox">
        <label htmlFor="terms">Terms and Conditions</label>
        <input
          type="checkbox"
          name="terms"
          id="terms"
          className="formik-form__checkbox"
        />
      </div>
    </form>
  );
}

export default FormikForm;
