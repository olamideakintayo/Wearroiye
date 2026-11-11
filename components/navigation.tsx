"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

type NavigationProps = {
  onReplay: () => void;
};

const links = [
  ["Becoming", "#becoming"],
  ["The drop", "#drop"],
  ["In motion", "#in-motion"],
  ["The garden", "#garden"],
];

export function Navigation({ onReplay }: NavigationProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Wearroiye home">
        wear<span>roiye</span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        <button type="button" onClick={onReplay}>Replay film</button>
      </nav>
      <button
        className="menu-toggle"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {open ? "Close" : "Menu"}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
          >
            {links.map(([label, href], index) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <span>0{index + 1}</span>{label}
              </motion.a>
            ))}
            <button type="button" onClick={() => { setOpen(false); onReplay(); }}>Replay launch film</button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
