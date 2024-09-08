import React, { useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import Modal from "../components/Modal";
import axios from "axios";

export default function UserInfo() {
  const backendUrl = import.meta.env.VITE_API_URL;

  const { user, setUser } = useUser();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState(null);  // Local error state

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("../");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError(null);  // Clear previous error

    try {
      // Update user info on the server
      const response = await axios.post(`${backendUrl}/api/user/update`, { username, email }, {
        withCredentials: true,
      });

      // Fetch the updated user information
      const userResponse = await axios.get(`${backendUrl}/api/check`, { withCredentials: true });
      setUser(userResponse.data.user);

      // Redirect after successful update
      navigate("/");
    } catch (error) {
      // Capture and set the error message
      const errorMessage = error.response?.data?.error || "Something went wrong.";
      setError(errorMessage);
    }
  };

  return (
    <Modal onClose={handleCancel}>
      <h3>User Details:</h3>
      <form
        className="user-info-form"
        onSubmit={handleFormSubmit}
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
        {error && (
          <p className="error" style={{ margin: "0", marginBottom: "0.7em" }}>
            <Alert severity="error">{error}</Alert>
          </p>
        )}
        <div className="form-actions">
          <button onClick={handleCancel} style={{ marginRight: "8px" }}>
            Cancel
          </button>
          <button type="submit">Update Info</button>
        </div>
      </form>
    </Modal>
  );
}
