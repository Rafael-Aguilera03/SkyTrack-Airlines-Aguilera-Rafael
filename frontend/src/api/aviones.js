import axios from "axios";

const API_URL = "http://localhost:3000"; // backend NestJS

export const getAviones = async (token) => {
  const res = await axios.get(`${API_URL}/aviones`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createAvion = async (avion, token) => {
  const res = await axios.post(`${API_URL}/aviones`, avion, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateAvion = async (id, avion, token) => {
  const res = await axios.put(`${API_URL}/aviones/${id}`, avion, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteAvion = async (id, token) => {
  const res = await axios.delete(`${API_URL}/aviones/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
