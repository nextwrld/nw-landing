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
import { navAnchorPath } from "@/content/homepage";
import type { HomepageContent } from "@/content/homepage/types";

import type { Menu } from "@/types/menu";

const SCROLLSPY_BY_SECTION: Record<string, string> = {
  capabilities: "services",
  method: "method",
  evidence: "cases",
  differentiation: "about",
};

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
  const [activeNavPath, setActiveNavPath] = useState<string | null>(null);
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

  useEffect(() => {
    const sectionIds = Object.keys(SCROLLSPY_BY_SECTION);
    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (typeof IntersectionObserver === "undefined" || targets.length === 0) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) {
          return;
        }
        const key = SCROLLSPY_BY_SECTION[visible.target.id];
        const destination = navAnchorPath(content, key);
        if (destination) {
          setActiveNavPath(localizedHref(locale, destination));
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [locale, content]);

  const handleAnchorClick = (href: string) => {
    const targetId = href.split("#")[1];
    if (!targetId) return;
    const element = document.getElementById(targetId);
    if (element) {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      element.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

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
              <Link
                key={item.id}
                href={item.path ?? "#"}
                onClick={(e) => {
                  if (item.path?.includes("#")) {
                    e.preventDefault();
                    handleAnchorClick(item.path);
                  }
                }}
                aria-current={pathUrl === item.path ? "page" : undefined}
                className={`experience-nav-link ${
                  pathUrl === item.path || activeNavPath === item.path
                    ? "experience-nav-active"
                    : ""
                }`}
              >
                {item.title}
              </Link>
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
                <Link
                  href={item.path ?? "#"}
                  onClick={() => {
                    if (item.path?.includes("#")) {
                      handleAnchorClick(item.path);
                    }
                    closeMenu();
                  }}
                >
                  {item.title}
                </Link>
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
