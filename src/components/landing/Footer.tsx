import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

const footerLinks = [
  {
    title: "Продукция",
    links: [
      { label: "O-кольца и шнуры", href: "#types" },
      { label: "Манжеты и сальники", href: "#types" },
      { label: "Плоские прокладки", href: "#types" },
      { label: "Нестандартные изделия", href: "#types" },
    ],
  },
  {
    title: "Производство",
    links: [
      { label: "Токарный центр ЧПУ", href: "#equipment" },
      { label: "Контроль качества", href: "#features" },
      { label: "Материалы", href: "#materials" },
      { label: "Сертификаты", href: "#certificates" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "О производстве", href: "#" },
      { label: "Контакты", href: "#" },
      { label: "Политика конфиденциальности", href: "#" },
    ],
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        className="w-full py-24 px-8"
        id="cta"
        style={{
          background: "linear-gradient(135deg, #f8faff 0%, #ffffff 60%, #fff8f5 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#111A4A] to-[#1e2d6e] p-12 lg:p-16 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#2f57e1]/20 blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#ff632f]/15 blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 rounded-full px-4 py-2 text-sm font-medium mb-8">
                  <Icon name="Zap" size={14} fallback="Zap" />
                  Расчёт за 2 минуты
                </div>
                <h2 className="text-[40px] lg:text-[52px] font-semibold leading-tight text-white mb-6 tracking-tight">
                  Рассчитайте стоимость за 2 минуты
                </h2>
                <p className="text-xl text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
                  Загрузите чертёж или опишите задачу — конструктор подберёт материал и выдаст КП
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button className="inline-flex items-center gap-2 bg-[#ff632f] text-white rounded-full px-8 py-4 text-lg font-semibold hover:bg-[#e5561a] transition-all duration-200 hover:rounded-2xl shadow-lg group">
                    Перейти к конструктору
                    <Icon name="ArrowRight" size={18} className="transition-transform duration-150 group-hover:translate-x-1" fallback="ArrowRight" />
                  </button>
                  <button className="inline-flex items-center gap-2 text-white border-2 border-white/25 rounded-full px-8 py-4 text-lg font-medium hover:border-white/50 transition-all duration-200 hover:rounded-2xl">
                    Позвонить нам
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full bg-[#fafafa] border-t border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="col-span-2"
            >
              <h3 className="text-2xl font-bold text-[#111A4A] mb-2">УплотнениеПро</h3>
              <p className="text-sm text-[#666666] max-w-xs leading-5 mb-6">
                Собственное производство уплотнений любой сложности. Точность до 0.01 мм, готовность от 3 дней.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="mailto:info@uplotneniye.ru"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#e5e5e5] text-[#666666] hover:text-[#ff632f] hover:border-[#ff632f] transition-colors duration-150"
                >
                  <Icon name="Mail" size={16} fallback="Mail" />
                </a>
                <a
                  href="tel:+78001234567"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#e5e5e5] text-[#666666] hover:text-[#ff632f] hover:border-[#ff632f] transition-colors duration-150"
                >
                  <Icon name="Phone" size={16} fallback="Phone" />
                </a>
              </div>
            </motion.div>

            {footerLinks.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h4 className="text-sm font-medium text-[#202020] mb-4 uppercase tracking-wide">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="text-sm text-[#666666] hover:text-[#202020] transition-colors duration-150 text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="pt-8 border-t border-[#e5e5e5]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-[#666666]">
                © {currentYear} УплотнениеПро. Все права защищены.
              </p>
              <div className="flex items-center gap-2 text-sm text-[#666666]">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                Производство работает
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
