"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const handleScroll = () => {
    const content = document.getElementById("app-content");
    const about = document.getElementById("about");
    if (content && about) {
      content.scrollTo({
        top: about.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      aria-label="Introduction"
      className="flex min-h-[calc(100vh-68px)] flex-col justify-between px-8 pt-16 pb-16 md:px-16 lg:px-[140px]"
    >
      <div className="flex-1" />

      <div className="flex flex-col gap-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg text-[#737370] md:text-[22px]"
        >
          hey, i&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl font-bold leading-[1.05] text-[#141414] md:text-8xl lg:text-[96px] lg:leading-[100px]"
        >
          Alberto
          <br />
          Espinosa
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-lg leading-relaxed text-[#595956] md:text-2xl md:leading-9"
        >
          PhD candidate building intelligent systems that see, read, and
          understand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <span className="text-[15px] text-[#737370]">
            Available for work & AI projects
          </span>
        </motion.div>
      </div>

      {/* Scroll to explore — clickeable */}
      <motion.button
        onClick={handleScroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="group mt-16 flex cursor-pointer items-center gap-3 self-start text-[#807f7a] transition-colors hover:text-[#141414]"
      >
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#d6d5d0] transition-colors group-hover:border-[#141414] group-hover:bg-[#141414]">
          <motion.svg
            animate={{ y: [0, 4, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-[#807f7a] transition-colors group-hover:text-white"
          >
            <path
              d="M8 3v10m0 0l-4-4m4 4l4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </span>
        <span className="text-sm">scroll to explore</span>
      </motion.button>
    </section>
  );
}
