import CallToAction from "./common/CallToAction";
import Link from "next/link";
import Image from "next/image";

interface BlogLayoutProps {
  children: React.ReactNode;
  meta?: {
    coverImage?: string;
    title?: string;
    date?: string;
    author?: string;
    excerpt?: string;
    tags?: string[];
    authorImage?: string;
  };
}

export default function BlogLayout({ children, meta }: BlogLayoutProps) {
  return (
    <div className="flex justify-center w-full bg-background text-white">
      <div className="w-[90%] max-w-4xl py-8 flex flex-col items-center">
        <div className="w-full flex justify-center mb-8">
          <Link href="/blog" className="inline-block">
            <button className="px-6 py-2 text-base bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors">
              ← Back to Blog
            </button>
          </Link>
        </div>
        
        {meta?.coverImage && (
          <div className="relative w-full max-w-2xl aspect-[16/9] mb-12">
            <Image
              src={meta.coverImage}
              alt={meta.title || ""}
              fill
              priority
              className="rounded-xl object-cover"
            />
          </div>
        )}

        <article className="prose prose-invert prose-xl prose-img:rounded-lg prose-headings:text-white prose-p:text-gray-200 prose-headings:text-center max-w-2xl">
          {children}
        </article>

        {meta?.author && (
          <div className="flex items-center gap-4 mt-12 mb-12 border-t border-gray-700 pt-8 w-full max-w-2xl justify-center">
            {meta.authorImage && (
              <div className="relative w-12 h-12">
                <Image
                  src={meta.authorImage}
                  alt={meta.author}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <div>
              <p className="text-sm text-gray-400">Written by</p>
              <p className="text-white font-medium">{meta.author}</p>
              {meta.date && (
                <p className="text-sm text-gray-400">{meta.date}</p>
              )}
            </div>
          </div>
        )}

        <CallToAction />
      </div>
    </div>
  );
}
