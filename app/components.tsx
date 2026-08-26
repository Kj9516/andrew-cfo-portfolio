import Link from "next/link";
import type { CaseStudy, Material, PricingPlan, ProjectPricing } from "./data";

const telegram = "https://t.me/andrey_findir";
const mainNavLinks = [
  { href: "/#cases", label: "Кейсы" },
  { href: "/pricing", label: "Тарифы" },
  { href: "/materials", label: "Материалы" },
  { href: "/#about", label: "Обо мне" },
  { href: "/#formats", label: "Форматы" },
];

export function Header({ dark = false }: { dark?: boolean }) {
  return (
    <header className={`site-header ${dark ? "site-header-dark" : ""}`}>
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Андрей Сусленков — на главную">
          <span className="brand-mark">АС</span>
          <span className="brand-name">Андрей Сусленков</span>
        </Link>
        <nav className="nav" aria-label="Основная навигация">
          {mainNavLinks.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <a className="header-cta" href={telegram} target="_blank" rel="noreferrer" aria-label="Обсудить бизнес в Telegram">
          Обсудить бизнес <span aria-hidden="true">↗</span>
        </a>
        <details className="mobile-nav">
          <summary aria-label="Открыть меню"><span aria-hidden="true" /></summary>
          <nav aria-label="Мобильная навигация">
            {mainNavLinks.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
            <a href={telegram} target="_blank" rel="noreferrer">Обсудить бизнес <span aria-hidden="true">↗</span></a>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark">АС</span>
            <span>Андрей Сусленков</span>
          </Link>
          <p>Управленческий учёт для решений по прибыли, деньгам и обязательствам.</p>
        </div>
        <div className="footer-column">
          <span>Навигация</span>
          <Link href="/#cases">Кейсы</Link>
          <Link href="/pricing">Тарифы</Link>
          <Link href="/materials">Бесплатные материалы</Link>
          <Link href="/#formats">Форматы работы</Link>
        </div>
        <div className="footer-column">
          <span>Контакты</span>
          <a href={telegram} target="_blank" rel="noreferrer" aria-label="Написать Андрею Сусленкову в Telegram">@andrey_findir ↗</a>
          <a href="mailto:suslenkov.andrew@mail.ru">suslenkov.andrew@mail.ru</a>
        </div>
      </div>
      <div className="shell legal-row">
        <span>© {new Date().getFullYear()} Андрей Сусленков</span>
        <span>ИП Сусленков Андрей Игоревич</span>
      </div>
    </footer>
  );
}

export function ContactCta({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`contact-cta ${compact ? "contact-cta-compact" : ""}`} id="contact">
      <div className="shell contact-cta-grid">
        <div>
          <p className="kicker kicker-light">Диагностика / 20–30 минут</p>
          <h2>Разберём задачу и проверим, какой формат работы нужен.</h2>
        </div>
        <div className="contact-cta-copy">
          <p>Посмотрим данные, текущие отчёты и проблему собственника. После этого станет понятно, нужен ли проект, сопровождение или отдельная настройка.</p>
          <a className="button button-light" href={telegram} target="_blank" rel="noreferrer" aria-label="Написать в Telegram для диагностики">
            Написать в Telegram <span aria-hidden="true">↗</span>
          </a>
          <a className="plain-contact" href="mailto:suslenkov.andrew@mail.ru">suslenkov.andrew@mail.ru</a>
        </div>
      </div>
    </section>
  );
}

export function PageHeader({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <section className="page-header shell">
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      {lead ? <p>{lead}</p> : null}
    </section>
  );
}

export function BackLink({ href, children = "Назад" }: { href: string; children?: React.ReactNode }) {
  return <Link className="back-link" href={href}><span aria-hidden="true">←</span>{children}</Link>;
}

export function CaseArtifact({ caseItem, compact = false }: { caseItem: CaseStudy; compact?: boolean }) {
  const rows = {
    "deal-profit": [
      ["Сделка A", "Маржа", "+18%"],
      ["Сделка B", "Деньги", "14 дн."],
      ["Расходы", "Резерв", "−"],
    ],
    "exit-model": [
      ["Сценарий 1", "Продолжать", "риск"],
      ["Сценарий 2", "Выход", "0 ₽"],
      ["Активы", "Реализация", "план"],
    ],
    "cash-calendar": [
      ["12.08", "Зарплата", "план"],
      ["18.08", "Аренда", "резерв"],
      ["30 дней", "Разрыв", "0"],
    ],
  }[caseItem.visualTheme];

  return (
    <div className={`case-artifact case-artifact-${caseItem.visualTheme} ${compact ? "case-artifact-compact" : ""}`} aria-hidden="true">
      <div className="case-artifact-toolbar">
        <i /><i /><i />
        <span>Публичный макет финансового артефакта</span>
      </div>
      <div className="case-artifact-kpis">
        <div>
          <span>{caseItem.niche}</span>
          <strong>{caseItem.keyMetric}</strong>
        </div>
        <div>
          <span>Контур</span>
          <strong>{caseItem.role}</strong>
        </div>
      </div>
      <div className="case-artifact-chart">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="case-artifact-rows">
        {rows.map(([left, middle, right]) => (
          <div className="case-artifact-row" key={`${left}-${middle}`}>
            <span>{left}</span>
            <span>{middle}</span>
            <strong>{right}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CaseCard({ caseItem, href }: { caseItem: CaseStudy; href?: string }) {
  const content = (
    <>
      <CaseArtifact caseItem={caseItem} compact />
      <div className="case-card-body">
        <div className="case-card-topline">
          <span>{caseItem.number}</span>
          <span>{caseItem.niche}</span>
        </div>
        <h3>{caseItem.cardTitle}</h3>
        <p>{caseItem.shortProblem}</p>
        <dl className="case-card-facts" aria-label="Кратко о кейсе">
          <div>
            <dt>Масштаб</dt>
            <dd>{caseItem.scale}</dd>
          </div>
          <div>
            <dt>Итог</dt>
            <dd>{caseItem.keyMetric}</dd>
          </div>
        </dl>
        <div className="case-card-change">
          <span>Что изменилось</span>
          <p>{caseItem.whatChanged}</p>
        </div>
        <span className="case-card-action">Читать кейс <span aria-hidden="true">→</span></span>
      </div>
    </>
  );

  if (href) {
    return (
      <article className="case-card">
        <Link href={href} aria-label={caseItem.pageTitle}>{content}</Link>
      </article>
    );
  }

  return <article className="case-card">{content}</article>;
}

export function CaseGrid({ items, getHref }: { items: CaseStudy[]; getHref?: (caseItem: CaseStudy) => string }) {
  return (
    <div className="case-grid">
      {items.map((caseItem) => (
        <CaseCard caseItem={caseItem} href={getHref?.(caseItem)} key={caseItem.slug} />
      ))}
    </div>
  );
}

export function PricingCard({ plan }: { plan: PricingPlan | ProjectPricing }) {
  const recommended = "recommended" in plan ? plan.recommended : false;
  const note = "priceNote" in plan ? plan.priceNote : plan.duration;
  const bonus = "bonus" in plan ? plan.bonus : undefined;

  return (
    <article className={`pricing-card ${recommended ? "pricing-card-recommended" : ""}`}>
      <div className="pricing-card-head">
        <div>
          <p>{recommended ? "Рекомендуемый формат" : "Формат работы"}</p>
          <h3>{plan.title}</h3>
        </div>
        <strong>{plan.price}</strong>
        <span>{note}</span>
      </div>
      <p className="pricing-audience">{plan.audience}</p>
      <ul>
        {plan.services.map((service) => <li key={service}>{service}</li>)}
      </ul>
      {bonus ? <p className="pricing-bonus">{bonus}</p> : null}
      <a className="button button-primary" href={telegram} target="_blank" rel="noreferrer" aria-label={`${plan.cta} в Telegram`}>
        {plan.cta} <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}

export function MaterialCard({ material }: { material: Material }) {
  return (
    <article className="material-card">
      <div className="material-topline"><span>{material.number}</span><span>Google Sheets</span></div>
      <h3>{material.title}</h3>
      <p>{material.description}</p>
      <div className="feature-list" aria-label="Возможности">
        {material.features.map((feature) => <span key={feature}>{feature}</span>)}
      </div>
      <p className="material-audience"><strong>Подойдёт:</strong> {material.audience}</p>
      <a className="button button-primary" href={material.href} target="_blank" rel="noreferrer" aria-label={`Открыть таблицу: ${material.title}`}>
        Открыть таблицу <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}
