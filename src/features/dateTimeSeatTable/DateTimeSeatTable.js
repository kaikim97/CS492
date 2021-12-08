import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";

import DateTable from "./components/DateTable";
import TimeTable from "./components/TimeTable";
import Seat from "./components/Seat";
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

  return (
    <div class="flex flex-col ">
      <div>
        <TopBar function={findReservation} />
      </div>
      <div class="flex-initial xl:flex h-content">
        <div class="w-screen xl:w-1/3 h-1/4 xl:h-full flex  xl:block bg-white font-bold mt-14 ">
          <div class="w-80  xl:w-full h-full xl:h-1/4 relative bg-gradient-to-t bg-gray-300 from-black to-transparent ">
            <div class="h-full mix-blend-multiply ">
              <img
                src={require(`../../data/movies/${title}.jpg`).default}
                class=" h-full object-cover w-full"
              ></img>
            </div>
            <div class="text-white text-xl xl:text-3xl font-bold absolute bottom-10 left-20">
              <p>{title}</p>
            </div>
          </div>
          <div class="flex flex-auto h-full xl:h-3/4">
            <div class=" w-1/3 h-9/10 overflow-y-scroll">
              <DateTable />
            </div>
            <div class="w-2/3 h-full overflow-y-scroll">
              <TimeTable />
            </div>
          </div>
        </div>
        <div class="w-full xl:w-2/3 h-3/4 xl:h-full xl:mt-14  xl:flex-auto">
          {context.date != "" && context.time != "" && <Seat />}
        </div>
      </div>
    </div>
  );
};

export default () => <DateAndTimeTable />;
