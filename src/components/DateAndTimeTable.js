import React, { useState } from "react";
import movie1 from "./movies/듄.jpg";
import Seat from "./seat/seat";

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

const DateAndTimeTable = ({ times = [] }) => {
  const [isShown, setIsShown] = useState(false);

  function handleChange(newValue) {
    setIsShown(newValue);
  }

  return (
    <div class="flex">
      <div class="w-1/3 h-95screen bg-white font-bold">
        <div class="h-1/5">
          <img src={movie1} class="w-1/3 h-full object-cover w-full"></img>
        </div>
        <div class="flex h-4/5">
          <div class="flex-auto h-5/6 overflow-y-scroll">
            <DateTable />
          </div>
          <div class="flex-auto">
            <TimeTable times={times} hoverFunc={handleChange} />
          </div>
        </div>
      </div>
      <div class="w-2/3"> {isShown && <Seat />}</div>
    </div>
  );
};

const DateTable = () => {
  // let today = new Date();
  let today = new Date(2021, 11, 1);
  console.log(dateToString(today).substring(0, 4));

  const [currentYear, setCurrentYear] = useState(
    dateToString(today).substring(0, 4)
  );
  const [currentMonth, setCurrentMonth] = useState(
    dateToString(today).substring(4, 6)
  );
  // const currentYear = dateToString(today).substring(0, 4);
  // const currentMonth = dateToString(today).substring(4, 6);
  const [yearChanged, setYearChanged] = useState(false);

  const dates = [dateToString(today)];
  for (let i = 0; i < 20; i++) {
    today.setDate(today.getDate() + 1);
    dates.push(dateToString(today));
  }
  // console.log(dates);
  function dateToString(date1) {
    let year = date1.getFullYear(); // 년도
    let month = ("" + (date1.getMonth() + 1)).padStart(2, "0"); // 월
    let date = ("" + date1.getDate()).padStart(2, "0"); // 날짜
    let day = date1.getDay(); // 요일
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return "" + year + month + date + days[day];
  }

  return (
    <div class="font-sans ml-10 mt-10 mx-auto text-gray-500 ">
      <table>
        <tbody>
          <div class="font-sans text-center mx-auto text-md ">
            {currentYear}
          </div>
          <div class="font-sans text-center mx-auto text-4xl mb-5">
            {currentMonth}
          </div>
          {dates.map((date) => (
            <DateRow
              key={date}
              date={date}
              currentYear={currentYear}
              setCurrentYear={setCurrentYear}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DateRow = ({ date, currentYear, setCurrentYear }) => {
  let cur_year = date.substring(0, 4);
  let cur_month = date.substring(4, 6);
  let cur_date = date.substring(6, 8);
  let cur_day = date.substring(8, 9);

  // if (cur_year != currentYear) {
  //   // console.log("year changed", cur_year);
  //   // setCurrentYear("");
  // }
  return (
    <div>
      {/* <tr>
        <td class="ml-20 mr-20 text-xl px-10">{yearChanged && cur_year}</td>
      </tr> */}
      <tr>
        <td class="ml-20 mr-20 text-lg py-3 px-10 rounded-md hover:bg-gray-100 hover:text-blue-500">
          <span class="mr-3">{cur_date}</span>
          <span>{cur_day}</span>
        </td>
      </tr>
    </div>
  );
};

const TimeTable = (props) => {
  return (
    <div class="font-sans mt-10 mx-auto text-gray-500 font-medium">
      <table>
        <tbody>
          {props.times.map((section) => (
            <TimeRow
              key={section.time}
              section={section}
              hoverFunc={props.hoverFunc}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TimeRow = (props) => {
  // const [isShown, setIsShown] = useState(false);
  const { time, seat } = props.section;
  const seatWithTotal = seat + "/343";
  return (
    <tr>
      <td class="mr-20 py-5 px-10  tracking-wide text-right rounded-md hover:bg-gray-100 hover:text-blue-500 ">
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
        <span className="seat" class="text-sm  pt-4 pr-5 tracking-normal">
          {seatWithTotal}
        </span>
      </td>
    </tr>
  );

  function mouseOverTime(e) {
    props.hoverFunc(true);
    // console.log(isShown);
  }

  function mouseOutTime(e) {
    props.hoverFunc(false);
    // console.log(isShown);
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
export default () => <DateAndTimeTable times={times} />;
