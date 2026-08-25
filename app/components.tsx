import Link from "next/link";
import type { CaseStudy, Material, PricingPlan, ProjectPricing } from "./data";

const telegram = "https://t.me/andrey_findir";

export function Header({ dark = false }: { dark?: boolean }) {
  return (
    <header className={`site-header ${dark ? "site-header-dark" : ""}`}>
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Андрей Сусленков — на главную">
          <span className="brand-mark">АС</span>
          <span className="brand-name">Андрей Сусленков</span>
        </Link>
        <nav className="nav" aria-label="Основная навигация">
          <Link href="/#cases">Кейсы</Link>
          <Link href="/materials">Материалы</Link>
          <Link href="/#about">Обо мне</Link>
          <Link href="/#formats">Форматы</Link>
        </nav>
        <a className="header-cta" href={telegram} target="_blank" rel="noreferrer">
          Обсудить бизнес <span aria-hidden="true">↗</span>
        </a>
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
          <p>Цифры, после которых понятно, что делать.</p>
        </div>
        <div className="footer-column">
          <span>Навигация</span>
          <Link href="/#cases">Кейсы</Link>
          <Link href="/materials">Бесплатные материалы</Link>
          <Link href="/#formats">Форматы работы</Link>
        </div>
        <div className="footer-column">
          <span>Контакты</span>
          <a href={telegram} target="_blank" rel="noreferrer">@andrey_findir ↗</a>
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
          <p className="kicker kicker-light">Бесплатная диагностика / 20–30 минут</p>
          <h2>Сначала разберёмся.<br />Потом решим, нужен ли вам учёт.</h2>
        </div>
        <div className="contact-cta-copy">
          <p>Посмотрим на текущую ситуацию, найдём главную финансовую слепую зону и определим, даст ли моя работа ощутимый эффект.</p>
          <a className="button button-light" href={telegram} target="_blank" rel="noreferrer">
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

export function CaseCard({ caseItem, href }: { caseItem: CaseStudy; href?: string }) {
  const content = (
    <>
      <div className="case-card-topline">
        <span>{caseItem.number}</span>
        <span>{caseItem.niche}</span>
      </div>
      <h3>{caseItem.cardTitle}</h3>
      <p>{caseItem.lead}</p>
      <div className="case-card-meta">
        <span>{caseItem.scale}</span>
        <strong>{caseItem.keyMetric}</strong>
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
      <a className="button button-primary" href={telegram} target="_blank" rel="noreferrer">
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
      <a className="button button-primary" href={material.href} target="_blank" rel="noreferrer">
        Открыть таблицу <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}
