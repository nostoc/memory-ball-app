"use client";
import About from "@/components/about/About";
import Founders from "@/components/about/Founders";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-16">
        <About />
        <div className="my-16 border-t border-oceanBlue/10 pt-16">
          <Founders />
        </div>
      </div>
    </div>
  );
}
