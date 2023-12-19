import React from "react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useContext } from "react";
import ETH_img from '../assets/eth-unscreen.gif'
import { TransactionContext } from "../context/TransactionContext";
const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);
const API_URL =
  "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=BTC,USD,EUR&api_key=6a4234186f13b2ca0bef7921b1ff54662c76f2bf64a814af19f9267bbdd48662";
// const ServiceCard = ({title, subtitle }) => (
//   <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
//     <div className="ml-5 flex flex-col flex-1">
//       <h1 className="mt-2 text-white text-lg">{title}</h1>
//       <p className="mt-2 text-white text-sm md:w-9/199">{subtitle}</p>
//     </div>
//   </div>
// );

const Exchange = () => {
  const {handleChange,isLoading} = useContext(TransactionContext);
  const [btc, setBtc] = useState([]);
  const exch = async () => {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    console.log(data.ETH);
    setBtc([data.ETH.BTC, data.ETH.EUR, data.ETH.USD]);
  };
  useEffect(() => {
    exch();
  }, []);
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col  items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <div className="flex">
            {/* <ServiceCard
              title="1 ETH"
              subtitle={
                <ul>
                  <li className="ETH_to_BTC">BTC : {btc[0]}</li>
                  <li className="ETH_to_USD">USD : {btc[1]}</li>
                  <li className="ETH_to_EUR">EUR : {btc[2]}</li>
                </ul>
              }
            /> */}
            <img src={ETH_img} alt="Eth" />
            <div className="flex flex-1 justify-start flex-col mf:mr-10">
              <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                Ethereum <br /> Converter.
              </h1>
              <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                <Input placeholder="ETH Amount" name="amount"
              type="number"
              handleChange={handleChange} />

                <Input placeholder="Convert to" name="addressTo" type="text" />

                {
                isLoading?(
                  <Loader/>
                ):
                (
                <button
                  type="button"
                  // onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer">Convert Now
                  </button>
                )
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
