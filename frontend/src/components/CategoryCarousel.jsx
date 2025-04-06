import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Analyst",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full px-4 py-16 bg-gradient-to-b from-white to-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10 tracking-tight text-gray-800">
        🔍 Explore by <span className="text-[#ff230f]">Category</span>
      </h2>

      <div className="relative max-w-5xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {categories.map((cat, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3"
              >
                <div className="flex justify-center">
                  <Button
                    onClick={() => searchJobHandler(cat)}
                    className="w-full max-w-[220px] py-6 text-base font-medium rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out bg-white hover:bg-gradient-to-r hover:from-[#ff230f]/90 hover:to-[#ff5e3a]/90 hover:text-white"
                    variant="outline"
                  >
                    {cat}
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCarousel;
