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

export function getSortedPostsData(): Omit<BlogPost, 'content'>[] {
  // Get file names under /content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');
      
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use gray-matter to parse the post metadata section
      const { data } = matter(fileContents);
      
      // Validate data to ensure it matches our BlogPost type
      const postData = {
        slug,
        title: data.title as string,
        date: data.date as string,
        author: data.author as string,
        authorImage: data.authorImage as string,
        excerpt: data.excerpt as string,
        coverImage: data.coverImage as string,
        tags: data.tags as string[],
      };
      
      return postData;
    });
    
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
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