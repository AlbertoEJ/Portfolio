"use client";

import { RevealSection, ScrollRevealText, StaggerChildren, StaggerItem } from "@/components/animate";

const skills = [
  {
    emoji: "\uD83D\uDC41\uFE0F",
    title: "Computer Vision",
    desc: "Image classification, object detection, and segmentation with CNNs and vision transformers.",
    accent: "bg-[#4d80ff]",
  },
  {
    emoji: "\uD83D\uDCAC",
    title: "Natural Language Processing",
    desc: "Text understanding, sentiment analysis, and language generation with transformer architectures.",
    accent: "bg-[#e6664d]",
  },
  {
    emoji: "\uD83E\uDD16",
    title: "LLM Solutions & AI Agents",
    desc: "RAG pipelines, conversational agents for support & sales, and direct database Q&A systems.",
    accent: "bg-[#33cc80]",
  },
  {
    emoji: "\uD83D\uDDBC\uFE0F",
    title: "Vision-Language Models",
    desc: "VLMs for visual Q&A, image captioning, and cross-modal multimodal understanding tasks.",
    accent: "bg-[#b359e6]",
  },
  {
    emoji: "\uD83D\uDCCA",
    title: "Classical Machine Learning",
    desc: "Classification, regression, and clustering — SVMs, XGBoost, random forests, and ensemble methods.",
    accent: "bg-[#f2993d]",
  },
];

export default function Toolkit() {
  return (
    <RevealSection>
      <section
        id="toolkit"
        className="bg-[#f0eeea] px-8 py-24 md:px-16 lg:px-[140px] lg:py-[100px]"
      >
        <div className="mx-auto max-w-[1200px]">
          {/* Header */}
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <ScrollRevealText>
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium tracking-[2px] text-[#8c8c87]">
                  what i do
                </span>
                <h2 className="text-3xl font-bold text-[#141414] md:text-[42px]">
                  My toolkit
                </h2>
              </div>
            </ScrollRevealText>
            <ScrollRevealText>
              <p className="text-[17px] leading-7 text-[#737370] md:text-right">
                From raw data to production&mdash;
                <br className="hidden md:block" />
                here&apos;s what I work with daily.
              </p>
            </ScrollRevealText>
          </div>

          {/* Skills list */}
          <StaggerChildren className="flex flex-col">
            <div className="h-px bg-[#d6d5d0]" />

            {skills.map((s) => (
              <StaggerItem key={s.title}>
                <div className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:gap-6">
                  <div className="flex items-center gap-4 md:gap-6">
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${s.accent}`}
                    />
                    <span className="text-2xl">{s.emoji}</span>
                  </div>
                  <span className="shrink-0 text-lg font-semibold text-[#1a1a1a] md:w-[280px]">
                    {s.title}
                  </span>
                  <p className="text-[15px] leading-6 text-[#807f7a]">
                    {s.desc}
                  </p>
                </div>
                <div className="h-px bg-[#d6d5d0]" />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </RevealSection>
  );
}
