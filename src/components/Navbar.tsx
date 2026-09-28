"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { Heart } from "lucide-react";
import Logo from "@/components/Logo";
import { navLinks, site } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation.
  // Adjusted during render rather than in an effect so React re-renders once
  // instead of committing an extra cascading render.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav
      className={`navbar${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-menu-open" : ""}`}
      aria-label="Main navigation"
    >
      <div className="container">
        <Link href="/" className="navbar-brand" aria-label={`${site.name} — home`}>
          <Logo variant="mark" size={40} className="brand-mark" />
          <span>
            {site.shortName}
            <span className="brand-sub">NGO · Rwanda</span>
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse${menuOpen ? " show" : ""}`} id="main-nav">
          <ul className="navbar-nav ms-auto">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link${isActive(link.href) ? " active" : ""}`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="nav-item ms-xl-3">
              <Link href="/donate" className="btn btn-accent" aria-current={isActive("/donate") ? "page" : undefined}>
                <Heart size={15} aria-hidden />
                Donate
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <motion.div className="nav-progress" style={{ scaleX: progress }} aria-hidden />
    </nav>
  );
}
