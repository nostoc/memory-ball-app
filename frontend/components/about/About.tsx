"use client";


export default function About() {
  return (
    <section className="font-bricolage">
      {/* Hero Section with enhanced styling */}
      <div className="text-center mb-16 md:mb-20">
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
          About { " "}<span className="text-title bg-white">Memory Ball</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-montserrat leading-relaxed">
          Your personal flashcard companion for effective learning and memory
          enhancement
        </p>
      </div>

      {/* Mission Cards with improved layout and hover effects */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-16">
        <div className="bg-background/30 p-6 md:p-8 rounded-lg border border-oceanBlue/20 hover:border-oceanBlue/70 transition-all duration-300 hover:shadow-[0_0_15px_rgba(44,183,190,0.15)] group">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-oceanBlue/10 flex items-center justify-center mr-3 group-hover:bg-oceanBlue/20 transition-colors">
              <svg
                className="w-5 h-5 text-oceanBlue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Our Mission
            </h2>
          </div>
          <p className="text-gray-300 font-montserrat">
            Memory Ball aims to revolutionize how people learn by providing an
            intuitive and engaging flashcard platform that adapts to your
            learning style.
          </p>
        </div>

        <div className="bg-background/30 p-6 md:p-8 rounded-lg border border-oceanBlue/20 hover:border-oceanBlue/70 transition-all duration-300 hover:shadow-[0_0_15px_rgba(44,183,190,0.15)] group">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-oceanBlue/10 flex items-center justify-center mr-3 group-hover:bg-oceanBlue/20 transition-colors">
              <svg
                className="w-5 h-5 text-oceanBlue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Why Choose Us
            </h2>
          </div>
          <p className="text-gray-300 font-montserrat">
            We combine proven learning techniques with modern technology to
            create an effective and enjoyable studying experience.
          </p>
        </div>
      </div>

      {/* Key Features with enhanced cards */}
      <div className="mb-16">
        <div className="text-center mb-8">
         
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            What Makes Us Special
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              title: "Smart Study",
              description:
                "Adaptive learning algorithms that adjust to your progress",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              ),
            },
            {
              title: "Easy Creation",
              description:
                "Create and organize flashcards with intuitive tools",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              ),
            },
            {
              title: "Progress Tracking",
              description:
                "Monitor your learning journey with detailed analytics",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              ),
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-background/30 p-6 rounded-lg border border-oceanBlue/20 hover:border-oceanBlue/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(44,183,190,0.15)] hover:translate-y-[-4px] group"
            >
              <div className="w-12 h-12 rounded-full bg-oceanBlue/10 flex items-center justify-center mb-4 text-oceanBlue group-hover:bg-oceanBlue/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300 font-montserrat">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      
    </section>
  );
}
