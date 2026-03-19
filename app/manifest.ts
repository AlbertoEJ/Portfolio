import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alberto Espinosa — AI/ML Engineer & Researcher",
    short_name: "Alberto E.",
    description:
      "PhD candidate in Computer Science specializing in deep learning, computer vision, NLP, and LLM solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9f8f6",
    theme_color: "#141414",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
