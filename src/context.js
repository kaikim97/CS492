import React, { useReducer, createContext } from "react";

const initialState = {
  date: "",
  time: "",
};

const AuthContext = createContext({
  date: "",
  time: "",
  setDate: (date) => {},
  setTime: (time) => {},
});

function authReducer(state, action) {
  switch (action.type) {
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
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

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

  return (
    <AuthContext.Provider
      value={{
        date: state.date,
        time: state.time,
        setDate,
        setTime,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
