import React from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className="flex flex-[0.5] justify-center items-center">
          <img src={logo} alt="logo" className="w-32" />
        </div>
        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
          {["Market", "Exchange", "Tutorials", "Wallets"].map((item) => (
            <Link to={`/${item.toLowerCase()}`} key={item}>
              <p className="text-white text-base text-center mx-2 cursor-pointer">
                {item}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5" />
      <div className="flex justify-center items-center flex-col mt-5">
        <p className="text-white text-sm text-center">
          &#169; All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
