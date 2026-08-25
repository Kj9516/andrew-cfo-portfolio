"use client";

import { useState } from "react";
import { cases } from "./data";

export function CaseExplorer() {
  const [activeSlug, setActiveSlug] = useState(cases[0].slug);
  const active = cases.find((item) => item.slug === activeSlug) ?? cases[0];

  return (
    <div className="case-explorer">
      <div className="case-tabs" role="tablist" aria-label="Выберите кейс">
        {cases.map((item) => (
          <button
            key={item.slug}
            id={`tab-${item.slug}`}
            role="tab"
            aria-selected={active.slug === item.slug}
            aria-controls={`panel-${item.slug}`}
            onClick={() => setActiveSlug(item.slug)}
          >
            <span>{item.number} / {item.niche}</span>
            <strong>{item.niche}</strong>
          </button>
        ))}
      </div>
      <article
        className="case-panel"
        id={`panel-${active.slug}`}
        role="tabpanel"
        aria-labelledby={`tab-${active.slug}`}
        key={active.slug}
      >
        <div className="case-panel-head">
          <div>
            <p>{active.scale}</p>
            <h3>«{active.cardTitle}»</h3>
          </div>
          <strong>{active.keyMetric}</strong>
        </div>
        <div className="case-steps">
          <div><span>01 / До</span><p>{active.initialState}</p></div>
          <div><span>02 / Обнаружили</span><p>{active.causes[0]}</p></div>
          <div><span>03 / Собрали</span><p>{active.workDone.join(" ")}</p></div>
          <div className="case-result"><span>04 / Результат</span><p>{active.results.join(" ")}</p></div>
        </div>
      </article>
    </div>
  );
}
