import React, { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import MovieCard from "../components/movie/MovieCard";

const MovieDetailPage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { data } = useSWR(
    tmdbAPI.getMovieDetails(movieId),
    fetcher
  );
  if (!data) return null;
  const {
    backdrop_path,
    poster_path,
    title,
    genres,
    overview,
  } = data;
  return (
    <Fragment>
      <div className="w-full h-[600px] relative ">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover rounded-md"
          style={{
            backgroundImage: `url(
              ${tmdbAPI.imageOriginal(backdrop_path)}
            )`,
          }}
        ></div>
        <div className="absolute z-10 max-w-[700px] right-0 top-[150px]">
          <h1 className="mb-10 text-4xl font-bold text-center text-primary">
            {title}
          </h1>
          {genres.length > 0 && (
            <div className="flex items-center justify-center mb-10 gap-x-5">
              {genres.map((item) => (
                <span
                  className="justify-center p-4 text-yellow-400 border border-purple-500 rounded-lg"
                  key={item.id}
                >
                  {item.name}
                </span>
              ))}
            </div>
          )}
          <p className="w-full mx-auto mb-10 leading-relaxed text-center text-purple-400">
            {overview}
          </p>
          <button
            onClick={() =>
              navigate(`/movie/${movieId}/watch`)
            }
            className="flex px-3 py-4 mx-auto text-xl font-medium bg-transparent border-4 border-purple-500 rounded-lg"
          >
            Watch
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mx-2 w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex grid grid-cols-2 gap-5 page-container">
        <div className="w-full max-w-[800px] h-[600px] mx-auto -mt-[200px] z-10 mb-16 relative">
          <img
            className="object-cover w-full h-full rounded-xl"
            src={tmdbAPI.imageOriginal(poster_path)}
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0)]"></div>
        </div>
        <div className="flex flex-col ">
          <MovieDetail></MovieDetail>
        </div>
      </div>
      <MovieCredits></MovieCredits>
      <MovieVideo></MovieVideo>
      <MovieSimilar></MovieSimilar>
    </Fragment>
  );
};

export function MovieCredits({ type = "credits" }) {
  const { movieId } = useParams();

  const { data } = useSWR(
    tmdbAPI.getMovieMeta(movieId, type),
    fetcher
  );

  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <>
      <h2 className="mb-10 text-3xl text-center">Casts</h2>
      <div className="flex gap-5 mb-10 justify-evenly page-container">
        {cast.slice(0, 4).map((item) => (
          <div
            className="cast-item"
            key={item.id}
          >
            <img
              src={tmdbAPI.imageOriginal(item.profile_path)}
              className="w-[200px] h-[200px] object-cover rounded-full mb-3"
              alt=""
            />

            <p className="text-lg font-medium text-center">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
function MovieVideo({ type = "videos" }) {
  const { movieId } = useParams();
  const { data } = useSWR(
    tmdbAPI.getMovieMeta(movieId, type),
    fetcher
  );
  if (!data) return null;
  const { results } = data;

  if (!results || results.length <= 0) return null;
  console.log(results);
  return (
    <div className="py-10 page-container">
      <div className="flex flex-col gap-10">
        {results.slice(0, 2).map((item) => (
          <div
            className=""
            key={item.id}
          >
            <h3 className="inline-block p-5 text-2xl font-medium text-purple-500 rounded-md ">
              {item.name}
            </h3>
            <div className="w-full max-w-[800px] mx-auto aspect-video">
              <iframe
                width="942"
                height="530"
                src={`https://www.youtube.com/embed/${item.key}`}
                title={item.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="object-fill w-full h-full"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function MovieDetail() {
  const [isLike, setIsLike] = useState(false);
  const [isList, setIsList] = useState(false);
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { data } = useSWR(
    tmdbAPI.getMovieDetails(movieId),
    fetcher
  );
  if (!data) return null;
  const {
    title,
    overview,
    release_date,
    runtime,
    vote_average,
    tagline,
  } = data;
  return (
    <>
      <h2 className="p-3 text-3xl">
        {title}. ({new Date(release_date).getFullYear()})
      </h2>
      <p className="px-3 text-lg">
        - {tagline || overview}
      </p>
      <div className="flex mx-auto text-lg">
        <span className="p-5">Date: {release_date}</span>
        <span className="p-5">Time: {runtime} min</span>
        <span className="flex p-5">
          Rate: {vote_average}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mx-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </span>
      </div>
      <div className="flex mx-auto my-5">
        <button
          onClick={() => {
            setIsLike(!isLike);
          }}
          className="p-3 mx-5 rounded-full bg-slate-700"
        >
          <svg
            className={`w-8 h-8  ${
              isLike
                ? "animate-[wiggle_1s_ease-in-out_infinite]"
                : ""
            }`}
            viewBox="0 0 42 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.166626 11.5C0.166108 8.47984 1.37993 5.58633 3.53499 3.47045C5.69005 1.35458 8.60534 0.19405 11.625 0.249979C15.2027 0.230979 18.6166 1.74826 21 4.41665C23.3833 1.74826 26.7972 0.230979 30.375 0.249979C33.3946 0.19405 36.3099 1.35458 38.4649 3.47045C40.62 5.58633 41.8338 8.47984 41.8333 11.5C41.8333 22.6583 28.5437 31.0833 21 37.75C13.4729 31.0271 0.166626 22.6666 0.166626 11.5Z"
              fill={`${isLike ? "red" : "#A855F7"}`}
            />
          </svg>
        </button>
        <button
          onClick={() => {
            setIsList(!isList);
          }}
          className="p-3 mx-5 rounded-full bg-slate-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-8 h-8 text-transparent ${
              isList
                ? "animate-[wiggle_1s_ease-in-out_infinite]"
                : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={`${isList ? "red" : "#A855F7"}`}
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
        </button>
        <button className="p-3 mx-5 rounded-full bg-slate-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-[#A855F7]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
        </button>
      </div>
      <div className="flex mx-auto">
        <button
          onClick={() =>
            navigate(`/movie/${movieId}/watch`)
          }
          className="flex px-3 py-4 mx-5 text-xl font-medium bg-transparent border-4 border-purple-500 rounded-lg"
        >
          Watch
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="mx-2 w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z"
            />
          </svg>
        </button>
        <button className="flex px-3 py-4 mx-5 text-xl font-medium bg-transparent border-4 border-purple-500 rounded-lg">
          Trailler . . .
        </button>
      </div>
    </>
  );
}
export function MovieSimilar({ type = "similar" }) {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { data } = useSWR(
    tmdbAPI.getMovieMeta(movieId, type),
    fetcher
  );
  if (!data) return null;
  const { results } = data;

  return (
    <div className="page-container">
      <h2 className="mb-10 text-3xl font-medium">
        Similar Movies
      </h2>
      <div className="movie-list max-h-[400px] mb-[100px]">
        <Swiper
          grabCursor={true}
          spaceBetween={20}
          slidesPerView={"auto"}
        >
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieDetailPage;
