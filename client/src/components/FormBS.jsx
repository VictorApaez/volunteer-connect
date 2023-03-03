import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { validateSignUpForm } from "../utils/formValidation";

function FormBS() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateSignUpForm(formData);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      // submit the form
      console.log(formData);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container style={{ height: "100vh", backgroundColor: "red" }}>
      <Row>
        <Col xs={12} md={6}>
          Column 1
        </Col>
        <Col xs={12} md={6}>
          Column 2
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4}>
          Column 1
        </Col>
        <Col xs={12} md={4}>
          Column 2
        </Col>
        <Col xs={12} md={4}>
          Column 3
        </Col>
      </Row>
    </Container>
  );
}

export default FormBS;
