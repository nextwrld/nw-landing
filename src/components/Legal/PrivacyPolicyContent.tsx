import type { Dictionary } from "@/i18n/dictionaries";

const PrivacyPolicyContent = ({ dict }: { dict: Dictionary["privacyPolicy"] }) => {
  const rights = dict.rights;
  const dataCollected = dict.dataCollected;
  const usage = dict.usage;

  return (
    <section className="relative z-10 bg-white py-16 dark:bg-dark">
      <div className="container">
        <div className="mx-auto max-w-3xl prose prose-lg dark:prose-invert">
          <p className="text-sm text-gray-500 dark:text-gray-400">{dict.updated}</p>

          <h2>{dict.title}</h2>
          <p>{dict.intro}</p>

          <h3>{dict.dataCollectedTitle}</h3>
          <ul>
            {dataCollected.map((item, idx) => (
              <li key={`dc-${idx}`}>{item}</li>
            ))}
          </ul>

          <h3>{dict.usageTitle}</h3>
          <ul>
            {usage.map((item, idx) => (
              <li key={`us-${idx}`}>{item}</li>
            ))}
          </ul>

          <h3>{dict.cookiesTitle}</h3>
          <p>{dict.cookies}</p>

          <h3>{dict.legalBasisTitle}</h3>
          <p>{dict.legalBasis}</p>

          <h3>{dict.sharingTitle}</h3>
          <p>{dict.sharing}</p>

          <h3>{dict.retentionTitle}</h3>
          <p>{dict.retention}</p>

          <h3>{dict.rightsTitle}</h3>
          <ul>
            {rights.map((item, idx) => (
              <li key={`ri-${idx}`}>{item}</li>
            ))}
          </ul>

          <h3>{dict.securityTitle}</h3>
          <p>{dict.security}</p>

          <h3>{dict.contactTitle}</h3>
          <p>
            {dict.contact} {" "}
            <a href="mailto:privacy@nextwrld.com">privacy@nextwrld.com</a>.
          </p>

          <h3>{dict.changesTitle}</h3>
          <p>{dict.changes}</p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyContent;