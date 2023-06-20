import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="flex text-lg font-medium items-center justify-center py-5 mb-5 text-[#B755AD] header gap-x-16">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-primary bg-[#B755AD] py-3 px-5 rounded-lg"
            : ""
        }
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-primary bg-[#B755AD] py-3 px-5 rounded-lg"
            : ""
        }
        to="/movies"
      >
        Movie
      </NavLink>
    </header>
  );
};

export default Header;
