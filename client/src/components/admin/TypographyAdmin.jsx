import React, { useState } from "react";
import tasks from "../../assets/tasks.png";
import tickets from "../../assets/tickets.png";
import comments from "../../assets/comments.png";
import visitors from "../../assets/visitors.png";
import bieudo from "../../assets/bieudo.png";
import bieudo2 from "../../assets/bieudo2.png";
import arrow3 from "../../assets/arrow3.png";
import UserTable from './../table/UserTable';

const TypographyAdmin = () => {
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="bg-[#74d658] flex flex-col justify-center w-full">
      <div className="m-10 flex justify-start md:justify-center sm:justify-center lg:justify-start">
        <p>USERS LIST</p>
      </div>
      <UserTable />

      {/* <div className="bg-white flex flex-col justify-center m-10 md:m-3 sm:m-3 lg:m-10">
       

      </div> */}
    
    </div>
  );
};

export default TypographyAdmin;
