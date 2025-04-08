import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";
import BlogHeader from "@/components/blog/BlogHeader";

export const metadata = {
  title: "Blog | Memory Ball",
  description:
    "Articles about effective learning techniques and memory enhancement",
};

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-16">
       

        <BlogHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {allPostsData.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              author={post.author}
              authorImage={post.authorImage}
              slug={post.slug}
              coverImage={post.coverImage}
              tags={post.tags}
            />
          ))}
        </div>

        {/* Enhanced Call to Action */}
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
      </div>
    </div>
  );
}
