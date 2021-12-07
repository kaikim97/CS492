import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context";

const DateTable = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const context = useContext(AuthContext);

  let today = new Date(2021, 11, 1);
  console.log(dateToString(today).substring(0, 4));

  const [currentYear, setCurrentYear] = useState(
    dateToString(today).substring(0, 4)
  );
  const [currentMonth, setCurrentMonth] = useState(
    dateToString(today).substring(4, 6)
  );

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
    <div class="font-sans ml-1/10 mt-10 mx-auto text-gray-500 ">
      <table>
        <tbody>
          <div class="font-sans text-center mx-auto text-md ">
            {currentYear}
          </div>
          <div class="font-sans text-center mx-auto text-4xl mb-5 ">
            {currentMonth}
          </div>
          {dates.map((date) => (
            <DateRow
              key={date}
              date={date}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              context={context}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DateRow = ({ date, selectedDate, setSelectedDate, context }) => {
  let cur_date = date.substring(6, 8);
  let cur_day = date.substring(8, 9);

  return (
    <div>
      <tr>
        <div
          class={` text-lg py-3 px-10 rounded-md ${
            selectedDate === null ? "hover:bg-gray-100 hover:text-blue-500" : ""
          } ${
            selectedDate === date
              ? "text-blue-500 bg-gray-100 "
              : "text-gray-500"
          }`}
          onClick={dateClick}
        >
          <td class="w-10">{cur_date}</td>
          <td>{cur_day}</td>
        </div>
      </tr>
    </div>
  );
  function dateClick(e) {
    setSelectedDate(date);
    context.setDate(date.substring(0, 8));
    context.setTime("");
  }
};

export default () => <DateTable />;
