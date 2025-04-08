import Image from "next/image";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Founders() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("https://memoryball.online/auth/login");
  };

  return (
    <section className="font-bricolage">
      <div className="mb-16">
        {/* Section Header with accent styling */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-oceanBlue/10 text-oceanBlue text-sm rounded-full mb-2 font-montserrat">
            OUR TEAM
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
            Meet Our <span className="text-title bg-white">Founders</span>
          </h2>
          <p className="text-gray-300 mb-8 text-base md:text-lg max-w-2xl mx-auto font-montserrat leading-relaxed">
            Memory Ball was developed by two Computer Engineering undergraduates
            from the Faculty of Engineering, University of Ruhuna.
          </p>
        </div>

        {/* Team Cards with enhanced styling and hover effects */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 max-w-4xl mx-auto">
          {/* Founder 1 */}
          <div className="bg-background/30 rounded-xl border border-oceanBlue/20 hover:border-oceanBlue/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(44,183,190,0.15)] group overflow-hidden">
            <div className="h-64 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90 z-10"></div>
              <Image
                src="/team/hansika.jpeg"
                alt="Hansika Karunathilake"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6 text-center relative z-20 -mt-16">
              <div className="w-28 h-28 rounded-full border-4 border-background mx-auto overflow-hidden mb-4 shadow-lg">
                <Image
                  src="/team/hansika.jpeg"
                  alt="Hansika Karunathilake"
                  width={112}
                  height={112}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                Hansika Karunathilake
              </h3>
              <p className="text-oceanBlue mb-3 font-montserrat">
                Founder & Lead Developer
              </p>
              <p className="text-gray-300 mb-5 font-montserrat">
                The visionary behind Memory Ball, bringing extensive experience
                in educational technology and a passion for enhancing learning
                experiences.
              </p>
              <Link
                href="https://www.linkedin.com/in/hansika-karunathilake-520a03218/"
                target="_blank"
                className="inline-flex items-center text-oceanBlue hover:text-white hover:bg-oceanBlue px-4 py-2 rounded-full transition-colors border border-oceanBlue/30 hover:border-oceanBlue font-montserrat"
              >
                <FaLinkedin className="w-4 h-4 mr-2" />
                Connect on LinkedIn
              </Link>
            </div>
          </div>

          {/* Founder 2 */}
          <div className="bg-background/30 rounded-xl border border-oceanBlue/20 hover:border-oceanBlue/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(44,183,190,0.15)] group overflow-hidden">
            <div className="h-64 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90 z-10"></div>
              <Image
                src="/team/janitha.jpeg"
                alt="Janitha Karunarathna"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6 text-center relative z-20 -mt-16">
              <div className="w-28 h-28 rounded-full border-4 border-background mx-auto overflow-hidden mb-4 shadow-lg">
                <Image
                  src="/team/janitha.jpeg"
                  alt="Janitha Karunarathna"
                  width={112}
                  height={112}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                Janitha Karunarathna
              </h3>
              <p className="text-oceanBlue mb-3 font-montserrat">
                Co-founder & Technical Lead
              </p>
              <p className="text-gray-300 mb-5 font-montserrat">
                Talented developer with expertise in building scalable
                applications and implementing innovative learning solutions.
              </p>
              <Link
                href="https://www.linkedin.com/in/janitha-karunarathna"
                target="_blank"
                className="inline-flex items-center text-oceanBlue hover:text-white hover:bg-oceanBlue px-4 py-2 rounded-full transition-colors border border-oceanBlue/30 hover:border-oceanBlue font-montserrat"
              >
                <FaLinkedin className="w-4 h-4 mr-2" />
                Connect on LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Call to Action */}
      <div className="bg-gradient-to-r from-background via-oceanBlue/10 to-background p-8 md:p-12 rounded-2xl text-center mb-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to enhance your learning?
          </h2>
          <p className="text-gray-300 mb-8 font-montserrat">
            Join our community of learners and experience the power of effective
            flashcard learning. Start your journey with Memory Ball today.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-button hover:bg-oceanBlue text-white px-8 py-3 rounded-lg transition-all duration-300 font-poppins font-semibold shadow-lg hover:shadow-oceanBlue/20 hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-oceanBlue/50"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
}
