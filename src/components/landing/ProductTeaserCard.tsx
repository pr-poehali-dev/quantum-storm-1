import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/icon";

export const ProductTeaserCard = () => {
  return (
    <section className="w-full px-8 pt-32 pb-16" id="home">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1] }}
            className="col-span-12 lg:col-span-6 flex flex-col justify-center py-12 lg:py-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#2f57e1]/10 text-[#2f57e1] rounded-full px-4 py-2 text-sm font-medium mb-8 w-fit"
            >
              <div className="w-2 h-2 rounded-full bg-[#2f57e1]" />
              Собственное производство · Точность 0.01 мм
            </motion.div>

            <h1 className="text-[52px] leading-[56px] tracking-tight text-[#111A4A] mb-6 font-semibold">
              Уплотнения любой сложности{" "}
              <span className="text-[#ff632f]">под ваш проект</span>
            </h1>

            <p className="text-xl leading-8 text-[#111A4A]/60 mb-10 max-w-[500px]">
              Собственное производство, точность до 0.01 мм, подбор материала инженерами. Серийное и единичное производство без потери качества.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                className="inline-flex items-center gap-2 bg-[#ff632f] text-white rounded-full px-7 py-4 text-base font-semibold hover:bg-[#e5561a] transition-all duration-200 hover:rounded-2xl shadow-md hover:shadow-lg group"
              >
                Перейти к конструктору
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
              </button>
              <button
                className="inline-flex items-center gap-2 text-[#111A4A] border-2 border-[#111A4A]/20 rounded-full px-7 py-4 text-base font-medium hover:border-[#111A4A]/50 transition-all duration-200 hover:rounded-2xl"
              >
                Запросить КП
              </button>
            </div>

            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-[#111A4A]/10">
              <div>
                <div className="text-2xl font-semibold text-[#111A4A]">±0.005 мм</div>
                <div className="text-sm text-[#111A4A]/50 mt-1">Точность ЧПУ</div>
              </div>
              <div className="w-px h-10 bg-[#111A4A]/10" />
              <div>
                <div className="text-2xl font-semibold text-[#111A4A]">от 3 дней</div>
                <div className="text-sm text-[#111A4A]/50 mt-1">Срок изготовления</div>
              </div>
              <div className="w-px h-10 bg-[#111A4A]/10" />
              <div>
                <div className="text-2xl font-semibold text-[#111A4A]">6 видов</div>
                <div className="text-sm text-[#111A4A]/50 mt-1">Материалов</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1], delay: 0.2 }}
            className="col-span-12 lg:col-span-6 flex items-center justify-center"
          >
            <div className="relative w-full max-w-[520px] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2f57e1]/8 to-[#ff632f]/8 rounded-[40px]" />
              <div className="absolute inset-4 rounded-[32px] overflow-hidden">
                <img
                  src="https://cdn.poehali.dev/projects/e9a9fb97-f09a-477b-b50a-a82eb78fbd86/files/bcb319fc-a36b-478a-bed0-a8cf29b7722c.jpg"
                  alt="Уплотнения производства"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 right-6 bg-[#ff632f] text-white rounded-xl px-3 py-2 text-xs font-semibold shadow-lg">
                  Точность ±0.005 мм
                </div>
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 text-xs font-semibold shadow-lg border border-[#2f57e1]/10 text-[#2f57e1]">
                  ISO 9001
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};