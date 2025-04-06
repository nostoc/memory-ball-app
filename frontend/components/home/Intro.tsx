import Image from "next/image";
import React from "react";
import StudyingCuate from "../../public/images/Studying-pana.png";
import { TiTick } from "react-icons/ti";

const Intro = () => {
  return (
    <section className="py-4 md:py-8 container mx-auto my-8 md:my-20 px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-4">
        <div className="p-2 flex flex-col justify-start">
          <h1 className="text-white font-bold font-bricolage text-3xl md:text-5xl lg:text-[64px] text-center md:text-left">
            Bounce Your Way to{" "}
            <span className="block mt-4 md:mt-6 lg:mt-8">
              <span className="bg-white text-title px-4 font-bold font-bricolage">
                Better Memory
              </span>
            </span>
          </h1>
          <h3 className="text-lg md:text-2xl text-white font-bricolage mt-6 text-center md:text-left">
            Tired of over whelming study tools?
          </h3>
          <p className="text-base md:text-xl text-white font-bricolage text-center md:text-left">
            Keep It Simple with Memory Ball.
          </p>
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-center">
              <TiTick className="text-button text-xl md:text-2xl mr-2 flex-shrink-0" />
              <p className="text-white font-bricolage text-base md:text-xl">Simple & Quick</p>
            </div>
            <div className="flex items-center">
              <TiTick className="text-button text-xl md:text-2xl mr-2 flex-shrink-0" />
              <p className="text-white font-bricolage text-base md:text-xl">Study Smarter</p>
            </div>
            <div className="flex items-center">
              <TiTick className="text-button text-xl md:text-2xl mr-2 flex-shrink-0" />
              <p className="text-white font-bricolage text-base md:text-xl">Any Time, Any Place</p>
            </div>
          </div>
        </div>
        <Image
          src={StudyingCuate}
          width={450}
          height={450}
          alt="Student studying illustration by story set"
          className="w-full max-w-[300px] md:max-w-[450px] p-4"
          priority
        />
      </div>
    </section>
  );
};

export default Intro;
