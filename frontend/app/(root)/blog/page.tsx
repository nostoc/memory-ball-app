import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import BlogHeader from '@/components/blog/BlogHeader'
import CallToAction from '@/components/common/CallToAction'

export const metadata: Metadata = {
  title: 'Blog | Memory Ball',
  description: 'Explore articles about active recall, study techniques, and memory improvement',
}

interface BlogMeta {
  title: string
  excerpt: string
  date: string
  author: string
  authorImage: string
  coverImage: string
  tags: string[]
}

interface MDXModule {
  meta: BlogMeta
}

export default async function BlogIndex() {
  const posts = [
    {
      slug: 'best-active-recall-techniques-for-studying',
      meta: (await import('./best-active-recall-techniques-for-studying/page.mdx')).meta,
    },
    {
      slug: 'how-to-use-pomodoro-technique-for-studying',
      meta: (await import('./how-to-use-pomodoro-technique-for-studying/page.mdx')).meta,
    },
    {
      slug: 'the-science-behind-spaced-repetition',
      meta: (await import('./the-science-behind-spaced-repetition/page.mdx')).meta,
    }
  ].sort((a, b) => 
    new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <BlogHeader />
      
      <div className="w-full max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group hover:transform hover:scale-105 transition-all duration-200"
            >
              <div className="bg-gray-800 rounded-xl overflow-hidden h-full flex flex-col">
                <div className="relative aspect-video">
                  <Image
                    src={post.meta.coverImage}
                    alt={post.meta.title || ""}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                    {post.meta.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                    {post.meta.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="relative w-8 h-8">
                      <Image
                        src={post.meta.authorImage}
                        alt={post.meta.author || ""}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-white">{post.meta.author}</p>
                      <p className="text-xs text-gray-400">{post.meta.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full">
        <CallToAction />
      </div>
    </div>
  )
}