import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context";
import api from "../../../api.js";

export default function TimeTable({}) {
  const context = useContext(AuthContext);
  const date = context.date;
  // const title = context.title;
  const title = window.localStorage.getItem("title");
  const [selectedTime, setSelectedTime] = useState(null);

  const temp = [
    { time: "08:00", seat: "" },
    { time: "10:00", seat: "" },
    { time: "12:00", seat: "" },
    { time: "14:00", seat: "" },
    { time: "16:00", seat: "" },
    { time: "18:00", seat: "" },
    { time: "20:00", seat: "" },
    { time: "22:00", seat: "" },
  ];
  const times = [
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
    "22:00",
  ];

  const [timeSeats, setTimeSeats] = useState(temp);

  useEffect(() => {
    if (date != "") {
      console.log("date선택", date);
      const data = api
        .getAvailable(`title=${title}&date=${date}`)
        .then((response) => {
          let s = [];
          for (let i = 0; i < response.data.length; i++) {
            const elem = { time: times[i], seat: response.data[i].available };
            s.push(elem);
          }
          console.log("s 뭐야", s);
          if (s !== []) {
            console.log("s 있음", s);
            setTimeSeats(s);
          }
        });
    }
  }, [date]);
  console.log(timeSeats);
  return (
    <div class={`font-sans mt-10 mx-auto  font-medium`}>
      <table>
        <tbody>
          {timeSeats.map((section) => (
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
}

const TimeRow = ({ section, selectedTime, setSelectedTime, context }) => {
  const ifDateSelected = context.date != "";
  const { time, seat } = section;
  const seatWithTotal = seat + "/551";
  return (
    <tr>
      <td
        class={`mr-20 py-5 px-10 tracking-wide text-right rounded-md ${
          selectedTime === "" ? "hover:bg-gray-100 hover:text-blue-500" : ""
        } ${context.time === section ? "text-blue-500 bg-gray-100 " : ""} ${
          ifDateSelected
            ? "text-gray-500 "
            : "text-gray-200 pointer-events-none"
        }`}
        onClick={timeClick}
      >
        <span class="text-4xl ">{changeTimeForm(time)}</span>
        <span className="ampm" class="text-3xl ml-3 mr-10">
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

// export default () => <TimeTable times={times} />;
