import axios from "axios";

const API_URL = "http://localhost:3000"; // backend

export const getVuelos = async (token) => {
  const res = await axios.get(`${API_URL}/vuelos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateEstadoVuelo = async (id, estado, token) => {
  const res = await axios.patch(`${API_URL}/vuelos/${id}/estado`, { estado }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
