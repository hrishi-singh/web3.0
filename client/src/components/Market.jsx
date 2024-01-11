import React from "react";
import { useEffect, useState } from "react";
import { ServiceCard } from "./Services";
import { MdQueryStats } from "react-icons/md";

const Market = () => {
  const details = [
    ["Market Capacity", "MKTCAP"],
    ["Last Volume", "LASTVOLUMETO"],
    ["Price", "PRICE"],
    ["Price Change (24H)", "CHANGE24HOUR"],
    ["Opening Price (24H)", "OPEN24HOUR"],
    ["High Price (24H)", "HIGH24HOUR"],
    ["Low Price (24H)", "LOW24HOUR"],
  ];
  const [stats, setStats] = useState([]);
  const STAT_URL =
    "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD&api_key=6a4234186f13b2ca0bef7921b1ff54662c76f2bf64a814af19f9267bbdd48662";

  const stat_details = async () => {
    fetch(`${STAT_URL}`)
      .then((response) => response.json())
      .then((data) =>
        setStats(Object.entries(Object.entries(data)[1][1].ETH)[0][1])
        // console.log(data)
      )
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    stat_details();
  }, []);

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-col flex-col  items-start justify-between md:p-20 py-12 px-4">
        <div className="flex w-full justify-center items-center">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
            Ethereum <br /> Market Statistics
          </h1>
        </div>
        <div className="flex-1 flex flex-row justify-center items-center flex-wrap p-10 ml-5 mr-5">
          {details.map((det)=>{
            return(
              <ServiceCard
              key={det[0]}
            color="bg-[#8945F8]"
            title={det[0]}
            icon={<MdQueryStats fontSize={21} className="text-white" />}
            subtitle={eval(`stats.${det[1]}`)}
            dimension="w-48 h-32"
          />
            );
          })}
          
        </div>
      </div>
    </div>
  );
};

export default Market;
