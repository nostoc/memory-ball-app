"use client";
import { useState } from "react";
import Link from "next/link";

const FlashCardDemo = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <section className="container mx-auto py-12 my-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white text-center mb-20 font-bricolage text-[56px]">
            Try Our{" "}
            <span className="bg-white text-title px-2">Interactive</span>{" "}
            Flashcards
          </h1>
          <h3 className="text-2xl text-gray-300 font-bricolage max-w-3xl mx-auto">
            Flip the card below to see how our flashcards work. Create your own
            decks and start improving your memory today!
          </h3>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Demo Card */}
          <div className="w-full max-w-md card-container">
            <div
              className={`card h-64 md:h-80 cursor-pointer ${
                isFlipped ? "flipped" : ""
              }`}
              onClick={handleFlip}
            >
              {/* Card Front */}
              <div className="card-front bg-white rounded-[22px] p-6 shadow-lg flex flex-col justify-center items-center">
                <div className="text-sm text-gray-600 mb-2 font-montserrat font-semibold">
                  Click to flip
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-800 font-bricolage">
                  What is spaced repetition?
                </h3>
                <div className="mt-4 text-oceanBlue text-sm font-montserrat font-semibold">
                  Tap to see answer
                </div>
              </div>

              {/* Card Back */}
              <div className="card-back bg-oceanBlue rounded-[22px] p-6 shadow-lg flex flex-col justify-center items-center">
                <div className="text-sm text-title font-bold mb-2 font-poppins">
                  Click to flip back
                </div>
                <p className="text-lg text-white text-center font-poppins">
                  Spaced repetition is a learning technique that involves
                  increasing intervals of time between reviews of previously
                  learned material to exploit the psychological spacing effect.
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="w-full max-w-lg text-white">
            <h3 className="text-2xl font-bricolage font-bold mb-4">
              How It Works
            </h3>
            <ul className="space-y-4 font-poppins">
              <li className="flex items-start">
                <span className="bg-oceanBlue rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  1
                </span>
                <span>Create your personalized decks of flashcards</span>
              </li>
              <li className="flex items-start">
                <span className="bg-oceanBlue rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  2
                </span>
                <span>Study your cards with our spaced repetition system</span>
              </li>
              <li className="flex items-start">
                <span className="bg-oceanBlue rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  3
                </span>
                <span>Track your progress and improve your memory</span>
              </li>
            </ul>
            <Link
              href="/guide"
              className="inline-block mt-8 bg-button hover:bg-oceanBlue text-white font-bricolage py-3 px-6 rounded-[22px] transition duration-300"
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
