"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const tools = [
  "APIs", "dashboards", "apps", "pipelines", "modelos de ML",
  "sitios web", "bots", "backends", "scrapers", "CLIs",
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="flex max-w-[520px] flex-col items-center text-center"
      >
        {/* 404 big number */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease }}
          className="text-[120px] font-bold leading-none tracking-tight text-[#e5e4e0] md:text-[180px]"
        >
          404
        </motion.span>

        {/* Tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-2 text-2xl font-bold text-[#141414] md:text-3xl"
        >
          Construyo de todo...
          <br />
          pero esta página aún no.
        </motion.h1>

        {/* Scrolling tools */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 w-full overflow-hidden"
        >
          <div className="flex animate-marquee gap-3">
            {[...tools, ...tools].map((tool, i) => (
              <span
                key={i}
                className="shrink-0 rounded-full bg-[#f0eeea] px-3 py-1 text-sm text-[#807f7a]"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
          className="mt-8 text-[17px] leading-[28px] text-[#595956]"
        >
          Parece que esta ruta no existe.
          <br />
          Pero si necesitas que construya algo, hablemos.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease }}
          className="mt-8 flex gap-3"
        >
          <Link
            href="/"
            className="rounded-xl bg-[#141414] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#2a2a2a]"
          >
            Ir al portafolio
          </Link>
          <a
            href="mailto:hola@albertoej.com"
            className="rounded-xl border border-[#e5e4e0] px-6 py-3 text-[15px] font-medium text-[#595956] transition-colors hover:border-[#c5c4c0] hover:bg-[#fafaf8]"
          >
            Contactar
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
