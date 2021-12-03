import React, { useState, useEffect } from "react";

import DateTable from "./components/DateTable";
import TimeTable from "./components/TimeTable";
import Seat from "../../components/seat/seat";

import { useContext } from "react";
import { AuthContext } from "../../context";

const DateAndTimeTable = () => {
  const context = useContext(AuthContext);
  const title = window.localStorage.getItem("title");

  useEffect(() => {
    context.setTitle(title);
  }, []);
  console.log("TITLE: ", title);
  return (
    <div class="xl:flex ">
      <div class="w-screen h-60 flex xl:block bg-white font-bold xl:w-1/3 xl:h-screen xl:flex-initial ">
        <div class="w-1/3 h-full xl:h-1/4 xl:w-full relative bg-gradient-to-t bg-gray-300 from-black to-transparent ">
          <div class="h-full mix-blend-multiply ">
            <img
              src={require(`../../components/movies/${title}.jpg`).default}
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

      <div class="xl:flex-initial ml-20 ">
        {context.date != "" && context.time != "" && <Seat />}
      </div>
    </div>
  );
};

export default () => <DateAndTimeTable />;
