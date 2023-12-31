import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import { MovieCardSkeleton } from "./MovieCard";
import useSWR from "swr";
import PropTypes from "prop-types";
import { fetcher, tmdbAPI } from "../../config";
import { withErrorBoundary } from "react-error-boundary";

const MovieList = ({ type = "now_playing" }) => {
  const { data, error } = useSWR(
    tmdbAPI.getMovieList(type),
    fetcher
  );
  const isLoading = !data && !error;
  const movies = data?.results || [];
  return (
    <div className="movie-list max-h-[400px] mb-[12%]">
      {isLoading && (
        <>
          <Swiper
            grabCursor={true}
            spaceBetween={20}
            slidesPerView={"auto"}
          >
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
          </Swiper>
        </>
      )}
      {!isLoading && (
        <Swiper
          grabCursor={true}
          spaceBetween={20}
          slidesPerView={"auto"}
        >
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

MovieList.propTypes = {
  type: PropTypes.string.isRequired,
};
function FallbackComponent() {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with this component
    </p>
  );
}
export default withErrorBoundary(MovieList, {
  FallbackComponent,
});
