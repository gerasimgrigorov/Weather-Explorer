import React, { useState } from "react";
import { Alert } from "@mui/material";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import { redirect } from "react-router-dom";
import Modal from "../components/Modal";
import axios from "axios";

export default function UserInfo() {
  const { user, setUser } = useUser();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const actionData = useActionData();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("../");
  };

  return (
    <Modal onClose={handleCancel}>
      <h3>User Deatils:</h3>
      <Form
        method="post"
        className="user-info-form"
        // onSubmit={() => setUser({ ...user, username, email })}
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> */}
        {actionData?.error && (
          <p className="error" style={{ margin: "0", marginBottom: "0.7em" }}>
            <Alert severity="error">{actionData.error}</Alert>
          </p>
        )}
        <div className="form-actions">
          <button onClick={handleCancel} style={{ marginRight: "8px" }}>
            Cancel
          </button>
          <button type="submit">Update Info</button>
        </div>
      </Form>
    </Modal>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const result = await axios.post("/api/user/update", data, {
      withCredentials: true,
    });
    return redirect("/");
  } catch (e) {
    return { error: e.response.data.error || "Something went wrong." };
  }
}
