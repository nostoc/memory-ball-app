"use client";
import { useState } from "react";
import Link from "next/link";

const FlashCardDemo = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <section className="container mx-auto py-8 md:py-12 my-10 md:my-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-[56px] font-bold text-white text-center mb-8 md:mb-20 font-bricolage">
            Try Our{" "}
            <span className="bg-white text-title px-2 mt-2 md:mt-0 inline-block">Interactive</span>{" "}
            Flashcards
          </h1>
          <h3 className="text-xl md:text-2xl text-gray-300 font-bricolage max-w-3xl mx-auto px-4">
            Flip the card below to see how our flashcards work. Create your own
            decks and start improving your memory today!
          </h3>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Demo Card */}
          <div className="w-full max-w-[340px] md:max-w-md card-container">
            <div
              className={`card h-[240px] md:h-80 cursor-pointer ${
                isFlipped ? "flipped" : ""
              }`}
              onClick={handleFlip}
            >
              {/* Card Front */}
              <div className="card-front bg-white rounded-[22px] p-4 md:p-6 shadow-lg flex flex-col justify-center items-center">
                <div className="text-xs md:text-sm text-gray-600 mb-2 font-montserrat font-semibold">
                  Click to flip
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-center text-gray-800 font-bricolage">
                  Tired of forgetting what you just studied?
                </h3>
                <div className="mt-4 text-oceanBlue text-xs md:text-sm font-montserrat font-semibold">
                  Tap to see answer
                </div>
              </div>

              {/* Card Back */}
              <div className="card-back bg-oceanBlue rounded-[22px] p-4 md:p-6 shadow-lg flex flex-col justify-center items-center">
                <div className="text-xs md:text-sm text-title font-bold mb-2 font-poppins">
                  Click to flip back
                </div>
                <p className="text-base md:text-lg text-white text-center font-poppins">
                Meet Memory Ball
                With smart spaced repetition, beautiful design, and sync across devices, studying just got a whole lot smarter.
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="w-full max-w-lg text-white px-4 md:px-0">
            <h3 className="text-xl md:text-2xl font-bricolage font-bold mb-4">
              How It Works
            </h3>
            <ul className="space-y-4 font-poppins text-sm md:text-base">
              <li className="flex items-start">
                <span className="bg-oceanBlue rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-sm md:text-base">
                  1
                </span>
                <span>Create your personalized decks of flashcards</span>
              </li>
              <li className="flex items-start">
                <span className="bg-oceanBlue rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-sm md:text-base">
                  2
                </span>
                <span>Study your cards with our spaced repetition system</span>
              </li>
              <li className="flex items-start">
                <span className="bg-oceanBlue rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-sm md:text-base">
                  2
                </span>
                <span>Track your progress and improve your memory</span>
              </li>
            </ul>
            <Link
              href="/guide"
              className="inline-block mt-6 md:mt-8 bg-button hover:bg-oceanBlue text-white font-bricolage py-2 md:py-3 px-4 md:px-6 rounded-[22px] transition duration-300 text-sm md:text-base"
            >
              View Complete Guide
            </Link>
          </div>
        </div>
      </div>

      {/* CSS for the 3D flip effect */}
      <style jsx>{`
        .card-container {
          perspective: 1000px;
        }

        .card {
          transition: transform 0.6s;
          transform-style: preserve-3d;
          position: relative;
        }

        .card-front,
        .card-back {
          backface-visibility: hidden;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .card-back {
          transform: rotateY(180deg);
        }

        .card.flipped {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default FlashCardDemo;
