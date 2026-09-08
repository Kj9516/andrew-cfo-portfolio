import type { Metadata } from "next";
import Link from "next/link";

const appUrl = "/apps/ai/finance-ai";
const privacyUrl = `${appUrl}/privacy`;

export const metadata: Metadata = {
  title: "Политика конфиденциальности VPS AI Finance",
  description: "Политика конфиденциальности VPS AI Finance: обрабатываемые данные Google, цели обработки, хранение OAuth-токенов и отзыв доступа.",
  alternates: { canonical: privacyUrl },
  openGraph: {
    title: "Политика конфиденциальности VPS AI Finance",
    description: "Как VPS AI Finance обрабатывает данные Google для выполнения команд владельца аккаунта.",
    url: privacyUrl,
    type: "article",
  },
};

export default function FinanceAiPrivacyPage() {
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

      <article className="shell service-content service-policy">
        <header className="service-hero service-policy-hero">
          <p className="kicker">Конфиденциальность и данные</p>
          <h1>Политика конфиденциальности VPS AI Finance</h1>
          <p className="service-effective-date">Дата вступления в силу: 1 сентября 2026 года</p>
          <p className="service-lead">
            Эта политика описывает обработку данных частным финансовым ИИ-помощником VPS AI Finance,
            размещённым владельцем сайта andrey-cfo.ru.
          </p>
        </header>

        <div className="service-policy-layout">
          <nav className="service-policy-nav" aria-label="Разделы политики конфиденциальности">
            <span>Содержание</span>
            <a href="#data">Какие данные обрабатываются</a>
            <a href="#purpose">Цель обработки</a>
            <a href="#sharing">Передача и использование</a>
            <a href="#tokens">OAuth-токены и доступ</a>
            <a href="#revocation">Отзыв доступа и удаление</a>
          </nav>

          <div className="service-policy-copy">
            <section id="data">
              <span>01</span>
              <h2>Какие данные могут обрабатываться</h2>
              <p>В зависимости от команды владельца аккаунта приложение может обрабатывать:</p>
              <ul>
                <li>метаданные файлов Google Drive;</li>
                <li>содержимое выбранных Google Docs;</li>
                <li>значения выбранных диапазонов Google Sheets;</li>
                <li>данные Google-аккаунта, необходимые для авторизации.</li>
              </ul>
            </section>

            <section id="purpose">
              <span>02</span>
              <h2>Цель обработки</h2>
              <p>
                Данные обрабатываются для выполнения финансовых операций и команд, явно инициированных владельцем
                аккаунта. Приложение читает или обновляет документы только в объёме, необходимом для выполнения
                соответствующего запроса пользователя.
              </p>
            </section>

            <section id="sharing">
              <span>03</span>
              <h2>Передача и использование данных</h2>
              <p>
                Данные не продаются, не используются для рекламы и не передаются сторонним организациям.
                VPS AI Finance является частным инструментом владельца сайта, а не общедоступным сервисом.
              </p>
            </section>

            <section id="tokens">
              <span>04</span>
              <h2>OAuth-токены и доступ</h2>
              <p>
                OAuth-токены хранятся в закрытом серверном окружении и не публикуются. Приложение запрашивает
                доступ к Google Drive, Google Docs и Google Sheets только для выполнения заявленных функций.
                Доступ предоставляется после явного согласия владельца Google-аккаунта.
              </p>
              <p>
                Для защиты данных применяются меры, соответствующие характеру частного серверного приложения,
                однако ни один способ хранения или передачи данных нельзя считать абсолютно безопасным.
              </p>
            </section>

            <section id="revocation">
              <span>05</span>
              <h2>Отзыв доступа и удаление данных</h2>
              <p>
                Пользователь может в любое время отозвать доступ приложения на странице подключений Google Account:
                {" "}
                <a href="https://myaccount.google.com/connections" target="_blank" rel="noreferrer">
                  myaccount.google.com/connections
                </a>.
              </p>
              <p>
                Вопросы об удалении данных и конфиденциальности можно направлять по адресу
                {" "}<a href="mailto:my.powerofbook@gmail.com">my.powerofbook@gmail.com</a>.
              </p>
            </section>
          </div>
        </div>

        <footer className="service-contact service-policy-footer">
          <div>
            <span>Приложение</span>
            <Link href={appUrl}>Вернуться на страницу VPS AI Finance <span aria-hidden="true">→</span></Link>
          </div>
          <div>
            <span>Контакт</span>
            <a href="mailto:my.powerofbook@gmail.com">my.powerofbook@gmail.com</a>
          </div>
        </footer>
      </article>
    </main>
  );
}
