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
    <>
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Meet Our Founders
        </h2>
        <p className="text-center text-gray-300 mb-12">
          Memory Ball was developed by two Computer Engineering undergraduates from the Faculty of Engineering, University of Ruhuna.
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-background/50 p-6 rounded-lg border border-oceanBlue/20 text-center">
            <div className="mb-4 relative w-48 h-48 mx-auto">
              <Image
                src="/team/hansika.jpg"
                alt="Hansika Karunathilake"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Hansika Karunathilake</h3>
            <p className="text-oceanBlue mb-2">Founder & Lead Developer</p>
            <p className="text-gray-300 mb-4">
              The visionary behind Memory Ball, bringing extensive experience in educational technology
              and a passion for enhancing learning experiences.
            </p>
            <Link
              href="https://www.linkedin.com/in/hansika-karunathilake-520a03218/"
              target="_blank"
              className="inline-flex items-center text-oceanBlue hover:text-oceanBlue/80 transition-colors"
            >
              <FaLinkedin className="w-5 h-5 mr-2" />
              Connect on LinkedIn
            </Link>
          </div>

          <div className="bg-background/50 p-6 rounded-lg border border-oceanBlue/20 text-center">
            <div className="mb-4 relative w-48 h-48 mx-auto">
              <Image
                src="/team/janitha.png"
                alt="Janitha Karunarathna"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Janitha Karunarathna</h3>
            <p className="text-oceanBlue mb-2">Co-founder & Technical Lead</p>
            <p className="text-gray-300 mb-4">
              Talented developer with expertise in building scalable applications
              and implementing innovative learning solutions.
            </p>
            <Link
              href="https://www.linkedin.com/in/janitha-karunarathna"
              target="_blank"
              className="inline-flex items-center text-oceanBlue hover:text-oceanBlue/80 transition-colors"
            >
              <FaLinkedin className="w-5 h-5 mr-2" />
              Connect on LinkedIn
            </Link>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mb-16">
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
    </>
  );
}