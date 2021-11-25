import logo from "./logo.svg";
import "./App.css";
import { AuthContext, AuthProvider } from "./context";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TopBar from "./components/TopBar";
import MovieTable from "./components/MovieTable";
import DateAndTimeTable from "./components/DateAndTimeTable";
import PersonalInfo from "./PersonalInfo";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <TopBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<MovieTable />} />
            <Route path="/movieInfo" element={<DateAndTimeTable />} />
            <Route path="/personalInfo" element={<PersonalInfo />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
