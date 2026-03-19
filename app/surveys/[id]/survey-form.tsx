"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { submitResponse, checkEmailExists } from "@/lib/survey-api";
import type { Survey, Question, AnswerValue } from "@/lib/survey-types";

const ease = [0.22, 1, 0.36, 1] as const;

interface Props {
  survey: Survey;
  onSubmitted: (name: string) => void;
}

export default function SurveyForm({ survey, onSubmitted }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [submitError, setSubmitError] = useState("");

  function setAnswer(questionId: string, value: AnswerValue) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setErrors((prev) => {
      const next = new Set(prev);
      next.delete(questionId);
      return next;
    });
  }

  function toggleMultiple(questionId: string, option: string) {
    setAnswers((prev) => {
      const current = (prev[questionId] as string[]) || [];
      const next = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      return { ...prev, [questionId]: next };
    });
    setErrors((prev) => {
      const next = new Set(prev);
      next.delete(questionId);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");

    // Validate name & email
    const missing = new Set<string>();
    if (!name.trim()) missing.add("_name");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      missing.add("_email");

    // Validate required questions
    for (const q of survey.questions) {
      if (!q.required) continue;
      const val = answers[q.id];
      if (
        val === undefined ||
        val === "" ||
        (Array.isArray(val) && val.length === 0)
      ) {
        missing.add(q.id);
      }
    }

    if (missing.size > 0) {
      setErrors(missing);
      return;
    }

    setSubmitting(true);
    try {
      // Check for duplicate email
      const exists = await checkEmailExists(survey.id, email);
      if (exists) {
        setSubmitError("Ya se registró una respuesta con este correo.");
        setSubmitting(false);
        return;
      }

      await submitResponse(survey.id, { name, email, answers });

      if (typeof window !== "undefined") {
        localStorage.setItem(`survey_done_${survey.id}`, "1");
      }

      onSubmitted(name.trim());
    } catch {
      setSubmitError("Hubo un error al enviar. Intenta de nuevo.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Name & Email */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="flex flex-col gap-5 rounded-2xl border border-[#e5e4e0] bg-[#fafaf8] p-6"
      >
        <p className="text-sm text-[#8c8c87]">
          Antes de empezar, dinos quién eres.
        </p>
        <div className="flex flex-col gap-1.5">
          <label className="text-[15px] font-medium text-[#141414]">
            Nombre <span className="text-[#e6664d]">*</span>
          </label>
          {errors.has("_name") && (
            <span className="text-sm text-[#e6664d]">
              Ingresa tu nombre
            </span>
          )}
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => {
                const next = new Set(prev);
                next.delete("_name");
                return next;
              });
            }}
            className="rounded-xl border border-[#e5e4e0] bg-white px-4 py-3 text-[15px] text-[#141414] outline-none transition-colors focus:border-[#4d80ff] focus:ring-1 focus:ring-[#4d80ff]"
            placeholder="Tu nombre"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[15px] font-medium text-[#141414]">
            Correo electrónico <span className="text-[#e6664d]">*</span>
          </label>
          {errors.has("_email") && (
            <span className="text-sm text-[#e6664d]">
              Ingresa un correo válido
            </span>
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => {
                const next = new Set(prev);
                next.delete("_email");
                return next;
              });
              setSubmitError("");
            }}
            className="rounded-xl border border-[#e5e4e0] bg-white px-4 py-3 text-[15px] text-[#141414] outline-none transition-colors focus:border-[#4d80ff] focus:ring-1 focus:ring-[#4d80ff]"
            placeholder="tu@correo.com"
          />
        </div>
      </motion.div>

      {/* Questions */}
      {survey.questions.map((q, i) => (
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: (i + 1) * 0.08, ease }}
          className="flex flex-col gap-3"
        >
          <label className="text-[17px] font-medium text-[#141414]">
            {q.text}
            {q.required && <span className="ml-1 text-[#e6664d]">*</span>}
          </label>

          {errors.has(q.id) && (
            <span className="text-sm text-[#e6664d]">
              Este campo es obligatorio
            </span>
          )}

          <QuestionInput
            question={q}
            value={answers[q.id]}
            onChange={(val) => setAnswer(q.id, val)}
            onToggleMultiple={(opt) => toggleMultiple(q.id, opt)}
          />
        </motion.div>
      ))}

      {submitError && (
        <div className="rounded-xl border border-[#e6664d]/30 bg-[#fef2f0] px-4 py-3 text-[15px] text-[#e6664d]">
          {submitError}
        </div>
      )}

      <motion.button
        type="submit"
        disabled={submitting}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: (survey.questions.length + 1) * 0.08 }}
        className="mt-4 rounded-xl bg-[#141414] px-8 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#2a2a2a] disabled:opacity-50"
      >
        {submitting ? "Enviando..." : "Enviar"}
      </motion.button>
    </form>
  );
}

function QuestionInput({
  question,
  value,
  onChange,
  onToggleMultiple,
}: {
  question: Question;
  value: AnswerValue | undefined;
  onChange: (val: AnswerValue) => void;
  onToggleMultiple: (option: string) => void;
}) {
  switch (question.type) {
    case "single":
      return (
        <div className="flex flex-col gap-2">
          {question.options?.map((opt) => {
            const selected = value === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                className={`rounded-xl border px-4 py-3 text-left text-[15px] transition-all ${
                  selected
                    ? "border-[#4d80ff] bg-[#f0f4ff] text-[#141414]"
                    : "border-[#e5e4e0] bg-white text-[#595956] hover:border-[#c5c4c0] hover:bg-[#fafaf8]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      selected ? "border-[#4d80ff] bg-[#4d80ff]" : "border-[#d6d5d0]"
                    }`}
                  >
                    {selected && (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </span>
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
      );

    case "multiple":
      return (
        <div className="flex flex-col gap-2">
          {question.options?.map((opt) => {
            const selected = ((value as string[]) || []).includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onToggleMultiple(opt)}
                className={`rounded-xl border px-4 py-3 text-left text-[15px] transition-all ${
                  selected
                    ? "border-[#4d80ff] bg-[#f0f4ff] text-[#141414]"
                    : "border-[#e5e4e0] bg-white text-[#595956] hover:border-[#c5c4c0] hover:bg-[#fafaf8]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border-2 transition-colors ${
                      selected ? "border-[#4d80ff] bg-[#4d80ff]" : "border-[#d6d5d0]"
                    }`}
                  >
                    {selected && (
                      <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </span>
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
      );

    case "scale": {
      const min = question.scaleMin ?? 1;
      const max = question.scaleMax ?? 5;
      const range = Array.from({ length: max - min + 1 }, (_, i) => min + i);
      return (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            {range.map((n) => {
              const selected = value === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => onChange(n)}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border text-[15px] font-medium transition-all ${
                    selected
                      ? "border-[#4d80ff] bg-[#4d80ff] text-white"
                      : "border-[#e5e4e0] bg-white text-[#595956] hover:border-[#c5c4c0] hover:bg-[#fafaf8]"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
          {(question.scaleMinLabel || question.scaleMaxLabel) && (
            <div className="flex justify-between text-xs text-[#8c8c87]">
              <span>{question.scaleMinLabel}</span>
              <span>{question.scaleMaxLabel}</span>
            </div>
          )}
        </div>
      );
    }

    case "text":
      return (
        <textarea
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="rounded-xl border border-[#e5e4e0] bg-[#fafaf8] px-4 py-3 text-[15px] text-[#141414] outline-none transition-colors focus:border-[#4d80ff] focus:ring-1 focus:ring-[#4d80ff]"
          placeholder="Escribe tu respuesta..."
        />
      );
  }
}
