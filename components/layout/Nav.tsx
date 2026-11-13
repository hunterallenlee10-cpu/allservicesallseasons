"use client";

import Link from "next/link";
import { Menu, MessageSquare, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { business } from "@/lib/business";
import { Logo } from "@/components/ui/Logo";
import { QuoteButton, btnGhost } from "@/components/ui/buttons";
import { usePunchList } from "@/components/PunchList/PunchListProvider";

const LINKS = [
  { href: "/#seasons", label: "Seasons" },
  { href: "/#start-to-finish", label: "Start to Finish" },
  { href: "/#services", label: "Services" },
  { href: "/#our-work", label: "Our Work" },
  { href: "/#meet-eric", label: "Meet Eric" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sheet = useRef<HTMLDialogElement>(null);
  const { open } = usePunchList();

  useEffect(() => {
    const dialog = sheet.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog.open) dialog.close();
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-ink">
      <div className="shell flex h-[68px] items-center gap-3">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${business.name}, home`}>
          <Logo className="h-14" priority decorative />
          <span className="display text-[0.8125rem] leading-[1.15] tracking-[0.02em] nav:text-[0.875rem]">
            All Services
            <br />
            All Seasons
          </span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden nav:block">
          <ul className="flex items-center gap-6">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-muted transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 nav:ml-4 nav:gap-4">
          <a
            href={business.phoneHref}
            className="min-h-11 items-center gap-2 whitespace-nowrap font-semibold text-paper hover:text-lime max-md:hidden md:inline-flex"
          >
            <Phone className="size-4" strokeWidth={2} aria-hidden="true" />
            {business.phoneDisplay}
          </a>
          <a
            href={business.phoneHref}
            aria-label={`Call ${business.phoneDisplay}`}
            className="grid size-11 place-items-center rounded-[10px] border border-rule text-paper hover:border-paper md:hidden"
          >
            <Phone className="size-[18px]" strokeWidth={2} aria-hidden="true" />
          </a>
          <div className="hidden md:block">
            <QuoteButton compact />
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open the menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="grid size-11 place-items-center rounded-[10px] border border-rule text-paper hover:border-paper nav:hidden"
          >
            <Menu className="size-5" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>

      <dialog
        ref={sheet}
        aria-label="Menu"
        onClose={() => setMenuOpen(false)}
        className="fixed inset-0 m-0 h-dvh w-full bg-ink p-0 text-paper"
      >
        <div className="flex h-full flex-col">
          <div className="shell flex h-[68px] shrink-0 items-center justify-between border-b border-rule">
            <span className="flex items-center gap-3">
              <Logo className="h-14" decorative />
              <span className="display text-[0.8125rem] leading-[1.15] tracking-[0.02em]">
                All Services
                <br />
                All Seasons
              </span>
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close the menu"
              className="grid size-11 place-items-center rounded-[10px] border border-rule hover:border-paper"
            >
              <X className="size-5" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Menu" className="shell min-h-0 flex-1 overflow-y-auto py-4">
            <ul>
              {[...LINKS, { href: "/contact", label: "Contact" }].map((link, i) => (
                <li key={link.href} className="border-b border-dashed border-rule">
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[60px] items-center gap-4 py-2"
                  >
                    <span className="label-caps w-6 text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display text-[1.375rem]">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="shell grid shrink-0 grid-cols-2 gap-3 border-t border-rule py-4">
            <a href={business.phoneHref} className={`${btnGhost} px-3`}>
              <Phone className="size-4" strokeWidth={2} aria-hidden="true" />
              Call
            </a>
            <a href={business.smsHref} className={`${btnGhost} px-3`}>
              <MessageSquare className="size-4" strokeWidth={2} aria-hidden="true" />
              Text
            </a>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                // Let the menu dialog close before the Punch List opens.
                window.setTimeout(() => open(), 0);
              }}
              className="label-caps col-span-2 min-h-[52px] rounded-[10px] bg-lime px-6 text-[0.8125rem] text-ink"
            >
              Get My Quote
            </button>
          </div>
        </div>
      </dialog>
    </header>
  );
}
