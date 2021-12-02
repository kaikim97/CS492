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
export const updateReservationById = (id, payload) =>
  api.put("/" + id, payload);

//halls api
export const getAllHalls = () => api2.get("/");
// export const getHallsByTime = (time) => api2.get("/${time}");
export const getHallsByInfo = (payload) => api2.get("/hall?" + payload);
export const preoccupySeat = (payload) => api2.post("/preoccupy", payload);

const apis = {
  getAllReservations,
  getReservationById,
  getReservationQuery,
  createReservation,
  deleteReservation,
  updateReservationById,
  getAllHalls,
  getHallsByInfo,
  preoccupySeat,
};

export default apis;
