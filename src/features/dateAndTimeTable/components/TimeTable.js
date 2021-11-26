import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context";

const times = [
  { time: "10:00", seat: 30 },
  { time: "11:00", seat: 67 },
  { time: "12:00", seat: 44 },
  { time: "14:00", seat: 16 },
  { time: "16:00", seat: 24 },
  { time: "18:00", seat: 98 },
  { time: "20:00", seat: 29 },
  { time: "21:00", seat: 41 },
];

const TimeTable = ({ times = [] }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const context = useContext(AuthContext);
  return (
    <div class={`font-sans mt-10 mx-auto  font-medium`}>
      <table>
        <tbody>
          {times.map((section) => (
            <TimeRow
              key={section.time}
              section={section}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              context={context}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TimeRow = ({ section, selectedTime, setSelectedTime, context }) => {
  const [isShown, setIsShown] = useState(false);

  const ifDateSelected = context.date != "";
  console.log("ifDateSelectedboolean: ", ifDateSelected);

  console.log("asdfasd ", context.time);
  const { time, seat } = section;
  const seatWithTotal = seat + "/551";
  return (
    <tr>
      <td
        class={`mr-20 py-5 px-10 tracking-wide text-right rounded-md ${
          context.time === "" ? "hover:bg-gray-100 hover:text-blue-500" : ""
        } ${context.time === section ? "text-blue-500 bg-gray-100 " : ""} ${
          ifDateSelected
            ? "text-gray-500 "
            : "text-gray-200 pointer-events-none"
        }`}
        onClick={timeClick}
      >
        <span
          onMouseOver={mouseOverTime}
          onMouseOut={mouseOutTime}
          class="text-4xl "
        >
          {changeTimeForm(time)}
        </span>
        <span className="ampm" class="text-3xl ml-3 mr-10">
          {amOrPm(time)}
        </span>
        <span
          className="seat"
          class={`text-sm  pt-4 pr-5 tracking-normal ${
            ifDateSelected ? "" : "hidden"
          }`}
        >
          {seatWithTotal}
        </span>
      </td>
    </tr>
  );
  function mouseOverTime(e) {
    setIsShown(true);
  }

  function mouseOutTime(e) {
    setIsShown(false);
  }
  function timeClick(e) {
    setSelectedTime(section);
    context.setTime(section);
  }
};

function changeTimeForm(time) {
  if (time.slice(0, 2) * 1 > 12) {
    return time.slice(0, 2) * 1 - 12 + ":00";
  } else {
    return time;
  }
}

function amOrPm(time) {
  if (time.slice(0, 2) * 1 >= 12) {
    return "PM";
  } else {
    return "AM";
  }
}

export default () => <TimeTable times={times} />;
