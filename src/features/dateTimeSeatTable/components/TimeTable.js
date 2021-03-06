import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context";
import api from "../../../api.js";

export default function TimeTable({}) {
  const context = useContext(AuthContext);
  const date = context.date;
  const title = window.localStorage.getItem("title");

  const temp = [
    { time: "0800", seat: "" },
    { time: "1000", seat: "" },
    { time: "1200", seat: "" },
    { time: "1400", seat: "" },
    { time: "1600", seat: "" },
    { time: "1800", seat: "" },
    { time: "2000", seat: "" },
    { time: "2200", seat: "" },
  ];
  const times = [
    "0800",
    "1000",
    "1200",
    "1400",
    "1600",
    "1800",
    "2000",
    "2200",
  ];

  const [timeSeats, setTimeSeats] = useState(temp);

  useEffect(() => {
    if (date != "") {
      const data = api
        .getAvailable(`title=${title}&date=${date}`)
        .then((response) => {
          let s = [];
          for (let i = 0; i < response.data.length; i++) {
            const elem = { time: times[i], seat: response.data[i].available };
            s.push(elem);
          }
          if (s !== []) {
            setTimeSeats(s);
          }
        });
    }
  }, [date]);
  return (
    <div class={`font-sans mt-10 mx-auto  font-medium`}>
      <table>
        <tbody>
          {timeSeats.map((section) => (
            <TimeRow key={section.time} section={section} context={context} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TimeRow = ({ section, context }) => {
  const ifDateSelected = context.date != "";
  const { time, seat } = section;
  const seatWithTotal = seat + "/551";
  return (
    <tr>
      <td
        class={`mr-20 py-5 px-10 tracking-wide text-right rounded-md ${
          context.time === "" ? "hover:bg-gray-100 hover:text-blue-500" : ""
        } ${context.time === time ? "text-blue-500 bg-gray-100 " : ""} ${
          ifDateSelected
            ? "text-gray-500 "
            : "text-gray-200 pointer-events-none"
        }`}
        onClick={timeClick}
      >
        <span class="text-2xl md:text-4xl ">{changeTimeForm(time)}</span>
        <span className="ampm" class="text-xl md:text-3xl ml-3 mr-10">
          {amOrPm(time)}
        </span>
        <span
          className="seat"
          class={`text-sm  pt-4 pr-5 tracking-normal ${
            ifDateSelected && seat != "" ? "" : "text-transparent "
          }`}
        >
          {seatWithTotal}
        </span>
      </td>
    </tr>
  );
  function timeClick(e) {
    context.setTime(time);
  }
};

function changeTimeForm(time) {
  if (time.slice(0, 1) * 1 == 0) {
    return time.slice(1, 2) + ":" + time.slice(2, 4);
  } else if (time.slice(0, 2) * 1 > 12) {
    return time.slice(0, 2) * 1 - 12 + ":" + time.slice(2, 4);
  } else {
    return time.slice(0, 2) + ":" + time.slice(2, 4);
  }
}

function amOrPm(time) {
  if (time.slice(0, 2) * 1 >= 12) {
    return "PM";
  } else {
    return "AM";
  }
}
