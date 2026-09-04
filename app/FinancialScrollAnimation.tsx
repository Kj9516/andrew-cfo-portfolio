"use client";

import { useEffect, useRef } from "react";
import { financialReportGroups } from "./financialReports";

const cells = financialReportGroups.flatMap((group) => group.rows);

const starts = [
  [0.04, 0.24],
  [0.62, 0.26],
  [0.82, 0.13],
  [0.78, 0.64],
  [0.39, 0.84],
  [0.91, 0.82],
  [0.14, 0.68],
  [0.55, 0.58],
  [0.06, 0.88],
  [0.69, 0.9],
  [0.27, 0.38],
  [0.89, 0.42],
  [0.48, 0.18],
  [0.18, 0.12],
  [0.73, 0.48],
  [0.34, 0.72],
  [0.58, 0.78],
  [0.03, 0.52],
  [0.86, 0.7],
  [0.43, 0.28],
  [0.22, 0.8],
] as const;

const revealAt = [0, 0, 0, 0, 0, 0, 0.16, 0.21, 0.26, 0.31, 0.36, 0.41, 0.46, 0.51, 0.55, 0.59, 0.63, 0.67, 0.7, 0.73, 0.76];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const ease = (time: number) => (time < 0.5 ? 4 * time * time * time : 1 - Math.pow(-2 * time + 2, 3) / 2);
const mix = (start: number, end: number, amount: number) => start + (end - start) * amount;

export function FinancialScrollAnimation() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const reportSection = document.querySelector<HTMLElement>(".reports-section");
    const aboutSection = document.querySelector<HTMLElement>(".about-section");
    const slots = [...document.querySelectorAll<HTMLElement>("[data-finance-slot]")];

    if (!layer || !reportSection || !aboutSection || slots.length !== cells.length) return;

    const animatedCells = [...layer.querySelectorAll<HTMLElement>(".money-cell")];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;
    let maxScroll = 1;

    const update = () => {
      ticking = false;

      const y = window.scrollY;
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;
      const aboutTop = aboutSection.offsetTop;
      const reportTop = reportSection.offsetTop;
      const gatherStart = Math.max(viewportH * 0.65, aboutTop - viewportH * 0.78);
      const gatherEnd = reportTop + Math.min(190, viewportH * 0.16);
      const global = clamp(y / maxScroll);
      const settling = y > reportTop - viewportH * 0.82;

      layer.classList.toggle("is-settling", settling);

      animatedCells.forEach((cell, index) => {
        const slot = slots[index];
        const rect = slot.getBoundingClientRect();
        const width = rect.width || 150;
        const isSlotVisible = rect.top < viewportH * 0.92 && rect.bottom > viewportH * 0.08;

        if (reduced) {
          cell.style.setProperty("--money-cell-width", `${width}px`);
          cell.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
          cell.style.opacity = isSlotVisible ? "1" : "0";
          cell.classList.toggle("settled", isSlotVisible);
          return;
        }

        const group = index < 6 ? 0 : index < 14 ? 1 : 2;
        const localStart = gatherStart + (group - 1) * viewportH * 0.42;
        const localEnd = gatherEnd - (2 - group) * viewportH * 0.24;
        const rawGather = clamp((y - localStart) / Math.max(1, localEnd - localStart));
        const gather = ease(rawGather);
        const reveal = clamp((global - revealAt[index]) / 0.055);
        const [startX, startY] = starts[index];
        const driftX = Math.sin(global * 15 + index * 1.73) * Math.min(155, viewportW * 0.12);
        const driftY = Math.cos(global * 12 + index * 0.91) * 75;
        const lane = ((index % 6) - 2.5) * 22;
        const roamX = startX * viewportW + driftX + Math.sin(global * Math.PI * 2 + index) * lane;
        const roamY = startY * viewportH + driftY + global * viewportH * 0.34 * ((index % 3) - 1);
        const x = mix(roamX, rect.left, gather);
        const targetY = mix(roamY, rect.top, gather);
        const settled = gather > 0.985;

        cell.style.setProperty("--money-cell-width", `${width}px`);
        cell.style.transform = `translate3d(${x}px, ${targetY}px, 0)`;
        cell.style.opacity = String(settled ? 1 : reveal * (viewportW < 700 ? 0.22 : 0.42));
        cell.classList.toggle("settled", settled);
      });
    };

    const measure = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      update();
    };

    const requestUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    measure();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="money-layer" ref={layerRef} aria-hidden="true">
      {cells.map((cell, index) => (
        <div className={`money-cell money-cell-${cell.tone}`} key={`${cell.label}-${index}`}>
          {cell.value}
        </div>
      ))}
    </div>
  );
}
