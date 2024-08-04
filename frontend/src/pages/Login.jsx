import React from 'react';
import axios from 'axios';
import { Form, useActionData, redirect, Link } from 'react-router-dom';
import './Auth.css';

export default function Login() {
  const actionData = useActionData();

  return (
    <div className="auth-container">
      <Form method="post" action="/login" className="auth-form">
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        {actionData?.error && <p className="error">{actionData.error}</p>}
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </Form>
    </div>
  );
};

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await axios.post('/api/login', data, { withCredentials: true });
    console.log('Logged in successfully');
    return redirect("/");
  } catch (error) {
    return { error: error.response?.data?.message || 'Login failed' };
  }
}
