import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import BlogHeader from '@/components/blog/BlogHeader'
import CallToAction from '@/components/common/CallToAction'

export const metadata: Metadata = {
  title: "Blog | Memory Ball",
  description:
    "Explore articles about active recall, study techniques, and memory improvement",
  };

export interface BlogMeta {
  title: string
  excerpt: string
  date: string
  author: string
  authorImage: string
  coverImage: string
  tags: string[]
}

export default async function BlogIndex() {
  const posts: Array<{ slug: string; meta: BlogMeta }> = [
    {
      slug: "best-active-recall-techniques-for-studying",
      meta: {
        title:
          "Best Active Recall Techniques for Studying: Boost Memory & Grades",
        excerpt: "Discover 7 science-backed active recall methods...",
        date: "2025-04-01",
        author: "Hansika Karunathilake",
        authorImage: "/team/hansika.jpeg",
        coverImage: "/active-recall-cover.png",
        tags: [
          "active recall",
          "study techniques",
          "memory improvement",
          "exam preparation",
        ],
      },
    },
    {
      slug: "how-to-use-pomodoro-technique-for-studying",
      meta: {
        title:
          "How to Use the Pomodoro Technique for Studying: Stay Focused & Avoid Burnout",
        excerpt:
          "Master the Pomodoro Technique to improve focus, beat procrastination, and study in short, effective bursts. Perfect for students and exam prep.",
        date: "2025-04-08",
        author: "Hansika Karunathilake",
        authorImage: "/team/hansika.jpeg",
        coverImage: "/pomodoro-technique-cover.png",
        tags: [
          "pomodoro technique",
          "study tips",
          "time management",
          "productivity",
          "study tools",
        ],
      },
    },
    {
      slug: "the-science-behind-spaced-repetition",
      meta: {
        title:
          "Spaced Repetition: The Secret to Long-Term Learning and Better Grades",
        excerpt:
          "Struggling to retain information? Learn how spaced repetition can dramatically improve your memory and performance with these actionable tips.",
        date: "2025-04-08",
        author: "Janitha Karunarathna",
        authorImage: "/team/janitha.jpeg",
        coverImage: "/spaced-repetition-cover.png",
        tags: [
          "spaced repetition",
          "memory techniques",
          "study tools",
          "long-term retention",
        ],
      },
    },
  ].sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <BlogHeader />

      <div className="w-full max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block h-full hover:-translate-y-1 transition-all duration-300"
            >
              <div className="bg-background/30 rounded-xl border border-oceanBlue/20 hover:border-oceanBlue/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(44,183,190,0.15)] group overflow-hidden h-full flex flex-col">
                <div className="h-48 md:h-56 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90 z-10"></div>
                  <Image
                    src={post.meta.coverImage}
                    alt={post.meta.title || ""}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-white mb-2 line-clamp-2 font-bricolage">
                    {post.meta.title}
                  </h2>
                  <p className="text-gray-300 text-sm mb-4 flex-grow line-clamp-3 font-montserrat">
                    {post.meta.excerpt}
                  </p>

                  {/* Tags section */}
                  {post.meta.tags && post.meta.tags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {post.meta.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-oceanBlue/10 text-oceanBlue rounded-full text-xs font-montserrat border border-oceanBlue/30"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.meta.tags.length > 2 && (
                          <span className="px-2 py-1 text-gray-400 text-xs font-montserrat">
                            +{post.meta.tags.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Author section */}
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="relative w-8 h-8 rounded-full border border-oceanBlue/30 overflow-hidden shadow-sm">
                      <Image
                        src={post.meta.authorImage}
                        alt={post.meta.author || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-white font-bricolage">
                        {post.meta.author}
                      </p>
                      <p className="text-xs text-gray-400 font-montserrat">
                        {post.meta.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Enhanced CTA with styling from Founders component */}
      <div className="w-full max-w-7xl px-4 mb-12">
        <div className="bg-gradient-to-r from-background via-oceanBlue/10 to-background p-8 rounded-2xl">
          <CallToAction />
        </div>
      </div>
    </div>
  );
}