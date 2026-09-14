import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getCharaType } from "@/lib/chara-types";

// /r/[id]/opengraph-image: シェア用の結果カード (1200x630)。
// X / LINE / Threads でURLを貼ったときにこの画像がカードとして出る。
export const runtime = "nodejs";
export const alt = "キャリキャラ 診断結果";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GRADIENTS: Record<string, [string, string]> = {
  LSRC: ["#60A5FA", "#6366F1"], LSRA: ["#22D3EE", "#3B82F6"], LSIC: ["#818CF8", "#8B5CF6"], LSIA: ["#A78BFA", "#EC4899"],
  LGRC: ["#2DD4BF", "#10B981"], LGRA: ["#4ADE80", "#14B8A6"], LGIC: ["#A3E635", "#22C55E"], LGIA: ["#FACC15", "#F97316"],
  FSRC: ["#F472B6", "#F43F5E"], FSRA: ["#FB923C", "#EF4444"], FSIC: ["#A78BFA", "#EC4899"], FSIA: ["#E879F9", "#A855F7"],
  FGRC: ["#FB7185", "#F97316"], FGRA: ["#F87171", "#F59E0B"], FGIC: ["#34D399", "#14B8A6"], FGIA: ["#38BDF8", "#6366F1"],
};

// 日本語フォント: リポジトリ同梱の Noto Sans CJK JP Bold サブセット (使う文字だけ、約280KB)。
// 外部フォント取得に依存しないので、ビルド環境やネットワークに左右されない。
async function loadFont(): Promise<ArrayBuffer | undefined> {
  try {
    const buf = await readFile(path.join(process.cwd(), "lib", "fonts", "NotoSansJP-Bold-subset.otf"));
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  } catch {
    return undefined;
  }
}

export default async function OgImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = getCharaType(id);
  const name = t?.name ?? "キャリキャラ";
  const catchphrase = t?.catch ?? "12問・30秒の進路キャラ診断";
  const faculty = t?.faculty ?? "";
  const typeId = t?.id ?? "";
  const [c1, c2] = GRADIENTS[typeId] ?? ["#6366F1", "#EC4899"];

  const [font, png] = await Promise.all([
    loadFont(),
    t ? readFile(path.join(process.cwd(), "public", "images", t.file)).catch(() => null) : Promise.resolve(null),
  ]);
  const imgSrc = png ? `data:image/png;base64,${png.toString("base64")}` : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: `linear-gradient(135deg, ${c1}, ${c2})`,
          fontFamily: "NotoSansJP, sans-serif",
          color: "white",
          padding: 56,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 48, width: "100%" }}>
          {imgSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imgSrc} width={360} height={360} style={{ borderRadius: 999, border: "10px solid rgba(255,255,255,0.7)", objectFit: "cover" }} />
          ) : null}
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ fontSize: 26, opacity: 0.92, letterSpacing: 2 }}>あなたの進路キャラは</div>
            <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.15, marginTop: 8, textShadow: "0 4px 16px rgba(0,0,0,0.25)" }}>{name}</div>
            <div style={{ display: "flex", marginTop: 14 }}>
              <div style={{ fontSize: 24, background: "rgba(0,0,0,0.25)", padding: "6px 18px", borderRadius: 12, letterSpacing: 4 }}>{`${typeId} 型`}</div>
            </div>
            <div style={{ fontSize: 30, marginTop: 22, lineHeight: 1.4 }}>{`“${catchphrase}”`}</div>
            {faculty ? <div style={{ fontSize: 24, marginTop: 18, opacity: 0.95 }}>{`おすすめ学部：${faculty}`}</div> : null}
            <div style={{ fontSize: 22, marginTop: "auto", opacity: 0.9 }}>キャリキャラ 進路キャラ診断 ／ 12問・30秒・無料・ログイン不要</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "NotoSansJP", data: font, weight: 700, style: "normal" }] : undefined,
    },
  );
}
