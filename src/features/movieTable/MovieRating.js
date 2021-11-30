import React, { useState } from "react";
import "./MovieRating.css";
import { useNavigate } from "react-router-dom";
import api from "../../api.js";
import { useContext } from "react";
import { AuthContext } from "../../context.js";
import axios from "axios";

export default function MovieRating({ userRating }) {
  let stars = [];

  for (let i = 0; i < parseInt(userRating / 2) + 1; i++) {
    if (i == parseInt(userRating / 2)) {
      stars.push(userRating / 2 - parseInt(userRating / 2));
    } else {
      stars.push(1);
    }
  }
  //   console.log(stars);

  return (
    <div class=" flex mb-8">
      {stars.map((star) => (
        <Star rate={star} />
      ))}
    </div>
  );
}

const Star = ({ rate }) => {
  console.log("rate: ", rate);
  const ratio = 80 - rate * 60;
  console.log("ratio: ", ratio);
  return (
    <div style={{ clipPath: `inset(0 ${ratio}% 0 0)` }}>
      <svg
        class="w-5 w-5 mr-0.5 flex-initial fill-current text-yellow-400 stroke-current stroke-1"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        ></path>
      </svg>
    </div>
  );
};
