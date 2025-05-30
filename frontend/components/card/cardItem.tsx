"use client";
import { useState } from "react";
import { Card } from "../../types/cardTypes";

interface CardItemProps {
  card: Card;
  onEdit: () => void;
  onDelete: () => void;
}

const CardItem: React.FC<CardItemProps> = ({ card, onEdit, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Prevent event propagation to avoid triggering flip when clicking buttons
  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <div className="mb-6">
      <div className="card-container h-[220px] mb-3">
        <div
          className={`card h-full cursor-pointer ${isFlipped ? "flipped" : ""}`}
          onClick={handleFlip}
        >
          {/* Question Side (Front) */}
          <div className="card-front bg-white rounded-[22px] shadow-md overflow-hidden border border-gray-200 p-5">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-oceanBlue text-sm font-medium font-montserrat">
                  Question
                </h3>
                {card.difficulty && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-montserrat">
                    Difficulty: {card.difficulty}
                  </span>
                )}
              </div>
              <div className="flex-grow overflow-auto">
                <p className="text-title text-lg font-montserrat">
                  {card.question}
                </p>
              </div>
              <div className="mt-3 flex justify-center">
                <span className="text-xs text-oceanBlue hover:text-button italic flex items-center transition-colors font-montserrat">
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
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  Tap to see answer
                </span>
              </div>
            </div>
          </div>

          {/* Answer Side (Back) */}
          <div className="card-back bg-white rounded-[22px] shadow-md overflow-hidden border border-gray-200 p-5">
            <div className="flex flex-col h-full">
              <div className="mb-2">
                <h3 className="text-green-600 text-sm font-medium font-montserrat">
                  Answer
                </h3>
              </div>
              <div className="flex-grow overflow-auto">
                <p className="text-title text-lg font-montserrat">
                  {card.answer}
                </p>
              </div>
              <div className="mt-3 flex justify-center">
                <span className="text-xs text-oceanBlue hover:text-button italic flex items-center transition-colors font-montserrat">
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
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                  Tap to see question
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-2">
        <button
          onClick={(e) => handleButtonClick(e, onEdit)}
          className="text-oceanBlue text-sm font-poppins px-3 py-1 rounded-[22px] bg-gray-100 transition-colors flex items-center shadow-sm"
        >
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit
        </button>
        <button
          onClick={(e) => handleButtonClick(e, onDelete)}
          className=" text-red-600 text-sm font-poppins px-3 py-1 rounded-[22px] bg-red-50 transition-colors flex items-center shadow-sm"
        >
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
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
    </div>
  );
};

export default CardItem;
