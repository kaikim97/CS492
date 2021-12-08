import logo from "./logo.svg";
import "./App.css";
import { AuthContext, AuthProvider } from "./context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import TopBar from "./features/TopBar";
import MovieTable from "./features/movieTable/MovieTable";
import DateAndTimeTable from "./features/dateTimeSeatTable/DateTimeSeatTable";
// import PersonalInfo from "./features/PersonalInfo";
import FindReservation from "./features/findReservation";

function App() {
  // const navigate = useNavigate();
  // const findReservation = () => {
  //   navigate("/findReservation");
  // };

  return (
    <AuthProvider>
      <div className="App">
        {/* <TopBar /> */}
        {/* <TopBar function={findReservation} /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<MovieTable />} />
            <Route path="/movieInfo" element={<DateAndTimeTable />} />
            <Route path="/findReservation" element={<FindReservation />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
