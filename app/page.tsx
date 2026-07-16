const capabilities = [
  "Выстраиваю управленческий учёт под бизнес-процессы компании",
  "Показываю реальную прибыль, движение денег и финансовые риски",
  "Помогаю предотвращать кассовые разрывы и планировать платежи",
  "Участвую в управленческих решениях на основе данных",
];

export default function Home() {
  return (
    <main>
      <header className="header shell">
        <a className="brand" href="#top" aria-label="На главную">
          <span className="brand-mark">АС</span>
          <span>Андрей Сусленков</span>
        </a>
        <a className="header-contact" href="https://t.me/andrey_findir" target="_blank" rel="noreferrer">
          Написать в Telegram
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid shell">
          <div className="hero-copy">
            <p className="eyebrow">Финансовый директор на аутсорсе</p>
            <h1>Цифры бизнеса должны помогать принимать решения</h1>
            <p className="lead">
              Помогаю собственникам малого и среднего бизнеса видеть реальную финансовую картину,
              управлять прибылью и сохранять контроль над деньгами.
            </p>
            <div className="actions">
              <a className="button button-primary" href="https://t.me/andrey_findir" target="_blank" rel="noreferrer">
                Обсудить задачу
                <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-secondary" href="#about">Обо мне</a>
            </div>
          </div>

          <aside className="metric-card" aria-label="Опыт Андрея">
            <div className="metric-row">
              <strong>7+</strong>
              <span>лет в управленческом учёте и финансовом сопровождении</span>
            </div>
            <div className="metric-row">
              <strong>5</strong>
              <span>лет опыта собственника бизнеса</span>
            </div>
            <p className="metric-note">
              Не отчётность ради отчётности. Финансовая система, после которой понятно, что делать.
            </p>
          </aside>
        </div>
      </section>

      <section className="about shell" id="about">
        <div className="section-heading">
          <p className="section-number">01 / Обо мне</p>
          <h2>Смотрю на финансы глазами собственника</h2>
        </div>
        <div className="about-copy">
          <p>
            Более семи лет я занимаюсь управленческим учётом и финансовым сопровождением бизнеса.
            Пять из них развивал собственный интернет-магазин, поэтому знаю, как решения выглядят
            не только в таблице, но и на практике.
          </p>
          <p>
            Я не играю в красивые графики. Моя задача — показать, сколько бизнес действительно
            зарабатывает, где теряет деньги и какие действия можно предпринимать без лишнего риска.
          </p>
        </div>
      </section>

      <section className="work-section">
        <div className="shell">
          <div className="section-heading light">
            <p className="section-number">02 / Чем помогаю</p>
            <h2>Превращаю разрозненные данные в систему управления</h2>
          </div>
          <ol className="capabilities">
            {capabilities.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="contact shell">
        <div>
          <p className="section-number">03 / Контакты</p>
          <h2>Разберём финансовую ситуацию вашего бизнеса</h2>
          <p>
            На первой встрече определим, даст ли управленческий учёт практический эффект и какой
            формат работы подойдёт именно вашей компании.
          </p>
        </div>
        <div className="contact-links">
          <a href="https://t.me/andrey_findir" target="_blank" rel="noreferrer">
            <span>Telegram</span><strong>@andrey_findir ↗</strong>
          </a>
          <a href="mailto:suslenkov.andrew@mail.ru">
            <span>Почта</span><strong>suslenkov.andrew@mail.ru ↗</strong>
          </a>
        </div>
      </section>

      <footer className="footer shell">
        <span>© {new Date().getFullYear()} Андрей Сусленков</span>
        <span>Финансовая архитектура для бизнеса</span>
      </footer>
    </main>
  );
}
