import Image from "next/image";
import type { HomepageEvidence } from "@/content/homepage/types";
import { loadEvidenceManifest, manifestEntryFor } from "@/content/homepage/manifest";

const AIONProductShowcase = ({ content }: { content: HomepageEvidence }) => {
  const showcase = content.showcase;
  const manifest = loadEvidenceManifest();
  const asset = manifestEntryFor(manifest, showcase.asset);

  return (
    <div className="experience-container">
      <div className="aion-showcase">
        <div className="aion-showcase-copy">
          <p className="experience-eyebrow experience-eyebrow-dark">
            {showcase.role}
          </p>
          <h3 className="aion-showcase-title">{showcase.heading}</h3>
          <p className="exp-lead exp-lead-dark">{showcase.summary}</p>
          {showcase.capabilities.length > 0 ? (
            <ul className="aion-capabilities">
              {showcase.capabilities.map((capability) => (
                <li key={capability.id}>{capability.label}</li>
              ))}
            </ul>
          ) : null}
          <p className="aion-showcase-status">{showcase.statusNote}</p>
        </div>
        <div className="aion-showcase-frame">
          {asset ? (
            <Image
              src={`/images/experience/${asset.filename}`}
              alt=""
              width="640"
              height="360"
              unoptimized
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AIONProductShowcase;
