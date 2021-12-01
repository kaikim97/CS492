import React, { useReducer, createContext } from "react";

const initialState = {
  title: "",
  date: "",
  time: "",
  seats: [],
  id: "",
};

const AuthContext = createContext({
  title: "",
  date: "",
  time: "",
  id: "",
  setTitle: (title) => {},
  setDate: (date) => {},
  setTime: (time) => {},
  setSeats: (seat) => {},
  setId: (id) => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "SETTITLE":
      return {
        ...state,
        title: action.payload,
      };
    case "SETDATE":
      return {
        ...state,
        date: action.payload,
      };
    case "SETTIME":
      return {
        ...state,
        time: action.payload,
      };
    case "SETSEATS":
      return {
        ...state,
        seats: action.payload,
      };
    case "SETID":
      return {
        ...state,
        id: action.payload,
      };
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  function setTitle(title) {
    dispatch({
      type: "SETTITLE",
      payload: title,
    });
  }
  function setDate(date) {
    dispatch({
      type: "SETDATE",
      payload: date,
    });
  }

  function setTime(time) {
    dispatch({
      type: "SETTIME",
      payload: time,
    });
  }

  function setSeats(seat) {
    dispatch({
      type: "SETSEATS",
      payload: seat,
    });
  }

  function setId(id) {
    dispatch({
      type: "SETID",
      payload: id,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        title: state.title,
        date: state.date,
        time: state.time,
        seats: state.seats,
        id: state.id,
        setTitle,
        setDate,
        setTime,
        setSeats,
        setId,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
