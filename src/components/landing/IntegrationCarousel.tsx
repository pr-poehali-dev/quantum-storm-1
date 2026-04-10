import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

const sealTypes = [
  {
    icon: "Circle",
    title: "O-кольца и резиновые шнуры",
    description: "Стандартные и нестандартные размеры. Подходят для статических и динамических соединений в гидравлике и пневматике.",
    tag: "Самый популярный тип",
    tagColor: "#ff632f",
  },
  {
    icon: "Layers",
    title: "Манжеты и сальники",
    description: "Уплотнения для валов, штоков и цилиндров. Обеспечивают надёжную защиту от утечек в динамических узлах.",
    tag: "Для подвижных соединений",
    tagColor: "#2f57e1",
  },
  {
    icon: "Square",
    title: "Плоские и фигурные прокладки",
    description: "Прокладки любой формы из листовых материалов. Вырезаем по чертежу или образцу с точностью до 0.1 мм.",
    tag: "По вашим размерам",
    tagColor: "#1a7a4a",
  },
  {
    icon: "Settings",
    title: "Нестандартные изделия по чертежам",
    description: "Изготовим уплотнения любой геометрии по вашим чертежам, эскизам или образцам. Инженерная поддержка включена.",
    tag: "Индивидуальный заказ",
    tagColor: "#7c3aed",
  },
];

export const IntegrationCarousel = () => {
  return (
    <section className="w-full bg-white py-24 px-8" id="types">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[40px] font-semibold leading-tight tracking-tight text-[#111A4A] mb-4">
            Типы уплотнений
          </h2>
          <p className="text-lg text-[#111A4A]/60 max-w-xl mx-auto">
            Производим весь спектр уплотнительных изделий для любых отраслей
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sealTypes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex gap-5 p-7 rounded-2xl border border-[#111A4A]/8 hover:border-[#2f57e1]/25 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                style={{ backgroundColor: item.tagColor + "12" }}
              >
                <Icon
                  name={item.icon}
                  size={24}
                  style={{ color: item.tagColor }}
                  fallback="Package"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-base font-semibold text-[#111A4A]">{item.title}</h3>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
                    style={{ backgroundColor: item.tagColor + "15", color: item.tagColor }}
                  >
                    {item.tag}
                  </span>
                </div>
                <p className="text-sm text-[#111A4A]/55 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
