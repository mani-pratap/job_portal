import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const Filter = () => {
  const filterData = [
    {
      filterType: "Location",
      array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune"],
    },
    {
      filterType: "Industry",
      array: ["Frontend Developer", "Fullstack Developer", "Backend Developer"],
    },
    {
      filterType: "Salary",
      array: ["50k - 1 lakh", "1 lakh - 3 lakh", "4 lakh - 6 lakh"],
    },
  ];

  return (
    <div className="p-5 bg-white shadow-md h-full w-full md:w-72">
      <h1 className="font-semibold text-xl mb-3">Filter Jobs</h1>
      <hr className="mb-4 border-gray-300" />

      {filterData.map((data, i) => (
        <div key={i} className="mb-6">
          <h2 className="text-lg font-medium mb-2 text-gray-700">
            {data.filterType}
          </h2>
          <RadioGroup className="space-y-2">
            {data.array.map((item, j) => (
              <div key={j} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={item}
                  id={`${data.filterType}-${j}`}
                  className="border-gray-400 data-[state=checked]:bg-purple-500 data-[state=checked]:border-blue-600"
                />

                <Label
                  htmlFor={`${data.filterType}-${j}`}
                  className="cursor-pointer"
                >
                  {item}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default Filter;
