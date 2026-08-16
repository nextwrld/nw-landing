"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import TrackedLink from "@/components/Common/TrackedLink";
import { useLocale } from "@/hooks/useLocale";
import { localizedHref } from "@/utils/i18n-url";
import { nextMenuState, shellA11yCopy } from "@/components/Header/menuData";
import type { HomepageContent } from "@/content/homepage/types";

import type { Menu } from "@/types/menu";

/**
 * V3 shell header. Navigation is route-based (no anchors, no scrollspy):
 * top-level items render as links and submenu items (services ×3) render as a
 * dropdown on desktop and a nested list on mobile.
 */
const ExperienceHeader = ({
  menu,
  content,
  diagnosisCta,
}: {
  menu: Menu[];
  content: HomepageContent;
  diagnosisCta?: { label: string; href: string };
}) => {
  const locale = useLocale();
  const a11yCopy = shellA11yCopy(locale);
  const pathUrl = usePathname();
  const navLabel = locale === "es" ? "Navegación principal" : "Main navigation";
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const togglerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setNavbarOpen(false);
    togglerRef.current?.focus();
  };

  useEffect(() => {
    if (!navbarOpen) return;
    const onDocumentKeyDown = (event: globalThis.KeyboardEvent) => {
      if (nextMenuState(true, event.key) === false) {
        closeMenu();
      }
    };
    window.addEventListener("keydown", onDocumentKeyDown);
    return () => window.removeEventListener("keydown", onDocumentKeyDown);
  }, [navbarOpen]);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY >= 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        {a11yCopy.skipToContent}
      </a>
      <header
        className={`experience-header ${sticky ? "experience-header-scrolled" : ""}`}
      >
        <div className="experience-container experience-header-inner">
          <Link href={localizedHref(locale, "/")} className="experience-brand">
            <Image
              src="/images/logo/degradado.svg"
              alt="Next Wrld"
              width={36}
              height={10}
              className="h-auto w-9"
            />
            <span>NEXT WRLD</span>
          </Link>

          <nav className="experience-nav-desktop" aria-label={navLabel}>
            {menu.map((item) => (
              <div key={item.id} className="experience-nav-item">
                {item.path ? (
                  <Link
                    href={item.path}
                    aria-current={pathUrl === item.path ? "page" : undefined}
                    className={`experience-nav-link ${
                      pathUrl === item.path ? "experience-nav-active" : ""
                    }`}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <span className="experience-nav-link" aria-haspopup="true">
                    {item.title}
                  </span>
                )}
                {item.submenu && item.submenu.length > 0 ? (
                  <ul className="experience-nav-submenu">
                    {item.submenu.map((child) => (
                      <li key={child.id}>
                        <Link href={child.path ?? "#"}>{child.title}</Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="experience-header-actions">
            <div className="experience-lang">
              <LanguageSelector />
            </div>
            {diagnosisCta ? (
              <TrackedLink
                href={diagnosisCta.href}
                event="diagnosis_cta_click"
                params={{ cta_location: "header", locale }}
                className="exp-btn exp-btn-primary experience-header-cta"
              >
                {diagnosisCta.label}
              </TrackedLink>
            ) : null}
            <button
              ref={togglerRef}
              onClick={() => setNavbarOpen(!navbarOpen)}
              id="experienceMenuToggle"
              aria-label={a11yCopy.menuToggle}
              aria-expanded={navbarOpen}
              aria-controls="experienceMenu"
              className={`experience-menu-toggle ${
                navbarOpen ? "experience-menu-open" : ""
              }`}
            >
              <span className="experience-menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        <div
          id="experienceMenu"
          className={`experience-mobile-menu ${
            navbarOpen ? "experience-mobile-menu-open" : ""
          }`}
        >
          <ul className="experience-mobile-nav">
            {menu.map((item) => (
              <li key={item.id}>
                {item.path ? (
                  <Link href={item.path} onClick={closeMenu}>
                    {item.title}
                  </Link>
                ) : (
                  <span className="experience-mobile-parent">{item.title}</span>
                )}
                {item.submenu && item.submenu.length > 0 ? (
                  <ul className="experience-mobile-submenu">
                    {item.submenu.map((child) => (
                      <li key={child.id}>
                        <Link href={child.path ?? "#"} onClick={closeMenu}>
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="experience-mobile-actions">
            {diagnosisCta ? (
              <TrackedLink
                href={diagnosisCta.href}
                event="diagnosis_cta_click"
                params={{ cta_location: "header", locale }}
                className="exp-btn exp-btn-primary"
              >
                {diagnosisCta.label}
              </TrackedLink>
            ) : null}
            <LanguageSelector />
          </div>
        </div>
      </header>
    </>
  );
};

export default ExperienceHeader;
