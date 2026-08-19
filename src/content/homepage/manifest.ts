import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type EvidenceManifestStatus = "placeholder" | "approved";

export interface EvidenceManifestEntry {
  id: string;
  filename: string;
  alt: string;
  status: EvidenceManifestStatus;
  approved: boolean;
}

export interface EvidenceManifest {
  schemaVersion: number;
  entries: EvidenceManifestEntry[];
}

export function evidenceManifestPath(): string {
  return join(process.cwd(), "public", "images", "experience", "manifest.json");
}

export function loadEvidenceManifest(): EvidenceManifest {
  const path = evidenceManifestPath();
  if (!existsSync(path)) {
    throw new Error("Evidence manifest missing");
  }
  const raw = JSON.parse(readFileSync(path, "utf8")) as EvidenceManifest;
  return raw;
}

export function manifestEntryFor(
  manifest: EvidenceManifest,
  asset: string | null
): EvidenceManifestEntry | undefined {
  if (!asset) {
    return undefined;
  }
  return manifest.entries.find((entry) => entry.filename === asset);
}

export function isManifestAssetApproved(
  manifest: EvidenceManifest,
  asset: string | null
): boolean {
  const entry = manifestEntryFor(manifest, asset);
  return !!entry && entry.status === "approved" && entry.approved;
}
