import "./App.css";
import { AuthContext, AuthProvider } from "./context";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MovieTable from "./features/movieTable/MovieTable";
import DateAndTimeTable from "./features/dateTimeSeatTable/DateTimeSeatTable";
import FindReservation from "./features/findReservation";

function App() {
  return (
    <AuthProvider>
      <div className="App">
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
