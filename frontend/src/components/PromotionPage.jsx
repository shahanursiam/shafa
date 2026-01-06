import React from "react";

const PromotionPage = () => {
  return (
    <div className=" px-6 md:px-16 lg:px-24 xl:px-32 my-5 md:my-12">
      <section className="w-full px-8 py-14 bg-gradient-to-r from-black via-[#0b0b0b] to-[#111] flex items-center ">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* LEFT CONTENT */}
          <div className="text-white space-y-8">
            <span className="text-green-400 text-sm font-semibold">
              Categories
            </span>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
              Enhance Your <br /> Music Experience
            </h1>

            {/* COUNTDOWN */}
            <div className="flex gap-4">
              {[
                { value: "23", label: "Hours" },
                { value: "05", label: "Days" },
                { value: "59", label: "Minutes" },
                { value: "35", label: "Seconds" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-20 h-20 bg-white text-black rounded-full flex flex-col items-center justify-center"
                >
                  <span className="text-xl font-bold">{item.value}</span>
                  <span className="text-xs">{item.label}</span>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <button className="bg-green-500 hover:bg-green-600 transition px-8 py-4 rounded-lg text-black font-semibold">
              Buy Now!
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            {/* White Glow Circle */}
            <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-white/20 rounded-full blur-3xl"></div>

            {/* Image */}
            <img
              src="../assets/Frame694.png"
              alt="JBL Speaker"
              className="relative z-10 w-[90%] max-w-xl drop-shadow-2xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PromotionPage;
