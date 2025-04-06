import React from "react";
import { TbBulb } from "react-icons/tb";
import { PiRepeat } from "react-icons/pi";
import { GiTrophyCup } from "react-icons/gi";
import { PiArrowBendDownRightFill } from "react-icons/pi";
import { PiArrowBendUpRightFill } from "react-icons/pi";

const GetStartedSteps = ({}) => {
  return (
    <section className="container mx-auto py-8 md:py-16 my-10 md:my-20 px-4 md:px-8">
      <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-white text-center mb-12 md:mb-20 font-bricolage">
        Get Started in{" "}
        <span className="bg-white text-title px-4 inline-block mt-2 md:mt-0">03 Simple Steps</span>
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-6 lg:gap-10">
        <div className="w-full md:w-[280px] h-[220px] md:h-[280px] border-[4px] border-white p-4 flex flex-col items-center justify-center rounded-[22px] shadow-lg transform transition-transform duration-300 hover:scale-105 max-w-[320px]">
          <div className="w-[100px] md:w-[120px] p-3 rounded-lg text-white">
            <TbBulb size={80} className="md:w-24 md:h-24" />
          </div>
          <h3 className="font-bricolage text-2xl md:text-3xl text-white text-center font-semibold mt-4">
            Create Your Decks
          </h3>
        </div>

        <PiArrowBendDownRightFill 
          size={80} 
          className="text-white rotate-90 md:rotate-0 md:w-24 md:h-24"
        />

        <div className="w-full md:w-[280px] h-[220px] md:h-[280px] border-[4px] border-white p-4 flex flex-col items-center justify-center rounded-[22px] shadow-lg transform transition-transform duration-300 hover:scale-105 max-w-[320px]">
          <div className="w-[100px] md:w-[120px] p-3 rounded-lg text-white">
            <PiRepeat size={80} className="md:w-24 md:h-24" />
          </div>
          <h3 className="font-bricolage text-2xl md:text-3xl text-white text-center font-semibold mt-4">
            Flip and Study
          </h3>
        </div>

        <PiArrowBendUpRightFill 
          size={80} 
          className="text-white rotate-90 md:rotate-0 md:w-24 md:h-24" 
        />

        <div className="w-full md:w-[280px] h-[220px] md:h-[280px] border-[4px] border-white p-4 flex flex-col items-center justify-center rounded-[22px] shadow-lg transform transition-transform duration-300 hover:scale-105 max-w-[320px]">
          <div className="w-[100px] md:w-[120px] p-3 rounded-lg text-white">
            <GiTrophyCup size={80} className="md:w-24 md:h-24" />
          </div>
          <h3 className="font-bricolage text-2xl md:text-3xl text-white text-center font-semibold mt-4">
            Track Your Success
          </h3>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSteps;
