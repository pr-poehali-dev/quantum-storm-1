import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";

const productCategories = [
  { id: "o-rings", label: "O-кольца и шнуры" },
  { id: "cuffs", label: "Манжеты и сальники" },
  { id: "gaskets", label: "Плоские прокладки" },
  { id: "custom", label: "Нестандартные изделия" },
  { id: "v-rings", label: "V-образные кольца" },
  { id: "backup", label: "Кольца Backup" },
];

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

interface Product {
  id: number;
  name: string;
  category: string;
  industries: string[];
  material: string;
  temp: string;
  pressure: string;
  image: string;
  badge?: string;
  badgeColor?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "O-кольцо NBR стандартное",
    category: "o-rings",
    industries: ["hydraulics", "pneumatics", "auto"],
    material: "NBR",
    temp: "−40 / +120°C",
    pressure: "до 40 МПа",
    image: "https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg",
    badge: "Хит",
    badgeColor: "#ff632f",
  },
  {
    id: 2,
    name: "O-кольцо FKM высокотемпературное",
    category: "o-rings",
    industries: ["oil-gas", "chem", "auto"],
    material: "FKM",
    temp: "−20 / +200°C",
    pressure: "до 60 МПа",
    image: "https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg",
  },
  {
    id: 3,
    name: "Манжета штоковая полиуретановая",
    category: "cuffs",
    industries: ["hydraulics", "mining"],
    material: "PU",
    temp: "−40 / +90°C",
    pressure: "до 80 МПа",
    image: "https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg",
    badge: "Новинка",
    badgeColor: "#2f57e1",
  },
  {
    id: 4,
    name: "Прокладка плоская силиконовая",
    category: "gaskets",
    industries: ["food", "med"],
    material: "VMQ",
    temp: "−60 / +200°C",
    pressure: "до 10 МПа",
    image: "https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg",
  },
  {
    id: 5,
    name: "Сальник PTFE химически стойкий",
    category: "cuffs",
    industries: ["chem", "oil-gas"],
    material: "PTFE",
    temp: "−200 / +260°C",
    pressure: "до 25 МПа",
    image: "https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg",
  },
  {
    id: 6,
    name: "Нестандартное уплотнение по чертежу",
    category: "custom",
    industries: ["hydraulics", "pneumatics", "oil-gas", "chem", "auto", "mining", "food", "med"],
    material: "Любой",
    temp: "По запросу",
    pressure: "По запросу",
    image: "https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg",
    badge: "Под заказ",
    badgeColor: "#1a7a4a",
  },
  {
    id: 7,
    name: "V-образное кольцо EPDM",
    category: "v-rings",
    industries: ["auto", "pneumatics"],
    material: "EPDM",
    temp: "−50 / +150°C",
    pressure: "до 15 МПа",
    image: "https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg",
  },
  {
    id: 8,
    name: "Кольцо Backup фторопластовое",
    category: "backup",
    industries: ["hydraulics", "oil-gas"],
    material: "PTFE",
    temp: "−200 / +260°C",
    pressure: "до 80 МПа",
    image: "https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg",
  },
  {
    id: 9,
    name: "O-кольцо VMQ пищевое",
    category: "o-rings",
    industries: ["food", "med"],
    material: "VMQ",
    temp: "−60 / +200°C",
    pressure: "до 20 МПа",
    image: "https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg",
  },
];

const materialColors: Record<string, { bg: string; text: string }> = {
  NBR: { bg: "#f0faf4", text: "#1a7a4a" },
  FKM: { bg: "#f5f0ff", text: "#7c3aed" },
  PU: { bg: "#fffbf0", text: "#b45309" },
  VMQ: { bg: "#f0f8ff", text: "#0369a1" },
  PTFE: { bg: "#f0fdfb", text: "#0f766e" },
  EPDM: { bg: "#fff5f5", text: "#b91c1c" },
  Любой: { bg: "#f5f5f5", text: "#555555" },
};

export default function Catalog() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleIndustry = (id: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchInd =
        selectedIndustries.length === 0 ||
        selectedIndustries.some((i) => p.industries.includes(i));
      const matchSearch =
        search.trim() === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.material.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchInd && matchSearch;
    });
  }, [selectedCategories, selectedIndustries, search]);

  const totalFilters = selectedCategories.length + selectedIndustries.length;

  const Sidebar = () => (
    <aside className="w-full flex flex-col gap-5">
      <div className="bg-white rounded-2xl border border-[#111A4A]/8 overflow-hidden">
        <div className="px-5 py-4 border-b border-[#111A4A]/8 flex items-center justify-between">
          <span className="text-sm font-semibold text-[#111A4A] uppercase tracking-wider">Продукция</span>
          {selectedCategories.length > 0 && (
            <button
              onClick={() => setSelectedCategories([])}
              className="text-xs text-[#2f57e1] hover:underline"
            >
              Сбросить
            </button>
          )}
        </div>
        <ul className="divide-y divide-[#111A4A]/5">
          {productCategories.map((cat) => {
            const active = selectedCategories.includes(cat.id);
            return (
              <li key={cat.id}>
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors duration-150 group ${
                    active ? "bg-[#2f57e1]/5" : "hover:bg-[#111A4A]/3"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center border-2 flex-shrink-0 transition-all duration-150 ${
                      active
                        ? "bg-[#2f57e1] border-[#2f57e1]"
                        : "border-[#111A4A]/25 group-hover:border-[#2f57e1]/50"
                    }`}
                  >
                    {active && <Icon name="Check" size={10} className="text-white" fallback="Check" />}
                  </span>
                  <span className={`text-sm ${active ? "text-[#2f57e1] font-medium" : "text-[#111A4A]/70"}`}>
                    {cat.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="bg-white rounded-2xl border border-[#111A4A]/8 overflow-hidden">
        <div className="px-5 py-4 border-b border-[#111A4A]/8 flex items-center justify-between">
          <span className="text-sm font-semibold text-[#111A4A] uppercase tracking-wider">Отрасли</span>
          {selectedIndustries.length > 0 && (
            <button
              onClick={() => setSelectedIndustries([])}
              className="text-xs text-[#ff632f] hover:underline"
            >
              Сбросить
            </button>
          )}
        </div>
        <div className="p-4 flex flex-wrap gap-2">
          {industries.map((ind) => {
            const active = selectedIndustries.includes(ind.id);
            return (
              <button
                key={ind.id}
                onClick={() => toggleIndustry(ind.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                  active
                    ? "bg-[#ff632f] text-white border-[#ff632f]"
                    : "bg-white text-[#111A4A]/60 border-[#111A4A]/15 hover:border-[#ff632f]/50 hover:text-[#ff632f]"
                }`}
              >
                {ind.label}
              </button>
            );
          })}
        </div>
      </div>

      {totalFilters > 0 && (
        <button
          onClick={() => {
            setSelectedCategories([]);
            setSelectedIndustries([]);
          }}
          className="w-full py-3 rounded-xl border-2 border-dashed border-[#111A4A]/20 text-sm text-[#111A4A]/50 hover:border-[#111A4A]/40 hover:text-[#111A4A]/70 transition-all duration-150"
        >
          Сбросить все фильтры
        </button>
      )}
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <header className="sticky top-0 z-40 bg-white border-b border-[#111A4A]/8 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <a href="/" className="text-xl font-bold text-[#111A4A] hover:text-[#2f57e1] transition-colors flex-shrink-0">
            УплотнениеПро
          </a>

          <div className="flex-1 max-w-md relative">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#111A4A]/35 pointer-events-none"
              fallback="Search"
            />
            <input
              type="text"
              placeholder="Поиск по названию или материалу..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-[#111A4A]/12 bg-[#f7f8fc] text-[#111A4A] placeholder-[#111A4A]/35 focus:outline-none focus:border-[#2f57e1]/50 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-[#111A4A]/50 hidden sm:block">
              {filtered.length} товар{filtered.length === 1 ? "" : filtered.length < 5 ? "а" : "ов"}
            </span>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2f57e1] text-white text-sm font-medium"
            >
              <Icon name="SlidersHorizontal" size={15} fallback="Settings" />
              Фильтры
              {totalFilters > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-[#2f57e1] text-xs font-bold flex items-center justify-center">
                  {totalFilters}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6 items-start">
          <div className="hidden lg:block w-64 flex-shrink-0 sticky top-24">
            <Sidebar />
          </div>

          <AnimatePresence>
            {isSidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSidebarOpen(false)}
                  className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="fixed right-0 top-0 bottom-0 w-72 bg-[#f7f8fc] z-50 lg:hidden overflow-y-auto p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-[#111A4A]">Фильтры</span>
                    <button onClick={() => setIsSidebarOpen(false)}>
                      <Icon name="X" size={20} className="text-[#111A4A]/60" fallback="X" />
                    </button>
                  </div>
                  <Sidebar />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="flex-1 min-w-0">
            {totalFilters > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map((id) => {
                  const cat = productCategories.find((c) => c.id === id);
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2f57e1]/10 text-[#2f57e1] text-xs font-medium"
                    >
                      {cat?.label}
                      <button onClick={() => toggleCategory(id)}>
                        <Icon name="X" size={11} fallback="X" />
                      </button>
                    </span>
                  );
                })}
                {selectedIndustries.map((id) => {
                  const ind = industries.find((i) => i.id === id);
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ff632f]/10 text-[#ff632f] text-xs font-medium"
                    >
                      {ind?.label}
                      <button onClick={() => toggleIndustry(id)}>
                        <Icon name="X" size={11} fallback="X" />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#111A4A]/6 flex items-center justify-center mb-4">
                  <Icon name="PackageSearch" size={28} className="text-[#111A4A]/30" fallback="Search" />
                </div>
                <p className="text-lg font-medium text-[#111A4A]/60">Ничего не найдено</p>
                <p className="text-sm text-[#111A4A]/35 mt-1">Попробуйте изменить фильтры</p>
                <button
                  onClick={() => { setSelectedCategories([]); setSelectedIndustries([]); setSearch(""); }}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-[#2f57e1] text-white text-sm font-medium hover:bg-[#2547c7] transition-colors"
                >
                  Сбросить всё
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((product) => {
                    const matStyle = materialColors[product.material] ?? { bg: "#f5f5f5", text: "#555" };
                    return (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="group bg-white rounded-2xl border border-[#111A4A]/8 overflow-hidden hover:shadow-xl hover:border-[#2f57e1]/20 transition-all duration-300 flex flex-col"
                      >
                        <div className="relative h-44 bg-[#f0f2f8] overflow-hidden flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {product.badge && (
                            <span
                              className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white shadow-sm"
                              style={{ backgroundColor: product.badgeColor }}
                            >
                              {product.badge}
                            </span>
                          )}
                          <span
                            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                            style={{ backgroundColor: matStyle.bg, color: matStyle.text }}
                          >
                            {product.material}
                          </span>
                        </div>

                        <div className="flex flex-col flex-1 p-5">
                          <h3 className="font-semibold text-[#111A4A] text-sm leading-snug mb-3 group-hover:text-[#2f57e1] transition-colors">
                            {product.name}
                          </h3>

                          <div className="flex flex-col gap-1.5 mb-4">
                            <div className="flex items-center gap-2 text-xs text-[#111A4A]/50">
                              <Icon name="Thermometer" size={12} className="text-[#ff632f]" fallback="Zap" />
                              <span>{product.temp}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[#111A4A]/50">
                              <Icon name="Gauge" size={12} className="text-[#2f57e1]" fallback="Zap" />
                              <span>{product.pressure}</span>
                            </div>
                          </div>

                          <div className="mt-auto pt-4 border-t border-[#111A4A]/6 flex gap-2">
                            <button className="flex-1 py-2.5 rounded-xl bg-[#2f57e1] text-white text-xs font-semibold hover:bg-[#2547c7] transition-colors">
                              Запросить КП
                            </button>
                            <button className="px-3 py-2.5 rounded-xl border border-[#111A4A]/12 text-[#111A4A]/60 hover:border-[#111A4A]/30 hover:text-[#111A4A] transition-all">
                              <Icon name="ArrowRight" size={14} fallback="ArrowRight" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
