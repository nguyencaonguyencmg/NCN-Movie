import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import MovieCard, {
  MovieCardSkeleton,
} from "../components/movie/MovieCard";
import useDebounce from "../hook/useDebounce";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";

const itemsPerPage = 20;
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
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        tmdbAPI.getMovieSearch(filterDebounce, nextPage)
      );
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [filterDebounce, nextPage]);

  const movies = data?.results || [];

  useEffect(() => {
    if (!data || !data.total_results) return;
    if (data.total_results > 600) {
      setPageCount(30);
    } else {
      setPageCount(
        Math.ceil(data.total_results / itemsPerPage)
      );
    }
  }, [itemOffset, data]);
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
          movies.slice(0, 16).map((item) => (
            <MovieCard
              key={item.id}
              item={item}
            ></MovieCard>
          ))}
      </div>
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="movies-page"
        />
      </div>
      {/* <div className="flex items-center justify-center hidden my-10 gap-x-5">
        <span className="inline-block px-2 py-2 border border-purple-300 rounded-md cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="text-xl w-7 h-7"
            onClick={() => {
              if (nextPage === 1) {
                return null;
              } else {
                setNextPage(nextPage - 1);
              }
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        {new Array(pageCount).fill(0).map((item, index) => (
          <span
            onClick={() => {
              setNextPage(index + 1);
            }}
            className="inline-block px-3 py-2 text-xl font-medium bg-gray-600 rounded-md cursor-pointer"
          >
            {index + 1}
          </span>
        ))}
        <span className="inline-block px-2 py-2 border border-purple-300 rounded-md cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="text-xl w-7 h-7"
            onClick={() => {
              setNextPage(nextPage + 1);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </div> */}
    </div>
  );
};

export default MoviePage;
