import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink, ContactCta, Footer, Header } from "../../components";
import { cases } from "../../data";

type CasePageProps = {
  params: {
    slug: string;
  };
};

const orderedCases = [...cases].sort((a, b) => a.order - b.order);

export function generateStaticParams() {
  return cases.map((caseItem) => ({ slug: caseItem.slug }));
}

export function generateMetadata({ params }: CasePageProps): Metadata {
  const caseItem = cases.find((item) => item.slug === params.slug);

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

export default function CasePage({ params }: CasePageProps) {
  const caseItem = orderedCases.find((item) => item.slug === params.slug);

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
          </div>
          <aside className="case-detail-metric" aria-label="Ключевая метрика">
            <span>Ключевой результат</span>
            <strong>{caseItem.keyMetric}</strong>
            <p>{caseItem.results[0]}</p>
          </aside>
        </header>

        {caseItem.image ? (
          <figure className="case-detail-image">
            <Image src={caseItem.image.src} alt={caseItem.image.alt} fill sizes="(max-width: 900px) 100vw, 1180px" />
            <figcaption>{caseItem.image.caption}</figcaption>
          </figure>
        ) : null}

        <section className="case-detail-summary" aria-label="Краткий вывод">
          <span>Краткий вывод</span>
          <p>{caseItem.shortProblem}</p>
        </section>

        <div className="case-detail-grid">
          <section>
            <span>Исходная ситуация</span>
            <p>{caseItem.context}</p>
            <p>{caseItem.initialState}</p>
          </section>
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
          <section className="case-detail-results">
            <span>Результаты</span>
            <ul>
              {caseItem.results.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        </div>

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
