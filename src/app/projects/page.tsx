import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ProjectsArchive from "@/components/ProjectsArchive";
import PageFooter from "@/components/PageFooter";

export const metadata: Metadata = {
  title: "Projects — Kai Voss",
  description: "A complete look at what I've built — the reusable systems I script and the full games they power.",
};

export default function ProjectsPage() {
  return (
    <>
      <Nav variant="projects" />
      <main className="page wrap">
        <ProjectsArchive />
        <PageFooter className="arc-foot" />
      </main>
    </>
  );
}
