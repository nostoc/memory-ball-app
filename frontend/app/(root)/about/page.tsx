'use client';
import Image from "next/image";
import Icon from "@/public/icon.png";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("https://memoryball.online/auth/login");
  };

  return (
    <div className="container mx-auto px-4 py-12 font-bricolage">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <Image src={Icon} alt="Memory Ball Logo" width={80} height={80} />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          About Memory Ball
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Your personal flashcard companion for effective learning and memory enhancement
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-background/50 p-8 rounded-lg border border-oceanBlue/20">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300">
            Memory Ball aims to revolutionize how people learn by providing an intuitive
            and engaging flashcard platform that adapts to your learning style.
          </p>
        </div>

        <div className="bg-background/50 p-8 rounded-lg border border-oceanBlue/20">
          <h2 className="text-2xl font-bold text-white mb-4">Why Choose Us</h2>
          <p className="text-gray-300">
            We combine proven learning techniques with modern technology to create
            an effective and enjoyable studying experience.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Key Features
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Smart Study",
              description: "Adaptive learning algorithms that adjust to your progress"
            },
            {
              title: "Easy Creation",
              description: "Create and organize flashcards with intuitive tools"
            },
            {
              title: "Progress Tracking",
              description: "Monitor your learning journey with detailed analytics"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-background/50 p-6 rounded-lg border border-oceanBlue/20 hover:border-oceanBlue/50 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Ready to enhance your learning?
        </h2>
        <button 
          onClick={handleGetStarted}
          className="bg-oceanBlue text-white px-8 py-3 rounded-lg hover:bg-oceanBlue/90 transition-colors"
        >
          Get Started Now
        </button>
      </div>
    </div>
  );
}