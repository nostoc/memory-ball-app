import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// Use dynamic import to load meta from each blog post
export default function sitemap(): MetadataRoute.Sitemap {
  const blogDir = path.join(process.cwd(), 'app', '(root)', 'blog')

  // Get all folder names inside blog (each post)
  const blogFolders = fs.readdirSync(blogDir).filter((file) => {
    const fullPath = path.join(blogDir, file)
    return fs.statSync(fullPath).isDirectory()
  })

  // Generate blog entries with real meta.date as lastModified
  const blogEntries: MetadataRoute.Sitemap = blogFolders.map((slug) => {
    const contentPath = path.join(blogDir, slug, 'content.mdx')

    // Use a basic synchronous read + regex to extract meta.date without executing code
    const fileContent = fs.readFileSync(contentPath, 'utf-8')
    const dateMatch = fileContent.match(/date:\s*['"`](.*?)['"`]/)
    const date = dateMatch ? new Date(dateMatch[1]) : new Date()

    return {
      url: `https://memoryball.online/blog/${slug}`,
      lastModified: date,
      changeFrequency: 'monthly',
      priority: 0.7,
    }
  })

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: 'https://memoryball.online',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://memoryball.online/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://memoryball.online/auth/login',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://memoryball.online/guide',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://memoryball.online/privacy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://memoryball.online/terms',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  return [...staticPages, ...blogEntries]
}
