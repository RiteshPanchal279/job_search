import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { X } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: ["Mumbai", "Gujarat", "Pune", "Bangalore"],
  },
  {
    filterType: "Industry",
    array: ["IT", "Frontend Developer", "Account", "Audit"],
  },
  {
    filterType: "Job Type",
    array: ["Full time", "Part Time"],
  },
];

const FilterCard = ({ show, setShow }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div
      className={`bg-white p-4 rounded-xl shadow-md z-50 transition-transform duration-300
      ${show ? "translate-x-0" : "-translate-x-full"} 
      fixed top-0 left-0 w-3/4 h-full md:static md:translate-x-0 md:w-full md:rounded-md md:shadow-none`}
    >
      {/* Mobile close button */}
      <div className="md:hidden flex justify-end mb-4">
        <button onClick={() => setShow(false)}>
          <X className="h-6 w-6" />
        </button>
      </div>

      <h1 className="font-bold text-lg mb-4">Filter Jobs</h1>
      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-4">
        {filterData.map((data, index) => (
          <div key={index} className="space-y-2">
            <h2 className="font-semibold text-gray-800 text-base">{data.filterType}</h2>
            <div className="flex flex-col gap-2">
              {data.array.map((item, idx) => {
                const itemId = `filter-${index}-${idx}`;
                return (
                  <div key={itemId} className="flex items-center gap-2">
                    <RadioGroupItem id={itemId} value={item} />
                    <Label htmlFor={itemId} className="text-gray-600 text-sm cursor-pointer">
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
