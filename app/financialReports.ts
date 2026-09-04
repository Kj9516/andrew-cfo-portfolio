export type FinancialReportRow = {
  label: string;
  value: string;
  tone: "positive" | "negative" | "total";
  kind?: "subtotal" | "group" | "child";
};

export type FinancialReportGroup = {
  number: string;
  title: string;
  subtitle: string;
  rows: FinancialReportRow[];
};

export const financialReportGroups: FinancialReportGroup[] = [
  {
    number: "01",
    title: "ДДС",
    subtitle: "движение денег",
    rows: [
      { label: "Остаток на начало", value: "4 820 000 ₽", tone: "total" },
      { label: "Поступления", value: "+32 462 614 ₽", tone: "positive" },
      { label: "Поставщики", value: "-24 040 857 ₽", tone: "negative" },
      { label: "Зарплаты", value: "-1 813 839 ₽", tone: "negative" },
      { label: "Прочие платежи", value: "-2 849 456 ₽", tone: "negative" },
      { label: "Остаток на конец", value: "8 578 462 ₽", tone: "total" },
    ],
  },
  {
    number: "02",
    title: "ОПиУ",
    subtitle: "прибыль бизнеса",
    rows: [
      { label: "Выручка", value: "+30 389 676 ₽", tone: "positive" },
      { label: "Себестоимость", value: "-25 338 630 ₽", tone: "negative" },
      { label: "Валовая прибыль", value: "+5 051 046 ₽", tone: "positive", kind: "subtotal" },
      { label: "Зарплаты", value: "-1 813 839 ₽", tone: "negative" },
      { label: "Аренда и офис", value: "-987 425 ₽", tone: "negative" },
      { label: "Маркетинг и сервисы", value: "-485 563 ₽", tone: "negative" },
      { label: "Налоги", value: "-591 919 ₽", tone: "negative" },
      { label: "Чистая прибыль", value: "+1 172 300 ₽", tone: "total" },
    ],
  },
  {
    number: "03",
    title: "Баланс",
    subtitle: "что есть и кому должны",
    rows: [
      { label: "Активы", value: "32 462 614 ₽", tone: "total", kind: "group" },
      { label: "Деньги", value: "8 578 462 ₽", tone: "positive", kind: "child" },
      { label: "Запасы", value: "13 086 695 ₽", tone: "positive", kind: "child" },
      { label: "Дебиторка", value: "10 797 457 ₽", tone: "positive", kind: "child" },
      { label: "Пассивы", value: "32 462 614 ₽", tone: "total", kind: "group" },
      { label: "Обязательства", value: "24 040 857 ₽", tone: "positive", kind: "child" },
      { label: "Капитал", value: "8 421 757 ₽", tone: "positive", kind: "child" },
    ],
  },
];
