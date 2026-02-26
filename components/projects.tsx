"use client";

import { RevealSection, ScrollRevealText, StaggerChildren, StaggerItem } from "@/components/animate";

type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  topics: string[];
};

const languageColors: Record<string, string> = {
  TypeScript: "bg-[#3178c6]",
  JavaScript: "bg-[#f1e05a]",
  Python: "bg-[#3572A5]",
  C: "bg-[#555555]",
  "C++": "bg-[#f34b7d]",
  Java: "bg-[#b07219]",
  Kotlin: "bg-[#A97BFF]",
  Swift: "bg-[#F05138]",
  Rust: "bg-[#dea584]",
  Go: "bg-[#00ADD8]",
  Jupyter: "bg-[#DA5B0B]",
  "Jupyter Notebook": "bg-[#DA5B0B]",
};

export default function Projects({ repos }: { repos: Repo[] }) {
  return (
    <RevealSection>
      <section
        id="projects"
        className="bg-white px-8 py-24 md:px-16 lg:px-[140px] lg:py-[100px]"
      >
        <div className="mx-auto max-w-[1200px]">
          {/* Header */}
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <ScrollRevealText>
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium tracking-[2px] text-[#8c8c87]">
                  open source
                </span>
                <h2 className="text-3xl font-bold text-[#141414] md:text-[42px]">
                  Projects
                </h2>
              </div>
            </ScrollRevealText>
            <ScrollRevealText>
              <a
                href="https://github.com/AlbertoEJ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] text-[#737370] transition-colors hover:text-[#141414]"
              >
                View all on GitHub &rarr;
              </a>
            </ScrollRevealText>
          </div>

          {/* Repos grid */}
          <StaggerChildren className="grid gap-5 sm:grid-cols-2">
            {repos.map((r) => (
              <StaggerItem key={r.name}>
                <a
                  href={r.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between rounded-2xl border border-[#e5e4e0] p-6 transition-colors hover:border-[#c5c4c0] hover:bg-[#fafaf8]"
                >
                  <div className="flex flex-col gap-3">
                    <span className="text-lg font-semibold text-[#1a1a1a] group-hover:text-[#000]">
                      {r.name}
                    </span>
                    {r.description && (
                      <p className="text-[15px] leading-6 text-[#807f7a]">
                        {r.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 flex items-center gap-4">
                    {r.language && (
                      <span className="flex items-center gap-1.5 text-xs text-[#807f7a]">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${languageColors[r.language] ?? "bg-[#999]"}`}
                        />
                        {r.language}
                      </span>
                    )}
                    {r.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 text-xs text-[#807f7a]">
                        <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                          <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                        </svg>
                        {r.stargazers_count}
                      </span>
                    )}
                    {r.topics?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {r.topics.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-[#f0eeea] px-2 py-0.5 text-[11px] text-[#807f7a]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </RevealSection>
  );
}
