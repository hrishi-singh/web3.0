import React from 'react'
import { useEffect, useState } from "react";

const API_URL = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms=BTC,USD,EUR&api_key=6a4234186f13b2ca0bef7921b1ff54662c76f2bf64a814af19f9267bbdd48662";
const ServiceCard=({color,title,icon,subtitle})=>(
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
      <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
        {icon}
      </div>
      <div className="ml-5 flex flex-col flex-1">
        <h1 className="mt-2 text-white text-lg">
          {title}
        </h1>
        <p className="mt-2 text-white text-sm md:w-9/12">
          {subtitle}
        </p>
  
      </div>
    </div>
  )

const Exchange = () => {
    const [title,setTitle] = useState("");
    const exch = async () => {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        console.log(data.ETH.BTC);
        setTitle(data.ETH.BTC)
      };
      useEffect(() => {
        exch();
      },[]);
  return (
    <div>
       <dif className="flex">
       <ServiceCard
    color="bg-[#2952E3]"
    title={`${title}`}
    subtitle="Security is guaranteed. We always maintain privacy & quality of our products."/>
       </dif>
    </div>
  )
}

export default Exchange