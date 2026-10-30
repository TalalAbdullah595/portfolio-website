import { readdirSync } from "node:fs";
import { join } from "node:path";

/* Server/build-time only — never import this from a "use client" file.
   Reads public/projects/<id>/ so dropping a screenshot in is all it takes.
   Filenames sort into display order (cover, shot1, shot2). */
export function projectImages(id: string): string[] {
  try {
    return readdirSync(join(process.cwd(), "public", "projects", id))
      .filter((f) => /\.(webp|avif|png|jpe?g)$/i.test(f))
      .sort()
      .map((f) => `/projects/${id}/${f}`);
  } catch {
    return []; // no folder yet
  }
}

/* Card thumbnails fall back to the monogram when a project has no images,
   so this maps id -> first image or undefined. */
export function coverMap(ids: string[]): Record<string, string | undefined> {
  return Object.fromEntries(ids.map((id) => [id, projectImages(id)[0]]));
}
