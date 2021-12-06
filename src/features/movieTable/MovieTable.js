import React, { useState } from "react";
import "./MovieTable.css";
import MovieRating from "./MovieRating";

import movie1 from "../../components/movies/듄.jpg";
import movie2 from "../../components/movies/이터널스.jpg";
import movie3 from "../../components/movies/베놈2.jpg";
import movie4 from "../../components/movies/강릉.jpg";

import { useNavigate } from "react-router-dom";
import api from "../../api.js";
import { useContext } from "react";
import { AuthContext } from "../../context.js";
import TopBar from "../TopBar";

const movies = [
  { id: 0, name: "듄", poster: movie1 },
  { id: 1, name: "이터널스", poster: movie2 },
  { id: 2, name: "베놈2", poster: movie3 },
  { id: 3, name: "강릉", poster: movie4 },
];

export default function MovieTable() {
  const context = useContext(AuthContext);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const findReservation = () => {
    navigate("/findReservation");
  };

  return (
    <div>
      <TopBar function={findReservation} />
      <div class="flex justify-center mt-60 ml-10 text-gray-500 overflow-x-auto ">
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            movie={movie}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
      {selected != null && (
        <button
          class="w-60 py-3 text-lg rounded-lg bg-gray-200 text-gray-500 absolute right-7 bottom-7"
          type="submit"
          onClick={goNext}
        >
          다음
        </button>
      )}
    </div>
  );
  function goNext() {
    context.setTitle(movies[selected].name);
    window.localStorage.setItem("title", movies[selected].name);
    context.setDate("");
    context.setTime("");
    navigate("/movieInfo");
  }
}

const Movie = ({ movie, selected, setSelected }) => {
  const { id, name, poster } = movie;
  const [hover, setHover] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [director, setDirector] = useState(null);
  const [actor, setActor] = useState(null);
  return (
    <div
      class={` w-1/4 mr-poster pt-12 pb-6 px-poster border-2 
      ${selected === id ? "border-black" : "border-white"} rounded-lg bg-white 
       focus:border-black `}
      onClick={mouseClick}
    >
      <div class="group relative rounded-lg bg-gradient-to-t hover:bg-gray-300  hover:from-black hover:to-transparent ">
        <div class="rounded-lg mix-blend-multiply z-10">
          <img
            className="poster"
            src={poster}
            class="object-contain w-full rounded-lg "
            onMouseOver={movieHover}
            onMouseLeave={movieLeave}
          ></img>
        </div>
        <div class=" pointer-events-none opacity-0 group-hover:opacity-100 text-white text-xs font-semibold absolute bottom-0 p-5">
          <p class="text-lg text-yellow-300 font-bold">
            {userRating !== null && `${userRating}`}
          </p>
          {userRating && <MovieRating userRating={userRating} />}
          <p>{director != null && `${director} 감독`}</p>
          <p>{actor != null && `${actor}`}</p>
        </div>
      </div>

      <div class="text-center font-bold mt-4 text-lg ">{name}</div>
    </div>
  );

  function mouseClick(e) {
    setSelected(id);
  }
  function movieHover(e) {
    setHover(id);
    const data = api.searchMovie(`query=${name}`).then((response) => {
      const director_before_parse = response.data.items[0].director;
      const actor_before_parse = response.data.items[0].actor;
      const actor_after_parse = actor_before_parse
        .substring(0, actor_before_parse.length - 1)
        .split("|")
        .join(" | ");
      const director_after_parse = director_before_parse
        .substring(0, director_before_parse.length - 1)
        .split("|")
        .join(" | ");
      setUserRating(response.data.items[0].userRating);
      setDirector(director_after_parse);
      setActor(actor_after_parse);
    });
  }
  function movieLeave(e) {
    setUserRating(null);
    setDirector(null);
    setActor(null);
  }
};
