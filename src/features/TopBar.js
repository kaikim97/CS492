import React, { useState } from "react";

function TopBar(props) {
  return (
    <div class="w-screen h-14 fixed bg-white text-gray-500 text-right block">
      <button class="px-10 py-4 font-bold" onClick={props.function}>
        예약 조회
      </button>
    </div>
  );
}

export default TopBar;
