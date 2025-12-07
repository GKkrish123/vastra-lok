import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-16 sm:w-24 rounded-xl" alt="" />
      </Link>

      {/* DESKTOP MENU */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `group flex flex-col items-center gap-1 ${
              isActive ? "text-black" : ""
            }`
          }
        >
          <p>HOME</p>
          <hr
            className={
              "w-full h-[2px] bg-[#F2A23C] transition-transform duration-300 " +
              "origin-left " +
              "group-hover:scale-x-100 " +
              (location.pathname === "/" ? "scale-x-100" : "scale-x-0")
            }
          />
        </NavLink>

        <NavLink
          to="/collection"
          className={({ isActive }) =>
            `group flex flex-col items-center gap-1 ${
              isActive ? "text-black" : ""
            }`
          }
        >
          <p>COLLECTION</p>
          <hr
            className={
              "w-full h-[2px] bg-[#F2A23C] transition-transform duration-300 origin-left " +
              "group-hover:scale-x-100 " +
              (location.pathname === "/collection"
                ? "scale-x-100"
                : "scale-x-0")
            }
          />
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `group flex flex-col items-center gap-1 ${
              isActive ? "text-black" : ""
            }`
          }
        >
          <p>ABOUT</p>
          <hr
            className={
              "w-full h-[2px] bg-[#F2A23C] transition-transform duration-300 origin-left " +
              "group-hover:scale-x-100 " +
              (location.pathname === "/about" ? "scale-x-100" : "scale-x-0")
            }
          />
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `group flex flex-col items-center gap-1 ${
              isActive ? "text-black" : ""
            }`
          }
        >
          <p>CONTACT</p>
          <hr
            className={
              "w-full h-[2px] bg-[#F2A23C] transition-transform duration-300 origin-left " +
              "group-hover:scale-x-100 " +
              (location.pathname === "/contact" ? "scale-x-100" : "scale-x-0")
            }
          />
        </NavLink>
      </ul>

      {/* RIGHT SIDE ICONS */}
      <div className="flex items-center gap-6">
        {location.pathname.includes("collection") ? (
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
        ) : null}

        {/* PROFILE ICON + DROPDOWN */}
        <div className="relative z-50">
          <img
            onClick={() => {
              if (!token) return navigate("/login");
              setProfileOpen((prev) => !prev); // toggle dropdown ONLY for profile
            }}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="profile"
          />

          {token && (
            <div
              className={`
        absolute right-0 pt-4
        ${profileOpen ? "block" : "hidden"}
        sm:group-hover:block
      `}
            >
              <div
                className="flex flex-col gap-2 w-44 py-4 px-4 
                      bg-white border border-gray-200 
                      rounded-xl shadow-lg shadow-black/10 
                      animate-fadeIn"
              >
                <p
                  onClick={() => {
                    navigate("/cart");
                    setProfileOpen(false);
                  }}
                  className="cursor-pointer text-gray-700 hover:text-black 
                     hover:bg-gray-100 px-2 py-1 rounded-md transition"
                >
                  My Profile
                </p>

                <p
                  onClick={() => {
                    navigate("/orders");
                    setProfileOpen(false);
                  }}
                  className="cursor-pointer text-gray-700 hover:text-black 
                     hover:bg-gray-100 px-2 py-1 rounded-md transition"
                >
                  Orders
                </p>

                <p
                  onClick={() => {
                    logout();
                    setProfileOpen(false);
                  }}
                  className="cursor-pointer text-gray-700 hover:text-black 
                     hover:bg-gray-100 px-2 py-1 rounded-md transition"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CART */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* MOBILE MENU ICON */}
        <img
          onClick={() => setMenuVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />

        {/* MOBILE SIDEBAR + OVERLAY */}
        {/* Overlay */}
        {menuVisible && (
          <div
            onClick={() => setMenuVisible(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 sm:hidden"
          />
        )}

        {/* Sidebar */}
        <div
          className={`
    fixed top-0 right-0 h-full w-64 bg-white z-50 sm:hidden
    transform transition-transform duration-300
    ${menuVisible ? "translate-x-0" : "translate-x-full"}
  `}
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 border-b">
            <p className="font-semibold text-lg">Menu</p>
            <img
              onClick={() => setMenuVisible(false)}
              className="w-5 cursor-pointer rotate-180"
              src={assets.dropdown_icon}
              alt="close"
            />
          </div>

          {/* Menu links */}
          <div className="flex flex-col mt-2 text-gray-700">
            <NavLink
              onClick={() => setMenuVisible(false)}
              className="py-4 px-6 border-b text-base font-medium active:bg-gray-100"
              to="/"
            >
              HOME
            </NavLink>

            <NavLink
              onClick={() => setMenuVisible(false)}
              className="py-4 px-6 border-b text-base font-medium active:bg-gray-100"
              to="/collection"
            >
              COLLECTION
            </NavLink>

            <NavLink
              onClick={() => setMenuVisible(false)}
              className="py-4 px-6 border-b text-base font-medium active:bg-gray-100"
              to="/about"
            >
              ABOUT
            </NavLink>

            <NavLink
              onClick={() => setMenuVisible(false)}
              className="py-4 px-6 border-b text-base font-medium active:bg-gray-100"
              to="/contact"
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
