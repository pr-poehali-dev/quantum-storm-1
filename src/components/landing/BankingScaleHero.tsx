import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

const advantages = [
  {
    icon: "Factory",
    title: "Собственное производство без посредников",
    description: "Полный цикл от заготовки до готового изделия на нашем заводе. Контроль качества на каждом этапе.",
  },
  {
    icon: "Clock",
    title: "Готовность от 3 рабочих дней",
    description: "Срочные заказы в приоритете. Серийное и единичное производство в одинаково короткие сроки.",
  },
  {
    icon: "ShieldCheck",
    title: "Контроль качества на каждом этапе",
    description: "Входной контроль материалов, пооперационный контроль, финальная проверка геометрии лазером.",
  },
  {
    icon: "Wrench",
    title: "Бесплатный подбор аналогов и доработка чертежей",
    description: "Инженеры помогут подобрать материал, адаптируют чертёж под производство и предложат оптимальное решение.",
  },
];

export const BankingScaleHero = () => {
  return (
    <section className="w-full bg-white py-24 px-8" id="features">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[40px] font-semibold leading-tight tracking-tight text-[#111A4A] mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-[#111A4A]/60 max-w-xl mx-auto">
            Работаем напрямую с производством — без посредников и задержек
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col gap-4 p-6 rounded-2xl border border-[#111A4A]/8 hover:border-[#2f57e1]/30 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2f57e1]/8 flex items-center justify-center group-hover:bg-[#2f57e1]/15 transition-colors duration-300">
                <Icon name={item.icon} size={22} className="text-[#2f57e1]" fallback="Settings" />
              </div>
              <h3 className="text-base font-semibold text-[#111A4A] leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-[#111A4A]/55 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
