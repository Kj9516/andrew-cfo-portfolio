import Image from "next/image";
import Link from "next/link";
import { CaseGrid, ContactCta, Footer, Header } from "./components";
import { cases, proofPoints, workFormats } from "./data";
import { FinancialScrollAnimation } from "./FinancialScrollAnimation";
import { financialReportGroups } from "./financialReports";

const orderedCases = [...cases].sort((a, b) => a.order - b.order);
const questions = [
  { number: "01", title: "Выручка есть. А прибыль?", text: "Покажу, сколько остаётся после всех расходов и какие товары, услуги или направления приносят деньги.", result: "Прибыль по направлениям" },
  { number: "02", title: "Хватит ли на ближайшие платежи?", text: "Соберу поступления и обязательства в платёжный календарь, чтобы заранее видеть нехватку денег.", result: "План платежей и поступлений" },
  { number: "03", title: "Можно вывести деньги или вложить в рост?", text: "Посчитаю, сколько нужно оставить в бизнесе и как покупка, кредит или новый проект повлияют на финансы.", result: "Расчёт перед решением" },
];
const faq = [
  { question: "Чем финансовый директор отличается от бухгалтера?", answer: "Бухгалтер ведёт бухгалтерский и налоговый учёт. Я собираю картину для собственника: прибыль, деньги, обязательства и расчёты для решений. Эти задачи дополняют друг друга." },
  { question: "Что потребуется от меня и команды?", answer: "Доступные финансовые данные, человек на стороне компании для их сбора и участие собственника в обсуждении решений. Правила работы и ритм встреч определим под вашу задачу." },
  { question: "Что делать, если учёт пока в разных таблицах?", answer: "Сначала разберём источники и качество данных. Если системы ещё нет или отчёты не сходятся, начнём с проектной настройки. После неё учёт можно передать вашей команде или продолжить сопровождение." },
  { question: "Когда появится результат и сколько стоит работа?", answer: "Срок зависит от состояния данных. Проектная настройка обычно занимает до трёх месяцев; сопровождение идёт ежемесячно. Тарифы на регулярную работу начинаются от 35 000 ₽ в месяц, стоимость проекта рассчитывается после оценки задачи." },
];

export default function Home() {
  return (
    <main className="home-refresh">
      <div className="dark-stage">
        <Header dark />
        <section className="hero shell" id="top">
          <div className="hero-copy">
            <p className="kicker kicker-light">Андрей Сусленков · для собственников бизнеса</p>
            <h1>Финансовый директор <em>на аутсорсе</em></h1>
            <p className="hero-lead">Помогаю понять, сколько бизнес зарабатывает, хватит ли денег на платежи и сколько можно вывести собственнику.</p>
            <p className="hero-explanation">Настраиваю учёт и разбираю цифры вместе с вами — чтобы планировать расходы, находить причины потерь и оценивать решения до вложений.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">Записаться на диагностику <span aria-hidden="true">↓</span></a>
              <Link className="hero-secondary" href="/cases">Посмотреть результаты работы ↗</Link>
            </div>
            <p className="hero-action-note">20–30 минут: разберём задачу, состояние данных и следующий шаг.</p>
          </div>
          <div className="hero-visual" aria-label="Андрей Сусленков — финансовый директор и предприниматель">
            <div className="portrait-frame">
              <Image src="/images/andrey-suslenkov.jpg" alt="Андрей Сусленков" fill priority sizes="(max-width: 800px) 90vw, 430px" />
              <div className="portrait-caption"><span>Андрей Сусленков</span><span>Финдиректор и предприниматель</span></div>
            </div>
            <div className="hero-person-note"><span>Финансы глазами собственника</span><p>Сам нанимал команду, закупал товар и проходил сезонность.</p></div>
          </div>
        </section>
      </div>

      <section className="proof-strip" aria-label="Опыт в цифрах">
        <div className="shell proof-grid">{proofPoints.map((point) => <div key={point.value}><strong>{point.value}</strong><span>{point.label}</span></div>)}</div>
      </section>

      <section className="owner-questions shell">
        <div className="refresh-heading"><p className="kicker">С какими задачами помогаю</p><h2>Ответы на вопросы,<br />от которых зависят деньги</h2></div>
        <div className="owner-question-grid">{questions.map((question) => <article key={question.number}><span className="question-number">{question.number}</span><h3>{question.title}</h3><p>{question.text}</p><span className="question-result">{question.result}</span></article>)}</div>
      </section>

      <section className="cases-section shell" id="cases">
        <div className="refresh-heading"><p className="kicker">Результаты работы</p><h2>Больше прибыли.<br />Меньше решений вслепую.</h2><p>Истории клиентских компаний и моего бизнеса: что показал учёт и что мы изменили.</p></div>
        <CaseGrid items={orderedCases} getHref={(caseItem) => `/cases/${caseItem.slug}`} />
        <div className="section-link-row"><Link className="button button-primary" href="/cases">Все кейсы <span aria-hidden="true">→</span></Link></div>
        <div className="finance-origin" data-finance-origin aria-hidden="true" />
      </section>

      <section className="reports-section" id="reports">
        <div className="shell">
          <div className="reports-intro"><p className="kicker kicker-light">Что вы получаете</p><h2>Из разрозненных цифр —<br />понятная картина бизнеса</h2><p>Три связанных отчёта: откуда приходят деньги, сколько вы зарабатываете и что принадлежит бизнесу. Вместе разбираем, что за цифрами и какие действия нужны.</p></div>
          <p className="report-demo-note">Пример отчётов · демонстрационные данные за месяц</p>
          <FinancialScrollAnimation>
            {financialReportGroups.map((group) => <article className="report-card" key={group.title}>
              <header><span>{group.number}</span><h3>{group.subtitle}</h3><small>{group.title}</small></header>
              <div className="report-rows">{group.rows.map((row) => <div className={`report-row ${row.kind ? `report-row-${row.kind}` : ""} ${row.tone === "total" ? "report-row-total" : ""}`} key={row.label}><span>{row.label}</span><strong className={`report-value report-value-${row.tone}`}>{row.value}</strong></div>)}</div>
            </article>)}
          </FinancialScrollAnimation>
          <div className="report-takeaway"><span>Деньги на счёте ≠ прибыль</span><p>Остаток нужно сопоставить с предстоящими платежами и долгами. Так становится понятно, какую сумму можно использовать.</p></div>
        </div>
      </section>

      <section className="working-steps shell">
        <div className="refresh-heading"><p className="kicker">Как проходит работа</p><h2>От первого разговора<br />до решений по цифрам</h2></div>
        <ol className="working-steps-list">
          <li><span>01</span><div><h3>Разбираем задачу</h3><p>На диагностике обсуждаем, что беспокоит собственника, какие данные есть и что нужно выяснить.</p></div></li>
          <li><span>02</span><div><h3>Собираем надёжную основу</h3><p>Проверяем отчёты или настраиваем учёт с нуля. Определяем, кто собирает данные и когда они будут готовы.</p></div></li>
          <li><span>03</span><div><h3>Используем цифры в работе</h3><p>Передаю систему вашей команде или продолжаю сопровождение: разбираем результаты и считаем следующие решения.</p></div></li>
        </ol>
      </section>

      <section className="about-section shell" id="about">
        <div className="about-image"><Image src="/images/andrey-suslenkov.jpg" alt="Андрей Сусленков — финансовый директор" fill sizes="(max-width: 800px) 100vw, 470px" /></div>
        <div className="about-content"><p className="kicker">Ваш финансовый партнёр</p><h2>Знаю цену решений<br />на собственном опыте</h2><p className="large-copy">Я Андрей Сусленков. Помогаю собственникам разобраться в финансах бизнеса и принимать решения на основе расчётов.</p><p>Пять лет развивал свой интернет-магазин: нанимал людей, закупал товар, проходил сезонность. Вывел его на оборот более 40 млн ₽ в год, а когда модель перестала быть устойчивой — рассчитался по обязательствам и вышел с 2 млн ₽ на руках.</p><p>Этот опыт помогает учитывать в расчётах реальные задачи предпринимателя: зарплату команды, деньги в запасах и риск собственника.</p><Link className="about-story-link" href="/cases/internet-shop">Как я принял решение о выходе из бизнеса →</Link></div>
      </section>

      <section className="formats-section" id="formats"><div className="shell">
        <div className="refresh-heading"><p className="kicker kicker-light">Форматы работы</p><h2>Настроить учёт или работать<br />с финансовым директором регулярно</h2></div>
        <div className="formats-grid">{workFormats.map((format) => <article key={format.number}><span>{format.number}</span><h3>{format.title}</h3><p>{format.description}</p><small>{format.fit}</small><Link href={`/formats/${format.slug}`}>Что входит в работу <span aria-hidden="true">→</span></Link></article>)}</div>
        <div className="formats-actions"><Link className="button button-light" href="/pricing">Состав услуг и стоимость <span aria-hidden="true">→</span></Link></div>
      </div></section>

      <section className="materials-teaser"><div className="shell materials-teaser-grid">
        <div><p className="kicker">Можно начать самостоятельно</p><h2>Хватит ли денег<br />на платежи?</h2><p>Проверьте в готовом платёжном календаре. Внесите остаток, ожидаемые поступления и расходы — таблица поможет увидеть, когда денег может не хватить.</p><Link className="button button-primary" href="/materials">Выбрать бесплатную таблицу <span aria-hidden="true">→</span></Link><p className="materials-access-note">Два варианта · Google Sheets · без регистрации на сайте</p></div>
        <div className="sheet-preview"><p className="sheet-example-label">Пример заполнения</p><div className="sheet-window"><div className="sheet-toolbar"><i /><i /><i /><span>Платёжный календарь</span></div><div className="sheet-kpis"><div><span>На начало периода</span><strong>820 000 ₽</strong></div><div><span>После платежей</span><strong>1 060 000 ₽</strong></div></div><div className="sheet-row sheet-head"><span>Дата</span><span>Статья</span><span>Сумма, ₽</span></div><div className="sheet-row"><span>18.09</span><span>Поступления</span><span className="positive">+350 000</span></div><div className="sheet-row"><span>21.09</span><span>Аренда</span><span>−110 000</span></div><div className="sheet-tabs"><span>Платежи</span><span>Поступления</span><span>Инструкция</span></div></div></div>
      </div></section>

      <section className="faq-section shell"><div className="refresh-heading"><p className="kicker">Перед началом</p><h2>Что важно знать</h2></div><div className="faq-list">{faq.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>
      <ContactCta />
      <Footer />
    </main>
  );
}
