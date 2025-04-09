"use client";
import { useState, useEffect, useCallback } from "react";
import { getAllUserSessions } from "../../services/studySessionService";
import Link from "next/link";
import toast from "react-hot-toast";

interface SessionHistoryItem {
  _id: string;
  deck: {
    _id: string;
    title: string;
  };
  startTime: string;
  endTime: string;
  cardsStudied: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

const SessionHistory: React.FC = () => {
  const [sessions, setSessions] = useState<SessionHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  const fetchSessions = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const response = await getAllUserSessions(page, pagination.itemsPerPage);

      if (response?.status === "success" && response?.data?.sessions) {
        setSessions(response.data.sessions);
        setPagination(response.data.pagination);
      } else {
        setError("Could not load session history");
        toast.error("Could not load session history");
      }
    } catch (err) {
      console.error("Error fetching sessions:", err);
      setError(
        "Failed to load your session history. Please try again later."
      );
      toast.error("Failed to load your session history");
    } finally {
      setLoading(false);
    }
  }, [pagination.itemsPerPage]);

  useEffect(() => {
    fetchSessions(1);
  }, [fetchSessions]);

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Calculate session duration in minutes
  const calculateDuration = (startTime: string, endTime: string) => {
    if (!endTime) return "In progress";

    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const durationMs = end - start;

    // Convert to minutes
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);

    return `${minutes}m ${seconds}s`;
  };

  // Calculate success rate
  const getSuccessRate = (correct: number, total: number) => {
    if (total === 0) return "0%";
    return `${Math.round((correct / total) * 100)}%`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-oceanBlue"></div>
          <p className="text-white font-montserrat">
            Loading your session history...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-[22px] mb-6 font-montserrat">
          <p>{error}</p>
        </div>
        <Link
          href="/decks"
          className="text-oceanBlue hover:text-button font-montserrat flex items-center transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Return to Decks
        </Link>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 font-bricolage">
          Study History
        </h1>

        <div className="bg-white rounded-[22px] shadow-md overflow-hidden border border-gray-200 p-8 text-center">
          <div className="mb-4">
            <svg
              className="h-16 w-16 text-oceanBlue/40 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-title mb-2 font-bricolage">
            No Study Sessions Yet
          </h2>
          <p className="text-gray-600 mb-6 font-montserrat">
            You haven&apos;t completed any study sessions yet.
          </p>
          <Link
            href="/decks"
            className="bg-oceanBlue hover:bg-button text-white font-poppins py-2 px-6 rounded-[22px] 
                   transition duration-200 inline-flex items-center shadow-md"
          >
            Browse Your Decks
            <svg
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  const PaginationControls = () => {
    const pages = Array.from({ length: pagination.totalPages }, (_, i) => i + 1);

    return (
      <div className="flex justify-center items-center space-x-2 mt-6 mb-4">
        <button
          onClick={() => fetchSessions(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className={`px-3 py-1 rounded-md ${
            pagination.currentPage === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-oceanBlue text-white hover:bg-button'
          }`}
        >
          Previous
        </button>
        
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => fetchSessions(page)}
            className={`px-3 py-1 rounded-md ${
              pagination.currentPage === page
                ? 'bg-button text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => fetchSessions(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className={`px-3 py-1 rounded-md ${
            pagination.currentPage === pagination.totalPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-oceanBlue text-white hover:bg-button'
          }`}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-bricolage">
          Study History
        </h1>
        <p className="text-gray-300 mt-2 font-montserrat">
          Review all your past study sessions
        </p>
      </div>

      <div className="bg-white rounded-[22px] shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 ">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider font-montserrat"
                >
                  Deck
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider font-montserrat"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider font-montserrat"
                >
                  Cards
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider font-montserrat"
                >
                  Success Rate
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider font-montserrat"
                >
                  Duration
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-bold text-gray-800 uppercase tracking-wider font-montserrat"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sessions.map((session) => (
                <tr key={session._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-title font-montserrat">
                      {session.deck?.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 font-montserrat">
                      {formatDate(session.startTime)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-title font-montserrat">
                      {session.cardsStudied}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-montserrat
                      ${
                        parseInt(
                          getSuccessRate(
                            session.correctAnswers,
                            session.cardsStudied
                          )
                        ) >= 70
                          ? "bg-green-100 text-green-800"
                          : parseInt(
                              getSuccessRate(
                                session.correctAnswers,
                                session.cardsStudied
                              )
                            ) >= 40
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {getSuccessRate(
                        session.correctAnswers,
                        session.cardsStudied
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 font-montserrat">
                      {calculateDuration(session.startTime, session.endTime)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/sessions/${session._id}`}
                      className="text-oceanBlue hover:text-button transition-colors font-poppins"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationControls />
      </div>
      <div className="text-center mt-4 text-gray-300 font-montserrat">
        Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of {pagination.totalItems} sessions
      </div>
    </div>
  );
};

export default SessionHistory;
