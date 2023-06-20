import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { apiKey, fetcher, tmdbAPI } from "../config";
import {
  MovieCredits,
  MovieSimilar,
  MovieVideo,
} from "./MovieDetailPage";
import { useState } from "react";

const MovieWatch = () => {
  const [isList, setIsList] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [more, setMore] = useState(false);
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbAPI.getMovieDetails(movieId),
    fetcher
  );
  if (!data) return null;
  const { title, genres, overview } = data;
  return (
    <>
      <div className="grid grid-cols-3 gap-10 my-10 page-container">
        <div className="w-full h-full col-span-2 p-10 bg-gray-700 rounded-lg">
          <WatchMovie></WatchMovie>
          <div className="flex justify-between mb-5">
            <h2 className="text-3xl max-w-[350px]">
              {title}
            </h2>
            <div className="flex justify-center ">
              <button
                onClick={() => {
                  setIsLike(!isLike);
                }}
                className="p-3 mx-5 text-center rounded-full "
              >
                <svg
                  className={`w-8 h-8 mx-auto  ${
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
                Yêu thích
              </button>
              <button
                onClick={() => {
                  setIsList(!isList);
                }}
                className="p-3 mx-5 rounded-full "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`w-8 h-8 text-transparent mx-auto ${
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
                Xem sau
              </button>
              <button className="p-3 mx-5 rounded-full ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  fill="none"
                  stroke="currentColor"
                  className="w-8 h-8 mx-auto text-[#A855F7]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                  />
                </svg>
                Chia sẻ
              </button>
            </div>
          </div>
          {!more ? (
            <button
              onClick={() => {
                setMore(true);
              }}
              className="flex mx-auto animate-bounce"
            >
              More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => {
                setMore(false);
              }}
              className="flex mx-auto animate-bounce"
            >
              Collapse
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                />
              </svg>
            </button>
          )}
          <div className={more ? "" : "hidden"}>
            {genres.length > 0 && (
              <div className="flex items-center justify-center my-5 gap-x-5">
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
            <p className="my-5 text-lg text-center text-purple-500">
              {overview}
            </p>
            <MovieCredits></MovieCredits>
          </div>
        </div>
        <TopMovie></TopMovie>
      </div>

      <div className="mt-20">
        <MovieSimilar></MovieSimilar>
      </div>
    </>
  );
};

function WatchMovie({ type = "videos" }) {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbAPI.getMovieMeta(movieId, type),
    fetcher
  );
  if (!data) return null;
  const { results } = data;

  if (!results || results.length <= 0) return null;
  return (
    <div className="mb-5 page-container">
      <div className="flex flex-col gap-10">
        {results.slice(0, 1).map((item) => (
          <div
            className=""
            key={item.id}
          >
            <div className="w-full max-w-[900px] mx-auto aspect-video">
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
function TopMovie({ type = "top_rated" }) {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { data, error } = useSWR(
    tmdbAPI.getMovieList(type),
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  console.log(
    "🚀 ~ file: MovieWatch.js:232 ~ TopMovie ~ data:",
    results.id
  );

  return (
    <div className="w-full h-[700px] bg-gray-400 rounded-md bg-opacity-60 page-container cursor-pointer">
      <h2 className="flex justify-center pb-4 my-3 text-3xl font-medium text-transparent shadow-lg bg-clip-text bg-gradient-to-r from-purple-500 to-yellow-500">
        Top Rated
      </h2>
      <div className="max-h-[600px] overflow-y-scroll">
        {results.length > 0 &&
          results.slice(0, 10).map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/movie/${item.id}`)}
              className=" max-h-[200px] gap-5 grid grid-cols-2 my-2 p-2 text-purple-400"
            >
              <img
                className="w-full h-[200px] object-cover rounded-lg "
                src={tmdbAPI.imageOriginal(
                  item.poster_path
                )}
                alt=""
              />
              <div>
                <p className="text-2xl text-yellow-400">
                  {item.title}
                </p>
                <p className="p-1">
                  Date: {item.release_date}
                </p>
                <p className="p-1">
                  View: {item.popularity}
                </p>
                <p className="p-1">
                  Rate: {item.vote_average}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
export default MovieWatch;
