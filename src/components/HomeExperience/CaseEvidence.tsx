import Image from "next/image";
import type { HomepageEvidence } from "@/content/homepage/types";
import { loadEvidenceGate, resolveEntryLink } from "@/content/homepage/evidence";
import { manifestEntryFor } from "@/content/homepage/manifest";

const CaseEvidence = ({ content }: { content: HomepageEvidence }) => {
  const gate = loadEvidenceGate();

  return (
    <ul className="evidence-cards">
      {content.items.map((entry) => {
        const link = resolveEntryLink(entry, gate);
        const asset = manifestEntryFor(gate.manifest, entry.asset);
        return (
          <li key={entry.id} className="evidence-card">
            <h3>{entry.heading}</h3>
            {asset ? (
              <Image
                src={`/images/experience/${asset.filename}`}
                alt=""
                width="640"
                height="360"
                unoptimized
              />
            ) : null}
            {entry.claim ? <p>{entry.claim}</p> : null}
            {link ? (
              <a href={link}>{entry.claim ?? entry.heading}</a>
            ) : (
              <span>{entry.claim ?? entry.heading}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default CaseEvidence;
