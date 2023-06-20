import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import SlideCard from "./SlideCard";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import LoadingSkeleton from "../loading/LoadingSkeleton";

const Banner = () => {
  const navigate = useNavigate();
  const [getBannerPath, setGetBannerPath] = useState(
    "/8FhKnPpql374qyyHAkZDld93IUw.jpg"
  );
  const [clickBanner, setClickBanner] = useState(536437);
  const [title, setTitle] = useState("Hypnotic");
  const { data, error } = useSWR(
    tmdbAPI.getMovieList("upcoming"),
    fetcher
  );
  const movies = data?.results || [];
  const { data: dataType } = useSWR(
    tmdbAPI.getMovieList(clickBanner),
    fetcher
  );
  if (!dataType) return null;
  const { genres } = dataType;
  if (!genres) return null;
  const isLoading = !data && !error;
  return (
    <section className="banner h-[600px] page-container mb-[25%] overflow-hidden">
      {isLoading && <BannerSkeleton></BannerSkeleton>}
      {!isLoading && (
        <>
          <div className="relative w-full h-full rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(50,50,50,0.5)] overlay rounded-lg"></div>
            <img
              src={tmdbAPI.imageOriginal(getBannerPath)}
              alt=""
              className="object-cover w-full h-full rounded-lg"
            />
            <div className="absolute w-full text-yellow-400 bottom-32 left-5">
              <h2 className="mb-5 text-3xl font-bold">
                {title}
              </h2>
              {genres.length > 0 && (
                <div className="flex mb-10 gap-x-5">
                  {genres.map((item) => (
                    <span
                      className="justify-center p-4 text-lg font-medium text-yellow-400 border-2 border-purple-500 rounded-lg"
                      key={item.id}
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              )}
              <Button
                btFull={false}
                className="w-auto"
                onClick={() =>
                  navigate(`/movie/${clickBanner}`)
                }
              >
                {" "}
                Watch Now
              </Button>
            </div>
          </div>
          <div className="absolute w-full max-w-[1280px] -bottom-[32%] slider">
            <div className="select-none slide-card">
              <Swiper
                grabCursor={true}
                spaceBetween={40}
                slidesPerView={"auto"}
              >
                {movies.length > 0 &&
                  movies.map((item) => (
                    <SwiperSlide
                      onClick={() => {
                        setGetBannerPath(
                          item.backdrop_path
                        );
                        setTitle(item.title);
                        setClickBanner(item.id);
                      }}
                      key={item.id}
                    >
                      <SlideCard
                        click={clickBanner}
                        item={item}
                      ></SlideCard>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export const BannerSkeleton = () => {
  return (
    <section className="banner h-[600px] page-container mb-[25%] overflow-hidden">
      <div className="relative w-full h-full rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(50,50,50,0.5)] overlay rounded-lg"></div>
        <LoadingSkeleton
          width="100%"
          height="600px"
          radius="8px"
        ></LoadingSkeleton>
        <div className="absolute w-full text-yellow-400 bottom-32 left-5">
          <LoadingSkeleton
            width="250px"
            height="40px"
            radius="8px"
          ></LoadingSkeleton>

          <div className="flex my-10 gap-x-5">
            <LoadingSkeleton
              width="80px"
              height="50px"
              radius="8px"
            ></LoadingSkeleton>
            <LoadingSkeleton
              width="80px"
              height="50px"
              radius="8px"
            ></LoadingSkeleton>
            <LoadingSkeleton
              width="80px"
              height="50px"
              radius="8px"
            ></LoadingSkeleton>
          </div>
          <LoadingSkeleton
            width="100px"
            height="60px"
            radius="8px"
          ></LoadingSkeleton>
        </div>
      </div>
      <div className="absolute w-full max-w-[1280px] -bottom-[32%] slider">
        <div className="select-none slide-card">
          <Swiper
            grabCursor={true}
            spaceBetween={40}
            slidesPerView={"auto"}
          >
            <SwiperSlide>
              <LoadingSkeleton
                width="100%"
                height="400px"
                radius="8px"
              ></LoadingSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <LoadingSkeleton
                width="100%"
                height="400px"
                radius="8px"
              ></LoadingSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <LoadingSkeleton
                width="100%"
                height="400px"
                radius="8px"
              ></LoadingSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <LoadingSkeleton
                width="100%"
                height="400px"
                radius="8px"
              ></LoadingSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <LoadingSkeleton
                width="100%"
                height="400px"
                radius="8px"
              ></LoadingSkeleton>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Banner;
