// app/blog/pomodoro-technique/page.tsx
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { meta } from './content.mdx'

// Load MDX file dynamically
const BlogContent = dynamic(() => import('./content.mdx'))

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${meta.title} | Memory Ball Blog`,
    description: meta.excerpt,
    authors: [{ name: meta.author }],
    keywords: meta.tags,
    alternates: {
      canonical: `https://memoryball.com/blog/how-to-use-pomodoro-technique-for-studying`,
    }
  }
}

export default function Page() {
  return <BlogContent />
}
