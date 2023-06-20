import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <section className=" movie-layout page-container">
        <h2 className="mb-8 text-3xl font-bold text-yellow-500 capitalize">
          Now playing
        </h2>
        <MovieList type="now_playing"></MovieList>
      </section>
      <section className=" movie-layout page-container">
        <h2 className="mb-8 text-3xl font-bold text-yellow-500 capitalize">
          Top rated
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className=" movie-layout page-container">
        <h2 className="mb-8 text-3xl font-bold text-yellow-500 capitalize">
          Trending
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
