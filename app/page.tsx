import Image from "next/image";
import Link from "next/link";
import { CaseGrid, ContactCta, Footer, Header } from "./components";
import { cases, proofPoints, workFormats } from "./data";

const orderedCases = [...cases].sort((a, b) => a.order - b.order);

export default function Home() {
  return (
    <main>
      <div className="dark-stage">
        <Header dark />
        <section className="hero shell" id="top">
          <div className="hero-copy">
            <p className="kicker kicker-light">Финансовый директор на аутсорсе</p>
            <h1>Цифры, после которых <em>понятно, что делать.</em></h1>
            <p className="hero-lead">Строю управленческий учёт, который показывает реальное состояние бизнеса и помогает собственнику принимать решения без финансового самообмана.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="https://t.me/andrey_findir" target="_blank" rel="noreferrer">Обсудить бизнес <span aria-hidden="true">↗</span></a>
              <Link className="button button-ghost" href="/materials">Забрать таблицы</Link>
            </div>
          </div>
          <div className="hero-visual" aria-label="Финансовая система собирается из разрозненных данных">
            <div className="portrait-frame">
              <Image src="/images/andrey-suslenkov.jpg" alt="Андрей Сусленков, финансовый директор" fill priority sizes="(max-width: 800px) 90vw, 430px" />
              <div className="portrait-caption"><span>Андрей Сусленков</span><span>Финдиректор и предприниматель</span></div>
            </div>
            <div className="floating-metric metric-one"><span>Деньги на счетах</span><strong>4 820 000 ₽</strong><small>остаток подтверждён</small></div>
            <div className="floating-metric metric-two"><span>Кассовый разрыв</span><strong>не ожидается</strong><small>следующие 30 дней</small></div>
            <div className="floating-metric metric-three"><span>Управленческий сигнал</span><strong>Прибыль ≠ деньги</strong><small>проверьте обязательства</small></div>
          </div>
        </section>
        <div className="system-status shell"><span className="status-dot" /> Финансовая картина собрана <span>Данные → Аналитика → Решение</span></div>
      </div>

      <section className="proof-strip" aria-label="Результаты и опыт">
        <div className="shell proof-grid">
          {proofPoints.map((point) => <div key={point.value}><strong>{point.value}</strong><span>{point.label}</span></div>)}
        </div>
      </section>

      <section className="cases-section shell" id="cases">
        <div className="section-intro">
          <p className="kicker">Кейсы / Не отчёты, а изменения</p>
          <h2>Что меняется, когда бизнес начинает видеть себя в цифрах</h2>
          <p>Каждый кейс — не перечень таблиц, а конкретный переход от финансовой слепоты к управляемому решению.</p>
        </div>
        <CaseGrid items={orderedCases} getHref={(caseItem) => `/cases/${caseItem.slug}`} />
        <div className="section-link-row">
          <Link className="button button-primary" href="/cases">Смотреть все кейсы <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="materials-teaser">
        <div className="shell materials-teaser-grid">
          <div>
            <p className="kicker">Бесплатные материалы</p>
            <h2>Начните управлять деньгами уже сегодня</h2>
            <p>Два готовых платёжных календаря в Google Sheets. Без регистрации, подписки и скрытой продажи.</p>
            <Link className="button button-primary" href="/materials">Выбрать таблицу <span aria-hidden="true">→</span></Link>
          </div>
          <div className="sheet-preview" aria-hidden="true">
            <div className="sheet-window">
              <div className="sheet-toolbar"><i /><i /><i /><span>Платёжный календарь</span></div>
              <div className="sheet-kpis"><div><span>Остаток</span><strong>820 000 ₽</strong></div><div><span>План</span><strong>+240 000 ₽</strong></div></div>
              <div className="sheet-row sheet-head"><span>Дата</span><span>Статья</span><span>Сумма</span></div>
              <div className="sheet-row"><span>18.07</span><span>Поступления</span><span className="positive">+350 000</span></div>
              <div className="sheet-row"><span>21.07</span><span>Аренда</span><span>−110 000</span></div>
              <div className="sheet-tabs"><span>00 Дашборд</span><span>01 Операции</span><span>02 ДДС</span></div>
            </div>
            <div className="free-badge">0 ₽<small>навсегда</small></div>
          </div>
        </div>
      </section>

      <section className="about-section shell" id="about">
        <div className="about-image"><Image src="/images/andrey-suslenkov.jpg" alt="Андрей Сусленков за работой" fill sizes="(max-width: 800px) 100vw, 470px" /></div>
        <div className="about-content">
          <p className="kicker">Обо мне / Вижу обе стороны</p>
          <h2>Смотрю на финансы глазами собственника</h2>
          <p className="large-copy">Я отвечал за финансы не только как консультант, но и как собственник: сам проходил найм, закупки, сезонность, обязательства и решения по развитию.</p>
          <p>Поэтому я знаю, как решение выглядит не только в отчёте, но и в момент, когда нужно платить зарплаты, инвестировать или вовремя отказаться от неработающей модели.</p>
          <div className="about-facts"><div><strong>Учёт</strong><span>ДДС, ОПиУ, баланс и план-факт</span></div><div><strong>Деньги</strong><span>платежи, запасы и обязательства</span></div><div><strong>Решения</strong><span>рост, пауза или выход из модели</span></div></div>
        </div>
      </section>

      <section className="formats-section" id="formats">
        <div className="shell">
          <div className="section-intro section-intro-light"><p className="kicker kicker-light">Форматы работы</p><h2>Система под вашу задачу,<br />а не бизнес под шаблон</h2></div>
          <div className="formats-grid">
            {workFormats.map((format) => <article key={format.number}><span>{format.number}</span><h3>{format.title}</h3><p>{format.description}</p><small>{format.fit}</small><a href="https://t.me/andrey_findir" target="_blank" rel="noreferrer">Обсудить формат ↗</a></article>)}
          </div>
          <div className="formats-actions">
            <Link className="button button-light" href="/pricing">Смотреть тарифы <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <ContactCta />
      <Footer />
    </main>
  );
}
