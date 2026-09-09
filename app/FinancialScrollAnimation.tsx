"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { financialReportGroups } from "./financialReports";

const cells = financialReportGroups.flatMap((group, groupIndex) =>
  group.rows.map((row, rowIndex) => ({ ...row, groupIndex, rowIndex })),
);
// Stable independent seeds: no rows, columns or report grouping in the cloud.
const seed = (index: number, salt: number) => {
  const value = Math.sin((index + 1) * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
};
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
    const protectedElements = [...document.querySelectorAll<HTMLElement>(".reports-intro, .report-demo-note, .report-card header, .report-row > span, .report-takeaway, #cases .case-card h3, #cases .case-card-body > p, #cases .case-card-action, #cases .section-link-row")];
    if (targets.length !== cells.length) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let disposed = false;
    let dirty = true;
    let geometry: ReturnType<typeof measure> | null = null;
    const measure = () => ({
      origin: origin.getBoundingClientRect(),
      section: section.getBoundingClientRect(),
      stacked: getComputedStyle(reports).gridTemplateColumns.split(" ").length === 1,
      targets: targets.map((target) => target.getBoundingClientRect()),
      cards: cards.map((card) => card.getBoundingClientRect()),
      protected: protectedElements.map((element) => element.getBoundingClientRect()),
      fonts: targets.map((target) => {
        const style = getComputedStyle(target);
        return { size: style.fontSize, line: style.lineHeight };
      }),
    });

    const reset = () => {
      layer.style.visibility = "hidden";
      targets.forEach((target) => target.style.removeProperty("opacity"));
    };

    const update = (time: number) => {
      frame = 0;
      if (disposed) return;
      if (dirty || !geometry) {
        geometry = measure();
        dirty = false;
      }
      const height = window.innerHeight;
      const width = window.innerWidth;
      const { origin: originRect, section: sectionRect, targets: targetRects, cards: cardRects } = geometry;
      if (motion.matches || document.hidden || originRect.top >= height * 0.9 || sectionRect.bottom <= 0) {
        reset();
        return;
      }

      layer.style.visibility = "visible";
      // The trigger is local, but the cloud is free to move across the viewport.
      layer.style.clipPath = `inset(0 0 ${Math.max(0, height - sectionRect.bottom)}px 0)`;
      const reveal = smooth(clamp((height * 0.9 - originRect.top) / (height * 0.23)));
      const seconds = time / 1000;
      let flying = false;

      particles.forEach((particle, index) => {
        const cell = cells[index];
        const target = targets[index];
        const rect = targetRects[index];
        const card = cardRects[cell.groupIndex];
        const start = (geometry!.stacked ? card.top : cardRects[0].top) - height * (1.08 + seed(index, 6) * 0.18);
        const end = rect.top - height * (0.5 + seed(index, 7) * 0.12);
        const raw = clamp(-start / Math.max(180, end - start));
        const progress = smooth(raw);
        const settled = raw >= 1;
        const phase = seed(index, 1) * Math.PI * 2;
        const speed = 0.18 + seed(index, 2) * 0.22;
        const rangeX = Math.max(1, width - rect.width - 36);
        const rangeY = Math.max(1, height - rect.height - 90);
        const roamX = 18 + (0.5 + 0.46 * Math.sin(seconds * speed + phase)) * rangeX;
        const roamY = 45 + (0.5 + 0.44 * Math.sin(seconds * speed * 0.73 + seed(index, 3) * Math.PI * 2)) * rangeY;
        // Different curved approaches gradually straighten as each value docks.
        const arc = Math.sin(progress * Math.PI) * (1 - progress);
        const bendX = (seed(index, 4) - 0.5) * Math.min(width * 0.48, 450);
        const bendY = (seed(index, 5) - 0.5) * height * 0.45;
        const x = roamX * (1 - progress) + rect.left * progress + bendX * arc;
        const y = roamY * (1 - progress) + rect.top * progress + bendY * arc;
        const rotation = (Math.sin(seconds * speed + phase) * 13 + (seed(index, 8) - 0.5) * 16) * (1 - progress);
        const scale = 1 + (0.18 + seed(index, 9) * 0.55) * (1 - progress);
        const font = geometry!.fonts[index];
        particle.style.width = `${rect.width}px`;
        particle.style.height = `${rect.height}px`;
        particle.style.fontSize = font.size;
        particle.style.lineHeight = font.line;
        particle.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`;
        const crossesText = geometry!.protected.some((area) =>
          x < area.right && x + rect.width > area.left && y < area.bottom && y + rect.height > area.top,
        );
        const handoff = smooth(clamp((raw - 0.96) / 0.04));
        const opacity = reveal * (crossesText && progress < 0.9 ? 0.24 : 0.7 + progress * 0.3) * (1 - handoff);
        particle.style.opacity = settled ? "0" : String(opacity);
        target.style.opacity = String(settled ? 1 : handoff);
        if (!settled) flying = true;
      });
      // The chaos keeps drifting even when scrolling pauses; stop when assembled.
      if (flying) frame = window.requestAnimationFrame(update);
    };

    const schedule = () => {
      dirty = true;
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    document.addEventListener("visibilitychange", schedule);
    document.fonts.ready.then(() => { if (!disposed) schedule(); });
    schedule();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      document.removeEventListener("visibilitychange", schedule);
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
