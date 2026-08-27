import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink, ContactCta, Footer, Header } from "../../components";
import { workFormats } from "../../data";

type FormatPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return workFormats.map((format) => ({ slug: format.slug }));
}

export async function generateMetadata({ params }: FormatPageProps): Promise<Metadata> {
  const { slug } = await params;
  const format = workFormats.find((item) => item.slug === slug);

  if (!format) return {};

  return {
    title: format.seo.title,
    description: format.seo.description,
    alternates: { canonical: `/formats/${format.slug}` },
    openGraph: {
      title: format.seo.title,
      description: format.seo.description,
      url: `/formats/${format.slug}`,
    },
  };
}

export default async function FormatPage({ params }: FormatPageProps) {
  const { slug } = await params;
  const format = workFormats.find((item) => item.slug === slug);

  if (!format) notFound();

  const otherFormat = workFormats.find((item) => item.slug !== format.slug);

  return (
    <main>
      <Header />
      <article className="format-detail shell">
        <BackLink href="/#formats">Все форматы</BackLink>

        <header className="format-detail-hero">
          <div>
            <p className="kicker">Формат работы / {format.number}</p>
            <h1>{format.title}</h1>
          </div>
          <div>
            <p>{format.lead}</p>
            <a className="button button-primary" href="https://t.me/andrey_findir" target="_blank" rel="noreferrer">
              Обсудить задачу <span aria-hidden="true">↗</span>
            </a>
          </div>
        </header>

        {format.positioning ? (
          <section className="format-partner" aria-labelledby="format-partner-title">
            <p className="kicker kicker-light">Финансовый партнёр собственника</p>
            <h2 id="format-partner-title">Работаем над бизнесом вместе</h2>
            <p>{format.positioning}</p>
          </section>
        ) : null}

        <section className="format-purpose" aria-labelledby="format-purpose-title">
          <div>
            <span>Что это за формат</span>
            <h2 id="format-purpose-title">Зачем он нужен</h2>
          </div>
          <p>{format.purpose}</p>
        </section>

        {format.cadence ? (
          <section className="format-cadence" aria-labelledby="format-cadence-title">
            <div>
              <p className="kicker">Ритм работы</p>
              <h2 id="format-cadence-title">Финансы всегда в поле зрения</h2>
            </div>
            <div className="format-cadence-grid">
              {format.cadence.map((item) => (
                <article key={item.label}>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="format-detail-grid">
          <div>
            <span>Когда подходит</span>
            <h2>Признаки, что этот формат нужен</h2>
          </div>
          <ul>
            {format.whenNeeded.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="format-detail-grid format-detail-grid-dark">
          <div>
            <span>Что делаем</span>
            <h2>Состав работы</h2>
          </div>
          <ol>
            {format.work.map((item, index) => (
              <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>
            ))}
          </ol>
        </section>

        <section className="format-result" aria-labelledby="format-result-title">
          <div>
            <p className="kicker">Результат</p>
            <h2 id="format-result-title">Что получает собственник</h2>
          </div>
          <ul>
            {format.result.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="format-timeframe"><strong>Срок и ритм работы:</strong> {format.timeframe}</p>
        </section>

        {format.notIncluded ? (
          <section className="format-boundaries" aria-labelledby="format-boundaries-title">
            <div>
              <p className="kicker">Границы работы</p>
              <h2 id="format-boundaries-title">Что не входит в сопровождение</h2>
            </div>
            <ul>
              {format.notIncluded.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        ) : null}

        {format.longTerm ? (
          <section className="format-long-term">
            <span>Почему важен долгий горизонт</span>
            <p>{format.longTerm}</p>
          </section>
        ) : null}

        {otherFormat ? (
          <nav className="format-next" aria-label="Другой формат работы">
            <span>Другой формат</span>
            <Link href={`/formats/${otherFormat.slug}`}>{otherFormat.title} <span aria-hidden="true">→</span></Link>
          </nav>
        ) : null}
      </article>
      <ContactCta compact />
      <Footer />
    </main>
  );
}
