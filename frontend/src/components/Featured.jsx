import React from "react";

const Featured = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 my-5 md:my-12">
      <div className="flex items-center gap-3 mb-3">
        <span className="h-10 w-2 bg-indigo-500 rounded-lg"></span>
        <p className="text-lg text-indigo-500 font-bold">Featured</p>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        New Arrivals
      </h2>
      <div className=" flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 md:flex-wrap md:justify-center md:mt-8 ">
        <div>
            <img src="../assets/Frame1.png" alt="Featured Product" />
        </div>
        <div className=" flex flex-col justify-between gap-2">
            <div><img src="../assets/Frame2.png" alt="Featured Product" /></div>
            <div className=" flex flex-row justify-between gap-1">
                <div> <img src="../assets/Frame3.png" alt="Featured Product" /> </div>
                <div> <img src="../assets/Frame4.png" alt="Featured Product" /> </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
