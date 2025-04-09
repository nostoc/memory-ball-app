import Link from "next/link";

export default function CallToAction() {
  return (
    <div className="mt-24 bg-gradient-to-r from-background via-oceanBlue/10 to-background p-8 md:p-12 rounded-2xl text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-bricolage">
          Ready to Start Learning?
        </h2>
        <p className="text-gray-300 mb-8 font-montserrat">
          Apply these learning techniques with Memory Ball. Create your
          account today and start improving your memory.
        </p>
        <Link
          href="/auth/register"
          className="inline-block bg-button hover:bg-oceanBlue text-white px-8 py-3 rounded-lg transition-all duration-300 font-poppins font-semibold shadow-lg hover:shadow-oceanBlue/20 hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-oceanBlue/50"
        >
          Create Your Account
        </Link>
        <p className="mt-6 text-gray-400 font-montserrat">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-oceanBlue hover:text-white hover:underline transition-colors"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}