import React, { useState } from "react";

function TopBar(props) {
  return (
    <div class="top-0  h-5screen bg-white text-gray-500 text-right">
      <button class="px-10 py-5 font-bold" onClick={props.function}>
        예약 조회
      </button>
    </div>
  );
}

export default TopBar;
