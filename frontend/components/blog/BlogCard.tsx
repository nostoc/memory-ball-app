import Link from "next/link";
import Image from "next/image";
import { format, isValid } from "date-fns";

type BlogCardProps = {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorImage: string;
  slug: string;
  coverImage: string;
  tags?: string[]; // Make tags optional
};

export default function BlogCard({
  title,
  excerpt,
  date,
  author,
  authorImage,
  slug,
  coverImage,
  tags = [], // Default to an empty array if tags are undefined
}: BlogCardProps) {
  // Parse the date and check if it's valid
  const parsedDate = new Date(date);
  const formattedDate = isValid(parsedDate)
    ? format(parsedDate, "MMMM d, yyyy")
    : "Unknown Date";

  return (
    <div className="bg-background/30 rounded-xl border border-oceanBlue/20 hover:border-oceanBlue/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(44,183,190,0.15)] group overflow-hidden">
      <Link href={`/blog/${slug}`} className="block h-full">
        <div className="h-48 md:h-56 relative overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-1/3 z-10"></div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 bg-oceanBlue/10 text-oceanBlue text-xs rounded-full font-montserrat"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold text-white mb-2 font-bricolage group-hover:text-oceanBlue transition-colors">
            {title}
          </h3>

          <p className="text-gray-300 mb-4 font-montserrat line-clamp-2">
            {excerpt}
          </p>

          <div className="flex items-center mt-4 pt-4 border-t border-oceanBlue/10">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <Image
                src={authorImage}
                alt={author}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-white text-sm font-bricolage">{author}</p>
              <p className="text-gray-400 text-xs font-montserrat">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
