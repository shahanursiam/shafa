import React from "react";

const Service = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 my-12 flex flex-col md:flex-row  items-center justify-center gap-8">
      
      {/* Service 1 */}
      <div className="flex flex-col items-center text-center max-w-xs">
        <img
          src="../assets/Services.png"
          alt="Free Delivery"
          className="w-16 h-16 object-contain mb-4"
        />
        <h2 className="text-lg font-semibold mb-1">
          Free and Fast Delivery
        </h2>
        <p className="text-sm text-gray-600">
          Get your products delivered quickly and for free.
        </p>
      </div>

      {/* Service 2 */}
      <div className="flex flex-col items-center text-center max-w-xs">
        <img
          src="../assets/Services1.png"
          alt="Customer Support"
          className="w-16 h-16 object-contain mb-4"
        />
        <h2 className="text-lg font-semibold mb-1">
          24/7 Customer Support
        </h2>
        <p className="text-sm text-gray-600">
          Get help anytime, anywhere.
        </p>
      </div>

      {/* Service 3 */}
      <div className="flex flex-col items-center text-center max-w-xs">
        <img
          src="../assets/Services2.png"
          alt="Money Back"
          className="w-16 h-16 object-contain mb-4"
        />
        <h2 className="text-lg font-semibold mb-1">
          Money Back Guarantee
        </h2>
        <p className="text-sm text-gray-600">
          Get a full refund if you're not satisfied.
        </p>
      </div>

    </div>
  );
};

export default Service;
