import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ProjectsArchive from "@/components/ProjectsArchive";
import PageFooter from "@/components/PageFooter";
import { coverMap } from "@/lib/images";
import { SITE, SYSTEMS, GAMES } from "@/data/content";

export const metadata: Metadata = {
  title: `Projects · ${SITE.name}`,
  description: "A complete look at what I've built: the reusable systems I script and the full games they power.",
};

export default function ProjectsPage() {
  return (
    <>
      <Nav variant="projects" />
      <main className="page wrap">
        {/* resolved here because the archive is a client component and
            cannot read the filesystem itself */}
        <ProjectsArchive covers={coverMap([...SYSTEMS, ...GAMES].map((p) => p.id))} />
        <PageFooter className="arc-foot" />
      </main>
    </>
  );
}
