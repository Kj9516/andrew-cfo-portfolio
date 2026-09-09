"use client";

import { useEffect, useRef, type ReactNode } from "react";

// The reports remain readable without JavaScript. Motion stays inside each cell.
export function FinancialScrollAnimation({ children }: { children: ReactNode }) {
  const reportsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reports = reportsRef.current;
    if (!reports || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("report-card-arrived");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.15 });
    reports.querySelectorAll(".report-card").forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return <div className="reports-grid" ref={reportsRef}>{children}</div>;
}
