import { validateEvidence } from "./publication";
import { isManifestAssetApproved, loadEvidenceManifest } from "./manifest";
import type { EvidenceManifest } from "./manifest";
import type { EvidenceEntry } from "./types";

export interface EvidenceGate {
  crmSafe: boolean;
  manifest: EvidenceManifest;
}

export function loadEvidenceGate(): EvidenceGate {
  return {
    crmSafe: validateEvidence().length === 0,
    manifest: loadEvidenceManifest(),
  };
}

export function resolveEntryLink(entry: EvidenceEntry, gate: EvidenceGate): string | null {
  if (!entry.approved || !entry.destination) {
    return null;
  }
  if (!isManifestAssetApproved(gate.manifest, entry.asset)) {
    return null;
  }
  if (entry.qualification === "mvp" && !gate.crmSafe) {
    return null;
  }
  return entry.destination;
}
