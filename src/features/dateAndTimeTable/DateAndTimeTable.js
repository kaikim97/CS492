import React, { useState } from "react";

import DateTable from "./components/DateTable";
import TimeTable from "./components/TimeTable";

import { useContext } from "react";
import { AuthContext } from "../../context";

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
  const context = useContext(AuthContext);
  const title = context.title;
  console.log("TITLE: ", title);
  return (
    <div class="w-1/3 h-95screen bg-white font-bold">
      <div class="h-1/4">
        <img
          src={require(`../../components/movies/${title}.jpg`).default}
          // src={require("../../components/movies/듄.jpg").default}
          class="w-1/3 h-full object-cover w-full"
        ></img>
      </div>
      <div class="flex h-3/4">
        <div class="flex-auto h-5/6 overflow-y-scroll">
          <DateTable />
        </div>
        <div class="flex-auto">
          <TimeTable times={times} />
        </div>
      </div>
    </div>
  );
};

// const DateTable = () => {
//     const [selectedDate, setSelectedDate] = useState(null);
//   // let today = new Date();
//   let today = new Date(2021, 11, 1);
//   console.log(dateToString(today).substring(0, 4));

//   const [currentYear, setCurrentYear] = useState(
//     dateToString(today).substring(0, 4)
//   );
//   const [currentMonth, setCurrentMonth] = useState(
//     dateToString(today).substring(4, 6)
//   );
//   // const currentYear = dateToString(today).substring(0, 4);
//   // const currentMonth = dateToString(today).substring(4, 6);
//   const [yearChanged, setYearChanged] = useState(false);

//   const dates = [dateToString(today)];
//   for (let i = 0; i < 20; i++) {
//     today.setDate(today.getDate() + 1);
//     dates.push(dateToString(today));
//   }
//   // console.log(dates);
//   function dateToString(date1) {
//     let year = date1.getFullYear(); // 년도
//     let month = ("" + (date1.getMonth() + 1)).padStart(2, "0"); // 월
//     let date = ("" + date1.getDate()).padStart(2, "0"); // 날짜
//     let day = date1.getDay(); // 요일
//     const days = ["일", "월", "화", "수", "목", "금", "토"];
//     return "" + year + month + date + days[day];
//   }

//   return (
//     <div class="font-sans ml-10 mt-10 mx-auto text-gray-500 ">
//       <table>
//         <tbody>
//           <div class="font-sans text-center mx-auto text-md ">
//             {currentYear}
//           </div>
//           <div class="font-sans text-center mx-auto text-4xl mb-5">
//             {currentMonth}
//           </div>
//           {dates.map((date) => (
//             <DateRow
//               key={date}
//               date={date}
//               currentYear={currentYear}
//               setCurrentYear={setCurrentYear}
//               selectedDate={selectedDate}
//               setSelectedDate={setSelectedDate}
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const DateRow = ({ date, currentYear, setCurrentYear, selectedDate, setSelectedDate }) => {
//   let cur_year = date.substring(0, 4);
//   let cur_month = date.substring(4, 6);
//   let cur_date = date.substring(6, 8);
//   let cur_day = date.substring(8, 9);

//   // if (cur_year != currentYear) {
//   //   // console.log("year changed", cur_year);
//   //   // setCurrentYear("");
//   // }
//   return (
//     <div>
//       {/* <tr>
//         <td class="ml-20 mr-20 text-xl px-10">{yearChanged && cur_year}</td>
//       </tr> */}
//       <tr>
//         <td class={`ml-20 mr-20 text-lg py-3 px-10 rounded-md ${selectedDate === null ? "hover:bg-gray-100 hover:text-blue-500" : ""} ${selectedDate === date ? "text-blue-500 bg-gray-100 " : "text-gray-500"}`} onClick={dateClick}>
//           <span class="mr-3">{cur_date}</span>
//           <span>{cur_day}</span>
//         </td>
//       </tr>
//     </div>
//   );
//   function dateClick(e) {
//     setSelectedDate(date);
//   }
// };

// const TimeTable = ({ times = [] }) => {
//     const [selectedTime, setSelectedTime] = useState(null);
//   return (
//     <div class="font-sans mt-10 mx-auto text-gray-500 font-medium">
//       <table>
//         <tbody>
//           {times.map((section) => (
//             <TimeRow key={section.time} section={section} selectedTime={selectedTime} setSelectedTime={setSelectedTime}/>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const TimeRow = ({ section, selectedTime, setSelectedTime}) => {
//   const [isShown, setIsShown] = useState(false);
//   const { time, seat } = section;
//   const seatWithTotal = seat + "/343";
//   return (
//     <tr>
//       <td class={`mr-20 py-5 px-10  tracking-wide text-right rounded-md ${selectedTime === null ? "hover:bg-gray-100 hover:text-blue-500" : ""} ${selectedTime === section ? "text-blue-500 bg-gray-100 " : "text-gray-500"} `} onClick={timeClick}>
//         <span
//           onMouseOver={mouseOverTime}
//           onMouseOut={mouseOutTime}
//           class="text-4xl "
//         >
//           {changeTimeForm(time)}
//         </span>
//         <span className="ampm" class="text-3xl ml-3 mr-10">
//           {amOrPm(time)}
//         </span>
//         <span className="seat" class="text-sm  pt-4 pr-5 tracking-normal">
//           {seatWithTotal}
//         </span>
//       </td>
//     </tr>
//   );
//   function mouseOverTime(e) {
//     setIsShown(true);
//   }

//   function mouseOutTime(e) {
//     setIsShown(false);
//   }
//   function timeClick(e) {
//     setSelectedTime(section);
//   }
// };

// function changeTimeForm(time) {
//   if (time.slice(0, 2) * 1 > 12) {
//     return time.slice(0, 2) * 1 - 12 + ":00";
//   } else {
//     return time;
//   }
// }

// function amOrPm(time) {
//   if (time.slice(0, 2) * 1 >= 12) {
//     return "PM";
//   } else {
//     return "AM";
//   }
// }

export default () => <DateAndTimeTable times={times} />;
