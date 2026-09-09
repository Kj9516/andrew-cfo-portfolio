"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { financialReportGroups } from "./financialReports";

const cells = financialReportGroups.flatMap((group, groupIndex) =>
  group.rows.map((row, rowIndex) => ({ ...row, groupIndex, rowIndex })),
);
const subscribe = () => () => {};
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (n: number) => n * n * (3 - 2 * n);

export function FinancialScrollAnimation({ children }: { children: ReactNode }) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const reportsRef = useRef<HTMLDivElement>(null);
  const flightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reports = reportsRef.current;
    const layer = flightRef.current;
    const origin = document.querySelector<HTMLElement>("[data-finance-origin]");
    const section = document.querySelector<HTMLElement>("#reports");
    if (!reports || !layer || !origin || !section) return;

    const targets = [...reports.querySelectorAll<HTMLElement>(".report-value")];
    const particles = [...layer.querySelectorAll<HTMLElement>(".report-flight")];
    const cards = [...reports.querySelectorAll<HTMLElement>(".report-card")];
    const protectedElements = [...section.querySelectorAll<HTMLElement>(".reports-intro, .report-demo-note, .report-card header, .report-row > span, .report-takeaway")];
    if (targets.length !== cells.length) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let disposed = false;

    const reset = () => {
      layer.style.visibility = "hidden";
      targets.forEach((target) => target.style.removeProperty("opacity"));
    };

    const update = () => {
      frame = 0;
      if (disposed) return;
      const originRect = origin.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const height = window.innerHeight;
      const width = window.innerWidth;
      if (motion.matches || originRect.top >= height || sectionRect.bottom <= 0) {
        reset();
        return;
      }

      const stacked = getComputedStyle(reports).gridTemplateColumns.split(" ").length === 1;
      const originTop = originRect.top + window.scrollY;
      const protectedRects = protectedElements.map((element) => element.getBoundingClientRect());
      const cardRects = cards.map((card) => card.getBoundingClientRect());
      const targetRects = targets.map((target) => target.getBoundingClientRect());
      layer.style.visibility = "visible";
      // Nothing can escape above the quiet transition at the end of the cases.
      layer.style.clipPath = `inset(${Math.max(0, originRect.top)}px 0 ${Math.max(0, height - sectionRect.bottom)}px 0)`;

      particles.forEach((particle, index) => {
        const cell = cells[index];
        const target = targets[index];
        const rect = targetRects[index];
        const card = cardRects[cell.groupIndex];
        const localOrigin = stacked && cell.groupIndex > 0
          ? card.top + window.scrollY - 150
          : originTop;
        const lane = stacked ? cell.rowIndex % 2 : cell.groupIndex;
        const row = stacked ? Math.floor(cell.rowIndex / 2) : cell.rowIndex;
        const sourceX = stacked
          ? originRect.left + 18 + lane * (originRect.width / 2)
          : originRect.left + 30 + lane * (originRect.width / 3) + (row % 2) * 30;
        const sourceY = localOrigin + 25 + row * (stacked ? 35 : 22);
        const start = localOrigin - height * 0.87;
        const firstTarget = targetRects[cells.findIndex((item) => item.groupIndex === cell.groupIndex)];
        const end = firstTarget.top + window.scrollY - height * 0.55;
        const raw = clamp((window.scrollY - start) / Math.max(180, end - start));
        const progress = smooth(clamp((raw - 0.15) / 0.85));
        const revealed = smooth(clamp(raw / 0.15));
        const settled = raw >= 1;
        const drift = Math.sin(raw * Math.PI * 2 + index * 1.7) * 9 * (1 - progress);
        const x = Math.min(width - rect.width - 12, Math.max(12, sourceX)) * (1 - progress) + rect.left * progress + drift;
        const y = (sourceY - window.scrollY) * (1 - progress) + rect.top * progress;
        const font = getComputedStyle(target);

        particle.style.width = `${rect.width}px`;
        particle.style.height = `${rect.height}px`;
        particle.style.fontSize = font.fontSize;
        particle.style.lineHeight = font.lineHeight;
        particle.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        // Keep headings and row labels clear while numbers travel past them.
        const crossesText = protectedRects.some((area) =>
          x < area.right + 5 && x + rect.width > area.left - 5 && y < area.bottom + 5 && y + rect.height > area.top - 5,
        );
        const opacity = settled || crossesText ? 0 : revealed * (0.7 + progress * 0.3);
        particle.style.opacity = String(opacity);
        target.style.opacity = settled ? "1" : String(smooth(clamp((raw - 0.94) / 0.06)));
      });
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    document.fonts.ready.then(() => { if (!disposed) schedule(); });
    update();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      reset();
    };
  }, [mounted]);

  return (
    <>
      <div className="reports-grid" ref={reportsRef}>{children}</div>
      {mounted && createPortal(
        <div className="report-flight-layer" ref={flightRef} aria-hidden="true">
          {cells.map((cell, index) => <span className={`report-flight report-flight-${cell.tone}`} key={index}>{cell.value}</span>)}
        </div>, document.body,
      )}
    </>
  );
}
