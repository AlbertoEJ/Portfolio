"use client";

import Image from "next/image";
import { RevealSection, Parallax, ScrollRevealText } from "@/components/animate";

const stats = [
  { value: "5+", label: "Years in ML/AI" },
  { value: "10+", label: "Projects shipped" },
  { value: "3", label: "Publications" },
];

export default function About() {
  return (
    <div id="about">
      <RevealSection>
        <section className="overflow-visible bg-white px-8 py-24 md:px-16 lg:px-[140px] lg:py-[100px]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-16 lg:flex-row lg:items-center lg:gap-20">
          {/* Photo with hover swap */}
          <Parallax speed={-30}>
            <div className="group relative h-[360px] w-full shrink-0 overflow-hidden rounded-3xl bg-[#ebeae6] lg:h-[460px] lg:w-[380px]">
              <Image
                src="/images/me3_main.png"
                alt="Alberto Espinosa"
                fill
                className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                sizes="(max-width: 1024px) 100vw, 380px"
                priority
              />
              <Image
                src="/images/me2.jpg"
                alt="Alberto Espinosa"
                fill
                className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                sizes="(max-width: 1024px) 100vw, 380px"
              />
            </div>
          </Parallax>

          {/* Text */}
          <div className="flex flex-col gap-7">
            <ScrollRevealText>
              <span className="text-sm font-medium tracking-[2px] text-[#8c8c87]">
                about me
              </span>
            </ScrollRevealText>

            <ScrollRevealText>
              <h2 className="text-3xl font-bold leading-tight text-[#141414] md:text-[42px] md:leading-[52px]">
                I teach machines
                <br />
                to see and think.
              </h2>
            </ScrollRevealText>

            <Parallax speed={-15}>
              <div className="flex flex-col gap-5 text-[17px] leading-[30px] text-[#595956]">
                <p>
                  I&apos;m a PhD candidate in Computer Science focused on deep
                  learning for computer vision and natural language processing.
                  My work sits at the intersection of research and real-world
                  impact&mdash;from training models that classify medical images
                  to building LLM-powered agents that help businesses automate
                  support, sales, and internal knowledge retrieval.
                </p>
                <p>
                  I&apos;ve worked with everything from classical ML algorithms
                  to cutting-edge Vision-Language Models, and I love turning
                  complex AI into tools people actually use.
                </p>
              </div>
            </Parallax>

            {/* Stats */}
            <ScrollRevealText>
              <div className="flex gap-12 pt-2">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col gap-1">
                    <span className="text-3xl font-bold text-[#141414]">
                      {s.value}
                    </span>
                    <span className="text-sm text-[#807f7a]">{s.label}</span>
                  </div>
                ))}
              </div>
            </ScrollRevealText>
          </div>
        </div>
        </section>
      </RevealSection>
    </div>
  );
}
