import type { Metadata } from "next";
import { ContactCta, Footer, Header, PageHeader, PricingCard } from "../components";
import { pricingPlans, projectPricing } from "../data";

export const metadata: Metadata = {
  title: "Тарифы на финансовое сопровождение",
  description: "Тарифы на регулярное финансовое сопровождение и проектную настройку управленческого учёта.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Тарифы на финансовое сопровождение",
    description: "Стоимость сопровождения, состав тарифов и условия для проектной работы по управленческому учёту.",
    url: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <main>
      <Header />
      <PageHeader
        kicker="Тарифы / сопровождение и проекты"
        title="Финансовое сопровождение для бизнеса с рабочими данными"
        lead="Регулярное сопровождение подходит компании, где уже собираются финансовые данные. Если данных нет или отчёты не сходятся, сначала нужна проектная настройка учёта."
      />

      <section className="pricing-intro shell" aria-label="Как выбрать формат">
        <div>
          <span>Первый шаг</span>
          <p>На диагностике 20–30 минут смотрим текущую ситуацию, данные и задачу. После этого выбираем формат работы.</p>
        </div>
        <div>
          <span>Важно</span>
          <p>Тарифы ниже относятся к регулярному сопровождению. Проектная работа нужна, когда отчёты, регламенты и правила сбора данных ещё не готовы.</p>
        </div>
      </section>

      <section className="pricing-section shell" aria-label="Тарифы на сопровождение">
        <div className="pricing-grid">
          {pricingPlans.map((plan) => <PricingCard plan={plan} key={plan.title} />)}
        </div>
        <p className="pricing-note">Окончательная стоимость зависит от сложности и объёма задач.</p>
      </section>

      <section className="project-pricing-section shell" aria-label="Проектная работа">
        <PricingCard plan={projectPricing} />
      </section>

      <ContactCta compact />
      <Footer />
    </main>
  );
}
