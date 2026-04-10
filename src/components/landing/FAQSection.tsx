import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

const certificates = [
  {
    icon: "Award",
    code: "ISO 9001",
    title: "Система менеджмента качества",
    description: "Международный стандарт управления качеством производственных процессов",
    color: "#2f57e1",
    bg: "#f0f4ff",
  },
  {
    icon: "Shield",
    code: "ГОСТ Р",
    title: "Соответствие российским стандартам",
    description: "Продукция сертифицирована по государственным стандартам Российской Федерации",
    color: "#1a7a4a",
    bg: "#f0faf4",
  },
  {
    icon: "CheckSquare",
    code: "ТР ТС 010/012",
    title: "Технический регламент ТС",
    description: "Соответствие техническим регламентам Таможенного союза для промышленного оборудования",
    color: "#b45309",
    bg: "#fffbf0",
  },
  {
    icon: "FileText",
    code: "Протоколы",
    title: "Лабораторные испытания",
    description: "Протоколы испытаний на стойкость к рабочим средам, давлению и температурным нагрузкам",
    color: "#7c3aed",
    bg: "#f5f0ff",
  },
];

export const FAQSection = () => {
  return (
    <section className="w-full py-24 px-8 bg-white" id="certificates">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[40px] font-semibold leading-tight tracking-tight text-[#111A4A] mb-4">
            Сертификаты и соответствие
          </h2>
          <p className="text-lg text-[#111A4A]/60 max-w-xl mx-auto">
            Наша продукция подтверждена международными и российскими стандартами качества
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300"
              style={{ borderColor: cert.color + "25" }}
            >
              <div
                className="flex flex-col items-center justify-center py-10 px-6"
                style={{ backgroundColor: cert.bg }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: cert.color + "18" }}
                >
                  <Icon name={cert.icon} size={28} style={{ color: cert.color }} fallback="Award" />
                </div>
                <span
                  className="text-2xl font-bold tracking-tight"
                  style={{ color: cert.color }}
                >
                  {cert.code}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-5 bg-white">
                <h3 className="text-sm font-semibold text-[#111A4A] mb-2">{cert.title}</h3>
                <p className="text-xs text-[#111A4A]/50 leading-relaxed flex-1">{cert.description}</p>
                <button
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 hover:shadow-sm"
                  style={{
                    borderColor: cert.color + "30",
                    color: cert.color,
                    backgroundColor: cert.bg,
                  }}
                >
                  <Icon name="Download" size={14} fallback="Download" />
                  Скачать PDF
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
