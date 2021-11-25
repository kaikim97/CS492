import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:80/reservations",
});

const api2 = axios.create({
  baseURL: "http://localhost:80/halls",
});

//reservation api
export const getAllReservations = (payload) => api.get("/", payload);
export const getReservationById = (id) => api.get("/" + id);
export const getReservationQuery = (payload) => api.get("/search?" + payload);
export const createReservation = (payload) => api.post("/", payload);
export const deleteReservation = (id) => api.delete("/" + id);

//halls api
export const getAllHalls = () => api2.get("/");
export const getHallsByInfo = (payload) => api2.get("/hall?" + payload);

const apis = {
  getAllReservations,
  getReservationById,
  getReservationQuery,
  createReservation,
  deleteReservation,
  getAllHalls,
  getHallsByInfo,
};

export default apis;
