import type { Metadata } from "next";
import Link from "next/link";
import { CaseGrid, ContactCta, Footer, Header, PageHeader } from "../components";
import { cases } from "../data";

const orderedCases = [...cases].sort((a, b) => a.order - b.order);

export const metadata: Metadata = {
  title: "Кейсы — Андрей Сусленков",
  description: "Кейсы по ДДС, ОПиУ, платёжному календарю и финансовым решениям для собственников бизнеса.",
  alternates: { canonical: "/cases" },
  openGraph: {
    title: "Кейсы — Андрей Сусленков",
    description: "Примеры задач, где управленческий учёт помог найти причину проблемы и принять решение.",
    url: "/cases",
    type: "website",
  },
};

export default function CasesPage() {
  return (
    <main className="cases-page">
      <Header />
      <PageHeader
        kicker="Кейсы"
        title="Истории, где цифры меняли решение собственника"
      />
      <section className="cases-catalog shell" aria-label="Список кейсов">
        <div className="catalog-heading">
          <span>Разборы</span>
          <span>{orderedCases.length} кейса</span>
        </div>
        <CaseGrid items={orderedCases} getHref={(caseItem) => `/cases/${caseItem.slug}`} />
        <div className="catalog-actions">
          <Link className="button button-ghost-light" href="/pricing">Смотреть форматы работы</Link>
        </div>
      </section>
      <ContactCta compact />
      <Footer />
    </main>
  );
}
