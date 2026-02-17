// src/api/tripulacion.js
import axios from "axios";

const API_URL = "http://localhost:3000"; // backend NestJS

// --- CRUD (solo admin) ---
export const getTripulacion = async (token) => {
  const res = await axios.get(`${API_URL}/tripulacion`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createTripulante = async (tripulante, token) => {
  const res = await axios.post(`${API_URL}/tripulacion`, tripulante, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateTripulante = async (id, tripulante, token) => {
  const res = await axios.put(`${API_URL}/tripulacion/${id}`, tripulante, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteTripulante = async (id, token) => {
  const res = await axios.delete(`${API_URL}/tripulacion/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// --- Asignación a vuelos (operador) ---
export const assignTripulanteToVuelo = async (vueloId, tripulanteId, token) => {
  const res = await axios.post(
    `${API_URL}/tripulacion/asignar`,
    { vueloId, tripulanteId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const removeTripulanteFromVuelo = async (vueloId, tripulanteId, token) => {
  const res = await axios.post(
    `${API_URL}/tripulacion/remover`,
    { vueloId, tripulanteId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
