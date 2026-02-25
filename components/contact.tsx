"use client";

import { RevealSection, ScrollRevealText, FadeIn } from "@/components/animate";

const socials = [
  { label: "GitHub", href: "https://github.com/AlbertoEJ" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/albertoespinosaj/" },
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=5vIyPXwAAAAJ&hl=en",
  },
];

export default function Contact() {
  return (
    <RevealSection>
      <section
        id="contact"
        className="flex min-h-[600px] flex-col items-center justify-between bg-[#141414] px-8 py-24 text-center md:px-16 lg:px-[140px]"
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-10">
          <ScrollRevealText>
            <span className="text-sm font-medium tracking-[2px] text-[#807f7a]">
              get in touch
            </span>
          </ScrollRevealText>

          <ScrollRevealText>
            <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl md:leading-[74px]">
              Have an idea?
              <br />
              Let&apos;s talk.
            </h2>
          </ScrollRevealText>

          <FadeIn delay={0.2}>
            <a
              href="mailto:hola@albertoej.com"
              className="text-lg text-[#999994] transition-colors hover:text-white md:text-[22px]"
            >
              hola@albertoej.com
            </a>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap justify-center gap-8 md:gap-10">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-medium text-[#807f7a] transition-colors hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Footer */}
        <FadeIn delay={0.4}>
          <div className="mt-16 w-full">
            <div className="mb-6 h-px bg-[#333]" />
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
              <span className="text-[13px] text-[#666661]">
                &copy; 2026 Alberto Espinosa
              </span>
              <span className="text-[13px] text-[#666661]">
                designed with figma + claude
              </span>
            </div>
          </div>
        </FadeIn>
      </section>
    </RevealSection>
  );
}
