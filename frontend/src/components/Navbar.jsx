import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useUser();
  const [selectpage, setSelectpage] = useState("Home");
  return (
    <div>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
        <div
          className="text-4xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Shafa
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8 ">
          <div className=" flex flex-row gap-8">
            <Link to="/" className={`${selectpage === "Home" ? "text-indigo-600" : "text-gray-700"} hover:text-indigo-600`} onClick={()=>setSelectpage("Home")}>Home</Link>
          <Link to="/products" className={`${selectpage === "Products" ? "text-indigo-600" : "text-gray-700"} hover:text-indigo-600`} onClick={()=>setSelectpage("Products")}>Products</Link>
          <Link to="/about" className={`${selectpage === "About" ? "text-indigo-600" : "text-gray-700"} hover:text-indigo-600`} onClick={()=>setSelectpage("About")}>About</Link>
          <Link to="/contact" className={`${selectpage === "Contact" ? "text-indigo-600" : "text-gray-700"} hover:text-indigo-600`} onClick={()=>setSelectpage("Contact")}>Contact</Link>
          </div>
          

          <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products"
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.836 10.615 15 14.695"
                stroke="#7A7B7D"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                clip-rule="evenodd"
                d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
                stroke="#7A7B7D"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div className="relative cursor-pointer">
            <svg
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                stroke="#615fff"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
              3
            </button>
          </div>
          {isAuthenticated ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Profile"
                    src={ user.profile || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                    <li>
                      <a className="justify-between" onClick={() => navigate("/user/profile")}>Profile</a>
                    </li>
                <li>
                  <a>Order</a>
                </li>
                {
                  (user?.role==="admin" || user?.role==="seller") && (
                    <li>
                      <a onClick={() => navigate("/seller/dashboard")}>Dashboard</a>
                    </li>
                  )
                }
                <li onClick={() => { logout(); navigate("/"); }}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
        {/* Mobile Menu Button */}
        <div className=" md:hidden items-center text-sm gap-2 border border-gray-300 px-3 rounded-full flex flex-row">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.836 10.615 15 14.695"
              stroke="#7A7B7D"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              clip-rule="evenodd"
              d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              stroke="#7A7B7D"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className="sm:hidden"
        >
          {/* Menu Icon SVG */}

          <svg
            width="21"
            height="15"
            viewBox="0 0 21 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect
              x="6"
              y="13"
              width="15"
              height="1.5"
              rx=".75"
              fill="#426287"
            />
          </svg>
        </button>

        {/* Mobile Menu */}

        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start px-5 text-sm md:hidden z-10 gap-1`}
        >
          <a href="#" className="block" onClick={()=>{setOpen(false);}}>
            Home
          </a>
          <a href="/products" className="block" onClick={()=>{setOpen(false);}}>
            Products
          </a>
          <a href="/about" className="block" onClick={()=>{setOpen(false);}}>
            About
          </a>
          <a href="/contact" className="block" onClick={()=>{setOpen(false);}}>
            Contact
          </a>
          
          {isAuthenticated ? (
            <div className=" flex flex-col gap-1">
              <a href="/user/profile" className="block" onClick={()=>{setOpen(false);}}>
            Profile
          </a>
          <a href="/orders" className="block" onClick={()=>{setOpen(false);}}>
            Orders
          </a>
          {
            (user?.role==="admin" || user?.role==="seller") && (
              <a onClick={() => {navigate("/seller/dashboard"); setOpen(false);}} className="block cursor-pointer">
                Dashboard
              </a>
            )
          }
          <a onClick={()=>{logout(); navigate('/');setOpen(false);}} className="block cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm ">
            Logout
          </a>
             
            </div>
          ) : (
            <button
              className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
              onClick={() => {
                setOpen(false);
                navigate("/login");
              }}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
