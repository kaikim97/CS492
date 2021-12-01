import React, { useState } from "react";
import { useNavigate } from "react-router";

import DateTable from "./components/DateTable";
import TimeTable from "./components/TimeTable";
import Seat from "../../components/seat/seat";
import TopBar from "../TopBar";

import { useContext } from "react";
import { AuthContext } from "../../context";

const DateAndTimeTable = ({ times = [] }) => {
  const context = useContext(AuthContext);
  const title = context.title;
  const navigate = useNavigate();

  // console.log("TITLE: ", title);

  const findReservation = () => {
    navigate("/findReservation");
  };

  return (
    <div>
      <TopBar function={findReservation} />
      <div class="flex">
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
            <div class="flex-auto h-full overflow-y-scroll">
              <TimeTable />
            </div>
          </div>
        </div>
        <div class="w-2/3 ">
          {context.date != "" && context.time != "" && <Seat />}
        </div>
      </div>
    </div>
  );
};

export default () => <DateAndTimeTable />;
