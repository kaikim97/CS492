import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";

import DateTable from "./components/DateTable";
import TimeTable from "./components/TimeTable";
import Seat from "../../components/seat/seat";
import TopBar from "../TopBar";

import { useContext } from "react";
import { AuthContext } from "../../context";

const DateAndTimeTable = () => {
  const context = useContext(AuthContext);
  const title = window.localStorage.getItem("title");
  const navigate = useNavigate();

  const findReservation = () => {
    navigate("/findReservation");
  };

  useEffect(() => {
    context.setTitle(title);
  }, []);

  console.log("TITLE: ", title);
  return (
    <div>
      <TopBar function={findReservation} />
      <div class="flex">
        <div class="w-1/3 h-95screen bg-white font-bold">
          <div class="h-1/4 relative bg-gradient-to-t bg-gray-300 from-black to-transparent ">
            <div class="h-full mix-blend-multiply ">
              <img
                src={require(`../../components/movies/${title}.jpg`).default}
                class="w-1/3 h-full object-cover w-full"
              ></img>
            </div>
            <div class="text-white text-3xl font-bold absolute bottom-10 left-20">
              <p>{title}</p>
            </div>
          </div>

          <div class="flex h-3/4">
            <div class="flex-auto h-5/6 overflow-y-scroll">
              <DateTable />
            </div>
            <div class="flex-auto h-full overflow-y-scroll">
              <TimeTable />
            </div>
          </div>
        </div>
        <div class="w-1/3 flex-1">
          {context.date != "" && context.time != "" && <Seat />}
        </div>
      </div>
    </div>
  );
};

export default () => <DateAndTimeTable />;
