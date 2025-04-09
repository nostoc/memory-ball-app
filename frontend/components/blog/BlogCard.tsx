import Link from "next/link";
import Image from "next/image";

export default function BlogCard({
  title,
  excerpt,
  date,
  author,
  authorImage,
  slug,
  coverImage,
}: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorImage: string;
  slug: string;
  coverImage: string;
}) {
  return (
    <Link href={`/blog/${slug}`}>
      <article className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200">
        <div className="relative aspect-video">
          <Image
            src={coverImage}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h2>
          <p className="text-gray-400 mb-4 line-clamp-3">{excerpt}</p>
          <div className="flex items-center">
            <div className="relative w-8 h-8">
              <Image
                src={authorImage}
                alt={author}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="ml-2">
              <p className="text-sm">{author}</p>
              <p className="text-xs text-gray-400">{date}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
