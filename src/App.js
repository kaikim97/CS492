import logo from "./logo.svg";
import "./App.css";
import { AuthContext, AuthProvider } from "./context";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TopBar from "./features/TopBar";
import MovieTable from "./features/movieTable/MovieTable";
import DateAndTimeTable from "./features/dateAndTimeTable/DateAndTimeTable";
import PersonalInfo from "./PersonalInfo";
import FindReservation from "./findReservation";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        {/* <TopBar /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<MovieTable />} />
            <Route path="/movieInfo" element={<DateAndTimeTable />} />
            <Route path="/personalInfo" element={<PersonalInfo />} />
            <Route path="/findReservation" element={<FindReservation />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
