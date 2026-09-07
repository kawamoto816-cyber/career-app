'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart, Zap, BookOpen, Users, Coffee, Rocket, Smile, ArrowRight, Share2, RefreshCw, CheckCircle, HelpCircle, Microscope, Code, PenTool, Lightbulb, Scale, Building, MessageCircle, Megaphone, Palette, Compass, Feather, Music, Utensils, PartyPopper, Stars, Crown, Star, Send, MapPin, Phone, Mail, User, Gift, Loader2, Info, Brain, X, Tag, ShieldCheck, Lock, ChevronDown, CheckSquare, Square, Filter, Grid, Search, Building2, Copy, MessageCircle as LineIcon, GraduationCap } from 'lucide-react';

// --- 設定 ---
const RECOMMENDED_COUNT = 5;
const APP_TITLE = "キャリキャラ";

// 重要：GASのデプロイURL
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbzT9e260MXOA9oyW8x-LVQF3byu93noJtw2U8rZMdS7jwBZ8sb7OHA2pym8CuhhDTKhsA/exec";

// --- データ定義 ---
const universityDatabase = {
  science: [
    // --- ユニーク・注目 ---
    { name: "福井県立大学", faculty: "恐竜学部", area: "chubu", difficulty: "C", sogo_level: 3, desc: "日本初、恐竜に特化した学部。博物館や発掘現場が教室。", tags: ["恐竜", "化石"] },
    { name: "岡山理科大学", faculty: "生物地球学部", area: "chugoku_shikoku", difficulty: "C", sogo_level: 2, desc: "「恐竜学科」がある稀有な大学。モンゴルでの発掘実習も。", tags: ["恐竜", "発掘"] },
    { name: "千葉大学", faculty: "園芸学部", area: "kanto", difficulty: "A", sogo_level: 2, desc: "国立大学唯一の園芸学部。植物や造園のスペシャリストへ。", tags: ["国立", "植物"] },
    // --- 国立 ---
    { name: "東京大学", faculty: "理科一類/二類", area: "kanto", difficulty: "S", sogo_level: 1, desc: "日本の知の頂点。世界を変える研究者への道。", tags: ["最難関", "研究"] },
    { name: "京都大学", faculty: "理学部", area: "kansai", difficulty: "S", sogo_level: 1, desc: "「自由の学風」。常識にとらわれない天才たちが集う。", tags: ["旧帝大", "ノーベル賞"] },
    { name: "東京工業大学", faculty: "工学院", area: "kanto", difficulty: "S", sogo_level: 1, desc: "科学技術の最高峰。エンジニアの聖地。", tags: ["国立", "専門性"] },
    { name: "東北大学", faculty: "工学部", area: "hokkaido_tohoku", difficulty: "S", sogo_level: 2, desc: "「研究第一主義」。材料科学などは世界トップレベル。", tags: ["旧帝大", "研究"] },
    { name: "大阪大学", faculty: "工学部", area: "kansai", difficulty: "S", sogo_level: 2, desc: "地域に根ざし世界に羽ばたく。バイオやロボットも強い。", tags: ["旧帝大", "実学"] },
    { name: "名古屋大学", faculty: "工学部", area: "chubu", difficulty: "S", sogo_level: 1, desc: "ノーベル賞受賞者を多数輩出。自由闊達な研究環境。", tags: ["旧帝大", "自動車"] },
    { name: "九州大学", faculty: "工学部", area: "kyushu_okinawa", difficulty: "S", sogo_level: 1, desc: "伊都キャンパスは日本最大級。水素エネルギー研究の最先端。", tags: ["旧帝大", "巨大"] },
    { name: "北海道大学", faculty: "総合理系", area: "hokkaido_tohoku", difficulty: "S", sogo_level: 1, desc: "「大志を抱け」。広大なキャンパスで伸び伸び学ぶ。", tags: ["旧帝大", "自然"] },
    { name: "筑波大学", faculty: "理工学群", area: "kanto", difficulty: "A", sogo_level: 2, desc: "研究学園都市の中枢。学際的な学びが可能。", tags: ["国立", "未来"] },
    { name: "千葉大学", faculty: "工学部", area: "kanto", difficulty: "A", sogo_level: 2, desc: "首都圏の総合大学。デザイン工学なども有名。", tags: ["国立", "総合"] },
    { name: "広島大学", faculty: "理学部", area: "chugoku_shikoku", difficulty: "A", sogo_level: 2, desc: "広大なキャンパスで研究三昧。西の教育拠点。", tags: ["国立", "自然"] },
    { name: "金沢大学", faculty: "理工学域", area: "chubu", difficulty: "A", sogo_level: 2, desc: "伝統ある城下町で学ぶ。研究力に定評あり。", tags: ["国立", "伝統"] },
    { name: "岡山大学", faculty: "工学部", area: "chugoku_shikoku", difficulty: "A", sogo_level: 2, desc: "SDGs推進大学。地域課題解決に強い。", tags: ["国立", "SDGs"] },
    { name: "熊本大学", faculty: "工学部", area: "kyushu_okinawa", difficulty: "A", sogo_level: 2, desc: "半導体研究の拠点として注目。地域産業と連携。", tags: ["国立", "半導体"] },
    { name: "新潟大学", faculty: "工学部", area: "chubu", difficulty: "A", sogo_level: 2, desc: "日本海側屈指の総合大学。幅広い分野を学べる。", tags: ["国立", "日本海"] },
    { name: "信州大学", faculty: "繊維学部", area: "chubu", difficulty: "A", sogo_level: 2, desc: "日本唯一の繊維学部。素材開発の最先端。", tags: ["国立", "繊維"] },
    { name: "静岡大学", faculty: "情報学部", area: "chubu", difficulty: "B", sogo_level: 2, desc: "浜松キャンパスはやらまいか精神。情報・工学に強い。", tags: ["国立", "浜松"] },
    { name: "山形大学", faculty: "工学部", area: "hokkaido_tohoku", difficulty: "B", sogo_level: 2, desc: "有機EL研究で世界的に有名。実力派。", tags: ["国立", "有機EL"] },
    { name: "鹿児島大学", faculty: "工学部", area: "kyushu_okinawa", difficulty: "B", sogo_level: 2, desc: "南九州の知の拠点。海洋や宇宙の研究も。", tags: ["国立", "南"] },
    { name: "山口大学", faculty: "工学部", area: "chugoku_shikoku", difficulty: "B", sogo_level: 2, desc: "吉田松陰の精神を受け継ぐ。地域貢献度が高い。", tags: ["国立", "伝統"] },
    { name: "愛媛大学", faculty: "工学部", area: "chugoku_shikoku", difficulty: "B", sogo_level: 2, desc: "四国の国立大。沿岸環境科学などが特色。", tags: ["国立", "水産"] },
    { name: "富山大学", faculty: "工学部", area: "chubu", difficulty: "B", sogo_level: 2, desc: "薬都・富山。製薬やアルミ産業と連携。", tags: ["国立", "薬学"] },
    { name: "長崎大学", faculty: "工学部", area: "kyushu_okinawa", difficulty: "B", sogo_level: 2, desc: "実学重視。海洋エネルギーなどの独自研究。", tags: ["国立", "多文化"] },
    { name: "琉球大学", faculty: "工学部", area: "kyushu_okinawa", difficulty: "B", sogo_level: 2, desc: "日本最南端の国立大。亜熱帯の環境で学ぶ。", tags: ["国立", "南国"] },
    { name: "九州工業大学", faculty: "情報工学部", area: "kyushu_okinawa", difficulty: "A", sogo_level: 2, desc: "就職にめっぽう強い国立単科大。情報系ならここ。", tags: ["国立", "IT"] },
    { name: "名古屋工業大学", faculty: "工学部", area: "chubu", difficulty: "A", sogo_level: 1, desc: "東海のものづくりを支える。就職率ほぼ100%。", tags: ["国立", "技術"] },
    { name: "沖縄科学技術大学院大学(OIST)", faculty: "科学技術研究科", area: "kyushu_okinawa", difficulty: "S", sogo_level: 3, desc: "世界トップクラスの研究環境。※5年一貫制博士課程", tags: ["世界最高峰", "英語"] },

    // --- 私立・公立・専門職 ---
    { name: "東京理科大学", faculty: "理学部", area: "kanto", difficulty: "S", sogo_level: 1, desc: "「実力主義」。鍛え上げられたいストイックな君へ。", tags: ["厳格", "就職"] },
    { name: "早稲田大学", faculty: "基幹理工学部", area: "kanto", difficulty: "S", sogo_level: 2, desc: "圧倒的な研究費と自由な校風。学際的な学び。", tags: ["私学の雄", "先端"] },
    { name: "慶應義塾大学", faculty: "理工学部", area: "kanto", difficulty: "S", sogo_level: 1, desc: "「実学」の伝統。世界で活躍するエンジニアへ。", tags: ["ブランド", "結束"] },
    { name: "公立はこだて未来大学", faculty: "システム情報科学部", area: "hokkaido_tohoku", difficulty: "B", sogo_level: 3, desc: "デザイン×IT。クリエイティブなエンジニアを育成。", tags: ["公立", "デザイン"] },
    { name: "会津大学", faculty: "コンピュータ理工学部", area: "hokkaido_tohoku", difficulty: "B", sogo_level: 2, desc: "日本初のコンピュータ専門大学。シリコンバレー流。", tags: ["公立", "IT特化"] },
    { name: "金沢工業大学", faculty: "工学部", area: "chubu", difficulty: "B", sogo_level: 3, desc: "「面倒見が良い大学」No.1常連。就職最強。", tags: ["就職最強", "プロジェクト"] },
    { name: "豊田工業大学", faculty: "工学部", area: "chubu", difficulty: "A", sogo_level: 1, desc: "トヨタ自動車が設立。学費が安く、就職は最強。", tags: ["トヨタ", "少人数"] },
    { name: "大阪工業大学", faculty: "ロボティクス＆デザイン工学部", area: "kansai", difficulty: "B", sogo_level: 3, desc: "梅田キャンパスで最先端ロボットを学ぶ。", tags: ["ロボット", "都心"] },
    { name: "近畿大学", faculty: "理工学部", area: "kansai", difficulty: "B", sogo_level: 2, desc: "実学教育のパイオニア。マグロだけじゃない。", tags: ["人気", "研究"] },
    { name: "長浜バイオ大学", faculty: "バイオサイエンス学部", area: "kansai", difficulty: "C", sogo_level: 2, desc: "バイオ特化の単科大。実験機器は企業顔負け。", tags: ["バイオ", "実験"] },
    { name: "東京都市大学", faculty: "理工学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "東急グループ連携の実践力。就職に強い。", tags: ["就職", "実学"] },
    { name: "千葉工業大学", faculty: "先進工学部", area: "kanto", difficulty: "B", sogo_level: 3, desc: "ロボット・宇宙分野の最先端。スカイツリーにキャンパス。", tags: ["宇宙", "ロボット"] },
    { name: "芝浦工業大学", faculty: "工学部", area: "kanto", difficulty: "A", sogo_level: 2, desc: "実学重視。ものづくりをとことん楽しめる。", tags: ["技術", "実践"] },
    { name: "東京電機大学", faculty: "工学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "「実学尊重」。技術で社会に貢献する。", tags: ["実学", "就職"] },
    { name: "工学院大学", faculty: "工学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "新宿の高層ビルキャンパス。伝統ある工科大。", tags: ["新宿", "伝統"] },
    { name: "名城大学", faculty: "理工学部", area: "chubu", difficulty: "B", sogo_level: 2, desc: "ノーベル賞受賞者も在籍。中部圏最大級の理系。", tags: ["理系", "就職"] },
    { name: "中部大学", faculty: "工学部", area: "chubu", difficulty: "C", sogo_level: 2, desc: "ワンキャンパスの総合大学。NASAとの連携も。", tags: ["就職", "マンモス"] },
    { name: "大阪産業大学", faculty: "工学部", area: "kansai", difficulty: "C", sogo_level: 2, desc: "自動車や交通機械に強い。実学教育。", tags: ["車", "スポーツ"] },
    { name: "東京工科大学", faculty: "メディア学部", area: "kanto", difficulty: "C", sogo_level: 3, desc: "日本初のメディア学部。ゲームやアニメ制作も。", tags: ["メディア", "工学"] },
    { name: "ZEN大学", faculty: "知能情報社会学部", area: "kanto", difficulty: "C", sogo_level: 3, desc: "ドワンゴと日本財団が創る、完全オンライン大学。", tags: ["オンライン", "IT"] },
    // 専門職大学 (IT/農林)
    { name: "情報経営イノベーション専門職大学(iU)", faculty: "情報経営イノベーション学部", area: "kanto", difficulty: "D", sogo_level: 3, desc: "「全員起業」。ビジネス×ITで在学中に社長へ。", tags: ["起業", "新設"] },
    { name: "東京国際工科専門職大学", faculty: "工科学部", area: "kanto", difficulty: "C", sogo_level: 3, desc: "実践的なAI・ロボット教育。プロの指導。", tags: ["実習", "プロ"] },
    { name: "大阪国際工科専門職大学", faculty: "工科学部", area: "kansai", difficulty: "C", sogo_level: 3, desc: "大阪モード学園系列。実践重視のIT教育。", tags: ["実習", "プロ"] },
    { name: "名古屋国際工科専門職大学", faculty: "工科学部", area: "chubu", difficulty: "C", sogo_level: 3, desc: "トヨタのお膝元で学ぶ実践IT。", tags: ["実習", "プロ"] },
    { name: "静岡県立農林環境専門職大学", faculty: "生産環境経営学部", area: "chubu", difficulty: "C", sogo_level: 3, desc: "農林業のプロを育てる。実習時間が圧倒的。", tags: ["農林", "実習"] },
    { name: "東北農林専門職大学", faculty: "農林業経営学部", area: "hokkaido_tohoku", difficulty: "C", sogo_level: 3, desc: "山形で学ぶ次世代の農林業。", tags: ["農林", "実習"] },
  ],

  humanities: [
    // --- ユニーク・注目 ---
    { name: "東京未来大学", faculty: "モチベーション行動科学部", area: "kanto", difficulty: "C", sogo_level: 3, desc: "「やる気」を科学するユニークな学部。公認心理師も。", tags: ["心理", "モチベ"] },
    { name: "佛教大学", faculty: "歴史学部", area: "kansai", difficulty: "C", sogo_level: 2, desc: "京都で歴史を学ぶなら。歴史学に特化した学部。", tags: ["歴史", "京都"] },
    { name: "早稲田大学", faculty: "文化構想学部", area: "kanto", difficulty: "S", sogo_level: 3, desc: "文芸・ジャーナリズム・サブカル。新しい文化を創る。", tags: ["サブカル", "多様性"] },
    // --- 国立 ---
    { name: "東京大学", faculty: "文科三類", area: "kanto", difficulty: "S", sogo_level: 1, desc: "言語・思想・歴史。知の深淵を覗く。", tags: ["最難関", "教養"] },
    { name: "京都大学", faculty: "文学部", area: "kansai", difficulty: "S", sogo_level: 1, desc: "「変人」歓迎。独自の世界観を突き詰めるならここ。", tags: ["旧帝大", "哲学"] },
    { name: "大阪大学", faculty: "人間科学部", area: "kansai", difficulty: "S", sogo_level: 2, desc: "行動学・社会学・教育学。人間を科学する。", tags: ["旧帝大", "ユニーク"] },
    { name: "名古屋大学", faculty: "文学部", area: "chubu", difficulty: "S", sogo_level: 1, desc: "少人数教育でじっくり古典や歴史と向き合う。", tags: ["旧帝大", "伝統"] },
    { name: "九州大学", faculty: "共創学部", area: "kyushu_okinawa", difficulty: "S", sogo_level: 3, desc: "文理融合で課題解決。新しいタイプのエリートへ。", tags: ["旧帝大", "文理融合"] },
    { name: "北海道大学", faculty: "文学部", area: "hokkaido_tohoku", difficulty: "S", sogo_level: 1, desc: "広大なキャンパスで、伸び伸びと真理を探究。", tags: ["旧帝大", "自然"] },
    { name: "岡山大学", faculty: "文学部", area: "chugoku_shikoku", difficulty: "A", sogo_level: 2, desc: "SDGsに強い。社会課題を深く考えるなら。", tags: ["国立", "SDGs"] },
    // --- 私立 ---
    { name: "国際基督教大学(ICU)", faculty: "教養学部", area: "kanto", difficulty: "S", sogo_level: 3, desc: "献学の精神と日英バイリンガル教育。真のリベラルアーツ。", tags: ["少人数", "対話"] },
    { name: "上智大学", faculty: "文学部", area: "kanto", difficulty: "S", sogo_level: 2, desc: "ソフィアの知性。哲学や歴史をグローバル視点で。", tags: ["ミッション", "伝統"] },
    { name: "國學院大學", faculty: "文学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "日本文化・神道を学ぶなら随一の環境。", tags: ["神道", "日本"] },
    { name: "二松学舎大学", faculty: "文学部", area: "kanto", difficulty: "C", sogo_level: 2, desc: "夏目漱石も学んだ。漢文・国文の伝統校。", tags: ["文学", "書道"] },
    { name: "学習院大学", faculty: "文学部", area: "kanto", difficulty: "A", sogo_level: 1, desc: "落ち着いた環境でじっくり学ぶ。皇族も通う名門。", tags: ["皇族", "落ち着き"] },
    { name: "明治学院大学", faculty: "文学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "ヘボン博士が創設。おしゃれでリベラルな校風。", tags: ["おしゃれ", "ミッション"] },
    { name: "大東文化大学", faculty: "文学部", area: "kanto", difficulty: "C", sogo_level: 2, desc: "書道といえば大東文化。日本文化を深く学ぶ。", tags: ["書道", "スポーツ"] },
    { name: "文教大学", faculty: "文学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "教員採用者数トップクラス。「教育の文教」。", tags: ["教育", "人間"] },
    { name: "同志社大学", faculty: "神学部", area: "kansai", difficulty: "A", sogo_level: 2, desc: "一神教を深く学ぶ。良心教育の根幹。", tags: ["キリスト教", "哲学"] },
    { name: "京都産業大学", faculty: "文化学部", area: "kansai", difficulty: "C", sogo_level: 3, desc: "京都そのものがキャンパス。フィールドワーク重視。", tags: ["京都", "体験"] },
    { name: "龍谷大学", faculty: "文学部", area: "kansai", difficulty: "B", sogo_level: 2, desc: "仏教精神に基づく教育。歴史と伝統がある。", tags: ["仏教", "真面目"] },
    { name: "佛教大学", faculty: "仏教学部", area: "kansai", difficulty: "D", sogo_level: 2, desc: "仏教精神に基づく人間教育。歴史と心を学ぶ。", tags: ["仏教", "京都"] },
    { name: "南山大学", faculty: "人文学部", area: "chubu", difficulty: "A", sogo_level: 2, desc: "中部地方の私学雄。カトリック精神と自由な学風。", tags: ["英語", "国際"] },
    { name: "駒澤大学", faculty: "仏教学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "禅の精神。駅伝も有名。渋谷に近い。", tags: ["仏教", "立地"] },
    { name: "神田外語大学", faculty: "外国語学部", area: "kanto", difficulty: "C", sogo_level: 3, desc: "キャンパスがまるで海外。語学漬け。", tags: ["語学", "SALC"] },
  ],

  social: [
    // --- ユニーク・注目 ---
    { name: "大阪工業大学", faculty: "知的財産学部", area: "kansai", difficulty: "C", sogo_level: 3, desc: "特許や著作権のプロを目指す。理系大学にある文系学部。", tags: ["弁理士", "著作権"] },
    { name: "明海大学", faculty: "不動産学部", area: "kanto", difficulty: "C", sogo_level: 3, desc: "不動産業界の専門家を育成。宅建取得に強い。", tags: ["不動産", "宅建"] },
    { name: "日本大学", faculty: "危機管理学部", area: "kanto", difficulty: "B", sogo_level: 3, desc: "災害・テロ・犯罪など、現代社会のリスクを学ぶ。", tags: ["防災", "リスク"] },
    { name: "千葉科学大学", faculty: "危機管理学部", area: "kanto", difficulty: "C", sogo_level: 3, desc: "警察官・消防官の輩出に定評あり。", tags: ["警察", "消防"] },
    // --- 国立 ---
    { name: "東京大学", faculty: "文科一類", area: "kanto", difficulty: "S", sogo_level: 1, desc: "法と政治の最高峰。国家のリーダーを目指す。", tags: ["官僚", "法曹"] },
    { name: "一橋大学", faculty: "社会学部", area: "kanto", difficulty: "S", sogo_level: 1, desc: "社会科学の総合大学。市民社会のリーダーへ。", tags: ["国立", "ゼミ"] },
    { name: "神戸大学", faculty: "経営学部", area: "kansai", difficulty: "S", sogo_level: 1, desc: "「近代経済学の父」。ビジネスアカデミズムの伝統。", tags: ["国立", "経営"] },
    { name: "大阪大学", faculty: "法学部", area: "kansai", difficulty: "S", sogo_level: 1, desc: "国際公共政策など、グローバルな視点で法を学ぶ。", tags: ["旧帝大", "国際"] },
    // --- 私立 ---
    { name: "早稲田大学", faculty: "政治経済学部", area: "kanto", difficulty: "S", sogo_level: 2, desc: "在野の精神。圧倒的なエネルギーと多様性。", tags: ["私学の雄", "人脈"] },
    { name: "慶應義塾大学", faculty: "経済学部", area: "kanto", difficulty: "S", sogo_level: 1, desc: "「陸の王者」。経済界をリードする三田会。", tags: ["ブランド", "結束"] },
    { name: "明治大学", faculty: "商学部", area: "kanto", difficulty: "A", sogo_level: 2, desc: "「個」を強くする。人気・実力ともにトップクラス。", tags: ["人気", "就職"] },
    { name: "立教大学", faculty: "経営学部", area: "kanto", difficulty: "A", sogo_level: 3, desc: "BLP（ビジネス・リーダーシップ・プログラム）が有名。", tags: ["リーダー", "実践"] },
    { name: "中央大学", faculty: "法学部", area: "kanto", difficulty: "A", sogo_level: 1, desc: "「法科の中央」。弁護士や公務員に強い。", tags: ["資格", "実直"] },
    { name: "法政大学", faculty: "経営学部", area: "kanto", difficulty: "A", sogo_level: 2, desc: "「自由と進歩」。キャリア教育に定評あり。", tags: ["MARCH", "キャリア"] },
    { name: "青山学院大学", faculty: "経営学部", area: "kanto", difficulty: "A", sogo_level: 2, desc: "渋谷でマーケティングを学ぶ。おしゃれで人気。", tags: ["おしゃれ", "人気"] },
    { name: "東洋大学", faculty: "社会学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "哲学教育がベース。マンモス校で多様な出会い。", tags: ["哲学", "マンモス"] },
    { name: "専修大学", faculty: "商学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "計数の専修。会計士や公務員に強い。", tags: ["公務員", "資格"] },
    { name: "日本大学", faculty: "法学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "日本一のマンモス校。社長輩出数No.1。", tags: ["マンモス", "社長"] },
    { name: "東海大学", faculty: "政治経済学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "全国にキャンパス。海洋学部などユニークな学部も。", tags: ["マンモス", "海洋"] },
    { name: "帝京大学", faculty: "経済学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "「自分流」。スポーツ強豪校としても有名。", tags: ["自分流", "スポーツ"] },
    { name: "国士舘大学", faculty: "政経学部", area: "kanto", difficulty: "C", sogo_level: 2, desc: "警察官・消防官の就職に圧倒的な強さ。", tags: ["スポーツ", "救急"] },
    { name: "立正大学", faculty: "心理学部", area: "kanto", difficulty: "C", sogo_level: 2, desc: "日本最大級の心理学部を持つ。", tags: ["心理", "仏教"] },
    { name: "関東学院大学", faculty: "経営学部", area: "kanto", difficulty: "C", sogo_level: 2, desc: "横浜・関内キャンパス。キリスト教主義。", tags: ["横浜", "ミッション"] },
    { name: "神奈川大学", faculty: "経済学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "みなとみらいキャンパスが人気。給費生制度も。", tags: ["給費生", "みなとみらい"] },
    { name: "成蹊大学", faculty: "経済学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "吉祥寺の赤レンガ。安倍元首相の母校。", tags: ["安倍元首相", "吉祥寺"] },
    { name: "産業能率大学", faculty: "経営学部", area: "kanto", difficulty: "C", sogo_level: 3, desc: "企業コラボ授業が多数。現場で使える力を養う。", tags: ["PBL", "実践"] },
    { name: "事業構想大学院大学（併設）", faculty: "事業構想学部", area: "kanto", difficulty: "D", sogo_level: 3, desc: "アイデアを形にするクリエイティブなビジネス。", tags: ["新規事業", "発想"] },
    
    { name: "関西大学", faculty: "社会学部", area: "kansai", difficulty: "A", sogo_level: 2, desc: "「正義を権力より護れ」。元気で活気ある校風。", tags: ["関関同立", "活気"] },
    { name: "関西学院大学", faculty: "社会学部", area: "kansai", difficulty: "A", sogo_level: 3, desc: "「関学の社会」。名門中の名門で社会を解き明かす。", tags: ["おしゃれ", "名門"] },
    { name: "同志社大学", faculty: "商学部", area: "kansai", difficulty: "A", sogo_level: 2, desc: "自由主義。京都でビジネスを学ぶなら。", tags: ["名門", "自由"] },
    { name: "立命館大学", faculty: "政策科学部", area: "kansai", difficulty: "A", sogo_level: 3, desc: "社会問題を解決する実践的なプロジェクト多数。", tags: ["改革", "PBL"] },
    { name: "近畿大学", faculty: "総合社会学部", area: "kansai", difficulty: "B", sogo_level: 3, desc: "ド派手な広報。日本一の志願者数を誇る。", tags: ["人気", "活気"] },
    { name: "甲南大学", faculty: "経営学部", area: "kansai", difficulty: "B", sogo_level: 2, desc: "神戸のお坊ちゃん大学。社長令息が多い。", tags: ["おしゃれ", "社長"] },
    { name: "大阪公立大学", faculty: "商学部", area: "kansai", difficulty: "A", sogo_level: 2, desc: "大阪府大と市大が統合。公立最大規模。", tags: ["公立", "マンモス"] },
    { name: "大阪経済大学", faculty: "経済学部", area: "kansai", difficulty: "C", sogo_level: 2, desc: "関西の就職に強い中堅校。", tags: ["就職", "経済"] },
    { name: "摂南大学", faculty: "法学部", area: "kansai", difficulty: "C", sogo_level: 2, desc: "就職支援が手厚い。薬学部も有名。", tags: ["就職", "薬学"] },
    { name: "追手門学院大学", faculty: "心理学部", area: "kansai", difficulty: "C", sogo_level: 2, desc: "心理学が看板。新キャンパスも話題。", tags: ["心理", "改革"] },
    { name: "桃山学院大学", faculty: "ビジネスデザイン学部", area: "kansai", difficulty: "C", sogo_level: 3, desc: "「ピンダイ」。ビジネスを実践的に学ぶ。", tags: ["ピンダイ", "国際"] },
    { name: "神戸学院大学", faculty: "法学部", area: "kansai", difficulty: "C", sogo_level: 2, desc: "ポートアイランドの美しいキャンパス。", tags: ["ポートアイランド", "防災"] },

    { name: "中京大学", faculty: "総合政策学部", area: "chubu", difficulty: "B", sogo_level: 2, desc: "スポーツも盛ん。文武両道でリーダーを目指す。", tags: ["スポーツ", "地元"] },
    { name: "愛知大学", faculty: "法学部", area: "chubu", difficulty: "B", sogo_level: 2, desc: "中部の伝統校。公務員や地元就職に強い。", tags: ["就職", "伝統"] },
    { name: "愛知学院大学", faculty: "商学部", area: "chubu", difficulty: "C", sogo_level: 2, desc: "県内最大級の私大。仏教精神。", tags: ["仏教", "愛知"] },

    { name: "東北学院大学", faculty: "経済学部", area: "hokkaido_tohoku", difficulty: "C", sogo_level: 2, desc: "東北最大級の私立大学。伝統がある。", tags: ["東北", "伝統"] },
    { name: "北海学園大学", faculty: "経済学部", area: "hokkaido_tohoku", difficulty: "C", sogo_level: 2, desc: "北海道の私大トップ。社長輩出数が多い。", tags: ["北海道", "社長"] },

    { name: "福岡大学", faculty: "商学部", area: "kyushu_okinawa", difficulty: "B", sogo_level: 2, desc: "九州一のマンモス私大。就職に強い。", tags: ["マンモス", "九州"] },
    { name: "西南学院大学", faculty: "法学部", area: "kyushu_okinawa", difficulty: "A", sogo_level: 2, desc: "九州の私学雄。国際的なリーガルマインド。", tags: ["九州", "英語"] },
    
    { name: "松山大学", faculty: "経済学部", area: "chugoku_shikoku", difficulty: "B", sogo_level: 2, desc: "四国の名門私大。カルピス創業者が設立に関与。", tags: ["四国", "伝統"] },
    { name: "広島修道大学", faculty: "商学部", area: "chugoku_shikoku", difficulty: "C", sogo_level: 2, desc: "中国地方の私大トップクラス。緑豊かな環境。", tags: ["広島", "公務員"] },
    { name: "香川大学", faculty: "経済学部", area: "chugoku_shikoku", difficulty: "B", sogo_level: 2, desc: "地域経済の中心。実践的なプロジェクトが多い。", tags: ["国立", "地域"] },

    // 専門職 (ビジネス/観光)
    { name: "グローバルBiz専門職大学", faculty: "グローバルビジネス学部", area: "kanto", difficulty: "C", sogo_level: 3, desc: "川崎で学ぶ。実務家教員による指導。", tags: ["ビジネス", "留学生"] },
    { name: "かなざわ食マネジメント専門職大学", faculty: "フードサービスマネジメント学部", area: "chubu", difficulty: "C", sogo_level: 3, desc: "「食」をビジネスにする。金沢の食文化。", tags: ["食", "マネジメント"] },
    { name: "開志専門職大学", faculty: "事業創造学部", area: "chubu", difficulty: "C", sogo_level: 3, desc: "起業家やアニメーターを育てる新潟の大学。", tags: ["起業", "アニメ"] },
  ],

  art: [
    // --- ユニーク・注目 ---
    { name: "立命館大学", faculty: "映像学部", area: "kansai", difficulty: "A", sogo_level: 3, desc: "映画・ゲーム・映像マネジメントを京都で学ぶ。", tags: ["映像", "ゲーム"] },
    // --- 国立・公立 ---
    { name: "東京藝術大学", faculty: "美術学部", area: "kanto", difficulty: "S", sogo_level: 1, desc: "日本の芸術の最高峰。選ばれし才能が集う場所。", tags: ["国立", "天才"] },
    { name: "京都市立芸術大学", faculty: "美術学部", area: "kansai", difficulty: "S", sogo_level: 2, desc: "京都駅前に移転。伝統と革新が交差する。", tags: ["公立", "京都"] },
    { name: "金沢美術工芸大学", faculty: "美術工芸学部", area: "chubu", difficulty: "S", sogo_level: 2, desc: "工芸の街・金沢で学ぶ。就職にも強い公立美大。", tags: ["公立", "工芸"] },
    { name: "九州大学", faculty: "芸術工学部", area: "kyushu_okinawa", difficulty: "S", sogo_level: 2, desc: "「芸工」。科学と芸術の融合でデザインする。", tags: ["旧帝大", "音響"] },
    { name: "尾道市立大学", faculty: "芸術文化学部", area: "chugoku_shikoku", difficulty: "B", sogo_level: 2, desc: "坂の街で描く。静かに創作に打ち込める環境。", tags: ["公立", "アットホーム"] },
    // --- 私立 ---
    { name: "多摩美術大学", faculty: "美術学部", area: "kanto", difficulty: "A", sogo_level: 3, desc: "自由奔放。「Made by Tamabi」の誇り。", tags: ["美大", "広告"] },
    { name: "武蔵野美術大学", faculty: "造形学部", area: "kanto", difficulty: "A", sogo_level: 3, desc: "教養ある美術家へ。体系的なデザイン教育。", tags: ["美大", "就職"] },
    { name: "日本大学", faculty: "芸術学部", area: "kanto", difficulty: "B", sogo_level: 3, desc: "通称「日芸」。演劇・放送・写真のプロを輩出。", tags: ["メディア", "芸能"] },
    { name: "デジタルハリウッド大学", faculty: "デジタルコミュニケーション学部", area: "kanto", difficulty: "C", sogo_level: 3, desc: "アニメ・CG・ゲーム。オタク文化を教養に。", tags: ["デジタル", "クリエイター"] },
    { name: "桐朋学園大学", faculty: "音楽学部", area: "kanto", difficulty: "A", sogo_level: 1, desc: "少数精鋭の音楽教育。世界的な演奏家を育てる。", tags: ["音楽", "演奏"] },
    { name: "大阪芸術大学", faculty: "芸術学部", area: "kansai", difficulty: "C", sogo_level: 3, desc: "西のマンモス美大。特撮やキャラクター造形も。", tags: ["カオス", "設備"] },
    { name: "京都精華大学", faculty: "マンガ学部", area: "kansai", difficulty: "C", sogo_level: 3, desc: "日本初のマンガ学部。ストーリー構成から学ぶ。", tags: ["マンガ", "サブカル"] },
    { name: "日本経済大学", faculty: "経営学部 芸創プロデュース", area: "kanto", difficulty: "D", sogo_level: 3, desc: "K-POPアイドルやダンスを仕事にする。", tags: ["ダンス", "芸能"] },
    { name: "東北芸術工科大学", faculty: "デザイン工学部", area: "hokkaido_tohoku", difficulty: "C", sogo_level: 3, desc: "地域課題をデザインで解決する。", tags: ["地域", "企画"] },
    { name: "九州産業大学", faculty: "芸術学部", area: "kyushu_okinawa", difficulty: "C", sogo_level: 2, desc: "九州でアートを学ぶなら。マンモス校。", tags: ["芸術", "マンモス"] },
    // 専門職
    { name: "国際ファッション専門職大学", faculty: "国際ファッション学部", area: "kanto", difficulty: "C", sogo_level: 3, desc: "東京・大阪・名古屋。世界に通用するファッション。", tags: ["ファッション", "実習"] },
    { name: "芸術文化観光専門職大学", faculty: "芸術文化・観光学部", area: "kansai", difficulty: "C", sogo_level: 3, desc: "兵庫県豊岡市。演劇と観光を融合。", tags: ["観光", "演劇"] },
  ],

  global: [
    // --- ユニーク・注目 ---
    { name: "城西国際大学", faculty: "観光学部", area: "kanto", difficulty: "C", sogo_level: 3, desc: "「ウェルネスツーリズム」で健康×観光を学ぶ。", tags: ["観光", "癒やし"] },
    // --- 国立 ---
    { name: "国際教養大学 (AIU)", faculty: "国際教養学部", area: "hokkaido_tohoku", difficulty: "S", sogo_level: 3, desc: "授業は100%英語。1年間の寮生活と留学義務。", tags: ["公立", "英語漬け"] },
    { name: "東京外国語大学", faculty: "言語文化学部", area: "kanto", difficulty: "S", sogo_level: 2, desc: "世界の言語と地域を深く学ぶ。外交官への道も。", tags: ["国立", "言語"] },
    { name: "大阪大学", faculty: "外国語学部", area: "kansai", difficulty: "S", sogo_level: 1, desc: "旧大阪外大の伝統。25言語を網羅。", tags: ["旧帝大", "マイナー言語"] },
    // --- 私立 ---
    { name: "立命館アジア太平洋大学 (APU)", faculty: "アジア太平洋学部", area: "kyushu_okinawa", difficulty: "B", sogo_level: 3, desc: "学生の半数が留学生。別府の山の上にある「世界」。", tags: ["多文化", "多様性"] },
    { name: "早稲田大学", faculty: "国際教養学部 (SILS)", area: "kanto", difficulty: "S", sogo_level: 2, desc: "私学最強のグローバル環境。世界中から学生が集まる。", tags: ["英語", "リベラルアーツ"] },
    { name: "上智大学", faculty: "総合グローバル学部", area: "kanto", difficulty: "S", sogo_level: 2, desc: "国際協力やNGO活動に関心があるなら。", tags: ["貢献", "ミッション"] },
    { name: "青山学院大学", faculty: "国際政治経済学部", area: "kanto", difficulty: "S", sogo_level: 2, desc: "渋谷キャンパスでトレンドと国際感覚を磨く。", tags: ["おしゃれ", "人気"] },
    { name: "立教大学", faculty: "異文化コミュニケーション学部", area: "kanto", difficulty: "A", sogo_level: 2, desc: "全員留学。実践的なコミュニケーション能力を。", tags: ["池袋", "人気"] },
    { name: "獨協大学", faculty: "外国語学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "「語学の獨協」。ドイツ語教育に定評。", tags: ["語学", "ドイツ"] },
    { name: "東京国際大学", faculty: "国際関係学部", area: "kanto", difficulty: "C", sogo_level: 2, desc: "駅伝も強い。国際色豊かなキャンパス。", tags: ["駅伝", "国際"] },
    { name: "拓殖大学", faculty: "国際学部", area: "kanto", difficulty: "C", sogo_level: 2, desc: "海外開拓の伝統。タフな国際人を育てる。", tags: ["国際", "伝統"] },
    { name: "桜美林大学", faculty: "リベラルアーツ学群", area: "kanto", difficulty: "C", sogo_level: 3, desc: "幅広い分野を自由に学ぶ。航空専修も人気。", tags: ["リベラルアーツ", "航空"] },
    { name: "昭和女子大学", faculty: "国際学部", area: "kanto", difficulty: "C", sogo_level: 3, desc: "テンプル大学ジャパンとのキャンパス共有。", tags: ["女子大", "国内留学"] },
    { name: "関西外国語大学", faculty: "外国語学部", area: "kansai", difficulty: "B", sogo_level: 2, desc: "CA採用数トップクラス。華やかなキャンパス。", tags: ["CA", "留学"] },
    { name: "同志社女子大学", faculty: "表象文化学部", area: "kansai", difficulty: "B", sogo_level: 2, desc: "京都でメディアや英語を学ぶ。おしゃれで品がある。", tags: ["女子大", "メディア"] },
    { name: "西南学院大学", faculty: "国際文化学部", area: "kyushu_okinawa", difficulty: "A", sogo_level: 2, desc: "九州の私学雄。おしゃれで国際的な雰囲気。", tags: ["キリスト教", "英語"] },
    { name: "長崎大学", faculty: "多文化社会学部", area: "kyushu_okinawa", difficulty: "B", sogo_level: 2, desc: "「オランダ坂」の街。グローバルな課題解決。", tags: ["国立", "多文化"] },
    { name: "琉球大学", faculty: "国際地域創造学部", area: "kyushu_okinawa", difficulty: "B", sogo_level: 2, desc: "観光立県・沖縄ならではの学び。", tags: ["国立", "南国"] },
    { name: "愛知淑徳大学", faculty: "交流文化学部", area: "chubu", difficulty: "C", sogo_level: 2, desc: "語学と観光、多文化共生を学ぶ。", tags: ["メディア", "人気"] },
  ],

  care: [
    { name: "東京医科歯科大学", faculty: "医学部保健学科", area: "kanto", difficulty: "S", sogo_level: 1, desc: "医療系総合大学の頂点。チーム医療をリードする。", tags: ["国立", "医療"] },
    { name: "神戸大学", faculty: "医学部保健学科", area: "kansai", difficulty: "S", sogo_level: 1, desc: "国立大で高度なケアを学ぶ。助産師などの資格も。", tags: ["国立", "資格"] },
    { name: "東京学芸大学", faculty: "教育学部", area: "kanto", difficulty: "A", sogo_level: 2, desc: "教員養成の総本山。教育のプロフェッショナルへ。", tags: ["国立", "先生"] },
    { name: "大阪教育大学", faculty: "教育学部", area: "kansai", difficulty: "B", sogo_level: 2, desc: "関西の教員養成拠点。広大なキャンパス。", tags: ["国立", "教育"] },
    { name: "埼玉大学", faculty: "教育学部", area: "kanto", difficulty: "A", sogo_level: 2, desc: "教員養成の名門。真面目な学生が多い。", tags: ["国立", "教員"] },
    { name: "聖路加国際大学", faculty: "看護学部", area: "kanto", difficulty: "A", sogo_level: 2, desc: "看護教育のパイオニア。少人数で最高峰のケアを。", tags: ["ブランド", "看護"] },
    { name: "日本赤十字看護大学", faculty: "看護学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "赤十字の精神。「苦しんでいる人のために」。", tags: ["伝統", "災害医療"] },
    { name: "北里大学", faculty: "看護学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "チーム医療教育の先駆け。附属病院との連携。", tags: ["総合大", "臨床"] },
    { name: "順天堂大学", faculty: "医療看護学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "「仁」の精神。スポーツ健康科学も有名。", tags: ["スポーツ", "人気"] },
    { name: "日本体育大学", faculty: "体育学部", area: "kanto", difficulty: "B", sogo_level: 2, desc: "体育・スポーツの最高峰。金メダリスト多数。", tags: ["体育", "金メダル"] },
    { name: "日本社会事業大学", faculty: "社会福祉学部", area: "kanto", difficulty: "C", sogo_level: 3, desc: "福祉のリーダーを育てる厚生労働省委託の大学。", tags: ["福祉", "政策"] },
    { name: "東京家政大学", faculty: "家政学部", area: "kanto", difficulty: "C", sogo_level: 2, desc: "生活を支えるプロを育てる。保育・栄養に強い。", tags: ["女子大", "良妻賢母"] },
    { name: "ヤマザキ動物看護大学", faculty: "動物看護学部", area: "kanto", difficulty: "D", sogo_level: 3, desc: "動物医療の国家資格を目指す。命と向き合う。", tags: ["動物", "専門"] },
    { name: "武庫川女子大学", faculty: "生活環境学部", area: "kansai", difficulty: "C", sogo_level: 2, desc: "就職率最強の女子大。建築から栄養まで。", tags: ["マンモス", "就職"] },
    { name: "佛教大学", faculty: "教育学部", area: "kansai", difficulty: "C", sogo_level: 2, desc: "先生になるなら佛教大。通信教育も有名。", tags: ["教員", "仏教"] },
    { name: "国際医療福祉大学", faculty: "成田看護学部", area: "kanto", difficulty: "C", sogo_level: 2, desc: "グローバルな医療人を育成。学費設定も魅力的。", tags: ["国際", "新設"] },
    { name: "帝京平成大学", faculty: "健康メディカル学部", area: "kanto", difficulty: "C", sogo_level: 2, desc: "「実学の帝京平成大学」。医療・トレーナーに強い。", tags: ["医療", "CM"] },
    { name: "武蔵野大学", faculty: "ウェルビーイング学部", area: "kanto", difficulty: "B", sogo_level: 3, desc: "幸せを科学する。先進的な学部が多い。", tags: ["改革", "ウェルビーイング"] },
    { name: "鳴門教育大学", faculty: "学校教育学部", area: "chugoku_shikoku", difficulty: "C", sogo_level: 1, desc: "教員養成の単科大。先生になるための最高の環境。", tags: ["国立", "教育"] },
    { name: "常葉大学", faculty: "教育学部", area: "chubu", difficulty: "C", sogo_level: 2, desc: "静岡県内の教員採用に強い。", tags: ["静岡", "教育"] },
    // 専門職
    { name: "東京保健医療専門職大学", faculty: "リハビリテーション学部", area: "kanto", difficulty: "C", sogo_level: 3, desc: "実践的な理学療法・作業療法。", tags: ["医療", "実践"] },
    { name: "ビューティ＆ウェルネス専門職大学", faculty: "ビューティ＆ウェルネス学部", area: "kanto", difficulty: "C", sogo_level: 3, desc: "美と健康のプロフェッショナルへ。", tags: ["美容", "健康"] },
    { name: "びわこリハビリテーション専門職大学", faculty: "リハビリテーション学部", area: "kansai", difficulty: "C", sogo_level: 3, desc: "滋賀で学ぶリハビリの専門家。", tags: ["リハビリ", "専門職"] },
    { name: "岡山医療専門職大学", faculty: "健康科学部", area: "chugoku_shikoku", difficulty: "C", sogo_level: 3, desc: "岡山で目指す医療のプロ。", tags: ["医療", "地域"] },
  ]
};

const typeToCategory = {
  "LSRC": "science", "LSRA": "science", "LSIC": "humanities", "LSIA": "social", 
  "LGRC": "social", "LGRA": "social", "LGIC": "social", "LGIA": "social", 
  "FSRC": "art", "FSRA": "global", "FSIC": "humanities", "FSIA": "art", 
  "FGRC": "care", "FGRA": "global", "FGIC": "care", "FGIA": "global" 
};

// タイプ定義データ
const getTypesData = () => ({
  "0000": { 
    typeIdString: "LSRC", fileName: "LSRC.png", name: "孤高の職人ガール", catchphrase: "邪魔者は排除。私の世界で完璧を目指すの。", icon: Microscope, color: "blue", iconColor: "blue", colorTheme: "from-blue-400 to-indigo-500", faculty: "理学部・工学部・薬学部", vibe: "研究設備が充実してる落ち着いた大学", 
    basicNature: "あなたは一言で言えば「プロフェッショナルな一匹狼」。興味のあることに対する集中力が凄まじく、一度ハマると寝食を忘れて没頭します。基本的に他人に興味がなく、群れるのを嫌いますが、それは冷たいからではなく「自分の世界が忙しすぎる」から。合理的で無駄が嫌いなので、女子特有の遠回しな会話や同調圧力には「で、結論は？」と内心毒づいていることも。", 
    learningStyle: "「なぜそうなるのか？」を論理的に解明することに無上の喜びを感じます。暗記よりも仕組みの理解が得意。グループワークでは無能なメンバーがいると「私がやった方が早い」と一人で片付けがち。その高い実務能力は、将来専門職や研究職で確実に重宝されます。", 
    idealEnvironment: "あなたの才能を開花させるのは「干渉されない環境」。最新の研究設備があり、教授も学生も自分の研究に没頭しているような、静かで知的な大学がベスト。サークルよりもラボ（研究室）があなたの居場所になるでしょう。", 
    compatibility: { best: { id: "1100", reason: "生活能力皆無なあなたを、世話焼きな「オカン」が甲斐甲斐しくサポートしてくれます。" }, good: { id: "0010", reason: "お互いに干渉せず、でも知的な会話ができる「探究者」とは良き理解者に。" }, challenge: { id: "1101", reason: "「盛り上げ隊長」のノリはあなたにとって騒音でしかありません。距離感がバグりがち。" } } 
  },
  "0001": { 
    typeIdString: "LSRA", fileName: "LSRA.png", name: "凄腕ハッカーちゃん", catchphrase: "ルールは破るためにある。最短ルートで攻略よ！", icon: Code, color: "cyan", iconColor: "cyan", colorTheme: "from-cyan-400 to-blue-500", faculty: "情報学部・工学部", vibe: "最新テックに強い実学重視の大学", 
    basicNature: "好奇心旺盛でスリルを愛する「知的な勝負師」。リスクを恐れず、むしろトラブルが起きるとワクワクするタイプです。頭の回転が速く、状況に合わせて臨機応変に対応できる器用さがあります。ただ、飽きっぽいのが玉に瑕。長期的な計画を立てるより「今どうするか」に全振りしており、夏休みの宿題は最終日にアドレナリン全開で終わらせるタイプでしょう。", 
    learningStyle: "座学よりも実践。教科書を読むより手を動かしてバグりながら覚えるスタイルが合っています。効率重視で「いかに楽をして成果を出すか」にかける情熱は天才的。ITスキルやプログラミングなど、変化の速い分野でその適応力が輝きます。", 
    idealEnvironment: "変化のないルーチンワークは死んでしまうので、実習やプロジェクトが多い大学がおすすめ。ベンチャー気質のある校風や、都心キャンパスで刺激の多い環境だと、持ち前の行動力が爆発します。", 
    compatibility: { best: { id: "1110", reason: "あなたの危なっかしさを「妖精さん」が優しく見守り、精神的なブレーキになってくれます。" }, good: { id: "0101", reason: "「プロジェクトリーダー」とは、共に戦場を駆ける最強のタッグに。実行力×実行力。" }, challenge: { id: "0100", reason: "「生徒会長」の説教やルール順守の姿勢に、あなたは開始3秒で窒息しそうになります。" } } 
  },
  "0010": { 
    typeIdString: "LSIC", fileName: "LSIC.png", name: "真理の探究者", catchphrase: "世界の「なぜ」を解き明かしたいだけ。", icon: BookOpen, color: "indigo", iconColor: "indigo", colorTheme: "from-indigo-400 to-purple-500", faculty: "文学部(哲学)・理学部(数学)", vibe: "図書館が大きくて歴史ある大学", 
    basicNature: "常に頭の中で何かを考えている「歩く哲学書」。物事の表面には興味がなく、「本質は何か？」を突き詰めるのが好きです。口数は少ないですが、頭の中は宇宙レベルで壮大。周囲からは「不思議ちゃん」と思われがちですが、本人は全く気にしていません。独自の世界観を持っており、一度口を開くと鋭い考察で周囲を驚かせます。", 
    learningStyle: "答えのある問題を解くより、答えのない問いに取り組むのが得意。哲学、物理学、心理学など、概念的な学問に向いています。議論は好きですが、感情論で来る相手は論破対象外としてシャットダウンします。一人の時間を確保することが成績アップの鍵。", 
    idealEnvironment: "蔵書数の多い図書館があることは必須条件。歴史があり、アカデミックな空気が漂う大学で、誰にも邪魔されずに思索に耽る時間があなたを育てます。就職予備校のような大学だと窒息します。", 
    compatibility: { best: { id: "0101", reason: "あなたの抽象的なアイデアを「プロジェクトリーダー」が現実的な形にしてくれます。" }, good: { id: "0000", reason: "「職人ガール」とは言葉を交わさなくても通じ合える、静かで心地よい関係に。" }, challenge: { id: "1111", reason: "「インフルエンサー」の中身のない流行り話には、１ミリも興味が持てないでしょう。" } } 
  },
  "0011": { 
    typeIdString: "LSIA", fileName: "LSIA.png", name: "戦略家クリエイター", catchphrase: "私の頭脳で、世界を面白くリデザインする。", icon: Rocket, color: "purple", iconColor: "purple", colorTheme: "from-purple-400 to-pink-500", faculty: "経営学部・社会学部", vibe: "自由な校風でベンチャー気質の大学", 
    basicNature: "自信家でアイデアマンな「魔王候補生」。批判精神が旺盛で、既存のルールや常識を疑うところからスタートします。「もっとこうすればいいのに」という改善案が常に頭にあり、それを実現するための戦略も描ける切れ者。論理的ですが、独創的な発想も併せ持つレアキャラです。少し上から目線になりがちですが、その実力は誰もが認めるところ。", 
    learningStyle: "ただ覚えるだけの勉強は苦痛。ディベートや企画立案など、自分の頭脳を使って相手を納得させる課題で輝きます。文系・理系の枠に囚われず、ビジネスやデザインなど「仕組みを作る」分野が向いています。将来は起業家かも？", 
    idealEnvironment: "学生の自主性を重んじる自由な大学がベスト。学生起業家がいたり、面白いイベントが頻繁に行われているような環境なら、あなたはすぐにその中心人物（または黒幕）になるでしょう。", 
    compatibility: { best: { id: "1011", reason: "「カリスマ表現者」の突飛な行動を、あなたが面白がりながらプロデュースできます。" }, good: { id: "0111", reason: "「革命家」とは議論が白熱し、夜通し世界を変える話ができる同志になれます。" }, challenge: { id: "1100", reason: "「オカン」の過剰な世話焼きは、自立心の強いあなたには余計なお世話に感じてしまいます。" } } 
  },
  "0100": { 
    typeIdString: "LGRC", fileName: "LGRC.png", name: "頼れる生徒会長", catchphrase: "私がルール。みんなが安心して過ごせるようにね。", icon: Crown, color: "teal", iconColor: "teal", colorTheme: "from-teal-400 to-emerald-500", faculty: "法学部・医学部・公務員", vibe: "伝統があって規律正しい名門大学", 
    basicNature: "責任感が強く、秩序を重んじる「優等生の鏡」。決まり事は守るし、守らせたいタイプ。ハメを外すことは滅多になく、常に正しくありたいと思っています。一見堅苦しそうですが、その安定感と公平さは周囲に安心感を与え、自然とリーダーに推されることが多いでしょう。計画通りに物事が進むことに快感を覚えます。", 
    learningStyle: "コツコツと積み上げる学習が得意中の得意。試験範囲は完璧に網羅し、模試の判定も安定しています。法学や医学、公務員など、資格取得や明確なキャリアパスがある分野で、その勤勉さが最大の武器になります。", 
    idealEnvironment: "歴史と伝統があり、カリキュラムがしっかりしている大学が合っています。奇抜な授業よりもしっかりとした講義形式を好み、真面目な学生が多い環境で切磋琢磨できると最高です。", 
    compatibility: { best: { id: "1001", reason: "「冒険家」の自由奔放さにハラハラしつつも、自分にない行動力に強く惹かれます。" }, good: { id: "1100", reason: "「オカン」とは価値観が近く、共に組織を支える最強の安定運営コンビに。" }, challenge: { id: "0001", reason: "「ハッカーちゃん」のルール無視な態度は、あなたの正義感が許しません。衝突必至。" } } 
  },
  "0101": { 
    typeIdString: "LGRA", fileName: "LGRA.png", name: "最強ＰＪリーダー", catchphrase: "目標達成までノンストップ！ついてきて！", icon: Building, color: "green", iconColor: "green", colorTheme: "from-green-400 to-teal-500", faculty: "商学部・建築学科", vibe: "産学連携プロジェクトが多い活発な大学", 
    basicNature: "圧倒的な行動力と決断力を持つ「生まれついてのリーダー」。考える前に走り出し、走りながら考えるタイプ。失敗しても「次！」と切り替えるメンタルは鋼です。声が大きく、存在感があり、なぜか人がついてくる求心力があります。細かいことは気にせず、とにかく結果を出すことにこだわります。", 
    learningStyle: "机上の空論は大嫌い。インターンやボランティア、イベント運営など、実社会と関わる活動の中で学びます。チームで行うプロジェクト学習では、誰よりも早くリーダー役を買って出て、メンバーをグイグイ引っ張るでしょう。", 
    idealEnvironment: "産学連携プロジェクトや地域活性化活動など、キャンパスの外に出る機会が多い大学がおすすめ。活気があり、学生の発言権が強い校風なら、あなたのリーダーシップ遺憾なく発揮されます。", 
    compatibility: { best: { id: "0010", reason: "「探究者」の深い知見を、あなたが実行に移すことで、世界を変える成果が出せます。" }, good: { id: "0001", reason: "「ハッカーちゃん」とは合理的でスピーディな関係。仕事仲間として最高の相性。" }, challenge: { id: "1110", reason: "「妖精さん」のペースはあなたには遅すぎて、つい急かしてしまい相手を傷つけるかも。" } } 
  },
  "0110": { 
    typeIdString: "LGIC", fileName: "LGIC.png", name: "知的な参謀ちゃん", catchphrase: "最善の一手はこれ。サポートは任せて。", icon: Search, color: "lime", iconColor: "lime", colorTheme: "from-lime-400 to-green-500", faculty: "教育学部・人間科学部", vibe: "少人数教育で先生と距離が近い大学", 
    basicNature: "冷静な観察眼と温かい心を併せ持つ「賢者のようなサポーター」。自分が前に出るよりも、頑張っている人を支えることに喜びを感じます。人の気持ちを察するのがうまく、かつ論理的なアドバイスができるため、相談役として引っ張りだこ。控えめですが、実は誰よりも全体が見えているのはあなたかもしれません。", 
    learningStyle: "知識を詰め込むだけでなく、「それが人の役にどう立つか」を考えるのが好き。教育、心理、福祉など、人と関わる理論を学ぶのが合っています。グループワークでは、調整役として対立する意見をうまくまとめ上げる手腕を発揮します。", 
    idealEnvironment: "少人数制のゼミや、教員と学生の距離が近いアットホームかつ知的な大学が理想。派手なイベントよりも、じっくりと対話ができる環境で、あなたの深い洞察力は磨かれます。", 
    compatibility: { best: { id: "1101", reason: "「盛り上げ隊長」の明るさに救われます。彼らが暴走した時、あなたが手綱を握る役目に。" }, good: { id: "0111", reason: "「革命家」の理想に共感し、その実現のための具体的なプランをあなたが提示できます。" }, challenge: { id: "0000", reason: "「職人ガール」の無言の壁には、さすがのあなたもコミュニケーションの糸口を見失います。" } } 
  },
  "0111": { 
    typeIdString: "LGIA", fileName: "LGIA.png", name: "社会を変える革命家", catchphrase: "おかしいことは変えなきゃ。私の言葉で世界を動かす！", icon: Megaphone, color: "yellow", iconColor: "yellow", colorTheme: "from-yellow-400 to-orange-500", faculty: "政治経済学部・国際関係学部", vibe: "留学制度が充実してて多様性のある大学", 
    basicNature: "溢れる情熱と弁舌で人を動かす「カリスマ活動家」。現状維持を嫌い、常に「あるべき理想」を語ります。議論が大好きで、相手が先生だろうと間違っていると思えば食って掛かる強さがあります。その熱意は時に暑苦しいですが、本気で世界を良くしたいと願うピュアな心の持ち主。敵も多いですが、それ以上に熱狂的な味方がいます。", 
    learningStyle: "社会問題、政治、国際関係など、スケールの大きなテーマに惹かれます。ディベートやプレゼンテーションは大得意。留学して多様な価値観に触れることは、あなたの人生にとって必須科目と言えるでしょう。", 
    idealEnvironment: "留学生が多く、多様な言語が飛び交うような国際的なキャンパスがベスト。学生運動やボランティアサークルが盛んな、エネルギーに満ちた場所でこそ、あなたの魂は燃え上がります。", 
    compatibility: { best: { id: "1000", reason: "「匠」の独自の感性に憧れます。言葉多きあなたと言葉少なな匠、不思議と波長が合います。" }, good: { id: "0011", reason: "「戦略家」とは互いに刺激し合えるライバル兼親友に。議論が止まりません。" }, challenge: { id: "0100", reason: "「生徒会長」の保守的な態度は、あなたにとって打破すべき「古い体制」に見えてイライラ。" } } 
  },
  "1000": { 
    typeIdString: "FSRC", fileName: "FSRC.png", name: "センス抜群の匠", catchphrase: "私のこだわりは譲れない。作品が全てを語るから。", icon: Palette, color: "pink", iconColor: "pink", colorTheme: "from-pink-400 to-rose-500", faculty: "芸術学部・生活科学部", vibe: "キャンパスが綺麗で自然豊かな大学", 
    basicNature: "言葉よりも感性で語る「美意識の高いアーティスト」。穏やかで控えめに見えますが、内面には譲れない強烈なこだわりを持っています。集団行動は苦手で、自分のペースで好きなことに没頭している時が一番幸せ。ファッションや持ち物にも独自のセンスが光り、周りからは「なんかオシャレな子」として一目置かれています。", 
    learningStyle: "座学で理論を詰め込むより、実際に手を動かして何かを作る実習が得意。美術、音楽、料理、被服など、五感を使う分野で天才的な才能を発揮します。自分の作品や成果物を批判されると、静かに、しかし深く傷つきます。", 
    idealEnvironment: "キャンパスが美しいこと、これが絶対条件。アトリエや工房などの設備が充実し、個性を尊重してくれる自由な校風の大学・学部を選びましょう。自然豊かな場所ならさらに感性が研ぎ澄まされます。", 
    compatibility: { best: { id: "0111", reason: "「革命家」の情熱的な行動力に惹かれます。あなたの繊細さを彼らは守ってくれるでしょう。" }, good: { id: "1010", reason: "「文学少女」とはお互いの世界観を尊重し合える、静かで美しい友情が芽生えます。" }, challenge: { id: "0101", reason: "「プロジェクトリーダー」の効率重視な指示出しは、あなたの美学に反します。" } } 
  },
  "1001": { 
    typeIdString: "FSRA", fileName: "FSRA.png", name: "自由な冒険家", catchphrase: "考えるより感じろ！私の地図は私が作る。", icon: Compass, color: "orange", iconColor: "orange", colorTheme: "from-orange-400 to-red-500", faculty: "スポーツ科学部・観光学部", vibe: "実習やフィールドワークが多い大学", 
    basicNature: "今この瞬間を全力で楽しむ「天真爛漫な自由人」。計画性？何それおいしいの？というタイプで、思い立ったら即行動。じっとしているのが苦手で、常に新しい刺激を求めて飛び回っています。そのポジティブで裏表のない性格は誰からも愛されますが、締め切りや約束を忘れがちなのが玉に瑕。でも愛嬌で許されちゃう得な性分。", 
    learningStyle: "教室に座って聞く講義は苦痛以外の何物でもありません。フィールドワーク、スポーツ、留学など、体全体を使って体験する学びが向いています。机の上で覚えたことは忘れますが、体験したことは一生忘れません。", 
    idealEnvironment: "キャンパスライフの半分以上が学外活動、みたいなアクティブな大学が理想。スポーツが強かったり、旅行好きが集まるサークルがあったりと、勉強以外にも全力投球できる環境を選びましょう。", 
    compatibility: { best: { id: "0100", reason: "しっかり者の「生徒会長」が、あなたの忘れ物を届け、スケジュールを管理してくれます。" }, good: { id: "1101", reason: "「盛り上げ隊長」とは、一緒にいるだけで毎日がお祭り騒ぎ。最高に楽しい相棒。" }, challenge: { id: "0010", reason: "「探究者」の理屈っぽい話を聞いていると、3分で眠気が襲ってきます。" } } 
  },
  "1010": { 
    typeIdString: "FSIC", fileName: "FSIC.png", name: "夢見る文学少女", catchphrase: "空想の世界が私の居場所。言葉で誰かを癒やせたら。", icon: Feather, color: "violet", iconColor: "violet", colorTheme: "from-violet-400 to-purple-500", faculty: "文学部・心理学部", vibe: "緑が多くて静かに思索できる大学", 
    basicNature: "豊かな感受性と想像力を持つ「心優しきポエマー」。現実世界よりも、本や物語の中、あるいは自分の妄想世界に住んでいます。とても繊細で、他人の感情の機微に敏感。傷つきやすい反面、人の痛みにも共感できる深い優しさを持っています。独特の言葉選びのセンスがあり、SNSの投稿がポエムっぽくなることも。", 
    learningStyle: "文学、心理学、語学など、人間の内面や文化に触れる学問が大好き。答えのない問いについて、自分なりの解釈を見つけるレポート作成などは得意です。競争させられる環境は苦手なので、マイペースに学べることが重要。", 
    idealEnvironment: "レンガ造りの校舎や並木道など、雰囲気が良くて「映える」キャンパスだとテンションが上がります。ガツガツした雰囲気の大学は避け、文学的な香りのする落ち着いた環境に身を置きましょう。", 
    compatibility: { best: { id: "0101", reason: "「プロジェクトリーダー」の強引さに、最初は戸惑いますが、実は頼りがいを感じて惹かれます。" }, good: { id: "1000", reason: "「匠」とは感性が似ており、言葉少なでも分かり合えるソウルメイトに。" }, challenge: { id: "0001", reason: "「ハッカーちゃん」のデジタルでドライな価値観には、心が寒くなってしまいます。" } } 
  },
  "1011": { 
    typeIdString: "FSIA", fileName: "FSIA.png", name: "カリスマ表現者", catchphrase: "私の一番輝く瞬間を見て！視線は独り占めよ。", icon: Star, color: "fuchsia", iconColor: "fuchsia", colorTheme: "from-fuchsia-400 to-pink-500", faculty: "芸術学部・メディア学部", vibe: "個性的でちょっと変わった人が多い大学", 
    basicNature: "「私は私！」強烈な個性と自己表現欲求を持つ「生まれながらのスター」。注目されることがエネルギー源で、人と同じことは死んでもやりたくないタイプ。感情の起伏が激しいですが、それもまた魅力。人を惹きつける天性のオーラがあり、クラスでも一際目立つ存在です。熱しやすく冷めやすい気分屋な一面も。", 
    learningStyle: "演劇、ダンス、映像制作など、自分自身を表現できる課題なら寝る間も惜しんで取り組みます。逆に、興味のない一般教養科目は出席すら怪しいかも。プレゼンなど人前で話す機会は、あなたの独壇場です。", 
    idealEnvironment: "奇抜なファッションでも浮かない、個性的で自由な大学が絶対条件。芸能関係に強い大学や、クリエイターを多く輩出している学校なら、刺激的なライバルたちと切磋琢磨できるでしょう。", 
    compatibility: { best: { id: "0011", reason: "「戦略家」はあなたの個性を面白がり、それを世に売り出すプロデュースをしてくれます。" }, good: { id: "1111", reason: "「インフルエンサー」とは流行やセンスの話で盛り上がり、華やかなコンビに。" }, challenge: { id: "0110", reason: "「参謀ちゃん」の正論アドバイスは、あなたにはただの小言にしか聞こえません。" } } 
  },
  "1100": { 
    typeIdString: "FGRC", fileName: "FGRC.png", name: "みんなのオカン", catchphrase: "ご飯食べた？大丈夫？私がついてるからね。", icon: Utensils, color: "rose", iconColor: "rose", colorTheme: "from-rose-400 to-pink-500", faculty: "看護学部・福祉学部・教育学部", vibe: "アットホームでサポートが手厚い大学", 
    basicNature: "困っている人を放っておけない「人類愛の塊」。気配り上手で、飲み会ではサラダを取り分け、テスト前にはノートを貸してくれる聖人君子。人の役に立つことに喜びを感じますが、自分のことは後回しにしがち。調和を大切にするので、揉め事の仲裁役になることもしばしば。あなたの周りには常に人が集まり、安心感を与えています。", 
    learningStyle: "看護、福祉、保育など、明確に「人を助けるスキル」が身つく実学が向いています。協力して課題に取り組むグループワークでは、メンバーのメンタルケアまでこなし、チームの潤滑油として不可欠な存在に。", 
    idealEnvironment: "学生サポートが手厚く、アットホームな雰囲気の大学がぴったり。マンモス校よりは、顔の見える関係が築ける規模感の大学が良いでしょう。ボランティアサークルなどで、その優しさを発揮してください。", 
    compatibility: { best: { id: "0000", reason: "生活能力の低い「職人ガール」の世話を焼くことに、無上の喜び（と使命感）を感じます。" }, good: { id: "0100", reason: "「生徒会長」とは、秩序と調和を愛する者同士、安心安定の信頼関係が築けます。" }, challenge: { id: "0011", reason: "「戦略家」の冷徹な合理主義は、あなたには「人の心がない」ように見えて辛いです。" } } 
  },
  "1101": { 
    typeIdString: "FGRA", fileName: "FGRA.png", name: "盛り上げ隊長", catchphrase: "人生楽しんだもん勝ち！みんなで最高に盛り上がろ！", icon: PartyPopper, color: "red", iconColor: "red", colorTheme: "from-red-400 to-orange-500", faculty: "観光学部・社会学部", vibe: "サークル活動や学園祭が盛んな大学", 
    basicNature: "その場にいるだけで空気が明るくなる「ポジティブ製造機」。楽しいことが大好きで、フットワークが軽く、友達の数は学年一。悩み事があっても寝れば忘れるタイプで、その楽天的な姿勢が周りを勇気づけます。細かい作業や複雑な理論は苦手ですが、持ち前の愛嬌とコミュ力で、なんだかんだ世の中を渡っていける世渡り上手。", 
    learningStyle: "座学は苦手ですが、イベント企画やフィールドワークなど、人と関わりながら動く学びは得意。語学学習も、文法よりとりあえず話してみるスタイルで上達します。テスト勉強は一夜漬けの集中力が勝負。", 
    idealEnvironment: "学園祭が有名だったり、サークル活動が活発な大学一択！キャンパスライフ＝青春そのもの。勉強だけでなく、イベントや遊びも全力で楽しめる環境でないと、あなたの良さは死んでしまいます。", 
    compatibility: { best: { id: "0110", reason: "あなたの思いつきを「参謀ちゃん」がうまく整理してくれます。ドラえもんとのび太のような関係。" }, good: { id: "1001", reason: "「冒険家」とはノリが完全に一致。二人でいれば、どんな場所でもパーティ会場に。" }, challenge: { id: "0000", reason: "「職人ガール」の静寂を破ってしまい、ガチで怒られる可能性があります。そっとしておこう。" } } 
  },
  "1110": { 
    typeIdString: "FGIC", fileName: "FGIC.png", name: "癒やしの妖精さん", catchphrase: "あなたの心、曇ってない？お話きかせて。", icon: Heart, color: "emerald", iconColor: "emerald", colorTheme: "from-emerald-400 to-teal-500", faculty: "心理学部・社会福祉学部", vibe: "学生同士の仲が良くて平和な大学", 
    basicNature: "争いを好まず、世界の平和を願う「究極の聞き上手」。直感力が鋭く、相手が何も言わなくても「何かあった？」と察知できる能力を持っています。自分からガツガツ行くことはありませんが、その不思議な包容力に惹かれて、多くの人があなたに悩みを打ち明けます。内には熱い信念を秘めていますが、それを押し付けることはしません。", 
    learningStyle: "心理学やカウンセリング、社会福祉など、人の心や社会の弱者に寄り添う学問が天職。答えを急ぐのではなく、プロセスや感情を大切にする学び方を好みます。競争よりも協調を重視する環境でこそ、その能力は開花します。", 
    idealEnvironment: "緑が多く、穏やかな時間が流れるキャンパスが理想。ガツガツした就活予備校のような大学ではなく、人間教育に力を入れている大学や、リベラルアーツを重視する環境が合っています。", 
    compatibility: { best: { id: "0001", reason: "合理的な「ハッカーちゃん」に、人間的な温かみを教えられるのはあなただけです。" }, good: { id: "1111", reason: "「インフルエンサー」の隠れた悩みを唯一理解でき、精神的な支えになれます。" }, challenge: { id: "0101", reason: "「プロジェクトリーダー」の圧が強すぎて、一緒にいると心が疲弊してしまいそう。" } } 
  },
  "1111": { 
    typeIdString: "FGIA", fileName: "FGIA.png", name: "キラキラ☆インフルエンサー", catchphrase: "私の「好き」が世界を変える。トレンドは私が作るの！", icon: Sparkles, color: "sky", iconColor: "sky", colorTheme: "from-sky-400 to-blue-500", faculty: "国際学部・メディア学部", vibe: "都心にあっておしゃれなキャンパスの大学", 
    basicNature: "流行に敏感で、発信力抜群の「トレンドセッター」。人懐っこく、初対面の人ともすぐに打ち解けられるコミュ力の化身です。自分の好きなものや感動を誰かと共有することに喜びを感じます。飽きっぽい一面もありますが、興味を持ったことへの瞬発力と拡散力はピカイチ。周りを巻き込んでムーブメントを起こす力を持っています。", 
    learningStyle: "マーケティング、メディア論、語学など、今の社会と直結する学びに興味津々。グループワークでは持ち前の明るさでムードメーカーになり、プレゼンでは華のある発表で評価されます。地味な基礎研究は苦手かも。", 
    idealEnvironment: "表参道や渋谷に近いなど、立地がおしゃれなキャンパスがマスト！放課後にカフェに行ったり、街に出てリサーチしたりできる環境があなたを輝かせます。キラキラした学生が多い大学で、人脈を広げましょう。", 
    compatibility: { best: { id: "0010", reason: "「探究者」の深すぎる知識に興味津々。あなたがそれを広めることで面白い化学反応が。" }, good: { id: "1011", reason: "「カリスマ表現者」とは互いのセンスを認め合う、華やかな人気者コンビに。" }, challenge: { id: "0010", reason: "「探究者」の理屈っぽい話を聞いていると、3分で眠気が襲ってきます。" } } 
  }
});


const axesData = [
  {
    title: "思考の軸",
    sub: "Logic vs Feeling",
    color: "blue",
    left: { label: "L: Logic", icon: Brain, desc: "論理・分析" },
    right: { label: "F: Feeling", icon: Heart, desc: "感情・直感" }
  },
  {
    title: "対人の軸",
    sub: "Solo vs Group",
    color: "green",
    left: { label: "S: Solo", icon: User, desc: "マイペース" },
    right: { label: "G: Group", icon: Users, desc: "チームワーク" }
  },
  {
    title: "興味の軸",
    sub: "Real vs Idea",
    color: "orange",
    left: { label: "R: Real", icon: Microscope, desc: "現実・事実" },
    right: { label: "I: Idea", icon: Lightbulb, desc: "理想・概念" }
  },
  {
    title: "行動の軸",
    sub: "Calm vs Active",
    color: "pink",
    left: { label: "C: Calm", icon: Coffee, desc: "安定・計画" },
    right: { label: "A: Active", icon: Rocket, desc: "変化・挑戦" }
  }
];


// --- コンポーネント定義 ---

const CharacterAvatar = ({ typeId, icon: Icon, color, name, fileName }) => {
  const [imageLoadError, setImageLoadError] = useState(false);
  const imagePath = fileName ? `/images/${fileName}` : `/images/${typeId} 型 ${name}.jpg`;

  const colors = {
    blue: "#60A5FA", cyan: "#22D3EE", indigo: "#818CF8", purple: "#A78BFA",
    teal: "#2DD4BF", green: "#4ADE80", lime: "#A3E635", yellow: "#FACC15",
    pink: "#F472B6", orange: "#FB923C", violet: "#A78BFA", fuchsia: "#E879F9",
    rose: "#FB7185", red: "#F87171", emerald: "#34D399", sky: "#38BDF8"
  };
  const mainColor = colors[color] || "#A78BFA";
  const skinColor = "#FFF0E5";
  const strokeStyle = { stroke: "#2d2d2d", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" };
  const isActive = typeId.includes('A');
  
  const effect = isActive ? (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow opacity-20 pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <line key={i} x1="50" y1="50" x2="50" y2="5" transform={`rotate(${i * 45} 50 50)`} stroke={mainColor} strokeWidth="2" strokeDasharray="5,5" />
      ))}
    </svg>
  ) : null;

  // SVGフォールバック
  const FaceBase = () => (
    <path d="M50,100 Q50,50 100,50 Q150,50 150,100 Q150,145 100,145 Q50,145 50,100 Z" fill={skinColor} {...strokeStyle} />
  );
  
  const renderCharacterSvg = () => {
    switch (typeId) {
      // 簡易表示: 実際にはここに全キャラのSVGロジックが入りますが、今回は画像優先のため省略
      default: return <FaceBase />;
    }
  };

  return (
    <div className="relative w-32 h-32 flex items-center justify-center group">
      <div className="absolute inset-0 rounded-full opacity-20 animate-pulse" style={{ background: `radial-gradient(circle, ${mainColor}, transparent 70%)` }}></div>
      {!imageLoadError && fileName ? (
        <div className="w-full h-full overflow-hidden relative rounded-xl"> 
             {/* 画像をトリミングせず全体を表示 */}
             <img
                src={imagePath}
                alt={name}
                className="w-full h-full object-contain transition-transform transform group-hover:scale-110 duration-200"
                onError={() => setImageLoadError(true)}
            />
        </div>
      ) : (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl transition-transform transform group-hover:scale-110 duration-200">
          {renderCharacterSvg()}
        </svg>
      )}
      {effect}
    </div>
  );
};

const SmallCharIcon = ({ icon: Icon, secondaryIcon: SecondaryIcon, color }) => {
  return (
    <div className={`relative w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/40 ring-2 ring-${color}-300/50 shrink-0`}>
      <Icon size={20} className={`text-${color}-100`} />
      {SecondaryIcon && <div className={`absolute bottom-0 right-0 bg-${color}-500/80 p-0.5 rounded-full border border-white`}><SecondaryIcon size={10} className="text-white" /></div>}
    </div>
  );
};

const CharacterListScreen = ({ onBack }) => {
    const allTypes = getTypesData();
    const typeKeys = Object.keys(allTypes);

    return (
      <div className="h-full overflow-y-auto px-4 py-8 scrollbar-hide flex flex-col animate-fade-in-up">
        <div className="max-w-md mx-auto w-full bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 relative flex-1 flex flex-col">
          <div className="bg-gradient-to-r from-pink-500 to-orange-400 p-6 text-center text-white relative shrink-0">
            <h2 className="text-xl font-bold flex items-center justify-center gap-2">
              <Grid className="animate-pulse" /> キャラクター図鑑
            </h2>
            <p className="text-sm opacity-90 mt-1">全16種類のキャラをコンプリート！</p>
            <button onClick={onBack} className="absolute top-4 right-4 bg-white/20 p-1 rounded-full hover:bg-white/30 transition">
              <X size={20} />
            </button>
          </div>
          <div className="p-4 flex-1 overflow-y-auto bg-gray-50">
            <div className="grid grid-cols-2 gap-3">
                {typeKeys.map((key) => {
                    const char = allTypes[key];
                    return (
                        <div key={key} className="bg-white rounded-xl shadow-sm border-2 border-gray-100 p-2 flex flex-col items-center text-center hover:border-pink-200 transition transform hover:-translate-y-1">
                            <div className="scale-75 -my-4">
                                <CharacterAvatar typeId={char.typeIdString} icon={char.icon} color={char.iconColor} name={char.name} fileName={char.fileName} />
                            </div>
                            <div className="mt-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-${char.iconColor}-100 text-${char.iconColor}-600 mb-1 inline-block`}>
                                    {char.typeIdString}
                                </span>
                                <h3 className="text-xs font-bold text-gray-800 leading-tight">{char.name}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>
          </div>
          <div className="p-4 bg-white border-t border-gray-100 shrink-0">
            <button onClick={onBack} className="w-full bg-gray-800 text-white font-bold py-3 rounded-xl shadow-lg transform transition active:scale-95 flex items-center justify-center gap-2">
                <ArrowRight size={18} /> 閉じる
            </button>
          </div>
        </div>
      </div>
    );
};

const AxisExplanationScreen = ({ onBack }) => (
  <div className="h-full overflow-y-auto px-4 py-8 scrollbar-hide flex flex-col animate-fade-in-up">
    <div className="max-w-md mx-auto w-full bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 relative flex-1 flex flex-col">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-center text-white relative shrink-0">
        <h2 className="text-xl font-bold flex items-center justify-center gap-2">
          <Info className="animate-pulse" /> 診断の4つの軸って？
        </h2>
        <p className="text-sm opacity-90 mt-1">
          この4つのバランスで<br/>キミの性格タイプが決まるよ！
        </p>
        <button onClick={onBack} className="absolute top-4 right-4 bg-white/20 p-1 rounded-full hover:bg-white/30 transition">
          <X size={20} />
        </button>
      </div>
      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {axesData.map((axis, index) => (
          <div key={index} className={`bg-white rounded-xl shadow-sm border-2 border-${axis.color}-100 overflow-hidden`}>
            <div className={`bg-${axis.color}-50 px-3 py-2 border-b border-${axis.color}-100 flex justify-between items-center`}>
              <span className={`font-bold text-${axis.color}-600 text-sm`}>{axis.title}</span>
              <span className={`text-xs font-bold text-${axis.color}-400 bg-white px-2 py-0.5 rounded-full border border-${axis.color}-100`}>{axis.sub}</span>
            </div>
            <div className="p-3 grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
              <div className="text-center flex flex-col items-center">
                <div className={`bg-${axis.color}-100 p-2 rounded-full mb-1 text-${axis.color}-600`}>
                  <axis.left.icon size={18} />
                </div>
                <span className="font-bold text-gray-700 text-sm mb-1">{axis.left.label}</span>
                <p className="text-[10px] text-gray-500 leading-tight whitespace-pre-wrap">{axis.left.desc}</p>
              </div>
              <div className="text-gray-300 font-bold text-xs italic">VS</div>
              <div className="text-center flex flex-col items-center">
                <div className={`bg-${axis.color}-100 p-2 rounded-full mb-1 text-${axis.color}-600`}>
                  <axis.right.icon size={18} />
                </div>
                <span className="font-bold text-gray-700 text-sm mb-1">{axis.right.label}</span>
                <p className="text-[10px] text-gray-500 leading-tight whitespace-pre-wrap">{axis.right.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white border-t border-gray-100 shrink-0">
        <button onClick={onBack} className="w-full bg-gray-800 text-white font-bold py-3 rounded-xl shadow-lg transform transition active:scale-95 flex items-center justify-center gap-2">
          <ArrowRight size={18} /> 閉じる
        </button>
      </div>
    </div>
  </div>
);

const StartScreen = ({ onStart, onExplain, onShowList }) => (
  <div className="flex flex-col items-center justify-center h-full text-center px-6 space-y-6 animate-fade-in-up">
    <div className="bg-white/30 p-6 rounded-full backdrop-blur-sm mb-2 animate-bounce-slow relative">
      <Sparkles size={64} className="text-yellow-400 relative z-10" />
      <div className="absolute inset-0 bg-yellow-200 rounded-full blur-xl opacity-50 animate-pulse-slow"></div>
    </div>
    <div>
      <div className="inline-block bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full mb-3 shadow-sm border border-white/50">
         <span className="text-xs font-bold text-indigo-600 tracking-widest flex items-center gap-1">
           <Sparkles size={12} className="text-pink-400" />性格×進路診断アプリ<Sparkles size={12} className="text-blue-400" />
         </span>
      </div>
      <h1 className="text-4xl font-extrabold text-indigo-900 mb-3 drop-shadow-sm tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
        キャリキャラ
      </h1>
      <p className="text-indigo-800 font-bold text-lg">偏差値以外の進路選び</p>
    </div>
    <div className="bg-white/60 p-5 rounded-2xl text-sm text-indigo-900 shadow-md max-w-xs font-medium border border-white/60 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300"></div>
      <p className="leading-relaxed">
        キミのキャラにピッタリな<br/>
        <span className="font-bold text-purple-600 text-base">学部</span>や<span className="font-bold text-pink-600 text-base">校風</span>を教えるよ✨
      </p>
    </div>
    <div className="space-y-3 w-full max-w-xs">
      <button onClick={onStart} className="group w-full relative bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold py-4 px-10 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95 overflow-hidden ring-4 ring-pink-200/50">
        <span className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors"></span>
        <span className="flex items-center justify-center gap-2 relative z-10 text-lg">
          診断スタート！ <Rocket size={22} className="group-hover:rotate-12 transition-transform"/>
        </span>
      </button>
      <div className="flex gap-2">
        <button onClick={onExplain} className="flex-1 bg-white text-indigo-500 font-bold py-2 text-sm rounded-xl border border-indigo-100 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-1">
            <HelpCircle size={16} /> 4つの軸？
        </button>
        <button onClick={onShowList} className="flex-1 bg-white text-pink-500 font-bold py-2 text-sm rounded-xl border border-pink-100 hover:bg-pink-50 transition-colors flex items-center justify-center gap-1">
            <Grid size={16} /> キャラ図鑑
        </button>
      </div>
    </div>
  </div>
);


const QuizScreen = ({ question, index, progress, onAnswer, hoveredStar, setHoveredStar }) => (
  <div className="flex flex-col h-full px-6 py-8">
    <div className="w-full bg-white/40 h-3 rounded-full mb-8 overflow-hidden p-0.5">
      <div className="bg-gradient-to-r from-pink-400 to-purple-500 h-full rounded-full transition-all duration-300 ease-out relative overflow-hidden" style={{ width: `${progress}%` }}>
        <div className="absolute inset-0 bg-white/30 animate-pulse-slow"></div>
      </div>
    </div>
    <div className="flex-1 flex flex-col justify-center items-center relative">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl w-full max-w-md min-h-[240px] flex flex-col items-center justify-center text-center relative mb-8 animate-fade-in border border-white/50">
        <span className="absolute -top-4 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-bold tracking-widest shadow-sm border border-indigo-200">Q.{index + 1}</span>
        <p className="text-xl font-bold text-gray-800 leading-relaxed">{question.text}</p>
      </div>
      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-between items-center mb-2 px-2 text-xs font-bold text-indigo-800/60">
            <span>全然ちがう</span>
            <span>めっちゃそれ</span>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 flex justify-between items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => onAnswer(star)} onMouseEnter={() => setHoveredStar(star)} onMouseLeave={() => setHoveredStar(0)} className="p-1 transform transition hover:scale-110 active:scale-95 focus:outline-none">
                    <Star size={star === 3 ? 32 : star === 2 || star === 4 ? 36 : 42} fill={(hoveredStar) >= star ? "#FBBF24" : "white"} className={`${(hoveredStar) >= star ? "text-yellow-400 drop-shadow-md" : "text-indigo-200" } transition-all duration-200`} strokeWidth={2.5} />
                </button>
            ))}
        </div>
        <div className="text-center mt-3 h-6">
            {hoveredStar > 0 && <span className="text-indigo-600 font-bold text-sm animate-fade-in">{hoveredStar === 1 ? "全然ちがうかも..." : hoveredStar === 2 ? "あんまりピンとこない" : hoveredStar === 3 ? "どちらとも言えない" : hoveredStar === 4 ? "そうかも！" : "超わかる！！"}</span>}
        </div>
      </div>
    </div>
  </div>
);

const CalculatingScreen = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-pink-500/20 animate-pulse-slow"></div>
    <div className="relative z-10 bg-white/20 p-6 rounded-full mb-6 animate-spin">
      <RefreshCw size={48} className="text-white" />
    </div>
    <h2 className="text-2xl font-bold text-white mb-2 relative z-10 drop-shadow-sm">診断中...</h2>
    <p className="text-white/90 animate-pulse relative z-10 font-medium drop-shadow-sm">キミの性格を分析してるよ！<br/>どんなキャラが出るかな？✨</p>
  </div>
);

const ResultScreen = ({ result, mbtiBonus, onMatchStart, onExplain, onRetry, allTypes, selectedArea, setSelectedArea, selectedExamType, setSelectedExamType }) => {
  const getPartnerInfo = (id) => allTypes[id];
  const [showShareMenu, setShowShareMenu] = useState(false); 

  return (
    <div className="h-full overflow-y-auto px-4 py-8 scrollbar-hide">
      <div className="max-w-md mx-auto bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up border border-white/50 relative">
        <div className={`bg-gradient-to-r ${result.colorTheme} p-8 pb-12 text-center text-white relative overflow-hidden rounded-t-[2.5rem]`}>
          <div className="relative z-10 flex flex-col items-center">
            <p className="text-sm font-bold opacity-90 mb-3 tracking-wider uppercase">キミの適性キャラ</p>
            <div className="mb-4 transform hover:scale-105 transition-transform duration-300">
              <CharacterAvatar typeId={result.typeIdString} icon={result.icon} color={result.iconColor} name={result.name} fileName={result.fileName} />
            </div>
            <div className="flex flex-col items-center mb-2">
              <h2 className="text-3xl font-extrabold tracking-tight drop-shadow-md leading-tight">{result.name}</h2>
              <div className="mt-2 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/20 flex items-center gap-1.5">
                <Tag size={14} className="text-yellow-300" />
                <span className="text-sm font-bold tracking-widest font-mono">{result.typeIdString} 型</span>
              </div>
            </div>
            <p className="text-sm font-bold bg-white/20 px-4 py-1.5 rounded-full inline-block mb-3 backdrop-blur-sm mt-2">"{result.catchphrase}"</p>
            {mbtiBonus && <span className="inline-flex items-center gap-1 mt-1 bg-black/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/20"><Sparkles size={12} className="text-yellow-300" /> MBTI: {mbtiBonus} 加味Ver.</span>}
          </div>
        </div>
        <div className="bg-white rounded-t-[2.5rem] -mt-8 relative z-20 px-6 pt-8 pb-6 space-y-8">
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-3 border-l-4 border-pink-400 pl-3"><Smile className="text-pink-400" /> 基本性格</h3>
            <p className="text-gray-700 leading-relaxed text-sm bg-pink-50/50 p-4 rounded-xl border border-pink-100">{result.basicNature}</p>
          </section>
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-3 border-l-4 border-indigo-400 pl-3"><BookOpen className="text-indigo-400" /> 学びのスタイル</h3>
            <p className="text-gray-700 leading-relaxed text-sm bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">{result.learningStyle}</p>
          </section>
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-3 border-l-4 border-teal-400 pl-3"><Building className="text-teal-400" /> 理想の環境</h3>
            <p className="text-gray-700 leading-relaxed text-sm bg-teal-50/50 p-4 rounded-xl border border-teal-100 mb-4">{result.idealEnvironment}</p>
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-start gap-3 shadow-sm">
                <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 shrink-0"><Rocket size={18} /></div>
                <div><div className="text-xs font-bold text-gray-400">おすすめ学部</div><div className="text-indigo-900 font-bold text-sm">{result.faculty}</div></div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-start gap-3 shadow-sm">
                <div className="bg-pink-100 p-2 rounded-full text-pink-600 shrink-0"><Heart size={18} /></div>
                <div><div className="text-xs font-bold text-gray-400">大学の雰囲気</div><div className="text-pink-900 font-bold text-sm">{result.vibe}</div></div>
              </div>
            </div>
          </section>
          {/* 相性診断セクション */}
          <section>
              <div className="mb-4">
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-1 border-l-4 border-yellow-400 pl-3">
                  <Users className="text-yellow-400" /> キャンパスメイト相性予報
                </h3>
                <p className="text-xs text-gray-500 pl-3">
                  進学先で出会う仲間との相性はこんな感じ！
                </p>
              </div>
              
              <div className="space-y-4">
                {/* Best */}
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-xl border border-pink-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-red-400 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">💖 Best</div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="transform scale-75 -ml-2">
                      <SmallCharIcon {...getPartnerInfo(result.compatibility.best.id)} size="small" />
                    </div>
                    <div className="font-bold text-gray-800">{getPartnerInfo(result.compatibility.best.id).name}</div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed bg-white/60 p-2 rounded-lg">
                    {result.compatibility.best.reason}
                  </p>
                </div>

                {/* Good */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-blue-400 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">👍 Good</div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="transform scale-75 -ml-2">
                      <SmallCharIcon {...getPartnerInfo(result.compatibility.good.id)} size="small" />
                    </div>
                    <div className="font-bold text-gray-800">{getPartnerInfo(result.compatibility.good.id).name}</div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed bg-white/60 p-2 rounded-lg">
                    {result.compatibility.good.reason}
                  </p>
                </div>

                {/* Challenge */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-gray-400 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">🌀 Challenge</div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="transform scale-75 -ml-2">
                      <SmallCharIcon {...getPartnerInfo(result.compatibility.challenge.id)} size="small" />
                    </div>
                    <div className="font-bold text-gray-800">{getPartnerInfo(result.compatibility.challenge.id).name}</div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed bg-white/60 p-2 rounded-lg">
                    {result.compatibility.challenge.reason}
                  </p>
                </div>
              </div>
            </section>

          <div className="pt-4 flex flex-col gap-4">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-100 shadow-sm relative overflow-hidden">
              <h3 className="text-center font-bold text-indigo-900 mb-3 flex items-center justify-center gap-2"><Filter className="text-indigo-500 animate-bounce" size={20} /> 条件で絞り込んでマッチング</h3>
              <div className="space-y-3">
                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-indigo-200 text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300 font-bold text-sm" value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
                    <option value="kanto">関東エリア</option>
                    <option value="kansai">近畿エリア</option>
                    <option value="hokkaido_tohoku">北海道・東北エリア</option>
                    <option value="chubu">中部エリア</option>
                    <option value="chugoku_shikoku">中国・四国エリア</option>
                    <option value="kyushu_okinawa">九州・沖縄エリア</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-indigo-500"><ChevronDown size={20} /></div>
                </div>
                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-indigo-200 text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300 font-bold text-sm" value={selectedExamType} onChange={(e) => setSelectedExamType(e.target.value)}>
                    <option value="comprehensive">✨ 総合型・推薦 (個性重視)</option>
                    <option value="general">📚 一般選抜 (学力・実力重視)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-indigo-500"><ChevronDown size={20} /></div>
                </div>
                <button onClick={onMatchStart} className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transform transition active:scale-95 hover:shadow-xl relative overflow-hidden">
                  <span className="absolute inset-0 bg-white/20 hover:bg-white/30 transition-colors"></span><Gift size={20} />運命の大学を見る！
                </button>
              </div>
            </div>
            <div className="flex gap-2 relative">
              {/* シェアボタン (ポップアップメニュー) */}
              <div className="flex-1 relative">
                <button 
                  className="w-full bg-white text-gray-500 font-bold py-3 rounded-xl border-2 border-gray-100 flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm" 
                  onClick={() => setShowShareMenu(!showShareMenu)}
                >
                  <Share2 size={16} /> シェア
                </button>
                
                {showShareMenu && (
                  <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-20 animate-fade-in-up">
                    <button 
                      className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition text-left text-sm font-bold text-gray-700"
                      onClick={() => {
                        const text = `私の進路キャラは【${result.name}】でした！\n#キャリキャラ #進路とかムリゲー診断`;
                        const url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text);
                        window.open(url, '_blank');
                        setShowShareMenu(false);
                      }}
                    >
                      <X size={16} className="text-black" /> X (Twitter) でポスト
                    </button>
                    <button 
                      className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition text-left text-sm font-bold text-gray-700"
                      onClick={() => {
                        const text = `私の進路キャラは【${result.name}】でした！\n#キャリキャラ #進路とかムリゲー診断`;
                        const url = "https://line.me/R/msg/text/?" + encodeURIComponent(text);
                        window.open(url, '_blank');
                        setShowShareMenu(false);
                      }}
                    >
                      <LineIcon size={16} className="text-green-500" /> LINEで送る
                    </button>
                    <button 
                      className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition text-left text-sm font-bold text-gray-700 border-t border-gray-100"
                      onClick={() => {
                        const text = `私の進路キャラは【${result.name}】でした！\n"${result.catchphrase}"\nおすすめ学部: ${result.faculty}\n#キャリキャラ #進路とかムリゲー診断`;
                        navigator.clipboard.writeText(text).then(() => alert("コピーしました！"));
                        setShowShareMenu(false);
                      }}
                    >
                      <Copy size={16} className="text-gray-400" /> テキストをコピー
                    </button>
                  </div>
                )}
                {/* メニュー背景クリックで閉じるための透明なオーバーレイ */}
                {showShareMenu && (
                  <div className="fixed inset-0 z-10" onClick={() => setShowShareMenu(false)}></div>
                )}
              </div>

              <button onClick={onExplain} className="flex-1 bg-white text-indigo-500 font-bold py-3 rounded-xl border-2 border-indigo-100 flex items-center justify-center gap-2 hover:bg-indigo-50 transition text-sm"><Info size={16} /> 軸の解説</button>
            </div>
            <button onClick={onRetry} className="w-full text-gray-400 font-bold py-2 text-xs hover:text-gray-600 flex items-center justify-center gap-1"><RefreshCw size={12} /> 最初からやり直す</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MatchingAnimationScreen = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8 relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse-slow"></div>
    <div className="relative z-10 mb-8">
      <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center animate-spin-slow blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.6)] relative animate-bounce"><Rocket size={48} className="text-indigo-600" /></div>
    </div>
    <h2 className="text-2xl font-bold text-white mb-4 relative z-10 drop-shadow-md animate-pulse">AIが運命の5校を選出中...</h2>
    <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden relative z-10"><div className="h-full bg-white animate-[width_3s_ease-in-out_forwards]" style={{width: '0%'}}></div></div>
    <p className="text-white/70 text-sm mt-4 relative z-10">あなたの性格データと<br/>大学の特徴をマッチングしています</p>
  </div>
);

const MatchingResultScreen = ({ matchedUniversities, onBack }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  return (
    <div className="h-full overflow-y-auto px-4 py-8 scrollbar-hide flex flex-col animate-fade-in-up">
      <div className="max-w-md mx-auto w-full bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 relative flex-1 flex flex-col">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-center text-white relative shrink-0">
          <h2 className="text-xl font-bold flex items-center justify-center gap-2"><PartyPopper className="animate-bounce" /> 運命の5校が決定！</h2>
          <p className="text-sm opacity-90 mt-1">キミの適性にピッタリの大学が見つかったよ！<br/><span className="text-xs opacity-75">各大学の公式サイトをチェックしてみてね✨</span></p>
        </div>
        <div className="p-4 space-y-3 flex-1 overflow-y-auto bg-gray-50/50">
          {matchedUniversities.map((uni, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border-2 border-pink-300 transition-all duration-300 relative overflow-hidden">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-gray-800 leading-tight">{uni.name}</h3>
                    {uni.difficulty === 'S' && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded border border-yellow-200 font-bold">難関</span>}
                    {uni.sogo_level >= 3 && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded border border-green-200 font-bold">総合型◎</span>}
                  </div>
                  <p className="text-xs font-bold text-indigo-500">{uni.faculty}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 font-medium mb-3 border-l-2 border-pink-200 pl-2">{uni.desc}</p>
              <div className="flex flex-wrap gap-1">
                {uni.tags.map((tag, i) => (<span key={i} className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-full">#{tag}</span>))}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-white border-t border-gray-100 shrink-0 shadow-lg z-10 space-y-3">
          
          {/* ▼ 追加：シェアボタン */}
          <div className="relative">
            <button 
              className="w-full bg-white text-gray-500 font-bold py-3 rounded-xl border-2 border-gray-100 flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm" 
              onClick={() => setShowShareMenu(!showShareMenu)}
            >
              <Share2 size={16} /> シェアする
            </button>
            
            {showShareMenu && (
              <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-20 animate-fade-in-up">
                <button 
                  className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition text-left text-sm font-bold text-gray-700"
                  onClick={() => {
                    const uniNames = matchedUniversities.map(u => u.name).join('、');
                    const text = `私にピッタリの大学は【${uniNames}】でした！\n#キャリキャラ #進路とかムリゲー診断`;
                    const url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text);
                    window.open(url, '_blank');
                    setShowShareMenu(false);
                  }}
                >
                  <X size={16} className="text-black" /> X (Twitter) でポスト
                </button>
                <button 
                  className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition text-left text-sm font-bold text-gray-700"
                  onClick={() => {
                    const uniNames = matchedUniversities.map(u => u.name).join('、');
                    const text = `私にピッタリの大学は【${uniNames}】でした！\n#キャリキャラ #進路とかムリゲー診断`;
                    const url = "https://line.me/R/msg/text/?" + encodeURIComponent(text);
                    window.open(url, '_blank');
                    setShowShareMenu(false);
                  }}
                >
                  <LineIcon size={16} className="text-green-500" /> LINEで送る
                </button>
                <button 
                  className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition text-left text-sm font-bold text-gray-700 border-t border-gray-100"
                  onClick={() => {
                    const uniNames = matchedUniversities.map(u => u.name).join('、');
                    const text = `私にピッタリの大学は【${uniNames}】でした！\n#キャリキャラ #進路とかムリゲー診断`;
                    navigator.clipboard.writeText(text).then(() => alert("コピーしました！"));
                    setShowShareMenu(false);
                  }}
                >
                  <Copy size={16} className="text-gray-400" /> テキストをコピー
                </button>
              </div>
            )}
            {/* メニュー背景クリックで閉じるための透明なオーバーレイ */}
            {showShareMenu && (
              <div className="fixed inset-0 z-10" onClick={() => setShowShareMenu(false)}></div>
            )}
          </div>
          {/* ▲ 追加ここまで */}

          <button onClick={onBack} className="w-full font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transform transition active:scale-95 bg-gray-800 text-white hover:bg-gray-900">
            診断結果に戻る
          </button>
        </div>
      </div>
    </div>
  );
};

const FormScreen = ({ result, selectedUniversities, onComplete, onBack, GAS_API_URL }) => {
  const [formData, setFormData] = useState({ name: '', address: '', phone: '', email: '', grade: '', schoolName: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreedToPolicy) { alert("個人情報の取り扱いに同意してください。"); return; }
    setIsSubmitting(true);
    if (GAS_API_URL) {
      try {
        await fetch(GAS_API_URL, { method: "POST", body: JSON.stringify({ ...formData, result: result.name, type: result.typeIdString, universities: selectedUniversities.join(', '), timestamp: new Date().toISOString() }), mode: 'no-cors' });
        onComplete();
      } catch (error) { console.error("Error", error); alert("送信失敗"); } finally { setIsSubmitting(false); }
    } else {
      setTimeout(() => { setIsSubmitting(false); onComplete(); }, 1500);
    }
  };

  const PrivacyPolicyModal = () => (
    <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-sm h-[80%] flex flex-col shadow-2xl relative">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <h3 className="font-bold text-gray-800 flex items-center gap-2"><ShieldCheck size={18} className="text-green-500" />個人情報の取り扱い</h3>
          <button onClick={() => setShowPrivacyPolicy(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
        </div>
        <div className="p-5 overflow-y-auto text-xs text-gray-600 leading-relaxed space-y-4">
          <p>株式会社ブルースプリング（以下「当社」）は、本アプリを通じて取得した個人情報を以下の通り適切に取り扱います。</p>
          <section>
            <h4 className="font-bold text-gray-800 mb-1">1. 個人情報の利用目的</h4>
            <p>ご提供いただいた個人情報は、以下の目的で利用いたします。</p>
            <ul className="list-disc pl-4 mt-1 space-y-1">
              <li>利用者が希望する大学・専門学校等への資料請求依頼の取次ぎ</li>
              <li>上記に伴う、大学・専門学校等への個人情報の提供</li>
              <li>進路選びに役立つ情報の提供（希望者のみ）</li>
              <li>個人を特定しない統計データとしての分析</li>
            </ul>
          </section>
          <section>
            <h4 className="font-bold text-gray-800 mb-1">2. 個人情報の第三者提供について</h4>
            <p>本サービスでは、<span className="font-bold text-pink-600">大学・専門学校等から直接資料を送付するため</span>、以下の通り個人情報を第三者に提供いたします。</p>
            <div className="bg-gray-100 p-2 mt-2 rounded">
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>提供先:</strong> 利用者がチェックボックスで選択した大学・専門学校等</li>
                <li><strong>提供する項目:</strong> 氏名、住所、電話番号、メールアドレス、学年、志望分野等</li>
                <li><strong>利用目的:</strong> 各学校からの資料発送および学校情報の提供のため</li>
              </ul>
            </div>
            <p className="mt-2">利用者は、本サービスの利用（資料請求ボタンの押下）をもって、上記第三者への提供に同意したものとします。なお、提供された個人情報は、各提供先のプライバシーポリシーに基づき管理されます。</p>
          </section>
          <section>
            <h4 className="font-bold text-gray-800 mb-1">3. 個人情報の管理</h4>
            <p>当社は、個人情報の漏洩、滅失、毀損等を防止するために、必要かつ適切な安全管理措置を講じます。</p>
          </section>
          <div className="border-t border-gray-200 pt-4 mt-4"><h4 className="font-bold text-gray-800 mb-2 text-[10px] uppercase tracking-wider">事業者情報</h4><div className="bg-gray-50 p-3 rounded-lg space-y-1"><p><span className="font-bold">法人名:</span> 株式会社ブルースプリング</p><p><span className="font-bold">代表者:</span> 代表取締役社長 川本潤</p><p><span className="font-bold">所在地:</span> 岡山県岡山市北区磨屋町７－２</p><p><span className="font-bold">法人番号:</span> 6260001039106</p><p className="mt-2 pt-2 border-t border-gray-200"><span className="font-bold">お問い合わせ:</span><br/><a href="mailto:pr@bluespring.co.jp" className="text-indigo-600 underline">pr@bluespring.co.jp</a></p></div></div>
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl"><button onClick={() => { setAgreedToPolicy(true); setShowPrivacyPolicy(false); }} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-md hover:bg-indigo-700 transition">同意して閉じる</button></div>
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto px-4 py-8 scrollbar-hide flex flex-col relative">
       {showPrivacyPolicy && <PrivacyPolicyModal />}
       <div className="max-w-md mx-auto w-full bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up border border-white/50 relative flex-1 flex flex-col">
          <div className="bg-gradient-to-r from-pink-400 to-rose-400 p-6 text-center text-white relative">
             <h2 className="text-xl font-bold flex items-center justify-center gap-2"><Gift className="animate-bounce" /> 資料プレゼント</h2>
             <div className="text-center mt-2 bg-white/20 rounded-lg p-2 backdrop-blur-sm border border-white/30"><p className="text-xs font-bold opacity-90">以下の{selectedUniversities.length}校の資料をお届け！</p><p className="text-xs mt-1 truncate px-2">{selectedUniversities.join(', ')}</p></div>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1 overflow-y-auto">
             <div className="space-y-1"><div className="flex items-center"><label className="text-xs font-bold text-gray-500 ml-1">お名前</label><span className="ml-2 text-[10px] font-bold text-white bg-pink-500 px-2 py-0.5 rounded-full">必須</span></div><div className="relative"><User className="absolute left-3 top-3.5 text-gray-400" size={18} /><input type="text" name="name" required placeholder="山田 花子" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" value={formData.name} onChange={handleChange} /></div></div>
             <div className="space-y-1"><div className="flex items-center"><label className="text-xs font-bold text-gray-500 ml-1">ご住所</label><span className="ml-2 text-[10px] font-bold text-white bg-pink-500 px-2 py-0.5 rounded-full">必須</span></div><div className="relative"><MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} /><textarea name="address" required placeholder="〒000-0000 東京都..." className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 transition resize-none h-24" value={formData.address} onChange={handleChange} /></div></div>
             
             {/* 学年 (必須) */}
             <div className="space-y-1">
               <div className="flex items-center">
                  <label className="text-xs font-bold text-gray-500 ml-1">学年</label>
                  <span className="ml-2 text-[10px] font-bold text-white bg-pink-500 px-2 py-0.5 rounded-full">必須</span>
               </div>
               <div className="relative">
                 <GraduationCap className="absolute left-3 top-3.5 text-gray-400" size={18} />
                 <select name="grade" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 transition appearance-none" value={formData.grade} onChange={handleChange}>
                    <option value="" disabled>選択してください</option>
                    <option value="高3">高校3年生 (受験生)</option>
                    <option value="高2">高校2年生</option>
                    <option value="高1">高校1年生</option>
                    <option value="既卒">既卒 / 社会人</option>
                    <option value="その他">その他</option>
                 </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"><ChevronDown size={20} /></div>
               </div>
             </div>

             <div className="space-y-1"><div className="flex items-center"><label className="text-xs font-bold text-gray-500 ml-1">電話番号</label><span className="ml-2 text-[10px] font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">任意</span></div><div className="relative"><Phone className="absolute left-3 top-3.5 text-gray-400" size={18} /><input type="tel" name="phone" placeholder="090-0000-0000" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" value={formData.phone} onChange={handleChange} /></div></div>
             
             {/* メールアドレス (必須) */}
             <div className="space-y-1"><div className="flex items-center"><label className="text-xs font-bold text-gray-500 ml-1">メールアドレス</label><span className="ml-2 text-[10px] font-bold text-white bg-pink-500 px-2 py-0.5 rounded-full">必須</span></div><div className="relative"><Mail className="absolute left-3 top-3.5 text-gray-400" size={18} /><input type="email" name="email" required placeholder="example@email.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" value={formData.email} onChange={handleChange} /></div></div>
             
             <div className="bg-gray-50 p-3 rounded-xl border border-gray-200"><div className="flex items-start gap-2"><input type="checkbox" id="policy_agree" checked={agreedToPolicy} onChange={(e) => setAgreedToPolicy(e.target.checked)} className="mt-1 w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500" /><div className="text-xs text-gray-600"><button type="button" onClick={() => setShowPrivacyPolicy(true)} className="text-indigo-600 font-bold underline hover:text-indigo-800 mr-1">個人情報の取り扱いについて</button>を確認し、同意の上で送信します。</div></div></div>
             <div className="pt-2"><button type="submit" disabled={isSubmitting || !agreedToPolicy} className={`w-full font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transform transition ${!agreedToPolicy || isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white active:scale-95 hover:shadow-xl'}`}>{isSubmitting ? <Loader2 className="animate-spin" /> : agreedToPolicy ? <Send size={20} /> : <Lock size={18} />}{isSubmitting ? "送信中..." : "資料を請求する（無料）"}</button><button type="button" onClick={onBack} className="w-full mt-3 text-gray-400 text-sm font-bold hover:text-gray-600">大学選択に戻る</button></div>
          </form>
       </div>
    </div>
  );
};

const CompleteScreen = ({ onReset }) => (
  <div className="flex flex-col items-center justify-center h-full text-center px-6 animate-fade-in-up">
    <div className="bg-white/90 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full border border-white/50 relative">
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-100 p-4 rounded-full shadow-lg border-4 border-white"><CheckCircle size={48} className="text-green-500" /></div>
      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">請求完了！🎉</h2>
        <p className="text-gray-600 leading-relaxed">ありがとう！<br/>資料の発送手続きをしたよ。<br/><span className="font-bold text-pink-500">お家に届くまで待っててね！</span></p>
        <div className="bg-indigo-50 p-4 rounded-xl text-sm text-indigo-800 font-medium">届いた資料を見て、<br/>未来の自分をイメージしてみてね✨</div>
        <button onClick={onReset} className="w-full bg-gray-800 text-white font-bold py-3.5 rounded-xl shadow-lg mt-4 transform transition active:scale-95">トップに戻る</button>
      </div>
    </div>
  </div>
);

// --- メイン App コンポーネント ---

const App = () => {
  const [gameState, setGameState] = useState('start'); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [mbtiBonus, setMbtiBonus] = useState(null);
  const [scores, setScores] = useState({ logic_vs_feeling: 0, solo_vs_group: 0, real_vs_idea: 0, calm_vs_active: 0 });
  const [selectedArea, setSelectedArea] = useState('kanto');
  const [selectedExamType, setSelectedExamType] = useState('comprehensive');
  const [matchedUniversities, setMatchedUniversities] = useState([]);
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [showFooterCompany, setShowFooterCompany] = useState(false);
  const [showFooterPrivacy, setShowFooterPrivacy] = useState(false);

  const resetGame = () => {
    setGameState('start');
    setScores({logic_vs_feeling: 0, solo_vs_group: 0, real_vs_idea: 0, calm_vs_active: 0});
    setCurrentQuestionIndex(0);
    setMbtiBonus(null);
    setSelectedUniversities([]);
  };


  const handleAnswer = (rating) => {
    const question = questions[currentQuestionIndex];
    const baseScore = rating - 3; 
    let points = (question.type === 'feeling' || question.type === 'group' || question.type === 'idea' || question.type === 'active') ? baseScore : -baseScore;

    setScores(prev => ({ ...prev, [question.axis]: prev[question.axis] + points }));

    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setHoveredStar(0);
        } else {
            setGameState('calculating');
            setTimeout(() => setGameState('result'), 2500);
        }
    }, 400); 
  };

  const getResultType = () => {
    const isFeeling = scores.logic_vs_feeling > 0;
    const isGroup = scores.solo_vs_group > 0;
    const isIdea = scores.real_vs_idea > 0;
    const isActive = scores.calm_vs_active > 0;

    const key = `
      ${isFeeling ? '1' : '0'}
      ${isGroup ? '1' : '0'}
      ${isIdea ? '1' : '0'}
      ${isActive ? '1' : '0'}
    `.replace(/\s/g, '');

    const typeIdString = `
      ${isFeeling ? 'F' : 'L'}
      ${isGroup   ? 'G' : 'S'}
      ${isIdea    ? 'I' : 'R'}
      ${isActive  ? 'A' : 'C'}
    `.replace(/\s/g, '');

    const types = getTypesData();
    return { ...types[key], id: key, typeIdString };
  };

  const runMatching = () => {
    setGameState('matching_animation');
    const result = getResultType();
    const categoryKey = typeToCategory[result.id] || "social";
    
    // データセットから候補を取得
    const categoryCandidates = universityDatabase[categoryKey] || universityDatabase.social;
    
    // エリアでフィルタリング
    const areaCandidates = categoryCandidates.filter(u => u.area === selectedArea);
    const otherAreaCandidates = categoryCandidates.filter(u => u.area !== selectedArea);

    // 有名校(S, A) と ターゲット校(B, C, D) に分離する関数
    const splitCandidates = (list) => {
        return {
            famous: list.filter(u => u.difficulty === 'S' || u.difficulty === 'A'),
            target: list.filter(u => u.difficulty !== 'S' && u.difficulty !== 'A')
        };
    };

    const areaSplit = splitCandidates(areaCandidates);
    const otherSplit = splitCandidates(otherAreaCandidates);

    let finalSelection = [];

    // --- ① 有名校枠: 最大2校 (エリア内優先) ---
    let famousPool = [...areaSplit.famous];
    // エリア内だけで2校未満なら、エリア外の有名校も候補に入れる
    if (famousPool.length < 2) {
        famousPool = [...famousPool, ...otherSplit.famous];
    }
    // ランダムにシャッフルして先頭2つを取得
    const uniqueFamousPool = Array.from(new Set(famousPool.map(u => u.name)))
        .map(name => famousPool.find(u => u.name === name));
    
    const selectedFamous = uniqueFamousPool.sort(() => 0.5 - Math.random()).slice(0, 2);
    finalSelection = [...selectedFamous];

    // --- ② ターゲット校枠: 少なくとも3校 (エリア内優先) ---
    // (有名校が0校の場合などはターゲット校で埋めるため、残り枠を計算)
    let slotsRemaining = RECOMMENDED_COUNT - finalSelection.length;
    
    let targetPool = [...areaSplit.target];
    
    // ソート順決定
    const sorter = selectedExamType === 'general' 
        ? (a, b) => { const r = { "B": 3, "C": 2, "D": 1 }; return r[b.difficulty] - r[a.difficulty]; }
        : (a, b) => b.sogo_level - a.sogo_level;
    
    targetPool.sort(sorter);
    
    // エリア内ターゲットで埋める
    const selectedAreaTarget = targetPool.slice(0, slotsRemaining);
    finalSelection = [...finalSelection, ...selectedAreaTarget];

    // --- ③ まだ5校に満たない場合: エリア外ターゲットから補充 ---
    let slotsNeeded = RECOMMENDED_COUNT - finalSelection.length;
    if (slotsNeeded > 0) {
        let otherTargetPool = [...otherSplit.target];
        otherTargetPool.sort(sorter);
        // 既に選ばれているものを除外
        const uniqueOtherTarget = otherTargetPool.filter(u => !finalSelection.some(sel => sel.name === u.name));
        finalSelection = [...finalSelection, ...uniqueOtherTarget.slice(0, slotsNeeded)];
    }

    // --- ④ それでもまだ5校に満たない場合 (稀): エリア外の有名校で埋める ---
    slotsNeeded = RECOMMENDED_COUNT - finalSelection.length;
    if (slotsNeeded > 0) {
        // すでに選ばれているものを除外
        const remainingFamous = otherSplit.famous.filter(u => !finalSelection.some(sel => sel.name === u.name));
        finalSelection = [...finalSelection, ...remainingFamous.slice(0, slotsNeeded)];
    }
    
    // --- ⑤ 最終調整: 念のため重複排除し、5校に切る ---
    const uniqueSelection = Array.from(new Set(finalSelection.map(u => u.name)))
      .map(name => finalSelection.find(u => u.name === name))
      .slice(0, RECOMMENDED_COUNT);

    setMatchedUniversities(uniqueSelection);
    setSelectedUniversities(uniqueSelection.map(u => u.name));
    
    setTimeout(() => setGameState('matching_result'), 3000); 
  };

  const toggleUniversitySelection = (name) => {
    setSelectedUniversities(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  const questions = [
    { text: "ぶっちゃけ、考えるより先に行動しちゃう派？", axis: "logic_vs_feeling", type: "feeling" },
    { text: "クラスの打ち上げとかイベントは全力で楽しむ！", axis: "solo_vs_group", type: "group" },
    { text: "機械とか数字より、人の気持ちとか物語が好き。", axis: "real_vs_idea", type: "idea" },
    { text: "同じ毎日は飽きる。刺激が欲しい！", axis: "calm_vs_active", type: "active" },
    { text: "悩み相談は、解決策よりまずは共感してほしい。", axis: "logic_vs_feeling", type: "feeling" },
    { text: "一人で黙々と作業する時間が一番落ち着く。", axis: "solo_vs_group", type: "solo" },
    { text: "「これってどうなってるの？」仕組みを知るのが好き。", axis: "real_vs_idea", type: "idea" },
    { text: "安定した生活こそ最強の幸せだと思う。", axis: "calm_vs_active", type: "calm" },
    { text: "直感は結構当たる方だと思う。", axis: "logic_vs_feeling", type: "feeling" },
    { text: "グループワークより個人課題の方が楽。", axis: "solo_vs_group", type: "solo" },
    { text: "将来は「ありがとう」って直接言われる仕事がいい。", axis: "real_vs_idea", type: "idea" },
    { text: "コツコツ努力するより、一発逆転を狙いたい。", axis: "calm_vs_active", type: "active" },
  ];

  useEffect(() => {
    // 1. タイトルの設定
    document.title = APP_TITLE;

    // 2. ファビコンの設定
    const setFavicon = () => {
      // 既存のリンクタグを探すか作成
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      // 画像ファイルをファビコンとして設定 (public/images/icon.png を読み込む)
      link.href = '/images/icon.png';
    };

    setFavicon();
  }, []); // 初回マウント時のみ実行

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-indigo-100 via-purple-100 to-pink-100 font-sans text-gray-800 flex justify-center items-center p-0 sm:p-4 overflow-hidden">
      <div className="w-full h-screen sm:h-[850px] sm:w-[420px] bg-white/40 sm:rounded-[3rem] shadow-2xl backdrop-blur-md overflow-hidden relative border-[1px] border-white/40 ring-4 ring-white/20">
        <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[50%] bg-gradient-to-br from-pink-300/40 to-purple-300/40 rounded-full blur-[100px] animate-pulse-slow pointer-events-none mix-blend-multiply"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[60%] bg-gradient-to-tl from-blue-300/40 to-indigo-300/40 rounded-full blur-[100px] animate-pulse-slow pointer-events-none mix-blend-multiply animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
        <div className="relative z-10 h-full overflow-hidden">
          {gameState === 'start' && <StartScreen onStart={() => setGameState('quiz')} onExplain={() => setGameState('axis_explanation')} onShowList={() => setGameState('character_list')} />}
          {gameState === 'axis_explanation' && <AxisExplanationScreen onBack={() => setGameState('start')} />}
          {gameState === 'character_list' && <CharacterListScreen onBack={() => setGameState('start')} />}
          {gameState === 'quiz' && <QuizScreen question={questions[currentQuestionIndex]} index={currentQuestionIndex} progress={((currentQuestionIndex) / questions.length) * 100} onAnswer={handleAnswer} hoveredStar={hoveredStar} setHoveredStar={setHoveredStar} />}
          {gameState === 'calculating' && <CalculatingScreen />}
          {gameState === 'result' && <ResultScreen result={getResultType()} mbtiBonus={mbtiBonus} onMatchStart={runMatching} onExplain={() => setGameState('axis_explanation')} onRetry={resetGame} allTypes={getTypesData()} selectedArea={selectedArea} setSelectedArea={setSelectedArea} selectedExamType={selectedExamType} setSelectedExamType={setSelectedExamType} />}
          {gameState === 'matching_animation' && <MatchingAnimationScreen />}
          {gameState === 'matching_result' && <MatchingResultScreen matchedUniversities={matchedUniversities} onBack={() => setGameState('result')} />}


{/* --- ここから：フッター＆ポップアップ用コード --- */}
          
          {/* フッターリンク (画面下部に固定) */}
          <div className="absolute bottom-2 w-full text-center z-50">
            <div className="inline-flex gap-4 text-[10px] font-bold text-gray-500 bg-white/40 px-4 py-1 rounded-full backdrop-blur-sm shadow-sm border border-white/40">
              <button onClick={() => setShowFooterCompany(true)} className="hover:text-indigo-600 transition">運営会社</button>
              <span className="text-gray-300">|</span>
              <button onClick={() => setShowFooterPrivacy(true)} className="hover:text-indigo-600 transition">プライバシーポリシー</button>
            </div>
          </div>

          {/* 運営会社モーダル */}
          {showFooterCompany && (
            <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
              <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-slide-up">
                <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2"><Building2 size={18} className="text-indigo-500"/> 運営会社</h3>
                  <button onClick={() => setShowFooterCompany(false)} className="p-1 hover:bg-gray-200 rounded-full transition"><X size={20} className="text-gray-500"/></button>
                </div>
                <div className="p-6 text-sm text-gray-700 space-y-3">
                  <div className="flex border-b border-gray-100 pb-2"><span className="w-24 font-bold text-gray-400 shrink-0">法人名</span><span>株式会社ブルースプリング</span></div>
                  <div className="flex border-b border-gray-100 pb-2"><span className="w-24 font-bold text-gray-400 shrink-0">代表取締役</span><span>川本 潤</span></div>
                  <div className="flex border-b border-gray-100 pb-2"><span className="w-24 font-bold text-gray-400 shrink-0">本店所在地</span><span>〒700-0826<br/>岡山県岡山市北区磨屋町7-2</span></div>
                  <div className="flex border-b border-gray-100 pb-2"><span className="w-24 font-bold text-gray-400 shrink-0">法人番号</span><span>6260001039106</span></div>
                  <div className="flex"><span className="w-24 font-bold text-gray-400 shrink-0">問い合わせ</span><a href="mailto:pr@bluespring.co.jp" className="text-indigo-600 underline">pr@bluespring.co.jp</a></div>
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                   <button onClick={() => setShowFooterCompany(false)} className="w-full bg-gray-800 text-white font-bold py-3 rounded-xl shadow hover:bg-gray-700 transition">閉じる</button>
                </div>
              </div>
            </div>
          )}

          {/* プライバシーポリシーモーダル */}
          {showFooterPrivacy && (
            <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
              <div className="bg-white rounded-2xl w-full max-w-sm h-[80%] flex flex-col shadow-2xl animate-slide-up">
                <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center shrink-0">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2"><ShieldCheck size={18} className="text-green-500"/> プライバシーポリシー</h3>
                  <button onClick={() => setShowFooterPrivacy(false)} className="p-1 hover:bg-gray-200 rounded-full transition"><X size={20} className="text-gray-500"/></button>
                </div>
                <div className="p-5 overflow-y-auto text-xs text-gray-600 leading-relaxed space-y-4 flex-1">
                  <p>株式会社ブルースプリング（以下「当社」）は、本アプリ「キャリキャラ」において、ユーザーの個人情報を以下の通り取り扱います。</p>
                  
                  <section>
                    <h4 className="font-bold text-gray-800 mb-1">1. 取得する情報</h4>
                    <p>当社は、資料請求サービス等の提供にあたり、以下の情報を取得します。</p>
                    <ul className="list-disc pl-4 mt-1 bg-gray-50 p-2 rounded">
                      <li>氏名、住所、電話番号、メールアドレス</li>
                      <li>学年、在籍学校名</li>
                      <li>診断結果データ、志望分野</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="font-bold text-gray-800 mb-1">2. 利用目的</h4>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>利用者が希望する大学・専門学校等への資料請求依頼の取次ぎ</li>
                      <li>上記に伴う、大学・専門学校等への個人情報の提供</li>
                      <li>本サービスの改善および新サービスの開発</li>
                      <li>お問い合わせへの対応</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="font-bold text-gray-800 mb-1">3. 第三者への提供</h4>
                    <p>本サービスは、<span className="font-bold text-pink-600">利用者が資料請求を希望した教育機関（大学・専門学校等）に対してのみ</span>、資料送付に必要な範囲で個人情報を提供します。</p>
                    <p className="mt-1">これ以外の場合において、法令に基づく場合を除き、利用者の同意なく第三者に個人情報を提供することはありません。</p>
                  </section>

                  <section>
                    <h4 className="font-bold text-gray-800 mb-1">4. 免責事項</h4>
                    <p>リンク先の教育機関等における個人情報の取り扱いについては、それぞれの機関の責任において行われるものとし、当社は一切の責任を負いません。</p>
                  </section>

                  <section>
                    <h4 className="font-bold text-gray-800 mb-1">5. お問い合わせ窓口</h4>
                    <p>本ポリシーに関するお問い合わせは、運営会社情報のメールアドレスまでご連絡ください。</p>
                  </section>
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-100 shrink-0">
                   <button onClick={() => setShowFooterPrivacy(false)} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl shadow hover:bg-indigo-700 transition">閉じる</button>
                </div>
              </div>
            </div>
          )}

          {/* --- ここまで：フッター＆ポップアップ用コード --- */}

        </div>
      </div>
      <style>{`
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(50px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(-3%); } 50% { transform: translateY(3%); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes width { 0% { width: 0%; } 100% { width: 100%; } }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }
        .animate-pulse-slow { animation: pulse 6s infinite ease-in-out; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default App;