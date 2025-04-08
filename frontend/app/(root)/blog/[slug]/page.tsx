import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { getPostData, getAllPostSlugs, getSortedPostsData } from "@/lib/blog";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  try {
    // Await params if it's a promise
    const resolvedParams = "then" in params ? await params : params;
    const post = await getPostData(resolvedParams.slug);
    return {
      title: `${post.title} | Memory Ball Blog`,
      description: post.excerpt,
    };
  } catch (error) {
    console.log(error);
    return {
      title: "Blog Post | Memory Ball",
      description: "Memory Ball blog article",
    };
  }
}

// Define the page component
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  let post;

  try {
    // Await params if it's a promise
    const resolvedParams = "then" in params ? await params : params;
    post = await getPostData(resolvedParams.slug);
  } catch (error) {
    console.log(error);
    notFound();
  }

  // Get related posts (posts with matching tags)
  const allPosts = getSortedPostsData();
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.slug !== post.slug && p.tags.some((tag) => post.tags.includes(tag))
    )
    .slice(0, 3);

  // Rest of the component remains the same
  return (
    <div className="min-h-screen bg-background text-white">
      {/* Rest of your JSX remains the same */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center text-oceanBlue hover:text-white hover:bg-oceanBlue/10 py-2 px-4 rounded-full transition-all duration-300 mb-8 border border-oceanBlue/20"
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
          Back to Blog
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1 bg-oceanBlue/10 text-oceanBlue text-sm rounded-full font-montserrat"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-bricolage mb-6 tracking-tight">
              {post.title}
            </h1>

            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-white font-bricolage">{post.author}</p>
                <p className="text-gray-400 text-sm font-montserrat">
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden mb-10">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div
            className="prose prose-lg prose-invert max-w-none font-montserrat prose-headings:font-bricolage prose-a:text-oceanBlue hover:prose-a:text-white prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Box */}
          <div className="mt-16 p-6 bg-background/30 rounded-xl border border-oceanBlue/20">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold font-bricolage text-white">
                  About {post.author}
                </h3>
                <p className="text-gray-300 font-montserrat">
                  Member of the Memory Ball team, passionate about effective
                  learning techniques and cognitive science.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold font-bricolage mb-8 text-white">
              Related Articles
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-background/30 rounded-xl border border-oceanBlue/20 hover:border-oceanBlue/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(44,183,190,0.15)] block p-5 group"
                >
                  <h3 className="text-lg font-bold text-white mb-2 font-bricolage group-hover:text-oceanBlue transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 text-sm font-montserrat line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <span className="text-oceanBlue text-sm font-montserrat flex items-center">
                    Read more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
