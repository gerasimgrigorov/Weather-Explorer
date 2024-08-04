import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { username, email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
  return response.data;
};
