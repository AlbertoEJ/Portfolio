import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Toolkit from "@/components/toolkit";
import Projects from "@/components/projects";
import Contact from "@/components/contact";

async function getScholarStats(): Promise<{ citations: number; publications: number }> {
  const fallback = { citations: 14, publications: 10 };
  try {
    const key = process.env.SEARCHAPI_KEY;
    if (!key) return fallback;
    const res = await fetch(
      `https://www.searchapi.io/api/v1/search?engine=google_scholar_author&author_id=5vIyPXwAAAAJ&api_key=${key}`,
      { next: { revalidate: 2592000 } }
    );
    if (!res.ok) return fallback;
    const data = await res.json();
    const rows = data.cited_by?.table?.rows ?? [];
    const citationRow = rows.find((r: string[]) => r[0] === "Citations");
    const citations = citationRow ? parseInt(citationRow[1], 10) : fallback.citations;
    const publications = data.articles?.length ?? fallback.publications;
    return { citations, publications };
  } catch {
    return fallback;
  }
}

const EXCLUDED_REPOS = ["Portfolio"];

async function getGitHubRepos() {
  try {
    const res = await fetch(
      "https://api.github.com/users/AlbertoEJ/repos?sort=updated&per_page=100&type=public",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const filtered = data.filter(
      (r: { name: string; fork: boolean }) =>
        !r.fork && !EXCLUDED_REPOS.includes(r.name)
    );

    // Fetch all languages for each repo in parallel
    const withLanguages = await Promise.all(
      filtered.map(async (repo: { name: string; languages_url: string }) => {
        try {
          const langRes = await fetch(repo.languages_url, { next: { revalidate: 3600 } });
          if (!langRes.ok) return { ...repo, languages: {} };
          const languages = await langRes.json();
          return { ...repo, languages };
        } catch {
          return { ...repo, languages: {} };
        }
      })
    );

    return withLanguages;
  } catch {
    return [];
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alberto Espinosa",
  url: "https://albertoej.com",
  email: "hola@albertoej.com",
  jobTitle: "AI/ML Engineer & Researcher",
  description:
    "PhD candidate in Computer Science specializing in deep learning, computer vision, NLP, and LLM solutions.",
  sameAs: [
    "https://github.com/AlbertoEJ",
    "https://www.linkedin.com/in/albertoespinosaj/",
    "https://scholar.google.com/citations?user=5vIyPXwAAAAJ&hl=en",
  ],
  knowsAbout: [
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Natural Language Processing",
    "Large Language Models",
  ],
};

export default async function Home() {
  const [scholar, repos] = await Promise.all([
    getScholarStats(),
    getGitHubRepos(),
  ]);

  return (
    <div id="app-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="app-content">
        <Hero />
        <About citations={scholar.citations} publications={scholar.publications} />
        <Toolkit />
        <Projects repos={repos} />
        <Contact />
      </main>
    </div>
  );
}
