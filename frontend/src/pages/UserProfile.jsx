import React from 'react';
import { useState } from 'react';
import UserInfo from '../components/UserInfo';
import UserAddress from '../components/UserAddress';
import { CgProfile } from "react-icons/cg";
import { FaRegAddressBook } from "react-icons/fa";
import { MdSell } from "react-icons/md";
import { useUser } from '../contexts/UserContext';

const UserProfile = () => {
  const { user } = useUser();
  const [selectedMenu, setSelectedMenu] = useState("userInfo");
  return (
    <div className=" px-6 md:px-16 lg:px-24 xl:px-32 py-4">
      <h1 className=" text-center font-bold text-xl m-4"><span className=' text-indigo-400'>Welcome</span> {user?.name} </h1>
      <div className=" flex gap-5 flex-col md:flex-row ">
        <div className=" md:basis-1/6">
          {/* Sidebar can be added here */}
          <ul className=" flex flex-row  md:flex-col">
            <li
              className={` flex flex-row items-center  gap-2 px-4 py-2  ${selectedMenu === "userInfo" ? "bg-gray-300" : ""
                } rounded `}
              onClick={() => setSelectedMenu("userInfo")}
            >
              <span>
                <CgProfile />
              </span>
              <a href="#">Profile</a>
            </li>
            <li
              className={` flex flex-row items-center  gap-2 px-4 py-2  ${selectedMenu === "userAddress" ? "bg-gray-300" : ""
                } rounded `}
              onClick={() => setSelectedMenu("userAddress")}
            >
              <span>
                <FaRegAddressBook />
              </span>
              <a href="#">Address</a>
            </li>
          </ul>
        </div>
        <div className=' basis-5/6'>
          {selectedMenu === "userInfo" && <UserInfo />}
          {selectedMenu === "userAddress" && <UserAddress />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;