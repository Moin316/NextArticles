"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  return (
    <section className="relative min-h-[662px] w-full overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-950 to-indigo-950">
      {/* Gradient overlay */}
      <div className="absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[500px] before:w-[500px] before:rounded-full before:bg-gradient-to-r before:from-violet-600/20 before:to-indigo-600/20 before:blur-3xl" />

      <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 py-24 md:flex-row md:py-32">
        {/* Text Content */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl ">
            Explore the world Through
            <span className="bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
              Words
            </span>
          </h1>

          <p className="max-w-2xl text-lg text-gray-300 md:text-xl">
            Discover articles, tutorials, and more to enhance your knowledge.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row md:justify-start justify-center ">
            <Button size="lg" className="rounded-full px-8 py-6 text-lg">
              Start Reading
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-lg dark:text-white"
            >
              Explore Now
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 pt-8 text-white md:max-w-md md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">1k+</div>
              <div className="text-sm text-gray-300">Published Articles</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-gray-300">Contributors</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">10M+</div>
              <div className="text-sm text-gray-300">Monthly Readers</div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-12 flex-1 md:mt-0">
          <div
            className={cn(
              "relative h-64 w-64 mx-auto rounded-2xl overflow-hidden",
              "bg-gradient-to-br from-white/5 to-transparent dark:from-white/10",
              "border border-primary/20 backdrop-blur-lg",
              "shadow-2xl shadow-indigo-500/10"
            )}
          >
            <Image
              src="https://images.unsplash.com/photo-1735825764457-ffdf0b5aa5dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Illustration"
              fill
              className="object-cover"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
