"use client";

import { useState } from "react";
import { cases } from "./data";

export function CaseExplorer() {
  const [activeId, setActiveId] = useState(cases[0].id);
  const active = cases.find((item) => item.id === activeId) ?? cases[0];

  return (
    <div className="case-explorer">
      <div className="case-tabs" role="tablist" aria-label="Выберите кейс">
        {cases.map((item) => (
          <button
            key={item.id}
            id={`tab-${item.id}`}
            role="tab"
            aria-selected={active.id === item.id}
            aria-controls={`panel-${item.id}`}
            onClick={() => setActiveId(item.id)}
          >
            <span>{item.label}</span>
            <strong>{item.company}</strong>
          </button>
        ))}
      </div>
      <article
        className="case-panel"
        id={`panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        key={active.id}
      >
        <div className="case-panel-head">
          <div>
            <p>{active.scale}</p>
            <h3>«{active.hook}»</h3>
          </div>
          <strong>{active.metric}</strong>
        </div>
        <div className="case-steps">
          <div><span>01 / До</span><p>{active.before}</p></div>
          <div><span>02 / Обнаружили</span><p>{active.insight}</p></div>
          <div><span>03 / Собрали</span><p>{active.solution}</p></div>
          <div className="case-result"><span>04 / Результат</span><p>{active.result}</p></div>
        </div>
      </article>
    </div>
  );
}
