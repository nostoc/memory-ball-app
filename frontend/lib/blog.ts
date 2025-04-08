import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  authorImage: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  content: string;
};

export function getSortedPostsData(): Omit<BlogPost, "content">[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        author: data.author as string,
        authorImage: data.authorImage as string,
        excerpt: data.excerpt as string,
        coverImage: data.coverImage as string,
        tags: data.tags || [], // Default to an empty array if tags are missing
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames.map(fileName => {
    return {
      slug: fileName.replace(/\.md$/, ''),
    };
  });
}

export async function getPostData(slug: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);
  
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .use(gfm)
    .process(content);
    
  const contentHtml = processedContent.toString();
  
  // Combine the data with the slug and contentHtml
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    author: data.author as string,
    authorImage: data.authorImage as string,
    excerpt: data.excerpt as string,
    coverImage: data.coverImage as string,
    tags: data.tags as string[],
    content: contentHtml,
  };
}