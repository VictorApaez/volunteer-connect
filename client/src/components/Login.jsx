import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(formData);
      if (response.success) {
        localStorage.setItem("token", response.token);
        navigate("/");
      } else {
        setErrors({ email: response.error });
      }
    } catch (err) {
      setErrors({ email: "Something went wrong. Please try again later." });
    }
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Login</h2>
        <div className="login__form-group">
          <label htmlFor="username" className="login__label">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            className="login__input"
          />
          {errors.username && (
            <div className="login__error">{errors.username}</div>
          )}
        </div>
        <div className="login__form-group">
          <label htmlFor="password" className="login__label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className="login__input"
          />
          {errors.password && (
            <div className="login__error">{errors.password}</div>
          )}
        </div>
        <button type="submit" className="login__button">
          Login
        </button>
        <p className="login__signup">
          Don't have an account? <Link to={"/signup"}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
