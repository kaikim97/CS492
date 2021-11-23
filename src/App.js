import "./App.css";
import axios from "axios";
import TimeTable from "./components/time/timeTable";
import Seat from "./components/seat/seat";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <TimeTable />
      <Seat />
    </div>
  );
}

export default App;
