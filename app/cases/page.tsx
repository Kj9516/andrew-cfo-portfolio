import type { Metadata } from "next";
import Link from "next/link";
import { CaseGrid, ContactCta, Footer, Header, PageHeader } from "../components";
import { cases } from "../data";

const orderedCases = [...cases].sort((a, b) => a.order - b.order);

export const metadata: Metadata = {
  title: "Кейсы — Андрей Сусленков",
  description: "Кейсы по управленческому учёту, платёжному календарю и финансовым решениям для бизнеса.",
  alternates: { canonical: "/cases" },
  openGraph: {
    title: "Кейсы — Андрей Сусленков",
    description: "Как управленческий учёт помогает собственнику увидеть проблему, решение и результат.",
    url: "/cases",
    type: "website",
  },
};

export default function CasesPage() {
  return (
    <main>
      <Header />
      <PageHeader
        kicker="Кейсы"
        title="Финансовые решения на реальных ситуациях"
        lead="Три примера, где управленческий учёт помог собственнику увидеть причину проблемы, принять решение и довести его до результата."
      />
      <section className="cases-catalog shell" aria-label="Список кейсов">
        <div className="catalog-heading">
          <span>Кейс</span>
          <span>{orderedCases.length} материала</span>
        </div>
        <CaseGrid items={orderedCases} getHref={(caseItem) => `/cases/${caseItem.slug}`} />
        <div className="catalog-actions">
          <Link className="button button-ghost-light" href="/pricing">Смотреть тарифы</Link>
        </div>
      </section>
      <ContactCta compact />
      <Footer />
    </main>
  );
}
