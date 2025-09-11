import React from "react";

const Title = ({text1, text2}) => {
  return (
    <>
      <div className="flex items-center gap-2 justify-center ">
        <p className="text-4xl brightness-50 opacity-50">{text1} </p>
        <p className="text-4xl brightness-50 ">{text2}</p>
        <div className="bg-gray-500 w-8 h-0.5"></div>
      </div>
      {/* <p className="w-[80vw] mx-auto text-center pt-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        voluptate quidem nam. Saepe, dolor sed?
      </p> */}
    </>
  ); 
};

export default Title;
