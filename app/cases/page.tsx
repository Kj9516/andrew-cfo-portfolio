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
    <main>
      <Header />
      <PageHeader
        kicker="Кейсы"
        title="Истории, где цифры меняли решение собственника"
        lead="Три публично безопасных кейса без клиентских названий и закрытых данных: автосалон, интернет-магазин и студия детейлинга."
      />
      <section className="cases-catalog shell" aria-label="Список кейсов">
        <div className="cases-catalog-intro">
          <p>Каждый кейс показывает контекст, ставку для бизнеса, найденную причину и результат. Визуалы на карточках — дизайнерские макеты финансовых артефактов, а не клиентские скриншоты.</p>
          <div aria-label="Подход к кейсам">
            <span>без логотипов</span>
            <span>без конфиденциальных данных</span>
            <span>только проверяемые факты</span>
          </div>
        </div>
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
