import { motion } from "framer-motion";

const materials = [
  {
    code: "NBR",
    name: "Маслостойкая резина",
    temp: "−40°C до +120°C",
    color: "#1a7a4a",
    bg: "#f0faf4",
    border: "#c3e8d4",
    applications: "Гидравлика, пневматика, топливные системы, автомобильная промышленность",
  },
  {
    code: "FKM",
    name: "Фторкаучук",
    temp: "−20°C до +200°C",
    color: "#7c3aed",
    bg: "#f5f0ff",
    border: "#ddd0f8",
    applications: "Агрессивные среды, химическая промышленность, авиация и нефтегазовая отрасль",
  },
  {
    code: "VMQ",
    name: "Силикон",
    temp: "−60°C до +200°C",
    color: "#0369a1",
    bg: "#f0f8ff",
    border: "#bae0f8",
    applications: "Пищевая промышленность, медицина, электроника, бытовая техника",
  },
  {
    code: "PU",
    name: "Полиуретан",
    temp: "−40°C до +90°C",
    color: "#b45309",
    bg: "#fffbf0",
    border: "#fde9b4",
    applications: "Высокие нагрузки, горнодобывающая и строительная техника, гидравлика",
  },
  {
    code: "PTFE",
    name: "Тефлон",
    temp: "−200°C до +260°C",
    color: "#0f766e",
    bg: "#f0fdfb",
    border: "#b2ede6",
    applications: "Химически агрессивные среды, высокотемпературные установки, пищевое производство",
  },
  {
    code: "EPDM",
    name: "Термостойкая резина",
    temp: "−50°C до +150°C",
    color: "#b91c1c",
    bg: "#fff5f5",
    border: "#fcd0d0",
    applications: "Водяные системы, пар, автомобилестроение, наружные применения",
  },
];

export const CaseStudiesCarousel = () => {
  return (
    <section className="w-full bg-[#fafbff] py-24 px-8" id="materials">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[40px] font-semibold leading-tight tracking-tight text-[#111A4A] mb-4">
            Используемые материалы
          </h2>
          <p className="text-lg text-[#111A4A]/60 max-w-xl mx-auto">
            Подберём оптимальный материал под вашу рабочую среду и условия эксплуатации
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((mat, index) => (
            <motion.div
              key={mat.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group bg-white rounded-2xl border hover:shadow-xl transition-all duration-300 overflow-hidden"
              style={{ borderColor: mat.border }}
            >
              <div className="p-6" style={{ backgroundColor: mat.bg }}>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-3xl font-bold tracking-tight"
                    style={{ color: mat.color }}
                  >
                    {mat.code}
                  </span>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{ backgroundColor: mat.color + "18", color: mat.color }}
                  >
                    {mat.temp}
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#111A4A]/70">{mat.name}</p>
              </div>
              <div className="px-6 py-4">
                <p className="text-sm text-[#111A4A]/55 leading-relaxed">
                  {mat.applications}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-[#111A4A]/50 text-sm">
            Не знаете какой материал нужен?{" "}
            <button className="text-[#2f57e1] font-medium hover:underline">
              Наш инженер подберёт бесплатно →
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
