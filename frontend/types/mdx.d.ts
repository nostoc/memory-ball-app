// types/mdx.d.ts (or just mdx.d.ts at root)
declare module '*.mdx' {
  import { FC } from 'react'

  export const meta: {
    title: string
    excerpt: string
    date: string
    author: string
    authorImage: string
    coverImage: string
    tags: string[]
  }

  const MDXComponent: FC
  export default MDXComponent
}
