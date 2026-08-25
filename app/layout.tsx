import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://andrew-cfo.ru"),
  title: "Андрей Сусленков — финансовый директор на аутсорсе",
  description: "Управленческий учёт для собственников: ДДС, ОПиУ, баланс, платёжный календарь и финансовое сопровождение.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Андрей Сусленков — финансовый директор на аутсорсе",
    description: "Управленческий учёт для решений по прибыли, деньгам и обязательствам.",
    url: "/",
    siteName: "Андрей Сусленков",
    locale: "ru_RU",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
