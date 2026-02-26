"use client";

import { RevealSection, ScrollRevealText, StaggerChildren, StaggerItem } from "@/components/animate";

type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  languages: Record<string, number>;
  stargazers_count: number;
  watchers_count: number;
  created_at: string;
  pushed_at: string;
  html_url: string;
  topics: string[];
};

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: [number, string][] = [
    [31536000, "y"],
    [2592000, "mo"],
    [86400, "d"],
    [3600, "h"],
    [60, "m"],
  ];

  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count}${label} ago`;
  }
  return "just now";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

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

                  {/* Languages */}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {Object.keys(r.languages ?? {}).length > 0 ? (
                      Object.keys(r.languages).map((lang) => (
                        <span key={lang} className="flex items-center gap-1.5 text-xs text-[#807f7a]">
                          <span
                            className={`h-2.5 w-2.5 shrink-0 rounded-full ${languageColors[lang] ?? "bg-[#999]"}`}
                          />
                          {lang}
                        </span>
                      ))
                    ) : r.language ? (
                      <span className="flex items-center gap-1.5 text-xs text-[#807f7a]">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${languageColors[r.language] ?? "bg-[#999]"}`}
                        />
                        {r.language}
                      </span>
                    ) : null}
                  </div>

                  {/* Stats & dates */}
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    {r.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 text-xs text-[#807f7a]">
                        <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                          <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                        </svg>
                        {r.stargazers_count}
                      </span>
                    )}
                    {r.watchers_count > 0 && (
                      <span className="flex items-center gap-1 text-xs text-[#807f7a]">
                        <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                          <path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 010 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14s-3.671-.992-4.933-2.078C1.797 10.831.88 9.577.43 8.9a1.62 1.62 0 010-1.798c.45-.678 1.367-1.932 2.637-3.023C4.33 2.992 6.019 2 8 2zM1.679 7.932a.12.12 0 000 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5s2.825-.742 3.955-1.715c1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 000-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5s-2.825.742-3.955 1.715c-1.124.967-1.954 2.096-2.366 2.717zM8 10a2 2 0 11-.001-3.999A2 2 0 018 10z" />
                        </svg>
                        {r.watchers_count}
                      </span>
                    )}
                    {r.created_at && (
                      <span className="text-xs text-[#807f7a]">
                        Created {formatDate(r.created_at)}
                      </span>
                    )}
                    {r.pushed_at && (
                      <span className="text-xs text-[#807f7a]">
                        Updated {timeAgo(r.pushed_at)}
                      </span>
                    )}
                  </div>

                  {/* Topics */}
                  {r.topics?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
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
                </a>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </RevealSection>
  );
}
