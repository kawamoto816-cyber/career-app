import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// GA4: アオハルOS共通プロパティ (app.bluespring.co.jp と同じ測定ID)。診断開始・完了・シェアを計測する。
const GA_MEASUREMENT_ID = "G-V3YR5C8JL9";
const SITE_URL = "https://career.bluespring.co.jp";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "キャリキャラ | 偏差値以外の進路選び",
  description:
    "12問・30秒・ログイン不要の進路キャラ診断。あなたの性格タイプから、向いている学部と大学の環境がわかります。アオハルOS（株式会社ブルースプリング）提供。",
  icons: {
    icon: "/images/icon.png",
  },
  openGraph: {
    title: "キャリキャラ | 偏差値以外の進路選び",
    description: "12問・30秒・ログイン不要の進路キャラ診断。あなたはどのタイプ？",
    url: SITE_URL,
    siteName: "キャリキャラ",
    locale: "ja_JP",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
        {children}
      </body>
    </html>
  );
}
