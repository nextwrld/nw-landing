import Image from "next/image";
import Link from "next/link";
import TrackedLink from "@/components/Common/TrackedLink";
import { buildApprovedNav, socialLinkLabel } from "@/components/Header/menuData";
import { localizedHref } from "@/utils/i18n-url";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { HomepageContent } from "@/content/homepage/types";

const ExperienceFooter = ({
  content,
  dict,
  locale,
}: {
  content: HomepageContent;
  dict: Dictionary;
  locale: Locale;
}) => {
  const copy = dict.experienceFooter;
  const approvedNav = buildApprovedNav(content);
  const companyItems = content.nav.items.filter((item) => item.id !== "services");
  const servicesItems = content.capabilities.items;

  return (
    <footer className="experience-footer">
      <div className="experience-container">
        <div className="experience-footer-grid">
          <div className="experience-footer-brand">
            <Link href={localizedHref(locale, "/")} className="experience-brand">
              <Image
                src="/images/logo/blanco.svg"
                alt="Next Wrld"
                width={90}
                height={20}
                className="h-auto w-16"
              />
              <span>NEXT WRLD</span>
            </Link>
            <p className="experience-footer-desc">{content.seo.description}</p>
            <div className="experience-footer-social">
              <Link
                aria-label={socialLinkLabel(locale, "LinkedIn")}
                href="https://www.linkedin.com/company/next-wrld/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                  aria-hidden="true"
                >
                  <path d="M18.8065 1.8335H3.16399C2.42474 1.8335 1.83334 2.42489 1.83334 3.16414V18.8362C1.83334 19.5459 2.42474 20.1668 3.16399 20.1668H18.7473C19.4866 20.1668 20.078 19.5754 20.078 18.8362V3.13457C20.1371 2.42489 19.5457 1.8335 18.8065 1.8335ZM7.24464 17.4168H4.55379V8.69371H7.24464V17.4168ZM5.88443 7.48135C4.99733 7.48135 4.31721 6.77167 4.31721 5.91414C4.31721 5.05661 5.0269 4.34694 5.88443 4.34694C6.74196 4.34694 7.45163 5.05661 7.45163 5.91414C7.45163 6.77167 6.8011 7.48135 5.88443 7.48135ZM17.4463 17.4168H14.7554V13.1883C14.7554 12.183 14.7258 10.8523 13.336 10.8523C11.9167 10.8523 11.7097 11.976 11.7097 13.0996V17.4168H9.01884V8.69371H11.6506V9.90608H11.6801C12.0645 9.1964 12.9221 8.48672 14.2527 8.48672C17.0027 8.48672 17.5054 10.2609 17.5054 12.6856V17.4168H17.4463Z" />
                </svg>
              </Link>
              <Link
                aria-label={socialLinkLabel(locale, "X")}
                href="https://x.com/NextWrld30538"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                  aria-hidden="true"
                >
                  <path d="M2 2h5.3l4.9 6.5L17.9 2H22l-8.1 9 8.5 11h-5.3l-5.2-6.9L6.1 22H2l8.6-9.2L2 2z" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="experience-footer-col">
            <h2 className="experience-footer-col-title">{copy.services}</h2>
            <ul className="experience-footer-links">
              {servicesItems.map((item) => (
                <li key={item.id}>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="experience-footer-col">
            <h2 className="experience-footer-col-title">{copy.company}</h2>
            <ul className="experience-footer-links">
              {companyItems.map((item) => {
                const nav = approvedNav.find(
                  (entry) => entry.title === item.label
                );
                return (
                  <li key={item.id}>
                    {nav ? (
                      <a href={nav.path}>{item.label}</a>
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="experience-footer-col">
            <h2 className="experience-footer-col-title">{copy.contact}</h2>
            <ul className="experience-footer-links">
              <li>
                <TrackedLink
                  href={localizedHref(locale, "/#diagnosis")}
                  event="diagnosis_cta_click"
                  params={{ cta_location: "diagnosis_section", locale }}
                >
                  {copy.diagnosis}
                </TrackedLink>
              </li>
              <li>
                <span>{copy.whatsapp}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="experience-footer-legal">
          <div className="experience-footer-legal-links">
            <Link href={localizedHref(locale, "/privacy-policy")}>
              {dict.footer.privacy_policy}
            </Link>
            <Link href={localizedHref(locale, "/terms-of-service")}>
              {dict.footer.terms_of_service}
            </Link>
            <Link href={localizedHref(locale, "/legal-notice")}>
              {dict.footer.legal_notice}
            </Link>
          </div>
          <p className="experience-footer-copy">
            © {new Date().getFullYear()} Next Wrld
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ExperienceFooter;
