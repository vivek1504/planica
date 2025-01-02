import React from "react";
import Nofav from "../assets/Nofav.png";

const Fav: React.FC = () => {
  return (
    <div className="absolute right-[100px] w-[1050px] mx-auto border rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-purple-600 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.148c.969 0 1.371 1.24.588 1.81l-3.358 2.448a1 1 0 00-.364 1.118l1.287 3.947c.3.921-.755 1.688-1.54 1.118l-3.357-2.448a1 1 0 00-1.176 0l-3.357 2.448c-.785.57-1.84-.197-1.54-1.118l1.287-3.947a1 1 0 00-.364-1.118L2.707 9.373c-.783-.57-.38-1.81.588-1.81h4.148a1 1 0 00.95-.69l1.286-3.946z"
            />
          </svg>
          Favorites
        </h2>
        <button
          className="text-sm text-gray-600 hover:text-gray-900 focus:outline-none"
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
