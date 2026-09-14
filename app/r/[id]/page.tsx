import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CHARA_TYPES, SITE_URL, getCharaType } from "@/lib/chara-types";

// /r/[id]: 診断結果のシェア用ページ。
// SNSでシェアされたURLの着地点。ログイン不要・静的生成。OGP画像は opengraph-image.tsx が生成する。
// 「自分も診断する」→ トップ、「志望理由書を添削してもらう」→ アオハルOS /try に誘導する。

const HUB_TRY = "https://app.bluespring.co.jp/try?for=highschool&utm_source=careerchara&utm_medium=share";

export function generateStaticParams() {
  return CHARA_TYPES.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const t = getCharaType(id);
  if (!t) return {};
  const title = `${t.name}（${t.id}型）｜キャリキャラ 進路キャラ診断`;
  const description = `「${t.catch}」 おすすめ学部: ${t.faculty}。12問・30秒・ログイン不要の進路キャラ診断。あなたはどのタイプ？`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/r/${t.id}` },
    openGraph: { title, description, url: `${SITE_URL}/r/${t.id}`, type: "website", siteName: "キャリキャラ" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ResultSharePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = getCharaType(id);
  if (!t) notFound();

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 px-4 py-10">
      <div className="mx-auto max-w-md overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-2xl">
        <div className={`bg-gradient-to-r ${t.colorTheme} px-6 pt-8 pb-10 text-center text-white`}>
          <p className="text-xs font-bold uppercase tracking-widest opacity-90">キャリキャラ 進路キャラ診断</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/${t.file}`} alt={t.name} width={160} height={160} className="mx-auto mt-4 h-40 w-40 rounded-full border-4 border-white/70 object-cover shadow-lg" />
          <h1 className="mt-4 text-3xl font-extrabold leading-tight drop-shadow">{t.name}</h1>
          <p className="mt-2 inline-block rounded-lg bg-black/20 px-3 py-1 font-mono text-sm font-bold tracking-widest">{t.id} 型</p>
          <p className="mt-3 text-sm font-bold">“{t.catch}”</p>
        </div>
        <div className="-mt-6 space-y-5 rounded-t-[2rem] bg-white px-6 pt-7 pb-8">
          <section>
            <h2 className="mb-2 border-l-4 border-pink-400 pl-3 text-base font-bold text-gray-800">基本性格</h2>
            <p className="rounded-xl border border-pink-100 bg-pink-50/50 p-4 text-sm leading-relaxed text-gray-700">{t.basic}</p>
          </section>
          <section>
            <h2 className="mb-2 border-l-4 border-indigo-400 pl-3 text-base font-bold text-gray-800">おすすめの学部</h2>
            <p className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 text-sm font-bold text-gray-800">{t.faculty}</p>
          </section>
          <Link
            href="/?from=share"
            className="block rounded-xl bg-indigo-600 py-3.5 text-center text-sm font-bold text-white shadow-md transition hover:bg-indigo-500"
          >
            自分も診断する（無料・30秒・ログイン不要）→
          </Link>
          <a
            href={HUB_TRY}
            className="block rounded-xl border-2 border-indigo-100 py-3 text-center text-sm font-bold text-indigo-600 transition hover:bg-indigo-50"
          >
            志望理由書・小論文をAIに無料添削してもらう
          </a>
          <p className="text-center text-[11px] leading-relaxed text-gray-400">
            キャリキャラはアオハルOS（株式会社ブルースプリング）が提供する無料の進路診断です。診断結果は性格の傾向を楽しく知るためのもので、進路を決めつけるものではありません。
          </p>
        </div>
      </div>
    </main>
  );
}
