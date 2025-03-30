"use client";
import { Card } from "../../types/cardTypes";

interface StudyCardProps {
  card: Card;
  isFlipped: boolean;
}

const StudyCard: React.FC<StudyCardProps> = ({ card, isFlipped }) => {
  return (
    <div className="card-container h-[350px] sm:h-[300px] cursor-pointer">
      <div className={`card h-full ${isFlipped ? "flipped" : ""}`}>
        {/* Question Side (Front) */}
        <div className="card-front bg-white rounded-[22px] shadow-lg overflow-hidden border border-gray-200">
          <div className="flex flex-col h-full">
            <div className="bg-oceanBlue text-white p-4">
              <h3 className="text-lg font-medium font-bricolage">Question</h3>
            </div>
            <div className="flex-grow overflow-auto p-6">
              <p className="text-title text-xl font-montserrat">
                {card.question}
              </p>
            </div>
            <div className="p-4 text-center border-t border-gray-100 bg-gray-50">
              <span className="text-sm text-oceanBlue hover:text-button italic flex items-center justify-center transition-colors font-montserrat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Tap to see answer
              </span>
            </div>
          </div>
        </div>

        {/* Answer Side (Back) */}
        <div className="card-back bg-white rounded-[22px] shadow-lg overflow-hidden border border-gray-200">
          <div className="flex flex-col h-full">
            <div className="bg-green-600 text-white p-4">
              <h3 className="text-lg font-medium font-bricolage">Answer</h3>
            </div>
            <div className="flex-grow overflow-auto p-6">
              <p className="text-title text-xl font-montserrat">
                {card.answer}
              </p>
            </div>
            <div className="p-4 text-center border-t border-gray-100 bg-gray-50">
              <span className="text-sm text-oceanBlue hover:text-button italic flex items-center justify-center transition-colors font-montserrat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Tap to see question
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for the flip animation */}
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
    </div>
  );
};

export default StudyCard;
