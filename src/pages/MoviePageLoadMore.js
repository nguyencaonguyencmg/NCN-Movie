import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import MovieCard, {
  MovieCardSkeleton,
} from "../components/movie/MovieCard";
import useDebounce from "../hook/useDebounce";
import ReactPaginate from "react-paginate";
import useSWRInfinite from "swr/infinite";
import { v4 } from "uuid";
import Button from "../components/button/Button";

const itemsPerPage = 16;
const MoviePage = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const filterDebounce = useDebounce(filter, 2000);
  const [url, setUrl] = useState(
    tmdbAPI.getMovieList("popular", nextPage)
  );
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const { data, size, setSize, error } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );

  const movies = data
    ? data.reduce((a, b) => a.concat(b.results), [])
    : [];

  const loading = !data && !error;
  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data &&
      data[data.length - 1]?.results.length < itemsPerPage);
  console.log(
    "🚀 ~ file: MoviePageLoadMore.js:37 ~ MoviePage ~ isReachingEnd:",
    isReachingEnd
  );

  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        tmdbAPI.getMovieSearch(filterDebounce, nextPage)
      );
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [filterDebounce, nextPage]);

  // useEffect(() => {
  //   if (!data || !data.total_results) return;
  //   if (data.total_results > 600) {
  //     setPageCount(30);
  //   } else {
  //     setPageCount(
  //       Math.ceil(data.total_results / itemsPerPage)
  //     );
  //   }
  // }, [itemOffset, data]);
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % data.total_results;
    setNextPage(event.selected + 1);
    setItemOffset(newOffset);
  };

  return (
    <div className="py-5 page-container">
      <div className="flex justify-end mb-10">
        <div className="flex-1 w-full max-w-[400px] p-1">
          <input
            type="text"
            className="w-full p-4 text-white rounded-lg bg-slate-800"
            placeholder="Search movies..."
            onChange={handleFilterChange}
          />
        </div>

        <button className="p-3 my-auto text-yellow-300 bg-purple-500 rounded-lg ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      <div className="relative grid grid-cols-4 gap-10 mb-10">
        {loading && (
          <>
            {new Array(8).fill(0).map(() => (
              <MovieCardSkeleton
                key={v4()}
              ></MovieCardSkeleton>
            ))}
          </>
        )}
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard
              key={item.id}
              item={item}
            ></MovieCard>
          ))}
      </div>
      <div className="flex justify-center my-10">
        <Button
          btFull={false}
          disabled={isReachingEnd}
          onClick={() =>
            isReachingEnd ? {} : setSize(size + 1)
          }
          className={`p-5 text-xl font-semibold  rounded-lg ${
            isReachingEnd ? "opacity-50 " : ""
          }`}
        >
          Load More...
        </Button>
      </div>
    </div>
  );
};

export default MoviePage;
