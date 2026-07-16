import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://andrew-cfo.ru"),
  title: "Андрей Сусленков — финансовый директор на аутсорсе",
  description:
    "Помогаю собственникам малого и среднего бизнеса видеть реальную финансовую картину и принимать решения на основе цифр.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Андрей Сусленков — финансовый директор на аутсорсе",
    description:
      "Финансовая система, после которой понятно, что делать.",
    url: "/",
    siteName: "Андрей Сусленков",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
