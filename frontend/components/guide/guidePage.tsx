import Image from "next/image";
import Link from "next/link";
import AuthImage from "../../public/images/auth.png";
import DeckImage from "../../public/images/deck.png";
import CardImage from "../../public/images/card.png";
import StudySession from "../../public/images/study.png"
import Stat from "../../public/images/stat.png"



const GuidePage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-oceanBlue hover:text-button mb-8 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </Link>

        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-bricolage mb-6">
            Memory Ball Complete Guide
          </h1>
          <p className="text-xl text-gray-300 font-montserrat max-w-3xl mx-auto">
            Follow this step-by-step guide to get the most out of Memory Ball
            and improve your learning efficiency.
          </p>
        </header>

        <div className="space-y-24">
          {/* Step 1: Create an Account */}
          <section id="create-account" className="scroll-mt-20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-oceanBlue/20 text-oceanBlue px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Step 1
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-bricolage mb-4">
                  Create Your Account
                </h2>
                <div className="space-y-4 text-gray-300 font-montserrat">
                  <p>
                    Start by creating your personal account to access all the
                    features of Memory Ball.
                  </p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      Click on the &quot;Sign Up&quot; button on the homepage
                    </li>
                    <li>
                      Enter your name, email address and create a password
                    </li>

                    <li>Log in with your new credentials</li>
                  </ol>
                </div>
              </div>
              <div className="bg-gray-800 rounded-[22px] h-64 flex items-center justify-center">
                <Image
                  alt="Account Creation Illustration"
                  src={AuthImage}
                  className="object-contain p-4 "
                />
              </div>
            </div>
          </section>

          {/* Step 2: Create a Deck */}
          <section id="create-deck" className="scroll-mt-20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 bg-gray-800 rounded-[22px] h-64 flex items-center justify-center">
                <Image
                  alt="Deck Creation Illustration"
                  src={DeckImage}
                  className="object-contain p-4 "
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block bg-oceanBlue/20 text-oceanBlue px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Step 2
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-bricolage mb-4">
                  Create Your First Deck
                </h2>
                <div className="space-y-4 text-gray-300 font-montserrat">
                  <p>
                    A deck is a collection of related flashcards. Create your
                    first deck based on what you want to learn.
                  </p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Navigate to the &quot;Decks&quot; section</li>
                    <li>Click the &quot;Create New Deck&quot; button</li>
                    <li>
                      Enter a title, description, and optionally add tags to
                      categorize your deck
                    </li>
                    <li>
                      Choose whether to make your deck public or keep it private
                    </li>
                    <li>Click &quot;Create Deck&quot; to save</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* Step 3: Add Cards */}
          <section id="add-cards" className="scroll-mt-20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-oceanBlue/20 text-oceanBlue px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Step 3
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-bricolage mb-4">
                  Add Cards to Your Deck
                </h2>
                <div className="space-y-4 text-gray-300 font-montserrat">
                  <p>
                    Populate your deck with flashcards containing questions and
                    answers.
                  </p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      Open your newly created deck by clicking &quot;View&quot;
                    </li>
                    <li>
                      Click &quot;Manage Cards&quot; and then &quot;Add New
                      Card&quot;
                    </li>
                    <li>
                      Enter the question on the front side and the answer on the
                      back side
                    </li>
                    <li>Click &quot;Save Card&quot; to add it to your deck</li>
                    <li>Repeat this process to add more cards to your deck</li>
                  </ol>
                </div>
              </div>
              <div className="bg-gray-800 rounded-[22px] h-64 flex items-center justify-center">
                <Image
                  alt="Card Creation Illustration"
                  src={CardImage}
                  className="object-contain p-4 "
                />
              </div>
            </div>
          </section>

          {/* Step 4: Study Session */}
          <section id="study-session" className="scroll-mt-20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 bg-gray-800 rounded-[22px] h-64 flex items-center justify-center">
                <Image
                  alt="Study Session Illustration"
                  src={StudySession}
                  className="object-contain p-4 "
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block bg-oceanBlue/20 text-oceanBlue px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Step 4
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-bricolage mb-4">
                  Start a Study Session
                </h2>
                <div className="space-y-4 text-gray-300 font-montserrat">
                  <p>
                    Study your flashcards using Memory Ball&apos;s spaced
                    repetition system.
                  </p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Return to your deck&apos;s main page</li>
                    <li>Click the &quot;Study Deck&quot; button</li>
                    <li>
                      View the question on the front of the card and try to
                      recall the answer
                    </li>
                    <li>Flip the card by clicking on it to see the answer</li>
                    <li>
                      Mark the card as &quot;Correct&quot; or
                      &quot;Incorrect&quot; based on your response
                    </li>
                    <li>
                      Continue through all cards until you complete the session
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* Step 5: Review Stats */}
          <section id="review-stats" className="scroll-mt-20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-oceanBlue/20 text-oceanBlue px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Step 5
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-bricolage mb-4">
                  Review Your Statistics
                </h2>
                <div className="space-y-4 text-gray-300 font-montserrat">
                  <p>
                    Track your progress and see how your memory is improving
                    over time.
                  </p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      After completing a study session, review your session
                      summary
                    </li>
                    <li>
                      Check your correct vs. incorrect answers and overall
                      success rate
                    </li>
                    <li>
                      Navigate to your profile to see comprehensive statistics
                      across all your decks
                    </li>
                    <li>
                      Use these insights to focus on areas that need more
                      attention
                    </li>
                  </ol>
                </div>
              </div>
              <div className="bg-gray-800 rounded-[22px] h-64 flex items-center justify-center">
                <Image
                  alt="Statistics Illustration"
                  src={Stat}
                  className="object-contain p-4 "
                />
              </div>
            </div>
          </section>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold font-bricolage mb-6">
            Ready to Start Learning?
          </h2>
          <Link
            href="/auth/register"
            className="inline-block bg-button hover:bg-oceanBlue text-white font-bricolage py-3 text-lg font-bold px-8 rounded-[22px] transition duration-300"
          >
            Create Your Account
          </Link>
          <p className="mt-4 text-gray-400 font-poppins">
            Already have an account?{" "}
            <Link href="auth/login" className="text-oceanBlue hover:text-button">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
