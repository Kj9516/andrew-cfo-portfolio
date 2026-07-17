import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://andrew-cfo.ru"),
  title: "Андрей Сусленков — финансовый директор на аутсорсе",
  description: "Строю управленческий учёт, который показывает реальное состояние бизнеса и помогает собственнику принимать решения.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Андрей Сусленков — финансовый директор на аутсорсе",
    description: "Цифры, после которых понятно, что делать.",
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
