import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Form, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import Modal from "../components/Modal";

export default function UserInfo({ onSubmit }) {
  const { user } = useUser();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, email });
  };

  const handleCancel = () => {
    navigate("../"); 
  };

  return (
    <Modal onClose={handleCancel}>
      <h3>User Deatils:</h3>
      <Form onSubmit={handleSubmit} className="user-info-form">
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
          <Button
            onClick={handleCancel}
            color="secondary"
            variant="outlined"
            style={{ marginRight: "8px" }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Update Info
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
