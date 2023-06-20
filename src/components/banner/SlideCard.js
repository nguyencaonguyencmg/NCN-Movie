import React from "react";
import { tmdbAPI } from "../../config";

const SlideCard = ({ item, click }) => {
  return (
    <div
      className={`flex object-cover w-full  h-full cursor-pointer ${
        item.id === click ? "transition-all" : ""
      }`}
    >
      <div
        className={`rounded-lg ${
          item.id === click
            ? " p-2 border-4 border-purple-700"
            : ""
        }`}
      >
        <img
          className={`rounded-lg ${
            item.id === click
              ? " p-1 border-2 border-yellow-400 "
              : ""
          }`}
          src={tmdbAPI.imageOriginal(item.poster_path)}
          alt=""
        />
      </div>
    </div>
  );
};

export default SlideCard;
