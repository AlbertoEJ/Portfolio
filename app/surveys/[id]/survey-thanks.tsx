"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

interface Props {
  name: string;
}

export default function SurveyThanks({ name }: Props) {
  const firstName = name.split(" ")[0];

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="rounded-2xl border border-[#e5e4e0] bg-[#fafaf8] p-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#eefbf3]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#33cc80"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
          className="mb-3 text-2xl font-bold text-[#141414]"
        >
          {`\u00a1Gracias, ${firstName}!`}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
          className="flex flex-col gap-3 text-[17px] leading-[30px] text-[#595956]"
        >
          <p>
            Con esto tengo mucho mejor contexto para trabajar en su proyecto.
            En los próximos días les comparto una propuesta basada en sus
            respuestas.
          </p>
          <p>
            {"¿Algo más que quieran agregar? "}
            <a
              href="mailto:hola@albertoej.com"
              className="text-[#141414] underline transition-colors hover:text-[#4d80ff]"
            >
              hola@albertoej.com
            </a>
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href="/"
          className="inline-block text-[15px] text-[#8c8c87] transition-colors hover:text-[#141414]"
        >
          &larr; Ir al portafolio
        </Link>
      </motion.div>
    </div>
  );
}
