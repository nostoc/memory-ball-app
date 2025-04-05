import Link from "next/link";



const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col font-montserrat">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-16">
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

          <header className="mb-12">
            <h1 className="text-4xl font-bold text-white font-bricolage mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-400 font-montserrat">
              Last updated: April 5, 2025
            </p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-300 prose-headings:text-white prose-headings:font-bricolage prose-p:font-montserrat">
            <p>
              This Privacy Policy describes how Memory Ball (&quot;we&quot;,
              &quot;us&quot;, or &quot;our&quot;) collects, uses, and shares
              your personal information when you use our flashcard application
              and website (collectively, the &quot;Service&quot;).
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Information We Collect
            </h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">
              Personal Information
            </h3>
            <p>When you create an account, we collect information such as:</p>
            <ul className="list-disc pl-6 mb-6 font-montserrat">
              <li>Email address</li>
              <li>Name (if provided)</li>
              <li>Profile information you choose to add</li>
              <li>Authentication information</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">
              Usage Information
            </h3>
            <p>
              We collect information about how you use our Service, including:
            </p>
            <ul className="list-disc pl-6 mb-6 font-montserrat">
              <li>Flashcards and decks you create</li>
              <li>Study sessions and performance data</li>
              <li>Features you interact with</li>
              <li>Time spent on the Service</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">
              Technical Information
            </h3>
            <p>
              We automatically collect certain information when you use our
              Service:
            </p>
            <ul className="list-disc pl-6 mb-6 font-montserrat">
              <li>IP address</li>
              <li>Device information</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring website</li>
              <li>Pages you view</li>
              <li>Time and date of your visits</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              How We Use Your Information
            </h2>
            <p>We use your personal information for the following purposes:</p>
            <ul className="list-disc pl-6 mb-6 font-montserrat">
              <li>To provide and maintain our Service</li>
              <li>To create and manage your account</li>
              <li>To store and process your flashcards and study data</li>
              <li>To personalize your experience</li>
              <li>To analyze usage patterns and improve our Service</li>
              <li>To communicate with you about your account or the Service</li>
              <li>To respond to your inquiries and support requests</li>
              <li>
                To send you updates and marketing communications (with your
                consent)
              </li>
              <li>To detect and prevent fraudulent or unauthorized activity</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Sharing Your Information
            </h2>
            <p>
              We may share your personal information in the following
              situations:
            </p>
            <ul className="list-disc pl-6 mb-6 font-montserrat">
              <li>
                <strong>Service Providers:</strong> We may share your
                information with third-party vendors who provide services on our
                behalf, such as hosting, analytics, and customer support.
              </li>
              <li>
                <strong>Public Content:</strong> If you choose to make your
                flashcard decks public, other users will be able to view and use
                them.
              </li>
              <li>
                <strong>Business Transfers:</strong> If we are involved in a
                merger, acquisition, or sale of assets, your information may be
                transferred as part of that transaction.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your
                information if required by law, such as to comply with a
                subpoena, legal proceedings, or government request.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the Internet or electronic storage is 100%
              secure, so we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding
              your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-6 font-montserrat">
              <li>
                The right to access the personal information we hold about you
              </li>
              <li>The right to request correction of inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to request restriction of processing</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p>
              To exercise these rights, please contact us at
              contact@memoryball.co.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Children&apos;s Privacy
            </h2>
            <p>
              Our Service is not intended for children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If you are a parent or guardian and believe your child has
              provided us with personal information, please contact us.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the &quot;Last updated&quot; date. You are advised to
              review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <p className="mt-2">
              <a
                href="mailto:hello@memoryball.online"
                className="text-oceanBlue hover:text-button transition-colors"
              >
                hello@memoryball.online
              </a>
            </p>
          </div>
        </div>
      </main>
     
    </div>
  );
};

export default PrivacyPolicy;
