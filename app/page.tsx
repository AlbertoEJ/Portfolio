import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Toolkit from "@/components/toolkit";
import Contact from "@/components/contact";

async function getScholarStats(): Promise<{ citations: number; publications: number }> {
  const fallback = { citations: 14, publications: 10 };
  try {
    const key = process.env.SEARCHAPI_KEY;
    if (!key) return fallback;
    const res = await fetch(
      `https://www.searchapi.io/api/v1/search?engine=google_scholar_author&author_id=5vIyPXwAAAAJ&api_key=${key}`,
      { next: { revalidate: 86400 } }
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

export default async function Home() {
  const scholar = await getScholarStats();

  return (
    <div id="app-wrapper">
      <Navbar />
      <div id="app-content">
        <Hero />
        <About citations={scholar.citations} publications={scholar.publications} />
        <Toolkit />
        <Contact />
      </div>
    </div>
  );
}
