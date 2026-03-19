"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getResponses } from "@/lib/survey-api";
import type { Survey, SurveyResponse, Question } from "@/lib/survey-types";

const ease = [0.22, 1, 0.36, 1] as const;

const accentColors = ["#4d80ff", "#33cc80", "#b359e6", "#f2993d", "#e6664d"];

interface Props {
  survey: Survey;
  responses: SurveyResponse[];
  surveyId: string;
}

export default function SurveyResults({ survey, responses: initial, surveyId }: Props) {
  const [responses, setResponses] = useState<SurveyResponse[]>(initial);

  useEffect(() => {
    if (initial.length === 0) {
      getResponses(surveyId).then(setResponses);
    }
  }, [initial, surveyId]);

  const total = responses.length;

  return (
    <div className="flex flex-col gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="rounded-2xl border border-[#e5e4e0] bg-[#fafaf8] p-6"
      >
        <h2 className="text-xl font-semibold text-[#141414]">
          Thank you for your response!
        </h2>
        <p className="mt-2 text-[15px] text-[#595956]">
          Here are the aggregated results from{" "}
          <strong className="text-[#141414]">{total}</strong>{" "}
          {total === 1 ? "response" : "responses"}.
        </p>
      </motion.div>

      {survey.questions.map((q, i) => (
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: (i + 1) * 0.1, ease }}
          className="flex flex-col gap-4"
        >
          <h3 className="text-[17px] font-medium text-[#141414]">{q.text}</h3>
          <QuestionResult
            question={q}
            responses={responses}
            colorIndex={i}
            total={total}
          />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: (survey.questions.length + 1) * 0.1 }}
      >
        <Link
          href="/surveys"
          className="inline-block text-[15px] text-[#8c8c87] transition-colors hover:text-[#141414]"
        >
          &larr; Back to surveys
        </Link>
      </motion.div>
    </div>
  );
}

function QuestionResult({
  question,
  responses,
  colorIndex,
  total,
}: {
  question: Question;
  responses: SurveyResponse[];
  colorIndex: number;
  total: number;
}) {
  if (question.type === "single" || question.type === "multiple") {
    return (
      <ChoiceResult
        question={question}
        responses={responses}
        colorIndex={colorIndex}
        total={total}
      />
    );
  }

  if (question.type === "scale") {
    return <ScaleResult question={question} responses={responses} />;
  }

  // text
  const textCount = responses.filter(
    (r) => r.answers[question.id] && String(r.answers[question.id]).trim()
  ).length;

  return (
    <div className="rounded-xl border border-[#e5e4e0] bg-white px-4 py-3">
      <span className="text-sm text-[#807f7a]">
        {textCount} text {textCount === 1 ? "response" : "responses"}
      </span>
    </div>
  );
}

function ChoiceResult({
  question,
  responses,
  colorIndex,
  total,
}: {
  question: Question;
  responses: SurveyResponse[];
  colorIndex: number;
  total: number;
}) {
  const counts: Record<string, number> = {};
  for (const opt of question.options ?? []) counts[opt] = 0;

  for (const r of responses) {
    const val = r.answers[question.id];
    if (Array.isArray(val)) {
      for (const v of val) if (counts[v] !== undefined) counts[v]++;
    } else if (typeof val === "string" && counts[val] !== undefined) {
      counts[val]++;
    }
  }

  const color = accentColors[colorIndex % accentColors.length];

  return (
    <div className="flex flex-col gap-2">
      {(question.options ?? []).map((opt) => {
        const count = counts[opt];
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        return (
          <div key={opt} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#595956]">{opt}</span>
              <span className="text-[#8c8c87]">
                {pct}% ({count})
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-[#f0eeea]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, delay: 0.2, ease }}
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ScaleResult({
  question,
  responses,
}: {
  question: Question;
  responses: SurveyResponse[];
}) {
  const min = question.scaleMin ?? 1;
  const max = question.scaleMax ?? 5;
  const values = responses
    .map((r) => r.answers[question.id])
    .filter((v): v is number => typeof v === "number");

  const avg = values.length > 0
    ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)
    : "—";

  // Distribution
  const dist: Record<number, number> = {};
  for (let i = min; i <= max; i++) dist[i] = 0;
  for (const v of values) if (dist[v] !== undefined) dist[v]++;

  const maxCount = Math.max(...Object.values(dist), 1);

  return (
    <div className="rounded-xl border border-[#e5e4e0] bg-white p-4">
      <div className="mb-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-[#141414]">{avg}</span>
        <span className="text-sm text-[#8c8c87]">/ {max} average</span>
      </div>
      <div className="flex items-end gap-1.5">
        {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((n) => {
          const height = maxCount > 0 ? (dist[n] / maxCount) * 100 : 0;
          return (
            <div key={n} className="flex flex-1 flex-col items-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(height, 4)}%` }}
                transition={{ duration: 0.6, delay: 0.3, ease }}
                className="w-full rounded-t bg-[#4d80ff]"
                style={{ minHeight: 4, maxHeight: 60 }}
              />
              <span className="text-xs text-[#8c8c87]">{n}</span>
            </div>
          );
        })}
      </div>
      {(question.scaleMinLabel || question.scaleMaxLabel) && (
        <div className="mt-1 flex justify-between text-[11px] text-[#8c8c87]">
          <span>{question.scaleMinLabel}</span>
          <span>{question.scaleMaxLabel}</span>
        </div>
      )}
    </div>
  );
}
