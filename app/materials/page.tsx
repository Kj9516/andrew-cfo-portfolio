import type { Metadata } from "next";
import { ContactCta, Footer, Header, MaterialCard } from "../components";
import { materials } from "../data";

export const metadata: Metadata = {
  title: "Бесплатные инструменты управленческого учёта — Андрей Сусленков",
  description: "Готовые платёжные календари в Google Sheets для контроля денег и предотвращения кассовых разрывов.",
  alternates: { canonical: "/materials" },
  openGraph: {
    title: "Бесплатные инструменты управленческого учёта",
    description: "Два готовых платёжных календаря в Google Sheets — копируйте и используйте в своём бизнесе.",
    url: "/materials",
  },
};

const faq = [
  { question: "Почему это бесплатно?", answer: "Я считаю, что у каждого бизнеса должен быть понятный базовый финансовый учёт. Поэтому часть своих наработок выкладываю в открытый доступ." },
  { question: "Можно изменить таблицу под себя?", answer: "Да. После создания копии вы можете свободно менять структуру и формулы. Ответственность за изменённую версию при этом остаётся у вас." },
  { question: "Что делать, если нужного отчёта нет?", answer: "Библиотека будет пополняться. Специфический отчёт или полноценную систему можно разработать индивидуально под процессы вашей компании." },
  { question: "Можно помочь с настройкой?", answer: "Да. Напишите мне в Telegram — разберём инструмент, ограничения и способ адаптации под ваш бизнес." },
];

export default function MaterialsPage() {
  return (
    <main>
      <Header />
      <section className="materials-hero shell">
        <div>
          <p className="kicker">Открытая библиотека / Google Sheets</p>
          <h1>Учёт можно начать<br /><em>без сложной системы.</em></h1>
        </div>
        <div className="materials-hero-copy">
          <p>Готовые инструменты, которые помогают заранее видеть платежи и не управлять бизнесом по остатку на счёте.</p>
          <span>Бесплатно · Без регистрации · Можно изменять</span>
        </div>
      </section>

      <section className="materials-catalog shell" aria-labelledby="catalog-title">
        <div className="catalog-heading"><span>Доступно сейчас</span><strong id="catalog-title">02 инструмента</strong></div>
        <div className="materials-grid">{materials.map((material) => <MaterialCard material={material} key={material.number} />)}</div>
      </section>

      <section className="how-to-section">
        <div className="shell how-to-grid">
          <div><p className="kicker">Как начать</p><h2>Три шага —<br />и таблица ваша</h2></div>
          <ol>
            <li><span>01</span><div><strong>Откройте инструмент</strong><p>Выберите подходящую таблицу и перейдите по ссылке.</p></div></li>
            <li><span>02</span><div><strong>Создайте копию</strong><p>В Google Sheets нажмите «Файл → Создать копию».</p></div></li>
            <li><span>03</span><div><strong>Прочитайте инструкцию</strong><p>Откройте вкладку «Инструкция» и настройте данные под себя.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="faq-section shell">
        <div className="section-intro"><p className="kicker">FAQ / Коротко о важном</p><h2>Вопросы по материалам</h2></div>
        <div className="faq-list">
          {faq.map((item, index) => <details key={item.question} open={index === 0}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}
        </div>
      </section>

      <ContactCta compact />
      <Footer />
    </main>
  );
}
