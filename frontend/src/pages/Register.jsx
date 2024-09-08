import React from "react";
import axios from "axios";
import { Form, useActionData, redirect, Link } from "react-router-dom";
import { Alert } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./Auth.css";

export default function Register() {
  const actionData = useActionData();
  console.log(actionData);

  return (
    <div className="auth-container">
      <Form method="post" action="/register" className="auth-form">
        <Link to="/" className="back-to-home">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h2>Register</h2>
        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
        {actionData?.error && (
          <p className="error">
            <Alert severity="error">{actionData.error}</Alert>
          </p>
        )}
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const backendUrl = import.meta.env.VITE_API_URL;

  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await axios.post(`${backendUrl}/api/register`, data, { withCredentials: true });
    console.log("Registered successfully");
    return redirect("/");
  } catch (error) {
    console.log(error);
    return { error: error.response.data.error || "Registration failed" };
  }
}
