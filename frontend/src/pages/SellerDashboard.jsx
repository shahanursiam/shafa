import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";
import { MdSell } from "react-icons/md";
import AddProduct from "../components/AddProduct";
import MyProduct from "../components/MyProduct";
import OrderList from "../components/OrderList";    
const SellerDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("addProduct");
  return (
    <div className=" px-6 md:px-16 lg:px-24 xl:px-32 py-4">
      <h1 className=" text-center font-bold text-xl m-4">Seller Dashboard</h1>
      <div className=" flex gap-5 flex-col md:flex-row ">
        <div className=" md:basis-1/6">
          {/* Sidebar can be added here */}
          <ul className=" flex flex-row  md:flex-col">
            <li
              className={` flex flex-row items-center  gap-2 px-4 py-2  ${
                selectedMenu === "addProduct" ? "bg-gray-300" : ""
              } rounded `}
              onClick={() => setSelectedMenu("addProduct")}
            >
              <span>
                <IoIosAddCircle />
              </span>
              <a href="#">Add Product</a>
            </li>
            <li
              className={` flex flex-row items-center  gap-2 px-4 py-2  ${
                selectedMenu === "myProducts" ? "bg-gray-300" : ""
              } rounded `}
              onClick={() => setSelectedMenu("myProducts")}
            >
              <span>
                <FaShoppingBag />
              </span>
              <a href="#">My Products</a>
            </li>
            <li
              className={` flex flex-row items-center  gap-2 px-4 py-2 ${
                selectedMenu === "orders" ? "bg-gray-300" : ""
              } rounded `}
              onClick={() => setSelectedMenu("orders")}
            >
              <span>
                <MdSell />
              </span>
              <a href="#">Order</a>
            </li>
          </ul>
        </div>
        <div>
          {selectedMenu === "addProduct" && <AddProduct />}
          {selectedMenu === "myProducts" && <MyProduct />}
          {selectedMenu === "orders" && <OrderList />}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
