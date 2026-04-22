import React from "react";

export const Navigation = ({ placeHolder, genre, active = false }) => {
  return (
    <div className=" w-360 h-14.75 flex items-center justify-around">
      <div className="flex gap-2 items-center">
        <img className="w-5" src="/logo.svg" alt="logo" />
        <p className="text-[#4338CA] font-semibold italic">Movie Z</p>
      </div>
      <div className="flex gap-3">
        <button
          className="w-24.25 h-9 border rounded-lg border-[#E4E4E7] flex items-center justify-center gap-2"
          placeHolder={placeHolder}
        >
          <img className="w-4" src="/down.svg" alt=""></img>
          <p className="text-sm w-10.25 h-5">{genre}</p>
        </button>
        <div className="flex gap-2.5 border rounded-lg border-[#E4E4E7] w-94 h-9 pl-3 pr-3">
          <img className="w-4 " src="/search.svg" alt="search" />
          <input
            className="w-[333px] outline-0"
            placeHolder={placeHolder}
          ></input>
        </div>
      </div>
      <div className="w-[36px] h-[36px] border border-[#E4E4E7] rounded-lg flex justify-center items-center">
        <img src="/moon.svg" alt="mode" />
      </div>
    </div>
  );
};
