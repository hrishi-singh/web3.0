import React from "react";
import { useEffect, useState } from "react";
import { ServiceCard } from "./Services";
import { BiSearchAlt } from "react-icons/bi";

const Market = () => {
   const [stats, setStats] = useState([]);
   const [mktCap, setMktCap] = useState("");
   const [price,setPrice]= useState("");
   const STAT_URL="https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=INR&api_key=6a4234186f13b2ca0bef7921b1ff54662c76f2bf64a814af19f9267bbdd48662";

   const stat_details= async ()=>{
    fetch(`${STAT_URL}`)
    .then((response)=>response.json())
    .then((data)=> setStats((Object.entries(Object.entries(data)[1][1].ETH)[0][1])))
    .catch((error) => console.error("Error fetching data:", error));
}

    const get_details= ()=>{
        setMktCap(stats.MKTCAP);
        setPrice(stats.PRICE);


    }
useEffect(() => {
    stat_details();
}, [])

useEffect(() => {
    get_details();
}, [ stat_details])

console.log(stats.PRICE);


  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-col flex-col  items-start justify-between md:p-20 py-12 px-4">
          <div className="flex w-full justify-center items-center">

            <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
              Ethereum <br/>  Market Statistics
            </h1>

          </div>
        <div className="flex-1 flex flex-row justify-center items-center">
          <ServiceCard
            color="bg-[#8945F8]"
            title="Market Cap."
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle={mktCap}
            dimension="w-48 h-24"
          />

           <ServiceCard
            color="bg-[#8945F8]"
            title="Price"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle={price}
            dimension="w-48 h-24"
          />

        </div>
        <div className="flex-1 flex flex-row justify-center items-center">
        <ServiceCard
            color="bg-[#8945F8]"
            title="Opening Price (24H)"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle={stats.OPEN24HOUR}
            dimension="w-48 h-24"
          />
          <ServiceCard
            color="bg-[#8945F8]"
            title="High Price (24H)"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle={stats.HIGH24HOUR}
            dimension="w-48 h-24"
          />

           <ServiceCard
            color="bg-[#8945F8]"
            title="Low Price (24H)"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle={stats.LOW24HOUR}
            dimension="w-48 h-24"
          />
        

        </div>
      </div>
      
    </div>
  );
};

export default Market;
