import React from "react";
import { useEffect, useState } from "react";
import Select from "react-select";
import ETH_img from "../assets/eth-unscreen.gif";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "transparent", // Customize control background color
    borderColor: "#555", // Customize control border color
    boxShadow: state.isFocused ? "0 0 0 1px #555" : "none", // Customize control box shadow
    color: "red",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#555"
      : state.isFocused
      ? "#666"
      : "#333", // Customize option background color
    color: state.isSelected ? "#fff" : "#ccc",
  }),
};

const Input = ({ placeholder, type, value, handleChange, disable }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    disabled={disable}
    onChange={(e) => handleChange(e)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const COIN_LIST = "https://min-api.cryptocompare.com/data/all/coinlist";

let op = "";
const Exchange = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [numberInput, setNumberInput] = useState(null);
  const [result, setResult] = useState(null);

  const handleInputChange = (event) => {
    setNumberInput(event.target.value);
  };

  const handleConvert = async () => {
    if (selectedOption) {
      const conversion =
        parseFloat(selectedOption.value) * parseFloat(numberInput);
      setResult(conversion);
    }
  };

  const [options, setOptions] = useState([{ value: "", label: "" }]);

  const [coinsList, setCoinsList] = useState([]);
  const coins = async () => {
    fetch(`${COIN_LIST}`)
      .then((response) => response.json())
      .then((data) => setCoinsList(Object.entries(data.Data).slice(0, 50)))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const opt = async () => {
    coinsList.map((det) => {
      det[1].SortOrder < 10 && (op += `${det[1].Symbol},`);
    });

    op = op.slice(0, -1);

    const API_URL = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=${op}&api_key=6a4234186f13b2ca0bef7921b1ff54662c76f2bf64a814af19f9267bbdd48662`;
    let response = await fetch(API_URL);
    let data = await response.json();
    data = Object.entries(data.ETH);
    data.map((pair) => {
      setOptions((prev) => [...prev, { value: pair[1], label: pair[0] }]);
    });
  };
  useEffect(() => {
    coins();
    opt();
  }, []);
  useEffect(() => {
    opt();
  }, [coinsList]);

  return (
    <div className="flex w-full justify-center items-center min-h-screen">
      <div className="flex mf:flex-row flex-col  items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col lg:flex-row mf:mr-10 max-w-fit items-center">
          <img
            src={ETH_img}
            alt="Eth"
            className=" md:max-w-xs flex justify-center "
          />
          <div className="flex flex-1 justify-start flex-col mf:mr-10">
            <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
              Ethereum <br /> Converter.
            </h1>
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              <Input
                placeholder="ETH Amount"
                name="amount"
                type="number"
                value={numberInput}
                handleChange={handleInputChange}
                disable={false}
              />

              <Select
                styles={customStyles}
                className="my-2 w-full rounded-sm p-2 outline-none bg-transparent border-none white-glassmorphism z-10"
                options={options}
                value={selectedOption}
                onChange={(selected) => setSelectedOption(selected)}
              />

              {
                <button
                  type="button"
                  onClick={handleConvert}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Convert Now
                </button>
              }
              <Input
                placeholder="Result"
                name="amount"
                type="number"
                value={result}
                handleChange={handleInputChange}
                disable={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
