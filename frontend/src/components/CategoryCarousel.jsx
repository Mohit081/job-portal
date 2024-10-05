import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "./redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="pl-28 md:pl-0">
      <Carousel className="max-w-40 md:w-full md:max-w-xl md:mx-auto my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              className=" basis md:basis-1/3 lg-basis-1/3 "
              key={index}
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full hover:text-white"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className=" md:flex" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
