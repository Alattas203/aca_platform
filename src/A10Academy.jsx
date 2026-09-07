/**
 * A10 Sport Academy — أكاديمية A10 الرياضية
 * Self-contained single-file React landing page.
 *
 * Design direction (ui-ux-pro-max, "Sports Team/Club"):
 *   style    Vibrant & Block-based + Motion-Driven, OLED dark base
 *   pattern  Hero-Centric + Feature-Rich
 *   type     Bold + impactful — Barlow Condensed / Barlow (+ Alexandria for Arabic)
 *   effects  Score animations + schedule reveals
 *   required Schedule + roster
 *
 * Tokens are three-layer (primitive → semantic → component) and live in CSS
 * variables, so no component below carries a raw hex value.
 *
 * Deps: react, tailwindcss (arbitrary values only — no config), lucide-react.
 */
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  createContext,
  useContext,
} from "react";
import {
  Star,
  MapPin,
  Phone,
  Menu,
  X,
  ChevronRight,
  Check,
  Play,
  Instagram,
  Youtube,
  Send,
  Ghost,
  Music2,
  MessageCircle,
  Trophy,
  Target,
  Brain,
  Zap,
  Activity,
  Users,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  Mail,
} from "lucide-react";
import { ShaderBackground } from "./components/ui/pulsing-border";
import heroHuddle from "./assets/hero-huddle.jpg";
import logoMark from "./assets/logo.jpg";
import reelPoster1 from "./assets/reel-1.jpg";
import reelPoster2 from "./assets/reel-2.jpg";
import reelPoster3 from "./assets/reel-3.jpg";
import reelPoster4 from "./assets/reel-4.jpg";
import reelPoster5 from "./assets/reel-5.jpg";
import reelVideo1 from "./assets/reel-1.mp4";
import reelVideo2 from "./assets/reel-2.mp4";
import reelVideo3 from "./assets/reel-3.mp4";
import reelVideo4 from "./assets/reel-4.mp4";
import reelVideo5 from "./assets/reel-5.mp4";
import flagSA from "./assets/flag-sa.svg";
import flagUS from "./assets/flag-us.svg";

/* ══════════════════════════════════════════════════════════════
   1. LANGUAGE
   ══════════════════════════════════════════════════════════════ */

const LangCtx = createContext({ lang: "ar", rtl: true });
const useLang = () => useContext(LangCtx);

/** Pick the active side of a bilingual value. */
function useT() {
  const { lang } = useLang();
  return useCallback(
    (v) => (v && typeof v === "object" && "ar" in v ? v[lang] : v),
    [lang]
  );
}

const T = {
  nav: {
    method: { ar: "المنهجية", en: "Method" },
    programs: { ar: "البرامج", en: "Programs" },
    squad: { ar: "الطاقم", en: "Staff" },
    index: { ar: "لاعب الشهر", en: "Player of the Month" },
    media: { ar: "الإعلام", en: "Media" },
    contact: { ar: "تواصل", en: "Contact" },
  },
  join: { ar: "انضم للأكاديمية", en: "Join the academy" },
  trial: { ar: "احجز حصة تجريبية", en: "Book a free trial" },
  branch: { ar: "الفرع", en: "Branch" },
};

/* ══════════════════════════════════════════════════════════════
   2. CONTENT
   ══════════════════════════════════════════════════════════════ */

const BRANCHES = {
  riyadh: {
    id: "riyadh",
    city: { ar: "الرياض", en: "Riyadh" },
    code: "RUH",
    district: {
      ar: "حي الملقا · طريق أنس بن مالك",
      en: "Al Malqa · Anas Bin Malik Rd",
    },
    pitch: {
      ar: "ملعب A10 الرئيسي — عشب FIFA Quality Pro",
      en: "A10 Main Pitch — FIFA Quality Pro turf",
    },
    phone: "+966 55 010 1010",
    whatsapp: "966550101010",
    pitches: 3,
    players: 320,
    map: "https://www.google.com/maps?q=Al+Malqa+Riyadh+Saudi+Arabia&output=embed",
    staff: [
      {
        name: { ar: "الكابتن سعود العتيبي", en: "Saud Al-Otaibi" },
        role: { ar: "المدير الفني", en: "Technical Director" },
        badge: "UEFA A",
        note: { ar: "١٢ سنة في تدريب الفئات السنية", en: "12 years in youth coaching" },
      },
      {
        name: { ar: "الكابتن ريان الدوسري", en: "Rayan Al-Dosari" },
        role: { ar: "مدرب مسار الاحتراف", en: "Pro Pathway coach" },
        badge: "UEFA B",
        note: { ar: "لاعب سابق في دوري الدرجة الأولى", en: "Former First Division player" },
      },
      {
        name: { ar: "أ. نايف الحربي", en: "Naif Al-Harbi" },
        role: { ar: "أخصائي لياقة وتأهيل", en: "S&C and rehab specialist" },
        badge: "MSc",
        note: { ar: "يشرف على أحمال GPS لكل مجموعة", en: "Runs GPS load monitoring" },
      },
      {
        name: { ar: "الكابتن عمر الشمري", en: "Omar Al-Shammari" },
        role: { ar: "مدرب حراس المرمى", en: "Goalkeeping coach" },
        badge: "AFC C",
        note: { ar: "حصص حراسة مخصصة أسبوعياً", en: "Weekly dedicated GK sessions" },
      },
    ],
    schedule: [
      {
        g: { ar: "نجوم صغار", en: "Little Stars" },
        d: { ar: "السبت · الاثنين", en: "Sat · Mon" },
        h: "16:30 – 18:00",
        pitch: { ar: "ملعب ١", en: "Pitch 1" },
      },
      {
        g: { ar: "المواهب", en: "Junior Talent" },
        d: { ar: "الأحد · الثلاثاء · الخميس", en: "Sun · Tue · Thu" },
        h: "18:00 – 19:30",
        pitch: { ar: "ملعب ٢", en: "Pitch 2" },
      },
      {
        g: { ar: "مسار الاحتراف", en: "Pro Pathway" },
        d: { ar: "الأحد · الثلاثاء · الخميس", en: "Sun · Tue · Thu" },
        h: "19:45 – 21:30",
        pitch: { ar: "الملعب الرئيسي", en: "Main pitch" },
      },
    ],
  },
  jeddah: {
    id: "jeddah",
    city: { ar: "جدة", en: "Jeddah" },
    code: "JED",
    district: { ar: "حي الشاطئ · طريق الكورنيش", en: "Al Shatea · Corniche Rd" },
    pitch: {
      ar: "مجمع A10 الساحلي — ملعبان مغطّيان",
      en: "A10 Coastal Complex — 2 covered pitches",
    },
    phone: "+966 55 020 2020",
    whatsapp: "966550202020",
    pitches: 2,
    players: 210,
    map: "https://www.google.com/maps?q=Al+Shatea+Jeddah+Saudi+Arabia&output=embed",
    staff: [
      {
        name: { ar: "الكابتن ماجد الغامدي", en: "Majed Al-Ghamdi" },
        role: { ar: "المدير الفني", en: "Technical Director" },
        badge: "UEFA B",
        note: { ar: "أسّس فرع جدة عام ٢٠٢١", en: "Opened the Jeddah branch in 2021" },
      },
      {
        name: { ar: "الكابتن يزيد الزهراني", en: "Yazeed Al-Zahrani" },
        role: { ar: "مدرب المواهب", en: "Junior Talent coach" },
        badge: "AFC B",
        note: { ar: "متخصص في التطوير التقني", en: "Technical development specialist" },
      },
      {
        name: { ar: "أ. تركي باوزير", en: "Turki Bawazir" },
        role: { ar: "أخصائي لياقة", en: "Conditioning specialist" },
        badge: "BSc",
        note: { ar: "برامج فردية لكل لاعب", en: "Individual programs per player" },
      },
      {
        name: { ar: "الكابتن سامي الحسني", en: "Sami Al-Hasani" },
        role: { ar: "مدرب حراس المرمى", en: "Goalkeeping coach" },
        badge: "AFC C",
        note: { ar: "حارس سابق لفريق شبابي محترف", en: "Former pro youth keeper" },
      },
    ],
    schedule: [
      {
        g: { ar: "نجوم صغار", en: "Little Stars" },
        d: { ar: "الأحد · الثلاثاء", en: "Sun · Tue" },
        h: "17:00 – 18:15",
        pitch: { ar: "الملعب المغطى", en: "Covered pitch" },
      },
      {
        g: { ar: "المواهب", en: "Junior Talent" },
        d: { ar: "السبت · الاثنين · الأربعاء", en: "Sat · Mon · Wed" },
        h: "18:30 – 20:00",
        pitch: { ar: "ملعب ١", en: "Pitch 1" },
      },
      {
        g: { ar: "مسار الاحتراف", en: "Pro Pathway" },
        d: { ar: "السبت · الاثنين · الأربعاء", en: "Sat · Mon · Wed" },
        h: "20:00 – 21:45",
        pitch: { ar: "ملعب ٢", en: "Pitch 2" },
      },
    ],
  },
};

const PROGRAMS = [
  {
    id: "little",
    n: "01",
    tier: { ar: "نجوم صغار", en: "Little Stars" },
    age: { ar: "٥ – ٨ سنوات", en: "Ages 5 – 8" },
    ageNum: "5–8",
    line: {
      ar: "أول علاقة مع الكرة: توازن، تحكّم، ومتعة قبل كل شيء.",
      en: "First relationship with the ball: balance, control, and fun above all.",
    },
    focus: [
      { ar: "التآزر الحركي والتوازن", en: "Coordination and balance" },
      { ar: "التحكم بالكرة عبر الألعاب", en: "Ball mastery through games" },
      { ar: "روح الفريق والانضباط", en: "Team spirit and discipline" },
    ],
    sessions: { ar: "حصتان أسبوعياً · ٧٥ دقيقة", en: "2 sessions / week · 75 min" },
    price: 650,
    ratings: { technical: 62, tactical: 44, physical: 55, mental: 68 },
  },
  {
    id: "junior",
    n: "02",
    tier: { ar: "المواهب", en: "Junior Talent" },
    age: { ar: "٩ – ١٣ سنة", en: "Ages 9 – 13" },
    ageNum: "9–13",
    line: {
      ar: "بناء اللاعب: تقنية نظيفة، قراءة للمساحات، وأول بطولة حقيقية.",
      en: "Building the player: clean technique, reading space, and a first real tournament.",
    },
    focus: [
      { ar: "التمرير والاستلام تحت الضغط", en: "Passing and receiving under pressure" },
      { ar: "المبادئ التكتيكية للمركز", en: "Positional principles" },
      { ar: "دوري داخلي وبطولات محلية", en: "In-house league and local cups" },
    ],
    sessions: { ar: "٣ حصص أسبوعياً · ٩٠ دقيقة", en: "3 sessions / week · 90 min" },
    price: 850,
    ratings: { technical: 78, tactical: 71, physical: 69, mental: 74 },
  },
  {
    id: "pro",
    n: "03",
    tier: { ar: "مسار الاحتراف", en: "Pro Pathway" },
    age: { ar: "١٤ – ١٨ سنة", en: "Ages 14 – 18" },
    ageNum: "14–18",
    line: {
      ar: "جاهزية الأندية: أحمال بدنية مقنّنة، تحليل فيديو، وأيام معاينة أمام الكشافين.",
      en: "Club-ready: monitored loads, video analysis, and showcase days in front of scouts.",
    },
    focus: [
      { ar: "برنامج قوة وتكييف فردي", en: "Individual strength and conditioning" },
      { ar: "تحليل فيديو أسبوعي للأداء", en: "Weekly video performance review" },
      { ar: "معاينات أمام أندية دوري روشن", en: "Trials with Roshn League clubs" },
    ],
    sessions: { ar: "٣ حصص أسبوعياً · ١٠٥ دقيقة", en: "3 sessions / week · 105 min" },
    price: 1100,
    ratings: { technical: 86, tactical: 88, physical: 84, mental: 82 },
  },
];

const PILLARS = [
  {
    key: "technical",
    icon: Target,
    abbr: "TEC",
    label: { ar: "تقني", en: "Technical" },
    desc: {
      ar: "التحكم، التمرير، التسديد، والمراوغة تحت ضغط الخصم.",
      en: "Control, passing, finishing and dribbling under defensive pressure.",
    },
  },
  {
    key: "tactical",
    icon: Activity,
    abbr: "TAC",
    label: { ar: "تكتيكي", en: "Tactical" },
    desc: {
      ar: "قراءة اللعب، التمركز، واتخاذ القرار الصحيح في الوقت الصحيح.",
      en: "Game reading, positioning, and the right decision at the right moment.",
    },
  },
  {
    key: "physical",
    icon: Zap,
    abbr: "PHY",
    label: { ar: "بدني", en: "Physical" },
    desc: {
      ar: "السرعة، التحمّل، القوة، ورشاقة تغيير الاتجاه بقياس GPS.",
      en: "Speed, endurance, power and change of direction, GPS tracked.",
    },
  },
  {
    key: "mental",
    icon: Brain,
    abbr: "MEN",
    label: { ar: "ذهني", en: "Mental" },
    desc: {
      ar: "التركيز، الانضباط، والتعافي النفسي بعد الخطأ أو الخسارة.",
      en: "Focus, discipline, and bouncing back after a mistake or a loss.",
    },
  },
];

/* Players of the month.
   Photos live in /public/players — drop a file there and it shows up; a missing
   file falls back to the crest watermark, so the row never renders broken. */
const PLAYERS_OF_MONTH_LABEL = { ar: "أكتوبر ٢٠٢٦", en: "October 2026" };
const PLAYERS_OF_MONTH = [
  {
    id: "kamal",
    photo: "/players/potm-3-full.png",
    name: { ar: "عبدالله كمال", en: "Abdullah Kamal" },
    pos: "S",
    squad: "2014",
  },
  {
    id: "mandouq",
    photo: "/players/potm-2-full.png",
    name: { ar: "أمجد أبو مندوق", en: "Amjad Abu Mandouq" },
    pos: "RB",
    squad: "2010",
  },
  {
    id: "ali",
    photo: "/players/potm-1-full.png",
    name: { ar: "ايهم علي", en: "Ayham Ali" },
    pos: "S",
    squad: "2013",
  },
];

const METHOD = [
  {
    icon: ShieldCheck,
    stat: "1",
    unit: { ar: "منهج موحّد", en: "curriculum" },
    title: { ar: "منهج أوروبي معتمد", en: "Certified European curriculum" },
    body: {
      ar: "خطة موسم مبنية على مناهج أكاديميات أوروبية، مقسّمة إلى دورات شهرية بأهداف مقاسة.",
      en: "A season plan modelled on European academy curricula, split into monthly blocks with measurable targets.",
    },
    wide: true,
  },
  {
    icon: Users,
    stat: "8",
    unit: { ar: "لاعبين لكل مدرب", en: "players per coach" },
    title: { ar: "مجموعات صغيرة", en: "Small groups" },
    body: {
      ar: "لمسات أكثر لكل لاعب وتصحيح فردي في كل حصة.",
      en: "More touches per player and individual correction every session.",
    },
  },
  {
    icon: Activity,
    stat: "GPS",
    unit: { ar: "قياس الأحمال", en: "load tracking" },
    title: { ar: "قياس بدني دقيق", en: "Precise physical monitoring" },
    body: {
      ar: "المسافة والسرعة القصوى والأحمال، لحماية اللاعب وضبط إيقاع تطوره.",
      en: "Distance, top speed and load — to protect the player and pace development.",
    },
  },
  {
    icon: Trophy,
    stat: "6",
    unit: { ar: "أسابيع بين التقارير", en: "weeks between reports" },
    title: { ar: "تقرير مكتوب لولي الأمر", en: "A written parent report" },
    body: {
      ar: "مؤشر اللاعب في المحاور الأربعة، وخطة الفترة القادمة.",
      en: "The four-pillar index, plus the plan for the next block.",
    },
    wide: true,
  },
];

const SCOUT_STATS = [
  { n: 35, l: { ar: "لاعباً انتقلوا لأندية محترفة", en: "players signed by pro clubs" } },
  { n: 12, l: { ar: "يوم معاينة سنوياً", en: "showcase days per year" } },
  { n: 4, l: { ar: "استدعاءات لمنتخبات الفئات", en: "national youth call-ups" } },
];

// Real reels pulled from instagram.com/akdamya10 — plays inline via Instagram's
// own embed iframe once tapped (label/tag below is ours, for the poster only;
// once playing, Instagram shows its own real caption). Posters are real frames
// captured from each reel and saved locally, same reason: Instagram's own
// thumbnail/video URLs are signed and expire within hours, so hotlinking them
// would quietly break — the video itself plays natively, no Instagram widget.
const REELS = [
  {
    tag: { ar: "تدريب", en: "Training" },
    title: { ar: "من حصص التدريب", en: "From training sessions" },
    poster: reelPoster1,
    video: reelVideo1,
    href: "https://www.instagram.com/reel/DcpeO1JMGBX/",
  },
  {
    tag: { ar: "مهارة", en: "Skill" },
    title: { ar: "تحدّيات كرة القدم", en: "Football challenges" },
    poster: reelPoster2,
    video: reelVideo2,
    href: "https://www.instagram.com/reel/Dcg-iNxMTBR/",
  },
  {
    tag: { ar: "خلف الكواليس", en: "Behind the scenes" },
    title: { ar: "يوم داخل الأكاديمية", en: "A day at the academy" },
    poster: reelPoster3,
    video: reelVideo3,
    href: "https://www.instagram.com/reel/DcZYLOhsAx_/",
  },
  {
    tag: { ar: "تدريب", en: "Training" },
    title: { ar: "لقطات من الملعب", en: "Clips from the pitch" },
    poster: reelPoster4,
    video: reelVideo4,
    href: "https://www.instagram.com/reel/DcZYKHqMagr/",
  },
  {
    tag: { ar: "مهارة", en: "Skill" },
    title: { ar: "مهارات اللاعبين", en: "Player skills" },
    poster: reelPoster5,
    video: reelVideo5,
    href: "https://www.instagram.com/reel/DcHRqK6sHw1/",
  },
];

const SOCIALS = [
  {
    name: "Instagram",
    handle: "@akdamya10",
    href: "https://instagram.com/akdamya10",
    icon: Instagram,
    color: "#E1306C",
  },
  {
    name: "TikTok",
    handle: "@akdamya10",
    href: "https://tiktok.com/@akdamya10",
    icon: Music2,
    color: "#25F4EE",
  },
  {
    name: "Snapchat",
    handle: "akdamy10a",
    href: "https://snapchat.com/add/akdamy10a",
    icon: Ghost,
    color: "#FFFC00",
  },
  {
    name: "Telegram",
    handle: "@academyA10",
    href: "https://t.me/academyA10",
    icon: Send,
    color: "#2AABEE",
  },
  {
    name: "YouTube",
    handle: "@academya10",
    href: "https://youtube.com/@academya10",
    icon: Youtube,
    color: "#FF0000",
  },
];

const VOICES = [
  {
    quote: {
      ar: "ابني دخل خجولاً وخرج قائداً للفريق. التقارير كل ستة أسابيع خلّتني أشوف التطور بالأرقام، مو بالكلام.",
      en: "My son arrived shy and left as team captain. The six-week reports let me see progress in numbers, not promises.",
    },
    by: { ar: "أبو فيصل", en: "Abu Faisal" },
    role: { ar: "ولي أمر · الرياض", en: "Parent · Riyadh" },
  },
  {
    quote: {
      ar: "أول مرة أتدرب فيها بمنهج واضح، وكل حصة لها هدف. اليوم أنا في فريق الشباب لنادٍ محترف.",
      en: "The first time I trained with a real curriculum, every session with a purpose. Today I'm in a pro club's youth squad.",
    },
    by: { ar: "عبدالرحمن، ١٦ سنة", en: "Abdulrahman, 16" },
    role: { ar: "خريج مسار الاحتراف", en: "Pro Pathway graduate" },
  },
];

const TICKER = [
  { ar: "منهج أوروبي معتمد", en: "Certified European curriculum" },
  { ar: "٨ لاعبين لكل مدرب", en: "8 players per coach" },
  { ar: "قياس بدني بتقنية GPS", en: "GPS physical monitoring" },
  { ar: "أيام معاينة أمام الكشافين", en: "Showcase days for scouts" },
  { ar: "تقرير تطوّر كل ٦ أسابيع", en: "Progress report every 6 weeks" },
  { ar: "فرعان: الرياض وجدة", en: "Two branches: Riyadh and Jeddah" },
];

/* ══════════════════════════════════════════════════════════════
   3. DESIGN TOKENS + STYLESHEET
   Three layers: primitive → semantic → component.
   ══════════════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@400;500;600;700&family=Alexandria:wght@400;500;700;800&display=swap');

.a10 {
  /* ── primitive ─────────────────────────────────────────── */
  --p-ink:        #070E18;
  --p-navy-900:   #0A1628;
  --p-navy-800:   #112A46;
  --p-navy-700:   #14477E;
  --p-sky-500:    #29A9E0;
  --p-sky-400:    #4FC3F0;
  --p-sky-300:    #8FDBF7;
  --p-gold-400:   #FFB800;
  --p-gold-300:   #FFCE4D;
  --p-chalk-50:   #F4F8FC;
  --p-chalk-100:  #E2ECF5;
  --p-white:      #FFFFFF;
  --p-green-500:  #25D366;

  /* ── semantic ──────────────────────────────────────────── */
  --bg:            var(--p-ink);
  --bg-block:      var(--p-navy-800);
  --bg-invert:     var(--p-chalk-50);
  --fg:            var(--p-white);
  --fg-muted:      #A8BDD2;
  --fg-faint:      #7C93AC;
  --fg-invert:     var(--p-navy-900);
  --fg-invert-muted: #3C5470;  /* 7.4:1 on --bg-invert */
  --fg-invert-dim:   #5D7590;  /* 4.7:1 on --bg-invert */
  --scrim:           rgba(7,14,24,.88);
  --primary:       var(--p-sky-500);
  --on-primary:    var(--p-ink);
  --accent:        var(--p-gold-400);
  --on-accent:     var(--p-ink);
  --line:          rgba(143,182,214,.20);
  --line-strong:   rgba(41,169,224,.48);
  --line-invert:   rgba(10,22,40,.14);
  --whatsapp:      var(--p-green-500);

  /* ── component ─────────────────────────────────────────── */
  --btn-bg:        var(--primary);
  --btn-fg:        var(--on-primary);
  --btn-bg-hover:  var(--p-sky-300);
  --block-bg:      var(--bg-block);
  --block-line:    var(--line);
  --block-line-hi: var(--line-strong);
  --ring:          var(--primary);

  font-family: 'Barlow', 'Alexandria', ui-sans-serif, system-ui, sans-serif;
  background: var(--bg);
  color: var(--fg);
}

.a10 .f-display {
  font-family: 'Barlow Condensed', 'Alexandria', ui-sans-serif, sans-serif;
  font-weight: 700;
  line-height: .94;
  letter-spacing: .002em;
}
.a10[dir="ltr"] .f-display { text-transform: uppercase; letter-spacing: .01em; }
.a10[dir="rtl"] .f-display { line-height: 1.16; font-weight: 800; }
.a10 .f-data {
  font-family: 'Barlow Condensed', 'Alexandria', ui-monospace, monospace;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.a10[dir="rtl"] .f-data { letter-spacing: 0; font-weight: 700; }
.a10 .f-data.is-plain { text-transform: none; letter-spacing: .02em; }
.a10 .t-hero { font-size: clamp(3rem, 8.4vw, 6.4rem); }
.a10[dir="rtl"] .t-hero { font-size: clamp(2.1rem, 5vw, 4.1rem); }
.a10 .t-sec { font-size: clamp(2.3rem, 5vw, 3.8rem); }
.a10[dir="rtl"] .t-sec { font-size: clamp(1.8rem, 3.4vw, 2.7rem); }
.a10 .t-block { font-size: 2.3rem; }
.a10[dir="rtl"] .t-block { font-size: 1.75rem; }

/* keeps text readable over the hero photo now that its scrim is lighter */
.a10 .text-on-photo { text-shadow: 0 2px 18px rgba(7,14,24,.85), 0 1px 3px rgba(7,14,24,.9); }

.a10 .f-num {
  font-family: 'Barlow Condensed', 'Alexandria', sans-serif;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  line-height: .84;
}

/* ── block geometry: the crest's diagonal split at page scale ── */
.a10 .cut-tr { clip-path: polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 0 100%); }
.a10 .cut-sm { clip-path: polygon(0 0, calc(100% - 13px) 0, 100% 13px, 100% 100%, 0 100%); }
.a10 .crest-cut { clip-path: polygon(0 0, 100% 0, 100% 82%, 50% 100%, 0 82%); }

/* ── surfaces ── */
.a10 .pitch-grid {
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 96px 96px;
}
.a10 .floodlight {
  background:
    radial-gradient(58% 44% at 14% -6%, rgba(41,169,224,.26), transparent 62%),
    radial-gradient(46% 38% at 88% 4%, rgba(255,184,0,.10), transparent 60%);
}

/* ── motion — Scroll Reveal, Standard tier: 400-600ms, power2.out ── */
@keyframes a10-in { from { opacity:0; transform: translateY(28px); } to { opacity:1; transform:none; } }
@keyframes a10-row { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform:none; } }
@keyframes a10-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes a10-ring { 0% { transform: scale(.9); opacity:.55; } 100% { transform: scale(1.65); opacity:0; } }

.a10 .in { animation: a10-in .52s cubic-bezier(.22,1,.36,1) both; }
.a10 .row-in { animation: a10-row .42s cubic-bezier(.22,1,.36,1) both; }
.a10 .ticker { animation: a10-ticker 38s linear infinite; }
.a10 .ring::before {
  content:''; position:absolute; inset:0; border-radius:9999px;
  border: 2px solid var(--primary); animation: a10-ring 2.2s ease-out infinite;
}

/* the recurring panel: solid fill, hairline edge, lifts and brightens on hover.
   Not named .block — that would collide with Tailwind's display utility. */
.a10 .panel {
  background: var(--block-bg);
  border: 1px solid var(--block-line);
  transition: border-color .22s ease, transform .22s ease;
}
.a10 .panel:hover { border-color: var(--block-line-hi); transform: translateY(-4px); }

.a10 ::selection { background: var(--primary); color: var(--on-primary); }
.a10 :focus-visible { outline: 3px solid var(--ring); outline-offset: 3px; }
.a10 .no-bar::-webkit-scrollbar { display: none; }
.a10 .no-bar { scrollbar-width: none; }

@media (prefers-reduced-motion: reduce) {
  .a10 *, .a10 *::before, .a10 *::after {
    animation-duration:.001ms !important; animation-iteration-count:1 !important; transition-duration:.001ms !important;
  }
}
`;

function useInjectedStyles() {
  useEffect(() => {
    if (document.getElementById("a10-styles")) return;
    const el = document.createElement("style");
    el.id = "a10-styles";
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}

/* ══════════════════════════════════════════════════════════════
   4. PRIMITIVES
   ══════════════════════════════════════════════════════════════ */

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || seen) return;
    // Anything already on screen at mount reveals immediately — no waiting on
    // the observer, and nothing stays hidden if IntersectionObserver is missing.
    if (
      typeof IntersectionObserver === "undefined" ||
      node.getBoundingClientRect().top < window.innerHeight
    ) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), {
      threshold,
      rootMargin: "0px 0px -40px 0px",
    });
    io.observe(node);
    return () => io.disconnect();
  }, [seen, threshold]);
  return [ref, seen];
}

/** Stagger stays under 8 children at ~70ms — beyond that the tail feels laggy. */
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, seen] = useReveal();
  return (
    <div
      ref={ref}
      className={`${className} ${seen ? "in" : "opacity-0"}`}
      style={seen ? { animationDelay: `${Math.min(delay, 280)}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/** The crest's three stars — the recurring section marker. */
function Stars({ size = 11, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-[3px] ${className}`} aria-hidden="true">
      <Star size={size - 3} fill="currentColor" strokeWidth={0} className="opacity-60" />
      <Star size={size} fill="currentColor" strokeWidth={0} />
      <Star size={size - 3} fill="currentColor" strokeWidth={0} className="opacity-60" />
    </span>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-3 text-[var(--primary)]">
      <Stars />
      <span className="f-data text-[12px]">{children}</span>
      <span className="h-px w-12 bg-current opacity-40" />
    </div>
  );
}

/** One heading shape everywhere, so the page reads as a single system. */
function Head({ eyebrow, title, lead, invert = false, className = "" }) {
  return (
    <div className={className}>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={70}>
        <h2
          className={`f-display t-sec mt-5 ${
            invert ? "text-[var(--fg-invert)]" : "text-[var(--fg)]"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={140}>
          <p
            className={`mt-5 max-w-[52ch] text-[16px] leading-[1.75] ${
              invert ? "text-[var(--fg-invert-muted)]" : "text-[var(--fg-muted)]"
            }`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Saudi flag */
function FlagSA({ size = 20, className = "" }) {
  const h = Math.round(size * (20 / 30));
  return (
    <img
      src={flagSA}
      width={size}
      height={h}
      alt=""
      role="img"
      aria-hidden="true"
      className={`shrink-0 rounded-[3px] object-cover ${className}`}
    />
  );
}

/** US flag */
function FlagUS({ size = 20, className = "" }) {
  const h = Math.round(size * (20 / 30));
  return (
    <img
      src={flagUS}
      width={size}
      height={h}
      alt=""
      role="img"
      aria-hidden="true"
      className={`shrink-0 rounded-[3px] object-cover ${className}`}
    />
  );
}

function Btn({ as: Tag = "button", variant = "primary", className = "", children, ...rest }) {
  const base =
    "group inline-flex min-h-[48px] items-center justify-center gap-2 px-7 py-3.5 f-data text-[14px] " +
    "transition-[background-color,color,transform,border-color] duration-200 cut-sm";
  const styles = {
    primary:
      "bg-[var(--btn-bg)] text-[var(--btn-fg)] hover:bg-[var(--btn-bg-hover)] hover:-translate-y-0.5",
    accent:
      "bg-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--p-gold-300)] hover:-translate-y-0.5",
    ghost:
      "border border-[var(--line-strong)] text-[var(--fg)] hover:bg-[var(--primary)] hover:text-[var(--on-primary)] hover:-translate-y-0.5",
    invert:
      "bg-[var(--p-navy-900)] text-[var(--fg)] hover:bg-[var(--primary)] hover:text-[var(--on-primary)] hover:-translate-y-0.5",
  };
  return (
    <Tag className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/** The real A10 crest — used wherever the mark reads as an actual logo (nav, footer, cards). */
function Crest({ size = 40 }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-[9px] bg-white p-[3px] shadow-[0_1px_4px_rgba(7,14,24,.35)]"
      style={{ width: size, height: size }}
    >
      <img
        src={logoMark}
        alt="A10 Sport Academy"
        width={size}
        height={size}
        className="h-full w-full rounded-[6px] object-contain"
      />
    </span>
  );
}

/** The shield, drawn in vector — used only as a faint low-opacity watermark on dark panels. */
function CrestGlyph({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size * 1.16}
      viewBox="0 0 100 116"
      role="img"
      aria-label="A10 Sport Academy"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="a10-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5CC8F2" />
          <stop offset="1" stopColor="#29A9E0" />
        </linearGradient>
        <linearGradient id="a10-navy" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14477E" />
          <stop offset="1" stopColor="#112A46" />
        </linearGradient>
      </defs>
      <path d="M6 26 L50 12 L94 26 V70 C94 92 74 104 50 112 C26 104 6 92 6 70 Z" fill="#EEF5FA" />
      <path d="M12 30 L50 18 L88 30 V69 C88 88 70 98 50 105 C30 98 12 88 12 69 Z" fill="url(#a10-navy)" />
      <path d="M12 30 L50 18 V105 C30 98 12 88 12 69 Z" fill="url(#a10-sky)" />
      <g fill="#29A9E0">
        <path d="M50 0l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />
        <path d="M24 5l2.2 4.4 4.9.7-3.6 3.4.9 4.9-4.4-2.3-4.4 2.3.9-4.9-3.6-3.4 4.9-.7z" opacity=".85" />
        <path d="M76 5l2.2 4.4 4.9.7-3.6 3.4.9 4.9-4.4-2.3-4.4 2.3.9-4.9-3.6-3.4 4.9-.7z" opacity=".85" />
      </g>
      <text
        x="50"
        y="77"
        textAnchor="middle"
        fontFamily="Barlow Condensed, Impact, sans-serif"
        fontWeight="700"
        fontSize="40"
        fill="#FFFFFF"
      >
        A10
      </text>
    </svg>
  );
}

/** Score animation — this product category's signature effect. */
function Counter({ to, duration = 1300, className = "" }) {
  const [ref, seen] = useReveal(0.35);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);
  return (
    <span ref={ref} className={className}>
      {n}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   5. BRANCH SWITCHER
   ══════════════════════════════════════════════════════════════ */

function BranchSwitch({ branch, setBranch, tone = "dark" }) {
  const tr = useT();
  const dark = tone === "dark";
  return (
    <div
      role="tablist"
      aria-label={tr(T.branch)}
      className={`inline-flex items-center gap-1 p-1 ${
        dark ? "border border-[var(--line)] bg-[var(--p-navy-900)]" : "bg-[var(--p-chalk-100)]"
      }`}
    >
      {Object.values(BRANCHES).map((b) => {
        const active = b.id === branch;
        return (
          <button
            key={b.id}
            role="tab"
            aria-selected={active}
            onClick={() => setBranch(b.id)}
            className={`f-data flex min-h-[40px] items-center gap-1.5 px-4 text-[13px] transition-colors duration-200 ${
              active
                ? "bg-[var(--primary)] text-[var(--on-primary)]"
                : dark
                ? "text-[var(--fg-faint)] hover:text-[var(--fg)]"
                : "text-[var(--fg-invert-dim)] hover:text-[var(--fg-invert)]"
            }`}
          >
            <MapPin size={14} strokeWidth={2.5} aria-hidden="true" />
            {tr(b.city)}
          </button>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   6. NAV
   ══════════════════════════════════════════════════════════════ */

const NAV_LINKS = [
  { id: "method", label: T.nav.method },
  { id: "programs", label: T.nav.programs },
  { id: "squad", label: T.nav.squad },
  { id: "index", label: T.nav.index },
  { id: "media", label: T.nav.media },
  { id: "contact", label: T.nav.contact },
];

function Nav({ branch, setBranch, onJoin }) {
  const tr = useT();
  const { lang, setLang } = useLang();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        solid ? "border-[var(--line)] bg-[var(--p-ink)]" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1320px] items-center gap-4 px-5 py-3 lg:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="A10 Sport Academy">
          <Crest size={32} />
          <span className="hidden leading-none sm:block">
            <span className="f-display block text-[19px] text-[var(--fg)]">A10</span>
            <span className="f-data block text-[9.5px] text-[var(--primary)]">Sport Academy</span>
          </span>
        </a>

        <nav className="mx-auto hidden items-center lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="relative px-3.5 py-2.5 text-[14.5px] text-[var(--fg-muted)] transition-colors duration-200 hover:text-[var(--fg)]
                         after:absolute after:inset-x-3.5 after:bottom-1.5 after:h-[2px] after:origin-center after:scale-x-0
                         after:bg-[var(--primary)] after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {tr(l.label)}
            </a>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2 lg:ms-0">
          <div className="hidden md:block">
            <BranchSwitch branch={branch} setBranch={setBranch} />
          </div>

          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="f-data flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 border border-[var(--line)] px-3 text-[12px] text-[var(--fg-muted)] transition-colors duration-200 hover:border-[var(--primary)] hover:text-[var(--primary)]"
            aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
          >
            {lang === "ar" ? <FlagUS size={20} /> : <FlagSA size={20} />}
            {lang === "ar" ? "EN" : "ع"}
          </button>

          <Btn onClick={onJoin} className="hidden !px-5 sm:inline-flex">
            {tr(T.join)}
          </Btn>

          <button
            className="grid h-11 w-11 place-items-center border border-[var(--line)] text-[var(--fg)] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={tr({ ar: "القائمة", en: "Menu" })}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-[var(--p-ink)] px-5 pb-6 pt-3 lg:hidden">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="flex min-h-[52px] items-center justify-between border-b border-[var(--line)] text-[16px] text-[var(--fg-muted)]"
            >
              {tr(l.label)}
              <ChevronRight size={16} className="text-[var(--primary)] rtl:rotate-180" aria-hidden="true" />
            </a>
          ))}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <BranchSwitch branch={branch} setBranch={setBranch} />
            <Btn
              onClick={() => {
                setOpen(false);
                onJoin();
              }}
              className="flex-1"
            >
              {tr(T.join)}
            </Btn>
          </div>
        </div>
      )}
    </header>
  );
}

/* ══════════════════════════════════════════════════════════════
   7. HERO — Hero-Centric: full-bleed, one dominant CTA
   ══════════════════════════════════════════════════════════════ */

function Hero({ branch, setBranch, onJoin }) {
  const tr = useT();
  const b = BRANCHES[branch];

  return (
    <section id="top" className="relative flex min-h-[92svh] flex-col overflow-hidden bg-[var(--bg)] pt-[104px]">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={heroHuddle}
          alt=""
          className="h-full w-full object-cover object-center"
          style={{ filter: "saturate(1.1) contrast(1.05) brightness(1.02)" }}
        />
      </div>
      {/* legibility scrim — lighter than before; text below carries its own shadow instead */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,14,24,.28) 0%, rgba(7,14,24,.48) 48%, var(--p-ink) 100%), radial-gradient(120% 90% at 50% 12%, rgba(7,14,24,.05), rgba(7,14,24,.42) 75%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 floodlight mix-blend-screen" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-[1320px] flex-1 content-center gap-12 px-5 pb-16 pt-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-16 lg:px-10 lg:pb-24">
        <div>
          <Reveal>
            <Eyebrow>
              {tr({
                ar: "الرياض · جدة — المملكة العربية السعودية",
                en: "Riyadh · Jeddah — Saudi Arabia",
              })}
            </Eyebrow>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="f-display t-hero text-on-photo mt-6 text-[var(--fg)]">
              <span className="block">{tr({ ar: "لا نُدرّب لاعبين.", en: "We don't train players." })}</span>
              <span className="block text-[var(--primary)]">
                {tr({ ar: "نبني محترفين.", en: "We build professionals." })}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="text-on-photo mt-7 max-w-[48ch] text-[17px] leading-[1.75] text-[var(--fg-muted)]">
              {tr({
                ar: "أكاديمية كرة قدم للأعمار ٥ إلى ١٨ سنة. منهج أوروبي، مدربون برخص UEFA، وتقرير تطوّر مكتوب لولي الأمر كل ست أسابيع.",
                en: "A football academy for ages 5 to 18. A European curriculum, UEFA-licensed coaches, and a written parent progress report every six weeks.",
              })}
            </p>
          </Reveal>

          <Reveal delay={210}>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Btn onClick={onJoin} className="!px-9 !py-4 !text-[15px]">
                {tr(T.trial)}
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </Btn>
              <a
                href="#media"
                className="group flex min-h-[48px] items-center gap-3 text-[var(--fg-muted)] transition-colors duration-200 hover:text-[var(--fg)]"
              >
                <span className="relative grid h-12 w-12 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--primary)] ring">
                  <Play
                    size={14}
                    fill="currentColor"
                    className="ms-0.5 rtl:ms-0 rtl:me-0.5 rtl:-scale-x-100"
                    aria-hidden="true"
                  />
                </span>
                <span className="f-data text-[13px]">
                  {tr({ ar: "شاهد يوماً في الأكاديمية", en: "Watch a day at A10" })}
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* branch card — the branch is the page's live variable, so it leads */}
        <Reveal delay={180}>
          <div
            className="mx-auto w-full max-w-[380px] rounded-[28px] border p-6 backdrop-blur-sm"
            style={{
              borderColor: "var(--p-sky-400)",
              background: "rgba(10,22,40,.82)",
              boxShadow: "0 0 0 1px rgba(79,195,240,.18), 0 25px 60px -20px rgba(79,195,240,.4)",
            }}
          >
            <div className="flex items-center gap-1 rounded-full bg-[var(--p-ink)] p-1">
              {Object.values(BRANCHES).map((bx) => {
                const active = bx.id === branch;
                return (
                  <button
                    key={bx.id}
                    onClick={() => setBranch(bx.id)}
                    aria-pressed={active}
                    className={`f-data flex-1 rounded-full px-4 py-2.5 text-[13px] transition-colors duration-200 ${
                      active
                        ? "bg-[var(--primary)] text-[var(--on-primary)]"
                        : "text-[var(--fg-faint)] hover:text-[var(--fg)]"
                    }`}
                  >
                    {tr(bx.city)}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-center gap-6">
              <div className="flex-1 text-center">
                <div className="f-num text-[2rem] text-[var(--primary)]">
                  <Counter to={b.players} />+
                </div>
                <div className="mt-1 text-[12px] text-[var(--fg-muted)]">
                  {tr({ ar: "لاعب مسجّل", en: "Registered players" })}
                </div>
              </div>
              <div className="h-10 w-px bg-[var(--line)]" aria-hidden="true" />
              <div className="flex-1 text-center">
                <div className="f-num text-[2rem] text-[var(--primary)]">
                  <Counter to={b.pitches} />
                </div>
                <div className="mt-1 text-[12px] text-[var(--fg-muted)]">
                  {tr({ ar: "ملاعب معتمدة", en: "Approved fields" })}
                </div>
              </div>
            </div>

            <a
              href={b.map}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 flex items-center justify-center gap-1.5 text-[13px] text-[var(--primary)] transition-colors duration-200 hover:text-[var(--p-sky-300)]"
            >
              {tr({ ar: "عرض الموقع والاتجاهات", en: "View Location & Directions" })}
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>
      </div>

      {/* value-prop strip */}
      <div className="relative border-y border-[var(--line)] bg-[var(--p-navy-900)] py-3.5">
        <div className="ticker flex w-max gap-12 whitespace-nowrap" aria-hidden="true">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex gap-12">
              {TICKER.map((s) => (
                <span key={s.en} className="f-data flex items-center gap-4 text-[13px] text-[var(--fg-faint)]">
                  {tr(s)}
                  <Star size={9} fill="currentColor" strokeWidth={0} className="text-[var(--primary)]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   8. METHOD — bento blocks
   ══════════════════════════════════════════════════════════════ */

function Method() {
  const tr = useT();
  return (
    <section id="method" className="relative bg-[var(--bg)] py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
        <Head
          eyebrow={tr({ ar: "المنهجية", en: "The method" })}
          title={tr({
            ar: "التدريب بلا قياس مجرّد لعب",
            en: "Training without measurement is just playing",
          })}
          lead={tr({
            ar: "كل حصة لها هدف مكتوب، وكل لاعب له ملف يتتبّع أربعة محاور. هذا ما يفرّق بين نادي الحي والأكاديمية.",
            en: "Every session has a written objective and every player has a file tracking four pillars. That is what separates a neighbourhood club from an academy.",
          })}
          className="max-w-[42rem]"
        />

        <div className="mt-14 grid gap-3 md:grid-cols-6">
          {METHOD.map((m, i) => (
            <Reveal key={m.title.en} delay={i * 70} className={m.wide ? "md:col-span-4" : "md:col-span-2"}>
              <article className="panel group h-full p-7 lg:p-9">
                <div className="flex items-start justify-between gap-6">
                  <m.icon size={26} strokeWidth={1.6} className="text-[var(--primary)]" aria-hidden="true" />
                  <div className="text-end">
                    <div className="f-num text-[2.6rem] text-[var(--fg)] transition-colors duration-200 group-hover:text-[var(--accent)]">
                      {m.stat}
                    </div>
                    <div className="f-data mt-1.5 text-[11px] text-[var(--fg-faint)]">{tr(m.unit)}</div>
                  </div>
                </div>
                <h3 className="mt-8 text-[19px] font-semibold text-[var(--fg)]">{tr(m.title)}</h3>
                <p className="mt-3 max-w-[46ch] text-[14.5px] leading-[1.8] text-[var(--fg-muted)]">
                  {tr(m.body)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   9. PROGRAMS + SCHEDULE BOARD
   ══════════════════════════════════════════════════════════════ */

function Programs({ branch, setBranch, onJoin }) {
  const tr = useT();
  const { rtl } = useLang();
  const [filter, setFilter] = useState("all");
  const b = BRANCHES[branch];
  const shown = useMemo(
    () => (filter === "all" ? PROGRAMS : PROGRAMS.filter((p) => p.id === filter)),
    [filter]
  );

  const chips = [
    { id: "all", label: { ar: "كل الفئات", en: "All ages" }, age: "5–18" },
    ...PROGRAMS.map((p) => ({ id: p.id, label: p.tier, age: p.ageNum })),
  ];

  return (
    <section id="programs" className="relative bg-[var(--bg-invert)] py-24 text-[var(--fg-invert)] lg:py-32">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Head
            invert
            eyebrow={tr({ ar: "البرامج", en: "Programs" })}
            title={tr({ ar: "ثلاث فئات. مسار واحد.", en: "Three age groups. One pathway." })}
            className="max-w-[34rem]"
          />
          <Reveal delay={140} className="shrink-0">
            <BranchSwitch branch={branch} setBranch={setBranch} tone="light" />
          </Reveal>
        </div>

        <Reveal delay={180}>
          <div className="no-bar mt-12 flex gap-2.5 overflow-x-auto pb-2">
            {chips.map((c) => {
              const active = filter === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setFilter(c.id)}
                  aria-pressed={active}
                  className={`flex min-h-[48px] shrink-0 items-center gap-3 rounded-full border px-5 transition-colors duration-200 ${
                    active
                      ? "border-[var(--p-navy-900)] bg-[var(--p-navy-900)] text-[var(--fg)]"
                      : "border-[var(--line-invert)] text-[var(--fg-invert-dim)] hover:border-[var(--p-navy-900)] hover:text-[var(--fg-invert)]"
                  }`}
                >
                  <span className="whitespace-nowrap text-[15px] font-semibold">{tr(c.label)}</span>
                  <span
                    className={`f-data text-[12px] ${active ? "text-[var(--primary)]" : "opacity-50"}`}
                    dir="ltr"
                  >
                    {c.age}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {shown.map((p, i) => {
            const pro = p.id === "pro";
            return (
              <Reveal key={p.id} delay={i * 70}>
                <article
                  className={`group relative flex h-full flex-col p-7 transition-[transform,border-color] duration-200 hover:-translate-y-1.5 lg:p-9 cut-tr ${
                    pro
                      ? "bg-[var(--p-navy-900)] text-[var(--fg)]"
                      : "border border-[var(--line-invert)] bg-[var(--p-white)] hover:border-[var(--p-navy-900)]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`f-num text-[3.2rem] ${
                        pro ? "text-[var(--primary)]" : "text-[var(--fg-invert)] opacity-15"
                      }`}
                    >
                      {p.n}
                    </span>
                    {pro && (
                      <span className="f-data bg-[var(--accent)] px-3 py-1.5 text-[11px] text-[var(--on-accent)]">
                        {tr({ ar: "مسار الكشافة", en: "Scouted" })}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`f-display t-block mt-5 ${
                      pro ? "text-[var(--fg)]" : "text-[var(--fg-invert)]"
                    }`}
                  >
                    {tr(p.tier)}
                  </h3>
                  <div className="f-data mt-2 text-[12.5px] text-[var(--primary)]">{tr(p.age)}</div>
                  <div
                    className={`mt-3 flex items-center gap-2 text-[13px] ${
                      pro ? "text-[var(--fg-faint)]" : "text-[var(--fg-invert-dim)]"
                    }`}
                  >
                    <Clock size={14} className="shrink-0" aria-hidden="true" />
                    {tr(p.sessions)}
                  </div>

                  <p
                    className={`mt-5 text-[14.5px] leading-[1.8] ${
                      pro ? "text-[var(--fg-muted)]" : "text-[var(--fg-invert-muted)]"
                    }`}
                  >
                    {tr(p.line)}
                  </p>

                  <ul
                    className={`mt-7 space-y-3 border-t pt-7 ${
                      pro ? "border-[var(--line)]" : "border-[var(--line-invert)]"
                    }`}
                  >
                    {p.focus.map((f) => (
                      <li
                        key={f.en}
                        className={`flex items-start gap-3 text-[14px] ${
                          pro ? "text-[var(--fg-muted)]" : "text-[var(--fg-invert-muted)]"
                        }`}
                      >
                        <Check
                          size={16}
                          strokeWidth={3}
                          className="mt-0.5 shrink-0 text-[var(--primary)]"
                          aria-hidden="true"
                        />
                        {tr(f)}
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`mt-auto flex items-end justify-between gap-4 border-t pt-7 ${
                      pro ? "border-[var(--line)]" : "border-[var(--line-invert)]"
                    }`}
                  >
                    <div>
                      <div className={`f-num text-[2.6rem] ${pro ? "text-[var(--fg)]" : "text-[var(--fg-invert)]"}`}>
                        {p.price}
                        <span className="f-data ms-2 text-[14px] text-[var(--primary)]">
                          {tr({ ar: "ر.س", en: "SAR" })}
                        </span>
                      </div>
                      <div
                        className={`mt-1.5 text-[12.5px] ${
                          pro ? "text-[var(--fg-faint)]" : "text-[var(--fg-invert-dim)]"
                        }`}
                      >
                        {tr({ ar: "شهرياً · شامل الزي", en: "per month · kit included" })}
                      </div>
                    </div>
                    <Btn onClick={onJoin} variant={pro ? "primary" : "invert"} className="!px-5 !text-[13px]">
                      {tr({ ar: "سجّل", en: "Enrol" })}
                    </Btn>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* schedule board — rows re-run their reveal whenever the branch changes */}
        <div className="mt-16">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="f-display text-[2rem] text-[var(--fg-invert)]">
                {tr({ ar: "جدول التدريب", en: "Training schedule" })}
              </h3>
              <span className="f-data text-[12.5px] text-[var(--fg-invert-dim)]">
                {tr(b.city)} · {tr({ ar: "بتوقيت السعودية", en: "Saudi time" })}
              </span>
            </div>
          </Reveal>

          <div key={branch} className="mt-6 border border-[var(--line-invert)] bg-[var(--p-white)]">
            <div className="hidden grid-cols-[1.3fr_1.4fr_1fr_.9fr] gap-4 border-b border-[var(--line-invert)] bg-[var(--p-chalk-100)] px-6 py-3.5 sm:grid">
              {[
                { ar: "المجموعة", en: "Group" },
                { ar: "الأيام", en: "Days" },
                { ar: "الوقت", en: "Time" },
                { ar: "الملعب", en: "Pitch" },
              ].map((h) => (
                <span key={h.en} className="f-data text-[11.5px] text-[var(--fg-invert-dim)]">
                  {tr(h)}
                </span>
              ))}
            </div>
            {b.schedule.map((s, i) => (
              <div
                key={s.g.en}
                className="row-in grid gap-1.5 border-b border-[var(--line-invert)] px-6 py-4 last:border-0 sm:grid-cols-[1.3fr_1.4fr_1fr_.9fr] sm:items-center sm:gap-4"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="text-[15.5px] font-semibold text-[var(--fg-invert)]">{tr(s.g)}</span>
                <span className="text-[14px] text-[var(--fg-invert-muted)]">{tr(s.d)}</span>
                <span
                  className="f-data text-[14px] text-[var(--fg-invert)]"
                  style={{ textAlign: rtl ? "right" : "left" }}
                  dir="ltr"
                >
                  {s.h}
                </span>
                <span className="text-[13.5px] text-[var(--fg-invert-dim)]">{tr(s.pitch)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   10. STAFF
   ══════════════════════════════════════════════════════════════ */

function Squad({ branch, setBranch }) {
  const tr = useT();
  const b = BRANCHES[branch];

  return (
    <section id="squad" className="relative bg-[var(--bg)] py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Head
            eyebrow={tr({ ar: "الطاقم الفني", en: "Coaching staff" })}
            title={tr({ ar: "من سيقف مع ابنك على الملعب", en: "Who stands on the pitch with your son" })}
            lead={tr({
              ar: "كل مدرب في A10 يحمل رخصة معتمدة ويبقى مع مجموعة واحدة طوال الموسم — بلا تدوير بين المجموعات.",
              en: "Every A10 coach holds a certified licence and stays with one group for the whole season — no rotating between groups.",
            })}
            className="max-w-[42rem]"
          />
          <Reveal delay={140} className="shrink-0">
            <BranchSwitch branch={branch} setBranch={setBranch} />
          </Reveal>
        </div>

        <div key={branch} className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {b.staff.map((c, i) => (
            <article
              key={c.name.en}
              className="row-in panel p-6"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="relative mb-6 h-[132px] overflow-hidden crest-cut bg-[var(--p-navy-900)]">
                <div className="absolute inset-0 pitch-grid opacity-60" aria-hidden="true" />
                <div className="absolute inset-0 grid place-items-center opacity-25" aria-hidden="true">
                  <CrestGlyph size={74} />
                </div>
                <span
                  className="f-num absolute bottom-3 end-4 text-[2.6rem] text-[var(--fg)] opacity-15"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="f-data absolute start-3 top-3 bg-[var(--accent)] px-2.5 py-1 text-[10.5px] text-[var(--on-accent)]">
                  {c.badge}
                </span>
              </div>
              <h3 className="text-[16.5px] font-semibold text-[var(--fg)]">{tr(c.name)}</h3>
              <div className="f-data mt-1.5 text-[11.5px] text-[var(--primary)]">{tr(c.role)}</div>
              <p className="mt-3 text-[13.5px] leading-[1.7] text-[var(--fg-muted)]">{tr(c.note)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   11. PLAYER OF THE MONTH — the signature block
   ══════════════════════════════════════════════════════════════ */

/** The full card graphic, framed to fit — falls back to the crest watermark
    while the file is missing, so the row never renders broken. */
function PlayerCardImage({ src, alt }) {
  const [ok, setOk] = useState(true);
  return (
    <div className="relative aspect-[2/3] w-full overflow-hidden">
      {ok ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setOk(false)}
          className="relative h-full w-full object-contain object-center drop-shadow-[0_6px_18px_rgba(7,14,24,.5)] transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center opacity-[.16]" aria-hidden="true">
          <CrestGlyph size={64} />
        </div>
      )}
    </div>
  );
}

function PlayerOfMonth() {
  const tr = useT();

  return (
    <section id="index" className="relative overflow-hidden bg-[var(--p-navy-800)] py-24 lg:py-32">
      <div className="absolute inset-0 opacity-60" aria-hidden="true">
        <ShaderBackground className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-[var(--p-navy-800)]/55" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <Head
            eyebrow={tr({ ar: "لوحة الشرف", en: "Hall of fame" })}
            title={tr({ ar: "لاعب الشهر", en: "Players of the month" })}
            lead={tr({
              ar: "في نهاية كل شهر يختار الطاقم الفني لاعباً من كل فئة يستحق البطاقة — لا بالمهارة وحدها، بل بالالتزام والانضباط والتطوّر داخل الملعب وخارجه.",
              en: "At the end of every month the coaching staff pick one player per age group who earns the card — not on skill alone, but on commitment, discipline and growth on and off the pitch.",
            })}
            className="max-w-[46rem]"
          />
          <Reveal delay={140} className="shrink-0">
            <span className="f-data rounded-full bg-[var(--accent)] px-3 py-1.5 text-[12.5px] text-[var(--on-accent)]">
              {tr(PLAYERS_OF_MONTH_LABEL)}
            </span>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1120px] gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {PLAYERS_OF_MONTH.map((pl, i) => (
            <Reveal key={pl.id} delay={i * 90} className="h-full">
              <article
                className="group h-full overflow-hidden crest-cut p-[1.5px] transition-transform duration-300 hover:-translate-y-2"
                style={{
                  background:
                    i === 0
                      ? "linear-gradient(160deg, var(--p-gold-300), var(--accent) 35%, var(--p-navy-700) 75%, var(--p-navy-800))"
                      : "linear-gradient(160deg, var(--p-sky-300), var(--primary) 30%, var(--p-navy-700) 70%, var(--p-navy-800))",
                }}
              >
                <div className="relative flex h-full flex-col crest-cut bg-[var(--p-navy-900)] pb-4 pt-1">
                  <div className="absolute inset-0 pitch-grid opacity-40" aria-hidden="true" />

                  <div className="relative flex items-center justify-between px-4 pt-4">
                    <Stars size={11} className={i === 0 ? "text-[var(--accent)]" : "text-[var(--primary)]"} />
                    {i === 0 ? (
                      <span className="f-data bg-[var(--accent)] px-2 py-[3px] text-[9.5px] text-[var(--on-accent)]">
                        {tr({ ar: "الأحدث", en: "Latest" })}
                      </span>
                    ) : (
                      <Trophy size={14} strokeWidth={1.8} className="text-[var(--fg-faint)]" aria-hidden="true" />
                    )}
                  </div>

                  <div className="relative mt-3 px-4">
                    <PlayerCardImage src={pl.photo} alt={tr(pl.name)} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 text-center text-[13px] text-[var(--fg-faint)]">
            {tr({
              ar: "تُعلن بطاقات لاعبي الشهر على حسابنا في إنستقرام مع لقطات من أدائهم.",
              en: "Each month's cards are announced on our Instagram with clips of their performance.",
            })}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   12. SCOUTING + PROOF
   ══════════════════════════════════════════════════════════════ */

function Scouting({ onJoin }) {
  const tr = useT();
  return (
    <section className="relative overflow-hidden bg-[var(--bg)] py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
        <Head
          eyebrow={tr({ ar: "الاستكشاف والاحتراف", en: "Scouting & pathway" })}
          title={tr({ ar: "الطريق من ملعبنا إلى ناديك", en: "From our pitch to a pro club" })}
          lead={tr({
            ar: "ننظّم أيام معاينة مفتوحة يحضرها كشافون من أندية دوري روشن ودرجة الأولى، ونرسل ملف كل لاعب من مسار الاحتراف مع مقاطع أدائه إلى الأندية المهتمة.",
            en: "We run open showcase days attended by Roshn League and First Division scouts, and send every Pro Pathway player's file and match clips to interested clubs.",
          })}
          className="max-w-[46rem]"
        />

        <div className="mt-14 grid gap-3 sm:grid-cols-3">
          {SCOUT_STATS.map((s, i) => (
            <Reveal key={s.l.en} delay={i * 70}>
              <div className="panel h-full p-8">
                <div className="f-num text-[4.2rem] text-[var(--accent)]">
                  <Counter to={s.n} />
                </div>
                <div className="mt-3 text-[14.5px] leading-snug text-[var(--fg-muted)]">{tr(s.l)}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {VOICES.map((v, i) => (
            <Reveal key={v.by.en} delay={i * 70}>
              <figure className="panel h-full p-8">
                <Stars size={13} className="text-[var(--accent)]" />
                <blockquote className="mt-5 text-[16px] leading-[1.8] text-[var(--fg)]">
                  {tr(v.quote)}
                </blockquote>
                <figcaption className="mt-6 border-t border-[var(--line)] pt-5">
                  <span className="block text-[14.5px] font-semibold text-[var(--fg)]">{tr(v.by)}</span>
                  <span className="f-data mt-1 block text-[11.5px] text-[var(--fg-faint)]">{tr(v.role)}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Btn variant="accent" onClick={onJoin} className="!px-8 !py-4 !text-[15px]">
              {tr({ ar: "قدّم لمسار الاحتراف", en: "Apply to Pro Pathway" })}
            </Btn>
            <a
              href="#contact"
              className="f-data inline-flex min-h-[48px] items-center gap-2 text-[13px] text-[var(--primary)] transition-colors duration-200 hover:text-[var(--fg)]"
            >
              {tr({ ar: "مواعيد المعاينات", en: "Showcase dates" })}
              <ChevronRight size={16} className="rtl:rotate-180" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   13. MEDIA + SOCIAL
   ══════════════════════════════════════════════════════════════ */

function Media() {
  const tr = useT();
  const { lang } = useLang();
  const railRef = useRef(null);
  const [playing, setPlaying] = useState(null);

  const scrollBy = (dir) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: 340 * (lang === "ar" ? -dir : dir), behavior: "smooth" });
  };

  return (
    <section id="media" className="relative overflow-hidden bg-[var(--p-navy-900)] py-24 lg:py-32">
      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Head
            eyebrow={tr({ ar: "من داخل الأكاديمية", en: "Inside the academy" })}
            title={tr({ ar: "شاهد الحصص كما هي", en: "See the sessions as they are" })}
            className="max-w-[32rem]"
          />
          <Reveal delay={140}>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => scrollBy(-1)}
                aria-label={tr({ ar: "السابق", en: "Previous" })}
                className="grid h-12 w-12 place-items-center border border-[var(--line)] text-[var(--fg-muted)] transition-colors duration-200 hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                <ChevronRight size={18} className="rotate-180 rtl:rotate-0" aria-hidden="true" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label={tr({ ar: "التالي", en: "Next" })}
                className="grid h-12 w-12 place-items-center border border-[var(--line)] text-[var(--fg-muted)] transition-colors duration-200 hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                <ChevronRight size={18} className="rtl:rotate-180" aria-hidden="true" />
              </button>
            </div>
          </Reveal>
        </div>

        <div ref={railRef} className="no-bar mt-12 flex snap-x snap-mandatory items-start gap-3 overflow-x-auto pb-4">
          {REELS.map((r, i) => {
            const isPlaying = playing === i;
            return (
              <article
                key={r.href}
                className="group relative aspect-[9/16] w-[240px] shrink-0 snap-start overflow-hidden cut-tr bg-[var(--p-ink)] sm:w-[268px]"
                style={
                  isPlaying
                    ? undefined
                    : { backgroundImage: `url(${r.poster})`, backgroundSize: "cover", backgroundPosition: "center" }
                }
              >
                {isPlaying ? (
                  <>
                    <video
                      src={r.video}
                      poster={r.poster}
                      className="h-full w-full object-cover"
                      controls
                      autoPlay
                      playsInline
                      preload="metadata"
                    />
                    <button
                      onClick={() => setPlaying(null)}
                      aria-label={tr({ ar: "إغلاق الفيديو", en: "Close video" })}
                      className="absolute end-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-[var(--p-ink)]/80 text-[var(--fg)] backdrop-blur transition-colors duration-200 hover:bg-[var(--primary)] hover:text-[var(--on-primary)]"
                    >
                      <X size={16} aria-hidden="true" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 pitch-grid opacity-60" aria-hidden="true" />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, var(--p-ink), transparent 62%)" }}
                      aria-hidden="true"
                    />
                    <span className="f-data absolute start-4 top-4 bg-[var(--p-ink)] px-2.5 py-1 text-[10.5px] text-[var(--primary)]">
                      {tr(r.tag)}
                    </span>
                    <button
                      onClick={() => setPlaying(i)}
                      aria-label={tr({ ar: "شغّل الفيديو", en: "Play video" })}
                      className="absolute inset-0 grid place-items-center"
                    >
                      <span className="grid h-14 w-14 place-items-center rounded-full border border-[var(--line-strong)] bg-[var(--p-ink)] transition-[background-color,transform] duration-200 group-hover:scale-110 group-hover:bg-[var(--primary)]">
                        <Play
                          size={17}
                          fill="currentColor"
                          className="ms-0.5 text-[var(--fg)] group-hover:text-[var(--on-primary)] rtl:ms-0 rtl:me-0.5 rtl:-scale-x-100"
                        />
                      </span>
                    </button>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
                      <h3 className="text-[14.5px] font-semibold leading-snug text-[var(--fg)]">{tr(r.title)}</h3>
                      <div
                        className="f-data is-plain mt-1.5 text-[11.5px] text-[var(--fg-faint)]"
                        dir="ltr"
                      >
                        @akdamya10
                      </div>
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="panel group flex min-h-[76px] items-center gap-4 rounded-[10px] px-5 py-4"
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-[var(--p-navy-900)]"
                  style={{ color: s.color }}
                >
                  <s.icon size={19} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="f-data block text-[10.5px] text-[var(--fg-faint)]">{s.name}</span>
                  <span className="block truncate text-[14px] font-semibold text-[var(--fg)]" dir="ltr">
                    {s.handle}
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="ms-auto shrink-0 text-[var(--fg-faint)] transition-colors duration-200 group-hover:text-[var(--primary)] rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   14. CONTACT
   ══════════════════════════════════════════════════════════════ */

function Contact({ branch, setBranch, onJoin }) {
  const tr = useT();
  const b = BRANCHES[branch];

  return (
    <section id="contact" className="relative bg-[var(--bg-invert)] py-24 text-[var(--fg-invert)] lg:py-32">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Head
            invert
            eyebrow={tr({ ar: "الفروع", en: "Our branches" })}
            title={tr({ ar: "زرنا في الرياض أو جدة", en: "Visit us in Riyadh or Jeddah" })}
            className="max-w-[34rem]"
          />
          <Reveal delay={140} className="shrink-0">
            <BranchSwitch branch={branch} setBranch={setBranch} tone="light" />
          </Reveal>
        </div>

        <div className="mt-12 grid gap-3 lg:grid-cols-[1.2fr_.8fr]">
          <Reveal>
            <div className="h-[400px] overflow-hidden border border-[var(--line-invert)] lg:h-full lg:min-h-[460px]">
              <iframe
                key={b.id}
                title={`A10 ${b.city.en}`}
                src={b.map}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col bg-[var(--p-navy-900)] p-8 text-[var(--fg)] lg:p-10">
              <div className="f-display text-[2.6rem]">{tr(b.city)}</div>
              <div className="f-data mt-2 text-[11.5px] text-[var(--primary)]">{tr(b.pitch)}</div>

              <ul className="mt-8 space-y-4 text-[14.5px] text-[var(--fg-muted)]">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                  <span>{tr(b.district)}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                  <a
                    href={`tel:${b.phone.replace(/\s/g, "")}`}
                    className="f-data transition-colors duration-200 hover:text-[var(--fg)]"
                    dir="ltr"
                  >
                    {b.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                  <a
                    href="mailto:info@academya10.com"
                    className="f-data is-plain transition-colors duration-200 hover:text-[var(--fg)]"
                    dir="ltr"
                  >
                    info@academya10.com
                  </a>
                </li>
              </ul>

              <div className="mt-8 grid grid-cols-2 gap-4 border-y border-[var(--line)] py-6">
                <div>
                  <div className="f-num text-[2.2rem] text-[var(--accent)]">{b.pitches}</div>
                  <div className="mt-2 text-[13px] text-[var(--fg-muted)]">
                    {tr({ ar: "ملاعب معتمدة", en: "certified pitches" })}
                  </div>
                </div>
                <div>
                  <div className="f-num text-[2.2rem] text-[var(--primary)]">{b.players}</div>
                  <div className="mt-2 text-[13px] text-[var(--fg-muted)]">
                    {tr({ ar: "لاعب مسجّل", en: "registered players" })}
                  </div>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                <Btn onClick={onJoin} className="flex-1">
                  {tr(T.trial)}
                </Btn>
                <a
                  href={`https://wa.me/${b.whatsapp}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="grid h-[48px] w-[48px] shrink-0 place-items-center bg-[var(--whatsapp)] text-[var(--p-white)] transition-transform duration-200 hover:-translate-y-0.5"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={20} aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   15. FOOTER
   ══════════════════════════════════════════════════════════════ */

function Footer() {
  const tr = useT();
  return (
    <footer className="relative overflow-hidden bg-[var(--bg)] pt-20">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
        <div className="grid gap-12 pb-14 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Crest size={46} />
              <div>
                <div className="f-display text-[22px] text-[var(--fg)]">A10 Sport Academy</div>
                <div className="f-data text-[10.5px] text-[var(--primary)]">Riyadh · Jeddah</div>
              </div>
            </div>
            <p className="mt-6 max-w-[38ch] text-[14.5px] leading-[1.8] text-[var(--fg-muted)]">
              {tr({
                ar: "أكاديمية كرة قدم سعودية للأعمار ٥ إلى ١٨ سنة. نبني اللاعب تقنياً وتكتيكياً وبدنياً وذهنياً.",
                en: "A Saudi football academy for ages 5 to 18, building players technically, tactically, physically and mentally.",
              })}
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.name}
                  className="grid h-12 w-12 place-items-center border border-[var(--line)] text-[var(--fg-muted)] transition-[background-color,color,transform] duration-200 hover:-translate-y-1 hover:bg-[var(--primary)] hover:text-[var(--on-primary)]"
                >
                  <s.icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label={tr({ ar: "تنقّل", en: "Navigate" })}>
            <h3 className="f-data text-[11.5px] text-[var(--primary)]">{tr({ ar: "تنقّل", en: "Navigate" })}</h3>
            <ul className="mt-6 space-y-3.5">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="text-[14.5px] text-[var(--fg-muted)] transition-colors duration-200 hover:text-[var(--primary)]"
                  >
                    {tr(l.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="f-data text-[11.5px] text-[var(--primary)]">{tr({ ar: "الفروع", en: "Branches" })}</h3>
            <ul className="mt-6 space-y-6">
              {Object.values(BRANCHES).map((b) => (
                <li key={b.id}>
                  <div className="text-[15px] font-semibold text-[var(--fg)]">{tr(b.city)}</div>
                  <div className="mt-1 text-[13.5px] leading-relaxed text-[var(--fg-faint)]">
                    {tr(b.district)}
                  </div>
                  <a
                    href={`tel:${b.phone.replace(/\s/g, "")}`}
                    className="f-data mt-1.5 inline-block text-[13.5px] text-[var(--fg-muted)] transition-colors duration-200 hover:text-[var(--primary)]"
                    dir="ltr"
                  >
                    {b.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--line)] py-7 sm:flex-row">
          <p className="f-data text-[11.5px] text-[var(--fg-faint)]">
            © {new Date().getFullYear()} A10 Sport Academy ·{" "}
            {tr({ ar: "جميع الحقوق محفوظة", en: "All rights reserved" })}
          </p>
          <Stars size={12} className="text-[var(--primary)]" />
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════
   16. TRIAL BOOKING — 3-step modal
   ══════════════════════════════════════════════════════════════ */

const EMPTY_FORM = {
  player: "",
  age: "",
  guardian: "",
  phone: "",
  branch: "riyadh",
  program: "junior",
  notes: "",
};

function TrialModal({ open, onClose, branch }) {
  const tr = useT();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ ...EMPTY_FORM, branch });
  const [touched, setTouched] = useState({});
  const [done, setDone] = useState(false);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setDone(false);
    setTouched({});
    setForm((f) => ({ ...f, branch }));
    document.body.style.overflow = "hidden";
    const id = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      clearTimeout(id);
      document.body.style.overflow = "";
    };
  }, [open, branch]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));
  const b = BRANCHES[form.branch];
  const prog = PROGRAMS.find((x) => x.id === form.program);
  const slot = b.schedule.find((s) => s.g.en === prog.tier.en);

  const errors = {
    player: form.player.trim().length > 1 ? "" : tr({ ar: "اكتب اسم اللاعب.", en: "Enter the player's name." }),
    age:
      Number(form.age) >= 5 && Number(form.age) <= 18
        ? ""
        : tr({ ar: "العمر بين ٥ و ١٨ سنة.", en: "Age must be between 5 and 18." }),
    guardian: form.guardian.trim().length > 1 ? "" : tr({ ar: "اكتب اسم ولي الأمر.", en: "Enter the guardian's name." }),
    phone:
      form.phone.replace(/\D/g, "").length >= 9
        ? ""
        : tr({ ar: "رقم جوال غير مكتمل.", en: "Mobile number is incomplete." }),
  };
  const stepFields = [["player", "age"], [], ["guardian", "phone"]][step];
  const valid = stepFields.every((f) => !errors[f]);

  const fieldBase =
    "w-full min-h-[52px] border bg-[var(--p-navy-900)] px-4 py-3.5 text-[15px] text-[var(--fg)] " +
    "placeholder:text-[var(--fg-faint)] transition-colors duration-200 focus:border-[var(--primary)] focus:outline-none";
  const labelCls = "f-data mb-2 block text-[11.5px] text-[var(--fg-muted)]";

  /** Visible label, inline error next to the field, helper text below. */
  const renderField = ({ id, k, type = "text", dir, label, placeholder, hint }) => {
    const bad = Boolean(touched[k] && errors[k]);
    return (
      <div>
        <label className={labelCls} htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          ref={k === "player" ? firstFieldRef : undefined}
          type={type}
          dir={dir}
          className={`${fieldBase} ${bad ? "border-[var(--accent)]" : "border-[var(--line)]"}`}
          value={form[k]}
          onChange={set(k)}
          onBlur={blur(k)}
          placeholder={placeholder}
          aria-invalid={bad}
          aria-describedby={bad ? `${id}-err` : hint ? `${id}-hint` : undefined}
        />
        {bad ? (
          <p id={`${id}-err`} className="mt-2 text-[13px] text-[var(--accent)]">
            {errors[k]}
          </p>
        ) : hint ? (
          <p id={`${id}-hint`} className="mt-2 text-[13px] text-[var(--fg-faint)]">
            {hint}
          </p>
        ) : null}
      </div>
    );
  };

  const steps = [
    { ar: "اللاعب", en: "Player" },
    { ar: "البرنامج", en: "Program" },
    { ar: "التأكيد", en: "Confirm" },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[var(--scrim)] p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={tr(T.trial)}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative max-h-[94svh] w-full max-w-[580px] overflow-y-auto border border-[var(--line-strong)] bg-[var(--p-navy-800)]">
        <div
          className="relative px-7 pb-7 pt-8"
          style={{ background: "linear-gradient(145deg, var(--p-navy-700), var(--p-navy-800))" }}
        >
          <button
            onClick={onClose}
            aria-label={tr({ ar: "إغلاق", en: "Close" })}
            className="absolute end-5 top-5 grid h-11 w-11 place-items-center border border-[var(--line)] text-[var(--fg-muted)] transition-colors duration-200 hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            <X size={17} />
          </button>

          <Stars size={12} className="text-[var(--primary)]" />
          <h2 className="f-display mt-3 text-[2.2rem] text-[var(--fg)]">
            {done ? tr({ ar: "تم الحجز", en: "Trial booked" }) : tr(T.trial)}
          </h2>
          <p className="mt-2 text-[14px] text-[var(--fg-muted)]">
            {done
              ? tr({
                  ar: "سنتواصل معك خلال ٢٤ ساعة لتأكيد الموعد.",
                  en: "We'll call you within 24 hours to confirm the slot.",
                })
              : tr({ ar: "ثلاث خطوات · بدون رسوم", en: "Three steps · no charge" })}
          </p>

          {!done && (
            <ol className="mt-7 flex items-center gap-2">
              {steps.map((s, i) => (
                <li key={s.en} className="flex flex-1 items-center gap-2">
                  <span
                    className={`f-data grid h-8 w-8 shrink-0 place-items-center text-[13px] transition-colors duration-200 ${
                      i < step
                        ? "bg-[var(--primary)] text-[var(--on-primary)]"
                        : i === step
                        ? "bg-[var(--fg)] text-[var(--fg-invert)]"
                        : "border border-[var(--line)] text-[var(--fg-faint)]"
                    }`}
                    aria-current={i === step ? "step" : undefined}
                  >
                    {i < step ? <Check size={14} strokeWidth={3} /> : i + 1}
                  </span>
                  <span
                    className={`f-data hidden text-[11.5px] sm:block ${
                      i === step ? "text-[var(--fg)]" : "text-[var(--fg-faint)]"
                    }`}
                  >
                    {tr(s)}
                  </span>
                  {i < steps.length - 1 && <span className="h-px flex-1 bg-[var(--line)]" />}
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="p-7">
          {done ? (
            <div className="space-y-5">
              <div className="border border-[var(--line)] bg-[var(--p-navy-900)] p-6">
                <div className="f-data text-[11px] text-[var(--primary)]">
                  {tr({ ar: "ملخّص الحجز", en: "Booking summary" })}
                </div>
                <dl className="mt-5 space-y-3 text-[15px] text-[var(--fg)]">
                  {[
                    [tr({ ar: "اللاعب", en: "Player" }), `${form.player} · ${form.age}`],
                    [tr({ ar: "البرنامج", en: "Program" }), tr(prog.tier)],
                    [tr(T.branch), tr(b.city)],
                    [tr({ ar: "الموعد", en: "Slot" }), `${tr(slot.d)} · ${slot.h}`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-[var(--fg-faint)]">{k}</dt>
                      <dd className="text-end">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="flex gap-3">
                <a
                  href={`https://wa.me/${b.whatsapp}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="f-data flex min-h-[48px] flex-1 items-center justify-center gap-2 bg-[var(--whatsapp)] px-5 text-[13px] text-[var(--p-white)]"
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  {tr({ ar: "أرسل عبر واتساب", en: "Send on WhatsApp" })}
                </a>
                <Btn variant="ghost" onClick={onClose}>
                  {tr({ ar: "إغلاق", en: "Close" })}
                </Btn>
              </div>
            </div>
          ) : (
            <>
              {step === 0 && (
                <div className="space-y-6">
                  {renderField({
                    id: "a10-player",
                    k: "player",
                    label: tr({ ar: "اسم اللاعب", en: "Player name" }),
                    placeholder: tr({ ar: "مثال: فيصل العتيبي", en: "e.g. Faisal Al-Otaibi" }),
                  })}
                  {renderField({
                    id: "a10-age",
                    k: "age",
                    type: "number",
                    dir: "ltr",
                    label: tr({ ar: "العمر", en: "Age" }),
                    placeholder: "11",
                    hint: tr({ ar: "نقبل من ٥ إلى ١٨ سنة.", en: "We accept ages 5 to 18." }),
                  })}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-7">
                  <div>
                    <span className={labelCls}>{tr(T.branch)}</span>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.values(BRANCHES).map((x) => (
                        <button
                          key={x.id}
                          onClick={() => setForm((f) => ({ ...f, branch: x.id }))}
                          aria-pressed={form.branch === x.id}
                          className={`flex min-h-[52px] items-center gap-2 border px-4 text-[15px] transition-colors duration-200 ${
                            form.branch === x.id
                              ? "border-[var(--primary)] bg-[var(--p-navy-900)] text-[var(--fg)]"
                              : "border-[var(--line)] text-[var(--fg-muted)] hover:border-[var(--primary)]"
                          }`}
                        >
                          <MapPin size={16} className="text-[var(--primary)]" aria-hidden="true" />
                          {tr(x.city)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className={labelCls}>{tr({ ar: "البرنامج", en: "Program" })}</span>
                    <div className="space-y-3">
                      {PROGRAMS.map((x) => (
                        <button
                          key={x.id}
                          onClick={() => setForm((f) => ({ ...f, program: x.id }))}
                          aria-pressed={form.program === x.id}
                          className={`flex min-h-[52px] w-full items-center justify-between gap-3 border px-4 transition-colors duration-200 ${
                            form.program === x.id
                              ? "border-[var(--primary)] bg-[var(--p-navy-900)]"
                              : "border-[var(--line)] hover:border-[var(--primary)]"
                          }`}
                        >
                          <span className="text-[15px] text-[var(--fg)]">{tr(x.tier)}</span>
                          <span className="f-data text-[12px] text-[var(--fg-faint)]" dir="ltr">
                            {x.ageNum} yrs
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {slot && (
                    <p className="border-s-[3px] border-[var(--primary)] bg-[var(--p-navy-900)] px-4 py-3 text-[13.5px] text-[var(--fg-muted)]">
                      {tr({ ar: "الموعد المتاح:", en: "Available slot:" })}{" "}
                      <span className="text-[var(--fg)]">
                        {tr(slot.d)} · <span dir="ltr">{slot.h}</span>
                      </span>
                    </p>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  {renderField({
                    id: "a10-guardian",
                    k: "guardian",
                    label: tr({ ar: "اسم ولي الأمر", en: "Guardian name" }),
                    placeholder: tr({ ar: "مثال: أحمد العتيبي", en: "e.g. Ahmed Al-Otaibi" }),
                  })}
                  {renderField({
                    id: "a10-phone",
                    k: "phone",
                    type: "tel",
                    dir: "ltr",
                    label: tr({ ar: "رقم الجوال", en: "Mobile number" }),
                    placeholder: "05X XXX XXXX",
                    hint: tr({ ar: "سنتصل بك على هذا الرقم فقط.", en: "We'll only call you on this number." }),
                  })}
                  <div>
                    <label className={labelCls} htmlFor="a10-notes">
                      {tr({ ar: "ملاحظات (اختياري)", en: "Notes (optional)" })}
                    </label>
                    <textarea
                      id="a10-notes"
                      rows={3}
                      className={`${fieldBase} resize-none border-[var(--line)]`}
                      value={form.notes}
                      onChange={set("notes")}
                      placeholder={tr({
                        ar: "إصابات سابقة، خبرة اللعب، مركز مفضّل…",
                        en: "Past injuries, playing experience, preferred position…",
                      })}
                    />
                  </div>
                </div>
              )}

              <div className="mt-9 flex items-center gap-3">
                {step > 0 && (
                  <Btn variant="ghost" onClick={() => setStep((s) => s - 1)} className="!px-6">
                    {tr({ ar: "رجوع", en: "Back" })}
                  </Btn>
                )}
                <Btn
                  onClick={() => {
                    if (!valid) {
                      setTouched((t) => ({
                        ...t,
                        ...Object.fromEntries(stepFields.map((f) => [f, true])),
                      }));
                      return;
                    }
                    if (step === 2) setDone(true);
                    else setStep((s) => s + 1);
                  }}
                  aria-disabled={!valid}
                  className={`flex-1 ${valid ? "" : "!bg-[var(--p-navy-700)] !text-[var(--fg-faint)]"}`}
                >
                  {step === 2 ? tr({ ar: "تأكيد الحجز", en: "Confirm booking" }) : tr({ ar: "التالي", en: "Next" })}
                  <ChevronRight size={17} className="rtl:rotate-180" aria-hidden="true" />
                </Btn>
              </div>
              <p className="mt-5 text-center text-[12.5px] text-[var(--fg-faint)]">
                {tr({
                  ar: "الحصة التجريبية مجانية ولا تلزمك بالتسجيل.",
                  en: "The trial session is free and commits you to nothing.",
                })}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   17. FLOATING ACTIONS
   ══════════════════════════════════════════════════════════════ */

function FloatingRail({ branch, onJoin }) {
  const tr = useT();
  const [show, setShow] = useState(false);
  const b = BRANCHES[branch];

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed bottom-6 end-5 z-40 hidden transition-[opacity,transform] duration-300 sm:block ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <a
          href={`https://wa.me/${b.whatsapp}`}
          target="_blank"
          rel="noreferrer noopener"
          className="f-data flex min-h-[52px] items-center gap-2.5 bg-[var(--whatsapp)] px-6 text-[13px] text-[var(--p-white)] transition-transform duration-200 hover:-translate-y-1"
        >
          <MessageCircle size={19} aria-hidden="true" />
          {tr({ ar: "واتساب", en: "WhatsApp" })}
        </a>
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-[var(--line)] bg-[var(--p-ink)] p-3 transition-transform duration-300 sm:hidden ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <a
          href={`https://wa.me/${b.whatsapp}`}
          target="_blank"
          rel="noreferrer noopener"
          className="grid min-h-[48px] w-[52px] shrink-0 place-items-center bg-[var(--whatsapp)] text-[var(--p-white)]"
          aria-label="WhatsApp"
        >
          <MessageCircle size={20} aria-hidden="true" />
        </a>
        <Btn onClick={onJoin} className="flex-1">
          {tr(T.trial)}
        </Btn>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   18. PAGE
   ══════════════════════════════════════════════════════════════ */

export default function A10Academy() {
  useInjectedStyles();
  const [lang, setLang] = useState("ar");
  const [branch, setBranch] = useState("riyadh");
  const [modal, setModal] = useState(false);
  const rtl = lang === "ar";
  const ctx = useMemo(() => ({ lang, setLang, rtl }), [lang, rtl]);
  const openModal = useCallback(() => setModal(true), []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [lang, rtl]);

  return (
    <LangCtx.Provider value={ctx}>
      <div dir={rtl ? "rtl" : "ltr"} className="a10 min-h-screen antialiased">
        <a
          href="#method"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[110] focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-[var(--on-primary)]"
        >
          {rtl ? "تخطَّ إلى المحتوى" : "Skip to content"}
        </a>

        <Nav branch={branch} setBranch={setBranch} onJoin={openModal} />
        <main>
          <Hero branch={branch} setBranch={setBranch} onJoin={openModal} />
          <Method />
          <Programs branch={branch} setBranch={setBranch} onJoin={openModal} />
          <Squad branch={branch} setBranch={setBranch} />
          <PlayerOfMonth />
          <Scouting onJoin={openModal} />
          <Media />
          <Contact branch={branch} setBranch={setBranch} onJoin={openModal} />
        </main>
        <Footer />
        <FloatingRail branch={branch} onJoin={openModal} />
        <TrialModal open={modal} onClose={() => setModal(false)} branch={branch} />
      </div>
    </LangCtx.Provider>
  );
}
