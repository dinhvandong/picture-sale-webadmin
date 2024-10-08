import React, { useState } from "react";
import tasks from "../../assets/tasks.png";
import tickets from "../../assets/tickets.png";
import comments from "../../assets/comments.png";
import visitors from "../../assets/visitors.png";
import bieudo from "../../assets/bieudo.png";
import bieudo2 from "../../assets/bieudo2.png";
import arrow3 from "../../assets/arrow3.png";

const ChartsAdmin = () => {
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="bg-[#E9E9E9] flex flex-col justify-center w-full">
      <div className="m-10 flex justify-start md:justify-center sm:justify-center lg:justify-start">
        <p>DASHBOARD</p>
      </div>
      <div className="flex flex-row md:flex-col sm:flex-col lg:flex-row justify-center bg-[#E9E9E9]">
        <div className="flex flex-row justify-center">
          <div className="bg-[#CE1A57] ml-10 md:ml-0 sm:ml-0 lg:ml-10">
            <img className="w-[50px] h-[50px] m-3" src={tasks} alt="" />
          </div>
          <div className="text-white bg-[#EA1E63] w-[200px]">
            <p className="ml-2 mt-2">NEW TASK</p>
            <p className="ml-2 text-2xl">125</p>
          </div>
        </div>
        <div className="flex flex-row justify-center mt-0 md:mt-3 sm:mt-3 lg:mt-0">
          <div className="bg-[#03A5BC] ml-10 md:ml-0 sm:ml-0 lg:ml-10">
            <img className="w-[50px] h-[50px] m-3 mr-3" src={tickets} alt="" />
          </div>
          <div className="text-white bg-[#00BCD5] w-[200px]">
            <p className="ml-2 mt-2">NEW TICKETS</p>
            <p className="ml-2 text-2xl">257</p>
          </div>
        </div>
        <div className="flex flex-row justify-center mt-0 md:mt-3 sm:mt-3 lg:mt-0">
          <div className="bg-[#7BAC41] ml-10 md:ml-0 sm:ml-0 lg:ml-10">
            <img className="w-[50px] h-[50px] m-3 mr-3" src={comments} alt="" />
          </div>
          <div className="text-white bg-[#8BC24A] w-[200px]">
            <p className="ml-2 mt-2">NEW COMMENTS</p>
            <p className="ml-2 text-2xl">243</p>
          </div>
        </div>
        <div className="flex flex-row justify-center mt-0 md:mt-3 sm:mt-3 lg:mt-0">
          <div className="bg-[#E18601] ml-10 md:ml-0 sm:ml-0 lg:ml-10">
            <img className="w-[50px] h-[50px] m-3 mr-3" src={visitors} alt="" />
          </div>
          <div className="text-white bg-[#FE9900] w-[200px] mr-10 md:mr-0 sm:mr-0 lg:mr-10">
            <p className="ml-2 mt-2">NEW VISITORS</p>
            <p className="ml-2 text-2xl">1225</p>
          </div>
        </div>
      </div>
      <div className="bg-white flex flex-col justify-center m-10 md:m-3 sm:m-3 lg:m-10">
        <div className="flex flex-row justify-center w-full">
          <div className="justify-start items-start w-[50%]">
            <p className="ml-5 mt-3 mb-3">CPU USAGE (%)</p>
          </div>
          <div className="flex flex-row w-[50%] justify-end items-end">
            <p className="mb-3">REAL TIME</p>
            <p className="ml-5 mb-3 mr-3">OFF</p>
            <div className="relative inline-block mb-3">
              <input
                type="checkbox"
                id="switch"
                className="hidden"
                checked={isOn}
                onChange={toggleSwitch}
              />
              <label
                htmlFor="switch"
                className={`flex items-center justify-between w-12 h-6 rounded-full ${
                  isOn ? "bg-[#7EE1EF]" : "bg-gray-300"
                } transition-colors cursor-pointer`}
              >
                <span
                  className={`block w-6 h-6 rounded-full bg-white ${
                    isOn ? "translate-x-6 bg-[#00BCD2]" : "bg-gray-400"
                  } shadow-md transform transition-transform`}
                ></span>
              </label>
            </div>
            <p className="ml-3 mb-3">ON</p>
            <button className="m-3">
              <img
                className="w-[23px] h-[23px]"
                src="https://cdn-icons-png.flaticon.com/128/2311/2311524.png"
                alt=""
              />
            </button>
          </div>
        </div>
        <div className="bg-gray-300 w-full h-[1px]"></div>
        <div>
          <img className="w-[97%] m-5" src={bieudo} alt="" />
        </div>
      </div>
      <div className="flex flex-row md:flex-col sm:flex-col lg:flex-row justify-center mb-10">
        <div className="flex flex-col justify-center bg-[#EA1E63] 
        text-white w-[30%] md:w-full sm:w-full lg:w-[30%] ml-0 md:ml-3 sm:ml-3 lg:ml-0 mr-0 md:mr-3 sm:mr-3 lg:mr-0">
          <div>
            <img className="mt-3" src={bieudo2} alt="" />
          </div>
          <div className="flex flex-row justify-center">
            <p className="flex justify-start items-start w-[50%] m-3 mt-10">
              TODAY
            </p>
            <p className="flex justify-end items-end w-[50%] m-3 mt-10">
              <span className="font-bold">1 200</span>
              <span className="text-xs ml-1"> USERS</span>
            </p>
          </div>
          <div className="flex flex-row justify-center">
            <p className="flex justify-start items-start w-[50%] m-3">
              YESTERDAY
            </p>
            <p className="flex justify-end items-end w-[50%] m-3">
              <span className="font-bold">3 872</span>
              <span className="text-xs ml-1"> USERS</span>
            </p>
          </div>
          <div className="flex flex-row justify-center">
            <p className="flex justify-start items-start w-[50%] m-3 mb-5">
              LAST WEEK
            </p>
            <p className="flex justify-end items-end w-[50%] m-3 mb-5">
              <span className="font-bold">26 582</span>
              <span className="text-xs ml-1"> USERS</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center bg-[#00B9D2] 
        text-white w-[30%] md:w-full sm:w-full lg:w-[30%] ml-5 md:ml-3 sm:ml-3 lg:ml-5 mt-0 md:mt-3 sm:mt-3 lg:mt-0 mr-0 md:mr-3 sm:mr-3 lg:mr-0">
          <div className="font-bold m-3 mt-5">LATEST SOCIAL TRENDS</div>
          <div className="flex flex-row justify-center w-full">
            <div className="flex justify-start items-start w-[50%] m-3">
              #socialtrends
            </div>
            <div className="flex justify-end items-end w-[50%] m-3">
              <img className="w-[20px] h-[20px]" src={arrow3} alt="" />
            </div>
          </div>
          <div className="flex flex-row justify-center w-full">
            <div className="flex justify-start items-start w-[50%] m-3">
              #materialdesign
            </div>
            <div className="flex justify-end items-end w-[50%] m-3">
              <img className="w-[20px] h-[20px]" src={arrow3} alt="" />
            </div>
          </div>
          <div className="flex flex-row justify-start w-full">
            <div className="flex justify-start items-start m-3">#adminbab</div>
          </div>
          <div className="flex flex-row justify-start w-full">
            <div className="flex justify-start items-start m-3">
              #freeadmintemplate
            </div>
          </div>
          <div className="flex flex-row justify-start w-full">
            <div className="flex justify-start items-start m-3">
              #bootstraptemplate
            </div>
          </div>
          <div className="flex flex-row justify-center w-full mb-3">
            <div className="flex justify-start items-start w-[50%] m-3">
              #freehtmltemplate
            </div>
            <div className="flex justify-end items-end w-[50%] m-3">
              <img className="w-[20px] h-[20px]" src={arrow3} alt="" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center bg-[#009788] 
        text-white w-[30%] md:w-full sm:w-full lg:w-[30%] ml-5 md:ml-3 sm:ml-3 lg:ml-5 mt-0 md:mt-3 sm:mt-3 lg:mt-0 mr-0 md:mr-3 sm:mr-3 lg:mr-0">
          <div className="font-bold m-3 mt-5">ANSWERED TICKETS</div>
          <div className="flex flex-col justify-center w-full">
            <div className="flex flex-row justify-center w-full">
              <p className="flex justify-start items-start w-[50%] m-3">
                TODAY
              </p>
              <p className="flex justify-end items-end w-[50%] m-3">
                <span className="font-bold">12</span>
                <span className="text-xs ml-1"> TICKETS</span>
              </p>
            </div>
            <div className="flex flex-row justify-center w-full">
              <p className="flex justify-start items-start w-[50%] m-3">
                YESTERDAY
              </p>
              <p className="flex justify-end items-end w-[50%] m-3">
                <span className="font-bold">15</span>
                <span className="text-xs ml-1"> TICKETS</span>
              </p>
            </div>
            <div className="flex flex-row justify-center w-full">
              <p className="flex justify-start items-start w-[50%] m-3">
                LAST WEEK
              </p>
              <p className="flex justify-end items-end w-[50%] m-3">
                <span className="font-bold">90</span>
                <span className="text-xs ml-1">TICKETS</span>
              </p>
            </div>
            <div className="flex flex-row justify-center w-full">
              <p className="flex justify-start items-start w-[50%] m-3">
                LAST MONTH
              </p>
              <p className="flex justify-end items-end w-[50%] m-3">
                <span className="font-bold">342</span>
                <span className="text-xs ml-1">TICKETS</span>
              </p>
            </div>
            <div className="flex flex-row justify-center w-full">
              <p className="flex justify-start items-start w-[50%] m-3">
                LAST YEAR
              </p>
              <p className="flex justify-end items-end w-[50%] m-3">
                <span className="font-bold">4 225</span>
                <span className="text-xs ml-1">TICKETS</span>
              </p>
            </div>
            <div className="flex flex-row justify-center w-full">
              <p className="flex justify-start items-start w-[50%] m-3">ALL</p>
              <p className="flex justify-end items-end w-[50%] m-3">
                <span className="font-bold">8 752</span>
                <span className="text-xs ml-1">TICKETS</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsAdmin;
