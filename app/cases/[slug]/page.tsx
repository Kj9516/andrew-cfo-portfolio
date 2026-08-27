import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink, CaseArtifact, ContactCta, Footer, Header } from "../../components";
import { cases } from "../../data";

type CasePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const orderedCases = [...cases].sort((a, b) => a.order - b.order);

export function generateStaticParams() {
  return cases.map((caseItem) => ({ slug: caseItem.slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = cases.find((item) => item.slug === slug);

  if (!caseItem) {
    return {};
  }

  return {
    title: caseItem.seo.title,
    description: caseItem.seo.description,
    alternates: { canonical: `/cases/${caseItem.slug}` },
    openGraph: {
      title: caseItem.seo.title,
      description: caseItem.seo.description,
      url: `/cases/${caseItem.slug}`,
      type: "article",
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const caseItem = orderedCases.find((item) => item.slug === slug);

  if (!caseItem) {
    notFound();
  }

  const otherCases = orderedCases.filter((item) => item.slug !== caseItem.slug);

  return (
    <main>
      <Header />
      <article className="case-detail shell">
        <BackLink href="/cases">Все кейсы</BackLink>
        <header className="case-detail-hero">
          <div>
            <p className="kicker">{caseItem.niche} / {caseItem.scale}</p>
            <h1>{caseItem.pageTitle}</h1>
            <p>{caseItem.lead}</p>
            <div className="case-hero-actions">
              <a className="button button-primary" href="https://t.me/andrey_findir" target="_blank" rel="noreferrer" aria-label={`${caseItem.ctaText} в Telegram`}>
                {caseItem.ctaText} <span aria-hidden="true">↗</span>
              </a>
              <Link className="button button-ghost-light" href="/pricing">Форматы работы</Link>
            </div>
          </div>
          <CaseArtifact caseItem={caseItem} />
        </header>

        <section className="case-summary-panel" aria-label="Кратко о проекте">
          {caseItem.summaryFacts.map((fact) => (
            <div key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </section>

        <section className="case-story-block case-story-lead" aria-labelledby="case-context">
          <div>
            <span>Контекст</span>
            <h2 id="case-context">Почему задача была важна</h2>
          </div>
          <div>
            <p>{caseItem.context}</p>
            <p>{caseItem.initialState}</p>
            <p className="case-stakes"><strong>Что было на кону:</strong> {caseItem.stakes}</p>
          </div>
        </section>

        <section className="case-story-block" aria-labelledby="case-diagnostics">
          <div>
            <span>Диагностика</span>
            <h2 id="case-diagnostics">Что показали данные</h2>
          </div>
          <div className="case-diagnostic-grid">
            {caseItem.diagnostics.map((item) => (
              <article key={item.label}>
                <span>{item.label}</span>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="case-story-block" aria-labelledby="case-process">
          <div>
            <span>Работа</span>
            <h2 id="case-process">Что сделали</h2>
          </div>
          <ol className="case-process-list">
            {caseItem.process.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="case-before-after" aria-labelledby="case-results">
          <div className="case-results-head">
            <p className="kicker">Итог / До и после</p>
            <h2 id="case-results">Что изменилось для собственника</h2>
          </div>
          <div className="case-outcome">
            <span>Ключевой результат</span>
            <strong>{caseItem.keyMetric}</strong>
            <p>{caseItem.outcomeLabel}</p>
          </div>
          <div className="case-before-after-grid">
            {caseItem.beforeAfter.map((item) => (
              <article key={item.before}>
                <div>
                  <span>Было</span>
                  <p>{item.before}</p>
                </div>
                <div>
                  <span>Стало</span>
                  <p>{item.after}</p>
                </div>
              </article>
            ))}
          </div>
          <ul className="case-results-list">
            {caseItem.results.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="case-proof-cta" aria-label="Доверие и следующий шаг">
          <div>
            <span>Доверие</span>
            <p>{caseItem.proofNote}</p>
            <p>Если в бизнесе похожая ситуация, диагностика начинается с текущих отчётов, платежей и решения, которое собственнику нужно принять.</p>
          </div>
          <a className="button button-light" href="https://t.me/andrey_findir" target="_blank" rel="noreferrer" aria-label={`${caseItem.ctaText} в Telegram`}>
            {caseItem.ctaText} <span aria-hidden="true">↗</span>
          </a>
        </section>

        <section className="case-detail-archive" aria-label="Подробности исходной работы">
          <section>
            <span>Найденные причины</span>
            <ul>
              {caseItem.causes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
          <section>
            <span>Выполненные работы</span>
            <ul>
              {caseItem.workDone.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        </section>

        <nav className="case-detail-nav" aria-label="Другие кейсы">
          <div>
            <span>Другие кейсы</span>
            <div>
              {otherCases.map((item) => (
                <Link href={`/cases/${item.slug}`} key={item.slug}>{item.niche}</Link>
              ))}
            </div>
          </div>
          <BackLink href="/cases">Вернуться в каталог</BackLink>
        </nav>
      </article>
      <ContactCta compact />
      <Footer />
    </main>
  );
}
