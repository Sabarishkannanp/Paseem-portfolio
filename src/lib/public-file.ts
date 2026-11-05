import fs from "node:fs";
import path from "node:path";

/** True if /public<rel> exists (checked at build time, case-sensitive on Vercel). */
export function publicFileExists(rel: string) {
  return fs.existsSync(path.join(process.cwd(), "public", rel));
}

/** First existing /public file for a base path + extensions, or null. */
export function findPublicFile(base: string, exts = ["svg", "png", "webp", "jpg", "jpeg"]) {
  for (const ext of exts) {
    const rel = `${base}.${ext}`;
    if (publicFileExists(rel)) return rel;
  }
  return null;
}
