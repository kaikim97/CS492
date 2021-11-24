import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TopBar from "./components/TopBar";
import MovieTable from "./components/MovieTable";
import DateAndTimeTable from "./components/DateAndTimeTable";
import Seat from "./components/seat/seat";

function App() {
  return (
    <div className="App">
      {/* <TopBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<MovieTable />} />
          <Route path="/movieInfo" element={<DateAndTimeTable />} />
        </Routes>
      </BrowserRouter> */}
      <Seat />
    </div>
  );
}

export default App;
