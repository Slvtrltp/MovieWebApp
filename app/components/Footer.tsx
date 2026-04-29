import React from "react";

export const Footer = () => {
  return (
    <div className="w-full h-[300px] mt-13 bg-[#4338CA] flex items-center gap-30 justify-around">
      <div className=" h-[200px] w-[247px] space-y-4 ">
        <div className="flex gap-2 items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.83366 1.66699V18.3337M14.167 1.66699V18.3337M1.66699 10.0003H18.3337M1.66699 5.83366H5.83366M1.66699 14.167H5.83366M14.167 14.167H18.3337M14.167 5.83366H18.3337M3.48366 1.66699H16.517C17.5203 1.66699 18.3337 2.48034 18.3337 3.48366V16.517C18.3337 17.5203 17.5203 18.3337 16.517 18.3337H3.48366C2.48034 18.3337 1.66699 17.5203 1.66699 16.517V3.48366C1.66699 2.48034 2.48034 1.66699 3.48366 1.66699Z"
              stroke="#FAFAFA"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-white font-semibold italic">Movie Z</p>
        </div>

        <p className="text-white">© 2024 Movie Z. All Rights Reserved.</p>
      </div>
      <div className="flex justify-end gap-48">
        <div className="w-[900px] h-[200px]">
          <p className="text-white pb-3">Contact Information</p>
          <div className="flex items-center gap-2 pb-6">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6663 4.66699L8.68634 8.46699C8.48052 8.59594 8.24255 8.66433 7.99967 8.66433C7.7568 8.66433 7.51883 8.59594 7.31301 8.46699L1.33301 4.66699M2.66634 2.66699H13.333C14.0694 2.66699 14.6663 3.26395 14.6663 4.00033V12.0003C14.6663 12.7367 14.0694 13.3337 13.333 13.3337H2.66634C1.92996 13.3337 1.33301 12.7367 1.33301 12.0003V4.00033C1.33301 3.26395 1.92996 2.66699 2.66634 2.66699Z"
                stroke="#FAFAFA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <p className="text-white">Email:</p>
              <a className="text-white">support@movieZ.com</a>
            </div>
          </div>
          <div className="flex">
            <svg
              width="23"
              height="100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6669 23.2797V25.2797C14.6677 25.4654 14.6297 25.6492 14.5553 25.8193C14.4809 25.9894 14.3718 26.1421 14.235 26.2676C14.0982 26.3932 13.9367 26.4887 13.7608 26.5482C13.5849 26.6077 13.3985 26.6298 13.2136 26.6131C11.1622 26.3902 9.19161 25.6892 7.46028 24.5664C5.8495 23.5428 4.48384 22.1772 3.46028 20.5664C2.3336 18.8272 1.63244 16.8471 1.41361 14.7864C1.39695 14.6021 1.41886 14.4162 1.47795 14.2408C1.53703 14.0654 1.63199 13.9042 1.75679 13.7675C1.88159 13.6308 2.03348 13.5215 2.20281 13.4468C2.37213 13.372 2.55517 13.3332 2.74028 13.3331H4.74028C5.06382 13.3299 5.37748 13.4445 5.62279 13.6554C5.8681 13.8664 6.02833 14.1594 6.07361 14.4797C6.15803 15.1198 6.31458 15.7482 6.54028 16.3531C6.62998 16.5917 6.64939 16.851 6.59622 17.1003C6.54305 17.3496 6.41952 17.5785 6.24028 17.7597L5.39361 18.6064C6.34265 20.2754 7.72458 21.6574 9.39361 22.6064L10.2403 21.7597C10.4215 21.5805 10.6504 21.457 10.8997 21.4038C11.149 21.3506 11.4083 21.37 11.6469 21.4597C12.2518 21.6854 12.8802 21.842 13.5203 21.9264C13.8441 21.9721 14.1399 22.1352 14.3513 22.3847C14.5627 22.6343 14.6751 22.9528 14.6669 23.2797Z"
                stroke="#FAFAFA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <p className="text-white">Phone:</p>
              <a className="text-white">+976 (11) 123-4567</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <p className="text-white">Follow us </p>
          <div className="text-white flex gap-1">
            <span>Facebook </span>
            <span>Instagram </span>
            <span>Twitter </span>
            <span>Youtube </span>
          </div>
        </div>
      </div>
    </div>
  );
};
