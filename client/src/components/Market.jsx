import React from "react";
import { ServiceCard } from "./Services";
import { BiSearchAlt } from "react-icons/bi";
const Market = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col  items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col lg:flex-col mf:mr-10 max-w-fit items-center">
          <div className="flex-1 flex flex-col justify-start items-start">

            <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
              Ethereum <br/>  Market Statistics
            </h1>

          </div>
          <ServiceCard
            color="bg-[#8945F8]"
            title="Market Cap."
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle="value fetched from API"
          />
        </div>
      </div>
    </div>
  );
};

export default Market;
