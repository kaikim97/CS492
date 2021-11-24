import React, { useState } from "react";
import "./MovieTable.css";

import movie1 from "../../components/movies/듄.jpg";
import movie2 from "../../components/movies/이터널스.jpg";
import movie3 from "../../components/movies/베놈2.jpg";
import movie4 from "../../components/movies/강릉.jpg";

import { useNavigate } from "react-router-dom";
import api from "../../api.js";
import { useContext } from "react";
import { AuthContext } from "../../context.js";

const movies = [
  { id: 0, name: "듄", poster: movie1 },
  { id: 1, name: "이터널스", poster: movie2 },
  { id: 2, name: "베놈2", poster: movie3 },
  { id: 3, name: "강릉", poster: movie4 },
];

const data = api.getAllHalls().then((response) => {
  console.log(response.data);
});

const MovieTable = ({ movies = [] }) => {
  const context = useContext(AuthContext);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  return (
    <div>
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
    navigate("/movieInfo");
  }
};

const Movie = ({ movie, selected, setSelected }) => {
  const { id, name, poster } = movie;
  return (
    <div
      class={` w-1/4 mr-poster pt-12 pb-6 px-poster border-2 
      ${selected === id ? "border-black" : "border-white"} rounded-lg bg-white 
      ${selected === null ? "hover:border-black" : ""} focus:border-black `}
      onClick={mouseClick}
    >
      <div class="rounded-lg">
        <img
          className="poster"
          src={poster}
          class="object-contain w-full rounded-lg"
        ></img>
      </div>
      <div class="text-center mt-4 text-lg ">{name}</div>
    </div>
  );

  function mouseClick(e) {
    setSelected(id);
  }
};

export default () => <MovieTable movies={movies} />;
