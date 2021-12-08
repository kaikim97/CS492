import React from "react";

export default function Ticket(props) {
  const { title, date, time, seats, price } = props;
  const parseDate = (date) => {
    const temp =
      date.slice(0, 4) + "," + date.slice(4, 6) + "," + date.slice(6);

    const dateString = new Date(temp);
    const dayInt = dateString.getDay();

    const dayString =
      dayInt == 0
        ? "일"
        : dayInt == 1
        ? "월"
        : dayInt == 2
        ? "화"
        : dayInt == 3
        ? "수"
        : dayInt == 4
        ? "목"
        : dayInt == 5
        ? "금"
        : "토";

    const result =
      date.slice(0, 4) +
      "." +
      date.slice(4, 6) +
      "." +
      date.slice(6) +
      "(" +
      dayString +
      ")";

    return result;
  };

  const parseTime = (time) => {
    const amPm = time > 1200 ? "PM" : "AM";
    const temp = time.slice(0, 2) + ":" + time.slice(2) + amPm;
    return temp;
  };

  return (
    <div class="px-2vw flex flex-col justify-between h-5/6 mb-3vh">
      <div class="text-title font-bold ">{title}</div>

      <div class="text-datetime font-semibold  flex w-10/12 xl:w-1/2 justify-between">
        <p> {parseDate(date)}</p>
        <p> {parseTime(time)}</p>
      </div>
      <div class=" flex w-full justify-between">
        <p class="text-seat font-semibold ">{seats.join(", ")}</p>
        <p class="text-price font-medium ">
          {parseInt(price / 1000) + ",000"}원
        </p>
      </div>
    </div>
  );
}
