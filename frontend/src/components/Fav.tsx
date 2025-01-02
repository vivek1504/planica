import React from "react";
import Nofav from "../assets/Nofav.png";
import Favourites from "../assets/Favourites.png";

const Fav: React.FC = () => {
  return (
    <div className="absolute right-[100px] w-[1050px] mx-auto border rounded-lg mt-6 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-purple-600 flex items-center">
          <img src={Favourites} alt="" className="px-3"/>
          Favorites
        </h2>
        <button
          className="text-sm text-gray-600 border-2 p-4 w-[120px] rounded-2xl hover:text-gray-900 focus:outline-none"
          title="Clear all favorites"
        >
          Clear All
        </button>
      </div>

      {/* Content */}
      <div className="p-6 text-center">
        <div className="flex flex-col items-center">
          {/* Icon */}
          <div className="mb-4 bg-gray-100 p-4 rounded-full">
            <img src={Nofav} alt="" />
          </div>
          {/* Text */}
          <p className="text-sm font-medium text-gray-500">
            No Favourite
          </p>
          <p className="text-xs text-gray-400">
            You haven't marked any favorite
          </p>
        </div>
      </div>
    </div>
  );
};

export default Fav;
