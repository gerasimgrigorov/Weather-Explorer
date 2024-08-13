import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Form, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import Modal from "../components/Modal";
import axios from "axios";

export default function UserInfo({ onSubmit }) {
  const { user } = useUser();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("../");
  };

  return (
    <Modal onClose={handleCancel}>
      <h3>User Deatils:</h3>
      <Form method="post" action="/user"  className="user-info-form">
        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        {/* <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          variant="outlined"
        /> */}
        <div className="form-actions">
          <button
            onClick={handleCancel}
            style={{ marginRight: "8px" }}
          >
            Cancel
          </button>
          <button type="submit">
            Update Info
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.entries(formData);

  try {
    const result = await axios.post("/api/user/update", data, {
      withCredentials: true,
    });
    console.log(result);
  } catch (e) {
    console.log(e)
    return { error: error.response.data.error || "Something went wrong." };
  }
}
