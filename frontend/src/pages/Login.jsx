import React from "react";
import axios from "axios";
import { Form, useActionData, redirect, Link } from "react-router-dom";
import { Alert } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./Auth.css";

export default function Login() {
  const actionData = useActionData();

  return (
    <div className="auth-container">
      <Form method="post" action="/login" className="auth-form">
        <Link to="/" className="back-to-home">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h2>Login</h2>
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        {actionData?.error && (
          <p className="error">
            <Alert severity="error">{actionData.error}</Alert>
          </p>
        )}
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  // const {setUser} = useUser()
  const data = Object.fromEntries(formData);

  try {
    const result = await axios.post("/api/login", data, {
      withCredentials: true,
    });
    // setUser(result.data.user)
    console.log("Logged in successfully");
    return redirect("/");
  } catch (error) {
    console.log(error)
    return { error: error.response.data.error || "Login failed" };
  }
}
