import type { Metadata } from "next";
import Link from "next/link";

const appUrl = "/apps/ai/finance-ai";

export const metadata: Metadata = {
  title: "VPS AI Finance — частный финансовый ИИ-помощник",
  description: "VPS AI Finance — частный ИИ-помощник владельца сайта для работы с финансовыми документами в Google Drive, Google Docs и Google Sheets.",
  alternates: { canonical: appUrl },
  openGraph: {
    title: "VPS AI Finance",
    description: "Частный финансовый ИИ-помощник владельца сайта для работы с документами Google по явным командам.",
    url: appUrl,
    type: "website",
  },
};

const googleServices = [
  {
    name: "Google Drive",
    description: "Для поиска выбранных финансовых файлов и работы с их метаданными.",
  },
  {
    name: "Google Docs",
    description: "Для чтения и обновления выбранных финансовых документов.",
  },
  {
    name: "Google Sheets",
    description: "Для чтения и изменения выбранных диапазонов финансовых таблиц.",
  },
];

export default function FinanceAiPage() {
  return (
    <main className="service-page">
      <header className="service-masthead">
        <div className="shell service-masthead-inner">
          <Link className="service-brand" href={appUrl} aria-label="VPS AI Finance — главная страница приложения">
            <span aria-hidden="true">VPS</span>
            <strong>VPS AI Finance</strong>
          </Link>
          <span className="service-domain">andrey-cfo.ru</span>
        </div>
      </header>

      <div className="shell service-content">
        <section className="service-hero" aria-labelledby="app-title">
          <p className="kicker">Служебная страница приложения</p>
          <h1 id="app-title">VPS AI Finance</h1>
          <p className="service-lead">
            Частный финансовый ИИ-помощник владельца сайта. Он помогает работать с финансовыми документами
            в Google Drive, Google Docs и Google Sheets по явным запросам владельца аккаунта.
          </p>
          <div className="service-notice">
            <strong>Доступ только с согласия</strong>
            <p>
              Доступ к сервисам Google предоставляется только после явного согласия владельца аккаунта.
              Приложение читает или изменяет документы исключительно для выполнения его команд.
            </p>
          </div>
        </section>

        <section className="service-section" aria-labelledby="services-title">
          <div className="service-section-heading">
            <p className="kicker">Подключаемые сервисы</p>
            <h2 id="services-title">Работа только с выбранными данными</h2>
          </div>
          <div className="service-cards">
            {googleServices.map((service, index) => (
              <article key={service.name}>
                <span>0{index + 1}</span>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="service-section service-about" aria-labelledby="access-title">
          <div>
            <p className="kicker">Назначение и доступ</p>
            <h2 id="access-title">Личный рабочий инструмент</h2>
          </div>
          <div>
            <p>
              VPS AI Finance не является публичным SaaS-сервисом и не предоставляет доступ посторонним
              пользователям. Приложение используется владельцем сайта для выполнения собственных финансовых задач.
            </p>
            <p>
              Подробности об обрабатываемых данных, их назначении и способе отзыва доступа описаны в политике
              конфиденциальности.
            </p>
          </div>
        </section>

        <section className="service-contact" aria-label="Документы и контакты">
          <div>
            <span>Документ</span>
            <Link href={`${appUrl}/privacy`}>Политика конфиденциальности <span aria-hidden="true">→</span></Link>
          </div>
          <div>
            <span>Контакт</span>
            <a href="mailto:my.powerofbook@gmail.com">my.powerofbook@gmail.com</a>
          </div>
        </section>
      </div>
    </main>
  );
}
