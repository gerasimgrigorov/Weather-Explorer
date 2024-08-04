import React from 'react';
import axios from 'axios';
import { Form, useActionData, redirect, Link } from 'react-router-dom';
import './Auth.css';

export default function Register() {
  const actionData = useActionData();

  return (
    <div className="auth-container">
      <Form method="post" action="/register" className="auth-form">
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
        />
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
        <button type="submit">Register</button>
        {actionData?.error && <p className="error">{actionData.error}</p>}
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await axios.post('/api/register', data, { withCredentials: true });
    console.log('Registered successfully');
    return redirect('/');
  } catch (error) {
    return { error: error.response?.data?.message || 'Registration failed' };
  }
}
