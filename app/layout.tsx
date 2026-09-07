import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "キャリキャラ | 偏差値以外の進路選び",
  icons: {
    icon: "/images/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
