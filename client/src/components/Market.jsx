import React from "react";
import { ServiceCard } from "./Services";
import { BiSearchAlt } from "react-icons/bi";
const Market = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-col flex-col  items-start justify-between md:p-20 py-12 px-4">
          <div className="flex w-full justify-center items-center">

            <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
              Ethereum <br/>  Market Statistics
            </h1>

          </div>
        <div className="flex flex-1 justify-start flex-row lg:flex-row mf:mr-10 max-w-fit items-center">
          <ServiceCard
            color="bg-[#8945F8]"
            title="Market Cap."
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle="value fetched from API"
          />
          
           <ServiceCard
            color="bg-[#8945F8]"
            title="Market Cap."
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle="value fetched from API"
          />

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
