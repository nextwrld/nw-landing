import Image from "next/image";
import type { HomepageEvidence } from "@/content/homepage/types";
import { loadEvidenceManifest, manifestEntryFor } from "@/content/homepage/manifest";

const AIONProductShowcase = ({ content }: { content: HomepageEvidence }) => {
  const showcase = content.showcase;
  const manifest = loadEvidenceManifest();
  const asset = manifestEntryFor(manifest, showcase.asset);

  return (
    <div className="aion-showcase">
      <h3>{showcase.heading}</h3>
      <p>{showcase.role}</p>
      <p>{showcase.summary}</p>
      {asset ? (
        <Image
          src={`/images/experience/${asset.filename}`}
          alt=""
          width="640"
          height="360"
          unoptimized
        />
      ) : null}
      {showcase.capabilities.length > 0 ? (
        <ul className="aion-capabilities">
          {showcase.capabilities.map((capability) => (
            <li key={capability.id}>{capability.label}</li>
          ))}
        </ul>
      ) : null}
      <p>{showcase.statusNote}</p>
    </div>
  );
};

export default AIONProductShowcase;
