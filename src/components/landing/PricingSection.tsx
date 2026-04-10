import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

export function PricingSection() {
  return (
    <section className="py-24 bg-[#fafbff] px-8" id="equipment">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#2f57e1]/10 text-[#2f57e1] rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Icon name="Cpu" size={14} fallback="Settings" />
              ЧПУ-производство
            </div>
            <h2 className="text-[40px] font-semibold leading-tight tracking-tight text-[#111A4A] mb-6">
              Современный токарный центр с ЧПУ
            </h2>
            <p className="text-lg text-[#111A4A]/60 leading-relaxed mb-8">
              Многоосевая обработка, автоматическая подача, лазерный контроль геометрии. Точность изготовления ±0.005 мм. Серийное и единичное производство без потери качества.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: "Crosshair", label: "Точность", value: "±0.005 мм" },
                { icon: "Layers", label: "Оси обработки", value: "до 5 осей" },
                { icon: "BarChart2", label: "Контроль", value: "Лазерный" },
                { icon: "Repeat", label: "Производство", value: "Серийное и единичное" },
              ].map((spec, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#111A4A]/8">
                  <div className="w-9 h-9 rounded-lg bg-[#2f57e1]/8 flex items-center justify-center flex-shrink-0">
                    <Icon name={spec.icon} size={16} className="text-[#2f57e1]" fallback="Settings" />
                  </div>
                  <div>
                    <div className="text-xs text-[#111A4A]/45 mb-0.5">{spec.label}</div>
                    <div className="text-sm font-semibold text-[#111A4A]">{spec.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="inline-flex items-center gap-2 bg-[#ff632f] text-white rounded-full px-7 py-4 text-base font-semibold hover:bg-[#e5561a] transition-all duration-200 hover:rounded-2xl shadow-md group">
              Запросить расчёт
              <Icon name="ArrowRight" size={16} className="transition-transform duration-150 group-hover:translate-x-1" fallback="ArrowRight" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-[#111A4A] to-[#1e2d6e] rounded-3xl overflow-hidden aspect-[4/3] flex items-center justify-center">
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute border border-white rounded-full"
                    style={{
                      width: `${(i + 1) * 80}px`,
                      height: `${(i + 1) * 80}px`,
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="w-32 h-32 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/15 border border-white/25 flex items-center justify-center">
                    <Icon name="Settings" size={36} className="text-white" fallback="Settings" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-white/80 text-sm mb-1">Токарный центр ЧПУ</p>
                  <p className="text-white/40 text-xs">Многоосевая обработка</p>
                </div>
              </div>

              <div
                className="absolute top-5 right-5 text-white font-bold text-sm px-4 py-2 rounded-xl"
                style={{ backgroundColor: "#2f57e1" }}
              >
                Точность ±0.005 мм
              </div>

              <div className="absolute bottom-5 left-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white text-xs font-medium">Производство: активно</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
