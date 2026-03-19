"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSurveyById } from "@/lib/survey-api";
import type { Survey } from "@/lib/survey-types";
import SurveyForm from "./survey-form";
import SurveyThanks from "./survey-thanks";

const ease = [0.22, 1, 0.36, 1] as const;

export default function SurveyPage() {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [respondentName, setRespondentName] = useState("");

  useEffect(() => {
    if (!id) return;

    const key = `survey_done_${id}`;
    if (typeof window !== "undefined" && localStorage.getItem(key)) {
      setSubmitted(true);
      setRespondentName(localStorage.getItem(`survey_name_${id}`) || "");
    }

    getSurveyById(id)
      .then(setSurvey)
      .finally(() => setLoading(false));
  }, [id]);

  function handleSubmitted(name: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem(`survey_done_${id}`, "1");
      localStorage.setItem(`survey_name_${id}`, name);
    }
    setRespondentName(name);
    setSubmitted(true);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-[720px] px-6 py-16 md:py-24">
        <div className="h-8 w-40 animate-pulse rounded bg-[#f0eeea]" />
        <div className="mt-6 h-12 w-3/4 animate-pulse rounded bg-[#f0eeea]" />
        <div className="mt-4 h-6 w-1/2 animate-pulse rounded bg-[#f0eeea]" />
        <div className="mt-12 space-y-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-[#f0eeea]" />
          ))}
        </div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="mx-auto max-w-[720px] px-6 py-16 md:py-24">
        <Link
          href="/"
          className="mb-12 inline-block text-sm text-[#8c8c87] transition-colors hover:text-[#141414]"
        >
          &larr; back to portfolio
        </Link>
        <h1 className="text-3xl font-bold text-[#141414]">Survey not found</h1>
        <p className="mt-3 text-[#595956]">
          This survey doesn&apos;t exist or is no longer active.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[720px] px-6 py-16 md:py-24">
      <Link
        href="/"
        className="mb-12 inline-block text-sm text-[#8c8c87] transition-colors hover:text-[#141414]"
      >
        &larr; back to portfolio
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="mb-10"
      >
        <h1 className="mb-2 text-3xl font-bold text-[#141414] md:text-[42px]">
          {survey.title}
        </h1>
        <p className="text-[17px] leading-[30px] text-[#595956]">
          {survey.description}
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <SurveyThanks name={respondentName} />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease }}
          >
            <SurveyForm survey={survey} onSubmitted={handleSubmitted} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
