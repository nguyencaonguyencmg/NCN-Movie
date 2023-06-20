import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "../loading/LoadingSkeleton";

const MovieCard = ({ item }) => {
  const {
    title,
    vote_average,
    release_date,
    poster_path,
    id,
  } = item;
  const navigate = useNavigate();
  return (
    <div className="p-3 bg-gray-700 rounded-lg movie-card text-[#FFD838] h-full max-h-[480px] flex flex-col select-none">
      <img
        className="w-full h-[250px] object-cover rounded-lg mb-4"
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt=""
      />
      <div className="flex flex-col flex-1 h-full">
        <h3 className="mb-3 text-xl font-bold ">{title}</h3>
        <div className="flex items-center justify-between mb-5 text-sm opacity-80">
          <span>
            {new Date(release_date).getFullYear()}
          </span>
          <span>{vote_average}</span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}>
          Watch now
        </Button>
      </div>
    </div>
  );
};
MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};
function FallbackComponent() {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with this component
    </p>
  );
}

export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});

export const MovieCardSkeleton = () => {
  return (
    <div className="p-3 bg-gray-700 rounded-lg movie-card text-[#FFD838] h-full flex flex-col select-none">
      <LoadingSkeleton
        className="mb-5 "
        width="100%"
        height="250px"
        radius="8px"
      ></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold ">
          <LoadingSkeleton
            width="100%"
            height="20px"
          ></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between mb-5 text-sm opacity-80">
          <span>
            <LoadingSkeleton
              width="50px"
              height="10px"
            ></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton
              width="30px"
              height="10px"
            ></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton
          width="100%"
          height="45px"
          radius="6px"
        ></LoadingSkeleton>
      </div>
    </div>
  );
};
