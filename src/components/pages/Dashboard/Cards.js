import React from "react";
import AnimatedCount from "./AnimatedCount";

const Cards = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
      {data.map((link, index) => (
        <div
          key={index}
          className="card rounded-lg px-6 py-4 shadow-md h-30 w-full flex gap-4"
        >
          <div className="text-secondary dark:text-white text-5xl h-11 w-11 py-1.5">
            {link?.icon}
          </div>
          <div className="">
            <strong className="text-2xl text-black dark:text-white font-semibold">
              {/* <AnimatedCount value={link?.amount} /> */}
              {link?.amount}
            </strong>
            <div>
              <span className="text-sm text-gray-500 dark:text-white font-small">
                {link?.title}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
