import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2 ">Job Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur. Lorem, ipsum dolor.
        </p>
      </div>
      <div className="flex items-center mt-4 gap-2">
        <Badge variant="ghost" className="text-blue-400 font-bold">
          12 positions
        </Badge>
        <Badge variant="ghost" className="text-blue-800 font-bold">
          Part Time
        </Badge>
        <Badge variant="ghost" className="text-blue-600 font-bold">
          12 LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
