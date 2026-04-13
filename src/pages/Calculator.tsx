import { useState, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";

// ─── типы ─────────────────────────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  category: string;
  industries: string[];
  material: string;
  tempMin: number;
  tempMax: number;
  pressureMax: number;
  image: string;
  badge?: string;
  badgeColor?: string;
  score?: number;
  reasons?: string[];
}

interface DrawingFile {
  id: string;
  name: string;
  size: number;
  type: string;
  preview?: string;
}

interface FormState {
  industry: string;
  medium: string;
  tempMin: string;
  tempMax: string;
  pressure: string;
  diameter: string;
  crossSection: string;
  sealType: string;
  qty: string;
  comment: string;
  contactName: string;
  contactCompany: string;
  contactPhone: string;
  contactEmail: string;
}

// ─── справочники ───────────────────────────────────────────────────────────────
const industries = [
  { id: "hydraulics", label: "Гидравлика" },
  { id: "pneumatics", label: "Пневматика" },
  { id: "oil-gas", label: "Нефть и газ" },
  { id: "food", label: "Пищевая промышленность" },
  { id: "auto", label: "Автомобилестроение" },
  { id: "chem", label: "Химическая промышленность" },
  { id: "med", label: "Медицина" },
  { id: "mining", label: "Горнодобывающая" },
];

const mediums = [
  "Минеральное масло", "Синтетическое масло", "Вода / водные растворы",
  "Пар", "Воздух / газ", "Кислоты / щёлочи", "Пищевые среды", "Другое",
];

const sealTypes = [
  { id: "o-rings", label: "O-кольцо" },
  { id: "cuffs", label: "Манжета / сальник" },
  { id: "gaskets", label: "Плоская прокладка" },
  { id: "v-rings", label: "V-образное кольцо" },
  { id: "backup", label: "Кольцо Backup" },
  { id: "custom", label: "Нестандартное" },
  { id: "auto", label: "Подобрать автоматически" },
];

const materialColors: Record<string, { bg: string; text: string }> = {
  NBR:   { bg: "#f0faf4", text: "#1a7a4a" },
  FKM:   { bg: "#f5f0ff", text: "#7c3aed" },
  PU:    { bg: "#fffbf0", text: "#b45309" },
  VMQ:   { bg: "#f0f8ff", text: "#0369a1" },
  PTFE:  { bg: "#f0fdfb", text: "#0f766e" },
  EPDM:  { bg: "#fff5f5", text: "#b91c1c" },
  Любой: { bg: "#f5f5f5", text: "#555555" },
};

// ─── база продуктов (расширена числовыми диапазонами) ─────────────────────────
const products: Product[] = [
  { id: 1, name: "O-кольцо NBR стандартное", category: "o-rings", industries: ["hydraulics","pneumatics","auto"], material: "NBR", tempMin: -40, tempMax: 120, pressureMax: 40, image: "https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg", badge: "Хит", badgeColor: "#ff632f" },
  { id: 2, name: "O-кольцо FKM высокотемпературное", category: "o-rings", industries: ["oil-gas","chem","auto"], material: "FKM", tempMin: -20, tempMax: 200, pressureMax: 60, image: "https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg" },
  { id: 3, name: "Манжета штоковая полиуретановая", category: "cuffs", industries: ["hydraulics","mining"], material: "PU", tempMin: -40, tempMax: 90, pressureMax: 80, image: "https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg", badge: "Новинка", badgeColor: "#2f57e1" },
  { id: 4, name: "Прокладка плоская силиконовая", category: "gaskets", industries: ["food","med"], material: "VMQ", tempMin: -60, tempMax: 200, pressureMax: 10, image: "https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg" },
  { id: 5, name: "Сальник PTFE химически стойкий", category: "cuffs", industries: ["chem","oil-gas"], material: "PTFE", tempMin: -200, tempMax: 260, pressureMax: 25, image: "https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg" },
  { id: 6, name: "Нестандартное уплотнение по чертежу", category: "custom", industries: ["hydraulics","pneumatics","oil-gas","chem","auto","mining","food","med"], material: "Любой", tempMin: -200, tempMax: 300, pressureMax: 100, image: "https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg", badge: "Под заказ", badgeColor: "#1a7a4a" },
  { id: 7, name: "V-образное кольцо EPDM", category: "v-rings", industries: ["auto","pneumatics"], material: "EPDM", tempMin: -50, tempMax: 150, pressureMax: 15, image: "https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg" },
  { id: 8, name: "Кольцо Backup фторопластовое", category: "backup", industries: ["hydraulics","oil-gas"], material: "PTFE", tempMin: -200, tempMax: 260, pressureMax: 80, image: "https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg" },
  { id: 9, name: "O-кольцо VMQ пищевое", category: "o-rings", industries: ["food","med"], material: "VMQ", tempMin: -60, tempMax: 200, pressureMax: 20, image: "https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg" },
];

// ─── расчёт сечений O-кольца (ГОСТ 18829) ────────────────────────────────────
const oRingStandard = [
  { d: 5,   sections: [1.0, 1.5, 2.0] },
  { d: 6,   sections: [1.0, 1.5, 2.0] },
  { d: 8,   sections: [1.5, 2.0, 2.5] },
  { d: 10,  sections: [1.5, 2.0, 2.5] },
  { d: 12,  sections: [1.5, 2.0, 2.5] },
  { d: 16,  sections: [2.0, 2.5, 3.0] },
  { d: 20,  sections: [2.0, 2.5, 3.0] },
  { d: 25,  sections: [2.5, 3.0, 3.5] },
  { d: 30,  sections: [2.5, 3.0, 3.5] },
  { d: 40,  sections: [3.0, 3.5, 4.0] },
  { d: 50,  sections: [3.0, 3.5, 4.0] },
  { d: 63,  sections: [3.5, 4.0, 5.0] },
  { d: 80,  sections: [3.5, 4.0, 5.0] },
  { d: 100, sections: [4.0, 5.0, 6.0] },
  { d: 125, sections: [4.0, 5.0, 6.0] },
  { d: 160, sections: [5.0, 6.0, 8.0] },
  { d: 200, sections: [5.0, 6.0, 8.0] },
];

function getStandardSections(diameter: number): { d: number; section: number; groove: number; compress: number } | null {
  if (!diameter || diameter <= 0) return null;
  const closest = oRingStandard.reduce((prev, cur) =>
    Math.abs(cur.d - diameter) < Math.abs(prev.d - diameter) ? cur : prev
  );
  const section = closest.sections[1];
  const groove = parseFloat((section * 0.8).toFixed(2));
  const compress = Math.round((1 - groove / section) * 100);
  return { d: closest.d, section, groove, compress };
}

// ─── логика подбора ───────────────────────────────────────────────────────────
function matchProducts(form: FormState): Product[] {
  const tMin = parseFloat(form.tempMin);
  const tMax = parseFloat(form.tempMax);
  const press = parseFloat(form.pressure);

  return products
    .map((p) => {
      let score = 0;
      const reasons: string[] = [];

      const tempOk = (!isNaN(tMin) ? p.tempMin <= tMin : true) && (!isNaN(tMax) ? p.tempMax >= tMax : true);
      if (tempOk) { score += 30; reasons.push("Подходит по температуре"); }

      const pressOk = !isNaN(press) ? p.pressureMax >= press : true;
      if (pressOk) { score += 30; reasons.push("Подходит по давлению"); }

      if (form.industry && p.industries.includes(form.industry)) { score += 25; reasons.push("Рекомендован для вашей отрасли"); }

      const sealOk = !form.sealType || form.sealType === "auto" || p.category === form.sealType;
      if (sealOk && form.sealType !== "auto") score += 15;

      if (form.medium) {
        if (form.medium.includes("Пищев") && (p.material === "VMQ" || p.material === "PTFE")) { score += 10; reasons.push("Допущен для пищевых сред"); }
        if (form.medium.includes("Кислот") && (p.material === "PTFE" || p.material === "FKM")) { score += 10; reasons.push("Химически стоек"); }
        if (form.medium.includes("масло") && (p.material === "NBR" || p.material === "PU")) { score += 8; reasons.push("Маслостоек"); }
      }

      if (!tempOk || !pressOk) score = Math.max(0, score - 40);

      return { ...p, score, reasons };
    })
    .filter((p) => (p.score ?? 0) > 0)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 5);
}

// ─── UI helpers ───────────────────────────────────────────────────────────────
const inputCls = "w-full px-4 py-2.5 rounded-xl border border-[#111A4A]/15 bg-white text-[#111A4A] text-sm focus:outline-none focus:border-[#2f57e1]/60 focus:ring-2 focus:ring-[#2f57e1]/10 transition-all placeholder-[#111A4A]/30";
const selectCls = inputCls + " cursor-pointer appearance-none";
const labelCls = "block text-xs font-semibold text-[#111A4A]/60 uppercase tracking-wider mb-1.5";
const sectionTitle = "text-base font-bold text-[#111A4A] mb-4 flex items-center gap-2";

function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-[#111A4A]/8 p-6">
      <h3 className={sectionTitle}>
        <span className="w-8 h-8 rounded-xl bg-[#2f57e1]/10 flex items-center justify-center flex-shrink-0">
          <Icon name={icon as Parameters<typeof Icon>[0]["name"]} size={16} className="text-[#2f57e1]" fallback="Circle" />
        </span>
        {title}
      </h3>
      {children}
    </div>
  );
}

// ─── главный компонент ────────────────────────────────────────────────────────
export default function Calculator() {
  const empty: FormState = {
    industry: "", medium: "", tempMin: "", tempMax: "", pressure: "",
    diameter: "", crossSection: "", sealType: "auto", qty: "",
    comment: "", contactName: "", contactCompany: "", contactPhone: "", contactEmail: "",
  };

  const [form, setForm] = useState<FormState>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [drawings, setDrawings] = useState<DrawingFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ALLOWED_EXT = ["pdf", "dwg", "dxf", "png", "jpg", "jpeg", "tiff", "bmp", "step", "stp"];
  const MAX_SIZE_MB = 20;

  const addFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    const next: DrawingFile[] = [];
    Array.from(fileList).forEach((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!ALLOWED_EXT.includes(ext)) return;
      if (file.size > MAX_SIZE_MB * 1024 * 1024) return;
      const id = Math.random().toString(36).slice(2);
      const df: DrawingFile = { id, name: file.name, size: file.size, type: ext };
      if (["png","jpg","jpeg","bmp"].includes(ext)) {
        const reader = new FileReader();
        reader.onload = (e) => setDrawings((prev) => prev.map((d) => d.id === id ? { ...d, preview: e.target?.result as string } : d));
        reader.readAsDataURL(file);
      }
      next.push(df);
    });
    setDrawings((prev) => [...prev, ...next].slice(0, 10));
  }, []);

  const removeDrawing = (id: string) => setDrawings((prev) => prev.filter((d) => d.id !== id));

  const formatSize = (bytes: number) => bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(0)} КБ`
    : `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;

  const extIcon = (ext: string) => {
    if (["pdf"].includes(ext)) return "FileText";
    if (["dwg","dxf"].includes(ext)) return "PenTool";
    if (["step","stp"].includes(ext)) return "Box";
    return "Image";
  };

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const oRing = useMemo(() => getStandardSections(parseFloat(form.diameter)), [form.diameter]);
  const matched = useMemo(() => (showResults ? matchProducts(form) : []), [showResults, form]);

  const hasParams = form.tempMax || form.pressure || form.diameter || form.industry;

  function handleCalculate() {
    setShowResults(true);
    setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f7f8fc] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-[#111A4A]/8 p-12 max-w-md w-full text-center shadow-xl"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#1a7a4a]/10 flex items-center justify-center mx-auto mb-5">
            <Icon name="CheckCircle" size={32} className="text-[#1a7a4a]" fallback="Check" />
          </div>
          <h2 className="text-2xl font-bold text-[#111A4A] mb-3">Заявка отправлена!</h2>
          <p className="text-[#111A4A]/55 text-sm leading-relaxed mb-8">
            Наш специалист подготовит коммерческое предложение с расчётом и свяжется с вами в течение 1 рабочего дня.
          </p>
          <div className="flex flex-col gap-3">
            <a href="/catalog" className="w-full py-3 rounded-xl bg-[#2f57e1] text-white text-sm font-semibold hover:bg-[#2547c7] transition-colors text-center">
              Перейти в каталог
            </a>
            <button onClick={() => { setSubmitted(false); setShowResults(false); setForm(empty); }}
              className="w-full py-3 rounded-xl border border-[#111A4A]/15 text-[#111A4A]/60 text-sm hover:border-[#111A4A]/30 transition-colors">
              Новый расчёт
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      {/* Header */}
      <header className="bg-white border-b border-[#111A4A]/8 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-[#111A4A] hover:text-[#2f57e1] transition-colors">
            УплотнениеПро
          </a>
          <div className="flex items-center gap-3 text-sm text-[#111A4A]/50">
            <a href="/catalog" className="hover:text-[#2f57e1] transition-colors">Каталог</a>
            <span>/</span>
            <span className="text-[#2f57e1] font-medium">Конструктор расчёта</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111A4A] mb-2">Конструктор подбора уплотнения</h1>
          <p className="text-[#111A4A]/55 text-sm">
            Заполните параметры — система подберёт подходящие уплотнения и рассчитает размеры. В конце отправьте заявку и получите КП.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* 1. Условия эксплуатации */}
          <Section icon="Thermometer" title="Условия эксплуатации">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Отрасль</label>
                <div className="relative">
                  <select className={selectCls} value={form.industry} onChange={set("industry")}>
                    <option value="">— Выберите отрасль —</option>
                    {industries.map((i) => <option key={i.id} value={i.id}>{i.label}</option>)}
                  </select>
                  <Icon name="ChevronDown" size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#111A4A]/35 pointer-events-none" fallback="ChevronDown" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Рабочая среда</label>
                <div className="relative">
                  <select className={selectCls} value={form.medium} onChange={set("medium")}>
                    <option value="">— Выберите среду —</option>
                    {mediums.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <Icon name="ChevronDown" size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#111A4A]/35 pointer-events-none" fallback="ChevronDown" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Давление, МПа</label>
                <input type="number" min="0" step="0.1" placeholder="Напр. 25" className={inputCls} value={form.pressure} onChange={set("pressure")} />
              </div>
              <div>
                <label className={labelCls}>Температура мин, °C</label>
                <input type="number" placeholder="Напр. −40" className={inputCls} value={form.tempMin} onChange={set("tempMin")} />
              </div>
              <div>
                <label className={labelCls}>Температура макс, °C</label>
                <input type="number" placeholder="Напр. +120" className={inputCls} value={form.tempMax} onChange={set("tempMax")} />
              </div>
            </div>
          </Section>

          {/* 2. Параметры уплотнения */}
          <Section icon="Settings" title="Параметры уплотнения">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Тип уплотнения</label>
                <div className="relative">
                  <select className={selectCls} value={form.sealType} onChange={set("sealType")}>
                    {sealTypes.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                  <Icon name="ChevronDown" size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#111A4A]/35 pointer-events-none" fallback="ChevronDown" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Внутренний диаметр, мм</label>
                <input type="number" min="1" step="0.1" placeholder="Напр. 50" className={inputCls} value={form.diameter} onChange={set("diameter")} />
              </div>
              <div>
                <label className={labelCls}>Сечение (если известно), мм</label>
                <input type="number" min="0.5" step="0.1" placeholder="Напр. 3.5" className={inputCls} value={form.crossSection} onChange={set("crossSection")} />
              </div>
              <div>
                <label className={labelCls}>Количество, шт</label>
                <input type="number" min="1" placeholder="Напр. 100" className={inputCls} value={form.qty} onChange={set("qty")} />
              </div>
            </div>

            {/* Расчёт сечений по ГОСТ */}
            <AnimatePresence>
              {oRing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="mt-5 overflow-hidden"
                >
                  <div className="bg-[#2f57e1]/5 border border-[#2f57e1]/15 rounded-xl p-4">
                    <p className="text-xs font-semibold text-[#2f57e1] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Icon name="Calculator" size={13} fallback="Calculator" />
                      Расчёт по ГОСТ 18829 — ближайший стандартный размер: Ø{oRing.d} мм
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: "Вн. диаметр", value: `${oRing.d} мм` },
                        { label: "Сечение кольца", value: `${oRing.section} мм` },
                        { label: "Глубина канавки", value: `${oRing.groove} мм` },
                        { label: "Сжатие", value: `${oRing.compress}%` },
                      ].map((item) => (
                        <div key={item.label} className="bg-white rounded-lg p-3 border border-[#2f57e1]/10">
                          <p className="text-[10px] text-[#111A4A]/45 uppercase tracking-wider mb-0.5">{item.label}</p>
                          <p className="text-sm font-bold text-[#111A4A]">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Section>

          {/* 3. Чертежи */}
          <Section icon="FileImage" title="Чертежи и эскизы">
            <p className="text-xs text-[#111A4A]/45 mb-4">
              Прикрепите чертёж или эскиз уплотнения — это ускорит подготовку КП. Форматы: PDF, DWG, DXF, STEP, PNG, JPG. До 10 файлов, до {MAX_SIZE_MB} МБ каждый.
            </p>

            {/* Drop zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); addFiles(e.dataTransfer.files); }}
              className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center py-10 px-6 text-center
                ${isDragging
                  ? "border-[#2f57e1] bg-[#2f57e1]/5 scale-[1.01]"
                  : "border-[#111A4A]/15 bg-[#f7f8fc] hover:border-[#2f57e1]/40 hover:bg-[#2f57e1]/3"
                }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.tiff,.bmp,.step,.stp"
                className="hidden"
                onChange={(e) => addFiles(e.target.files)}
              />
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${isDragging ? "bg-[#2f57e1]/15" : "bg-[#111A4A]/6"}`}>
                <Icon name="Upload" size={26} className={isDragging ? "text-[#2f57e1]" : "text-[#111A4A]/35"} fallback="Upload" />
              </div>
              <p className="text-sm font-semibold text-[#111A4A]/70 mb-1">
                {isDragging ? "Отпустите файлы" : "Перетащите файлы сюда"}
              </p>
              <p className="text-xs text-[#111A4A]/40">или нажмите для выбора</p>
              <p className="mt-3 text-[10px] text-[#111A4A]/30 uppercase tracking-wider">PDF · DWG · DXF · STEP · PNG · JPG</p>
            </div>

            {/* Список загруженных файлов */}
            <AnimatePresence>
              {drawings.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 overflow-hidden"
                >
                  <div className="flex flex-col gap-2">
                    {drawings.map((file) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex items-center gap-3 bg-white border border-[#111A4A]/8 rounded-xl px-4 py-3 group"
                      >
                        {/* Превью или иконка */}
                        {file.preview ? (
                          <img src={file.preview} alt={file.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-[#111A4A]/8" />
                        ) : (
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            file.type === "pdf" ? "bg-[#fff0ed]" :
                            ["dwg","dxf"].includes(file.type) ? "bg-[#eff3ff]" :
                            ["step","stp"].includes(file.type) ? "bg-[#f0faf4]" : "bg-[#f5f0ff]"
                          }`}>
                            <Icon
                              name={extIcon(file.type) as Parameters<typeof Icon>[0]["name"]}
                              size={18}
                              className={
                                file.type === "pdf" ? "text-[#ff632f]" :
                                ["dwg","dxf"].includes(file.type) ? "text-[#2f57e1]" :
                                ["step","stp"].includes(file.type) ? "text-[#1a7a4a]" : "text-[#7c3aed]"
                              }
                              fallback="File"
                            />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#111A4A] truncate">{file.name}</p>
                          <p className="text-[11px] text-[#111A4A]/40 uppercase">{file.type} · {formatSize(file.size)}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeDrawing(file.id)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[#111A4A]/25 hover:bg-[#ff632f]/10 hover:text-[#ff632f] transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Icon name="X" size={14} fallback="X" />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-[#111A4A]/40">
                    <span>{drawings.length} файл{drawings.length === 1 ? "" : drawings.length < 5 ? "а" : "ов"} прикреплено</span>
                    {drawings.length < 10 && (
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="text-[#2f57e1] hover:underline">
                        + Добавить ещё
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Section>

          {/* Кнопка подбора */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleCalculate}
              disabled={!hasParams}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#2f57e1] text-white font-semibold text-sm hover:bg-[#2547c7] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#2f57e1]/20"
            >
              <Icon name="Zap" size={16} fallback="Zap" />
              Подобрать уплотнения
            </button>
          </div>

          {/* Результаты подбора */}
          <AnimatePresence>
            {showResults && (
              <motion.div id="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Section icon="PackageSearch" title={`Рекомендуемые уплотнения (${matched.length})`}>
                  {matched.length === 0 ? (
                    <div className="text-center py-8 text-[#111A4A]/45 text-sm">
                      По заданным параметрам ничего не найдено. Попробуйте изменить условия или выберите «Нестандартное» уплотнение.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {matched.map((p, idx) => {
                        const mat = materialColors[p.material] ?? { bg: "#f5f5f5", text: "#555" };
                        return (
                          <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.07 }}
                            className="group relative bg-white rounded-xl border border-[#111A4A]/8 overflow-hidden hover:shadow-md hover:border-[#2f57e1]/20 transition-all"
                          >
                            {idx === 0 && (
                              <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-[#ff632f] text-white text-[10px] font-bold">
                                Лучший выбор
                              </div>
                            )}
                            <div className="h-32 bg-[#f0f2f8] overflow-hidden relative">
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: mat.bg, color: mat.text }}>
                                {p.material}
                              </span>
                            </div>
                            <div className="p-4">
                              <p className="text-sm font-semibold text-[#111A4A] leading-snug mb-2">{p.name}</p>
                              <div className="flex flex-col gap-1 mb-3">
                                {(p.reasons ?? []).map((r) => (
                                  <div key={r} className="flex items-center gap-1.5 text-[11px] text-[#1a7a4a]">
                                    <Icon name="Check" size={10} fallback="Check" />
                                    {r}
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className={`h-1.5 w-4 rounded-full ${i < Math.round(((p.score ?? 0) / 95) * 5) ? "bg-[#2f57e1]" : "bg-[#111A4A]/10"}`} />
                                  ))}
                                </div>
                                <span className="text-[10px] text-[#111A4A]/40">совпадение {p.score}%</span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </Section>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. Комментарий */}
          <Section icon="MessageSquare" title="Дополнительно">
            <div>
              <label className={labelCls}>Комментарий к заявке</label>
              <textarea
                rows={3}
                placeholder="Опишите задачу: условия работы, требования к материалу, наличие чертежа, сроки..."
                className={inputCls + " resize-none"}
                value={form.comment}
                onChange={set("comment")}
              />
            </div>
          </Section>

          {/* 4. Контакты */}
          <Section icon="User" title="Контактные данные">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Ваше имя <span className="text-[#ff632f]">*</span></label>
                <input type="text" placeholder="Иван Иванов" className={inputCls} value={form.contactName} onChange={set("contactName")} required />
              </div>
              <div>
                <label className={labelCls}>Компания</label>
                <input type="text" placeholder="ООО «Ромашка»" className={inputCls} value={form.contactCompany} onChange={set("contactCompany")} />
              </div>
              <div>
                <label className={labelCls}>Телефон <span className="text-[#ff632f]">*</span></label>
                <input type="tel" placeholder="+7 (___) ___-__-__" className={inputCls} value={form.contactPhone} onChange={set("contactPhone")} required />
              </div>
              <div>
                <label className={labelCls}>E-mail <span className="text-[#ff632f]">*</span></label>
                <input type="email" placeholder="info@company.ru" className={inputCls} value={form.contactEmail} onChange={set("contactEmail")} required />
              </div>
            </div>
          </Section>

          {/* Submit */}
          <div className="bg-white rounded-2xl border border-[#111A4A]/8 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#111A4A]">Готово? Отправьте заявку на КП</p>
              <p className="text-xs text-[#111A4A]/45 mt-0.5">Специалист перезвонит в течение 1 рабочего дня и подготовит расчёт</p>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#ff632f] text-white font-bold text-sm hover:bg-[#e5561a] transition-all shadow-lg shadow-[#ff632f]/20 whitespace-nowrap flex-shrink-0"
            >
              <Icon name="Send" size={15} fallback="Send" />
              Получить КП с расчётом
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}