import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "首爾五天四夜行程",
  description: "2026年9月7日至9月11日首爾旅行時間表與交通動線",
  icons: { icon: "/trip/favicon.svg", shortcut: "/trip/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-TW"><body>{children}</body></html>;
}
