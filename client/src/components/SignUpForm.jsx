import React, { useState } from "react";
import "../styles/SignUpForm.css";
import { signup } from "../services/authService";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleChange(event) {
    // keep previous stored data and update
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Validation rules
    const validationErrors = {};
    if (!formData.username) {
      validationErrors.username = "Username is required";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long";
    }
    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    // Cannot submit for is there are validation Errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // If there are no validation errors:
      try {
        const res = await signup(formData);

        const { success, token, error, status } = res;
        if (success) {
          setUser({
            username: formData.username,
            token: token,
          });
          localStorage.setItem("token", token);
          navigate("/");
        } else if (status === 409) {
          validationErrors.username = error; // Email already exists.
          setErrors(validationErrors);
        } else {
          console.log(error);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h1>Create an account</h1>

      <div className="signup__form__group">
        <label htmlFor="username" className="signup__form__label">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="signup__form__input"
          autoComplete="new-username"
        />
        {errors.username && (
          <div className="form__error">{errors.username}</div>
        )}
      </div>

      <div className="signup__form__group">
        <label htmlFor="password" className="signup__form__label">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="signup__form__input"
          autoComplete="new-password"
        />
        {errors.password && (
          <div className="signup__form__error">{errors.password}</div>
        )}
      </div>
      <div className="signup__form__group">
        <label htmlFor="confirmPassword" className="signup__form__label">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="signup__form__input"
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <div className="signup__form__error">{errors.confirmPassword}</div>
        )}
      </div>
      <button type="submit" className="signup__form__button">
        Sign Up
      </button>
      <p>
        Already have an account? <b>Log In</b>
      </p>
    </form>
  );
}

export default SignUpForm;
