import React, { useReducer, createContext } from "react";

const initialState = {
  title: "",
  date: "",
  time: "",
  seats: [],
  id: "",
  price: 0,
};

const AuthContext = createContext({
  title: "",
  date: "",
  time: "",
  id: "",
  price: 0,
  setTitle: (title) => {},
  setDate: (date) => {},
  setTime: (time) => {},
  setSeats: (seat) => {},
  setId: (id) => {},
  setPrice: (price) => {},
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
    case "SETPRICE":
      return {
        ...state,
        price: action.payload,
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

  function setPrice(price) {
    dispatch({
      type: "SETPRICE",
      payload: price,
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
        price: state.price,
        setTitle,
        setDate,
        setTime,
        setSeats,
        setId,
        setPrice,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
