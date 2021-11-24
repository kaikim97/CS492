import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:80/reservations",
});

const api2 = axios.create({
  baseURL: "http://localhost:80/halls",
});

//reservation api
export const getAllReservations = (payload) => api.get("/", payload);
export const getReservationById = (id, payload) => api.get("/${id}", payload);
export const createReservation = (payload) => api.post("/", payload);
export const deleteReservation = (id) => api.delete("/${id}");

//halls api
export const getAllHalls = () => api2.get("/");
export const getHallsByTime = (time) => api2.get("/${time}");

const apis = {
  getAllReservations,
  getReservationById,
  createReservation,
  deleteReservation,
  getAllHalls,
  getHallsByTime,
};

export default apis;
