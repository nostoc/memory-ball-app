import CallToAction from "./common/CallToAction";
import Link from "next/link";
import Image from "next/image";
import { TiArrowBack } from "react-icons/ti";

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
      <div className="w-[90%] max-w-5xl py-8 flex flex-col">
        {/* Left-aligned back button with improved styling */}
        <div className="w-full flex justify-start mb-8">
          <Link href="/blog" className="inline-block">
            <button className="flex items-center px-6 py-2 text-oceanBlue hover:text-white hover:bg-oceanBlue/20 rounded-lg transition-all duration-300 font-poppins border border-oceanBlue/30 hover:border-oceanBlue/70">
              <TiArrowBack className="inline-block mr-2" size={24} />
              Back to Blog
            </button>
          </Link>
        </div>

        {/* Title and metadata section */}
        {meta?.title && (
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-bricolage">
              {meta.title}
            </h1>
            
          </div>
        )}

        {/* Cover image with enhanced styling */}
        {meta?.coverImage && (
          <div className="relative w-full aspect-[16/9] mb-10 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.2)] border border-oceanBlue/20 group hover:border-oceanBlue/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(44,183,190,0.15)]">
            <Image
              src={meta.coverImage}
              alt={meta.title || ""}
              fill
              priority
              className="rounded-xl object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        )}

        {/* Article content with enhanced styling */}
        <div className="bg-background/30 rounded-xl border border-oceanBlue/20 hover:border-oceanBlue/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(44,183,190,0.15)] p-8 mb-12">
          <article
            className="prose prose-invert prose-xl max-w-none 
            prose-img:rounded-lg 
            prose-headings:font-bricolage prose-headings:text-white 
            prose-p:font-montserrat prose-p:text-gray-200 
            prose-a:font-poppins prose-a:text-oceanBlue prose-a:hover:text-white prose-a:transition-colors
            prose-li:font-montserrat prose-li:text-gray-200
            prose-blockquote:border-oceanBlue prose-blockquote:bg-background/50 prose-blockquote:rounded-r-lg
            prose-code:text-oceanBlue prose-code:bg-background/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-800 prose-pre:text-gray-200 prose-pre:rounded-lg
            prose-strong:text-oceanBlue prose-strong:font-bold"
          >
            {children}
          </article>
        </div>

        {/* Author section with styling from Founders component */}
        {meta?.author && (
          <div className="flex items-center gap-6 mb-12 border-t border-gray-700 pt-8 w-full justify-start">
            {meta.authorImage && (
              <div className="relative w-16 h-16 rounded-full border-2 border-oceanBlue/30 overflow-hidden shadow-lg">
                <Image
                  src={meta.authorImage}
                  alt={meta.author}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="text-sm text-gray-400 font-montserrat">
                Written by
              </p>
              <p className="text-white text-lg font-medium font-bricolage">
                {meta.author}
              </p>
              {meta.date && (
                <p className="text-sm text-gray-400 font-montserrat">
                  {meta.date}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Tags section */}
        {meta?.tags && meta.tags.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-wrap gap-2">
              {meta.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-oceanBlue/10 text-oceanBlue rounded-full text-sm font-montserrat border border-oceanBlue/30 hover:bg-oceanBlue/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Call to action with styling from Founders component */}
        <div className="bg-gradient-to-r from-background via-oceanBlue/10 to-background p-8 rounded-2xl mb-8">
          <CallToAction />
        </div>
      </div>
    </div>
  );
}
