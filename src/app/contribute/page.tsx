"use client";

import { useState, useEffect } from "react";
import { motion, Variants, Transition } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  FaGithub,
  FaCode,
  FaStar,
  FaUsers,
  FaBook,
  FaCheckCircle,
  FaLightbulb,
  FaRocket,
  FaHeartbeat,
  FaRegSmile,
  FaComment,
  FaUserAstronaut,
} from "react-icons/fa";
import { BiGitPullRequest } from "react-icons/bi";
import { BsChatSquareText } from "react-icons/bs";
import { HiOutlineArrowNarrowRight, HiOutlineCheck } from "react-icons/hi";

export default function ContributePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Auto-advance steps every 4 seconds
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === 2 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const contributionSteps = [
    {
      icon: <FaLove className="w-7 h-7" />,
      title: "Jamiyatga hissa qo'shing",
      description:
        "DevOps Cheatsheet omborini Google hisobingizga ulashdan boshlang. Bu sizning loyihangizning ishlash uchun o'z kuchini yaratadi..",
      link: "",
      linkText: "Let's go",
      color: "blue",
    },
    {
      icon: <FaCode className="w-7 h-7" />,
      title: "O'zgarishlaringizni qiling",
      description:
        "Omboringizdagi yangi vositalarni qo'shing, mavjud kontentni yangilang yoki muammolarni hal qiling. Eng yaxshi natijalarga erishish uchun bizning hissa qo'shish bo'yicha ko'rsatmalarimizga amal qiling.",
      link: "",
      linkText: "Qo'llanmalarni ko'rish",
      color: "purple",
    },
    {
      icon: <FaCode className="w-7 h-7" />,
      title: "So'rov yuboring",
      description:
        "O'zgarishlaringiz bilan birga texnik xizmat ko'rsatuvchilar tomonidan ko'rib chiqilishi uchun bizga yuboring. Biz sizga hissangizni birlashtirishga tayyorlashda yordam beramiz.",
      link: "",
      linkText: "Create PR",
      color: "green",
    },
  ];

  const contributionAreas = [
    {
      title: "Yaratishni boshlash",
      description:
        "Cheatsheetda hali yoritilmagan DevOps vositalari haqidagi bilimlaringiz bilan o'rtoqlashing. Boshqalarga yangi texnologiyalarni kashf etishda yordam berish uchun resurslarimizni kengaytiring.",
      icon: <FaBook className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
      bg: "bg-blue-50 dark:bg-blue-900/20",
      color: "text-blue-600 dark:text-blue-400",
      border: "border-blue-100 dark:border-blue-800",
    },
    {
      title: "Rivojlantirish",
      description:
        "Hujjatlarimizni yanada keng qamrovli va osonroq tushunishga yordam bering. Aniq tushuntirishlar va misollar DevOps o'rganishni osonlashtiradi.",
      icon: (
        <BsChatSquareText className="w-6 h-6 text-purple-500 dark:text-purple-400" />
      ),
      bg: "bg-purple-50 dark:bg-purple-900/20",
      color: "text-purple-600 dark:text-purple-400",
      border: "border-purple-100 dark:border-purple-800",
    },
    {
      title: "Muammolarni tuzatish",
      description:
        "Ochiq muammolarni hal qilishga va cheatsheet sifatini yaxshilashga yordam bering. Har bir xatoni tuzatish va takomillashtirish loyihani jamiyat uchun yanada qimmatli qiladi.",
      icon: (
        <FaCheckCircle className="w-6 h-6 text-green-500 dark:text-green-400" />
      ),
      bg: "bg-green-50 dark:bg-green-900/20",
      color: "text-green-600 dark:text-green-400",
      border: "border-green-100 dark:border-green-800",
    },
  ];

  const testimonials = [
    {
      quote:
        "Ushbu loyihaga hissa qo'shish menga boshqalarga yordam berish bilan birga DevOps haqidagi bilimlarimni mustahkamlashga yordam berdi.",
      author: "Sarah K.",
      role: "Senior DevOps Engineer",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      quote:
        "Dasturchilar menga birinchi ochiq kodli hissamni yaratishda juda yordam berishdi!",
      author: "Michael T.",
      role: "Cloud Architect",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      quote:
        "Men Netlivy jamoa mutaxassislarining ushbu ajoyib hamjamiyati bilan hamkorlik qilib, juda ko'p narsalarni o'rgandim.",
      author: "Jamie L.",
      role: "SRE Lead",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.6
      } as Transition,
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: "tween",
        staggerChildren: 0.1,
      } as Transition,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/30">
      {/* Hero Section with Animated Elements */}
      <section className="relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-20 w-60 h-60 rounded-full bg-blue-400/10 dark:bg-blue-400/10 blur-3xl"></div>
          <div className="absolute right-0 top-0 w-72 h-72 rounded-full bg-purple-400/10 dark:bg-purple-400/10 blur-3xl"></div>

          {/* Code Blocks Animation */}
          <div className="absolute top-40 -right-10 transform rotate-12 opacity-20 hidden lg:block">
            <pre className="text-xs font-mono text-blue-900 dark:text-blue-300">
              <code>
                {`git clone https://github.com/user/devops-cheatsheet.git\ncd devops-cheatsheet\nnpm install\ngit checkout -b feature/new-tool\n# Make changes\ngit add .\ngit commit -m "Add new tool guide"\ngit push origin feature/new-tool`}
              </code>
            </pre>
          </div>

          <div className="absolute bottom-20 -left-10 transform -rotate-12 opacity-20 hidden lg:block">
            <pre className="text-xs font-mono text-purple-900 dark:text-purple-300">
              <code>
                {`<!-- Adding a new tool -->
<ToolCard
  name="Awesome Tool"
  category="CI/CD"
  description="This tool helps with..."
  link="https://tool-url.com"
/>`}
              </code>
            </pre>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative z-10">
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <div className="inline-flex items-center mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <FaHeartbeat className="w-5 h-5 text-pink-300 mr-2" />
                <span className="text-sm font-medium">Hamjamiyatimizga qo'shiling</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Contribute to DevOps Netlivy Cheatsheets
              </h1>

              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                DevOps Netlivy bilimlarini hamma uchun yanada ochiqroq qilishimizga yordam bering. Sizning hissalaringiz, katta yoki kichik bo'lishidan qat'i nazar, sezilarli farq qiladi!
              </p>

              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="flex items-center gap-2 text-blue-100">
                  <FaUsers className="w-5 h-5" />
                  <span className="font-semibold text-white">
                    100+ Hamkorlik 
                  </span>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <FaCode className="w-5 h-5 text-yellow-300" />
                  <span className="font-semibold text-white">500+ Big Projects</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <BiGitPullRequest className="w-5 h-5" />
                  <span className="font-semibold text-white">
                    5K+ PRs Merged
                  </span>
                </div>
              </div>

              <a
                href="https://netlivys.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-md hover:shadow-lg"
              >
                <FaCode className="w-5 h-5" />
                View on Netlivy
              </a>
            </motion.div>
          </div>

          {/* Wave divider */}
          <div className="relative w-full">
            <svg
              className="w-full h-auto text-gray-50 dark:text-gray-900 fill-current"
              viewBox="0 0 1440 120"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0,64L60,64C120,64,240,64,360,58.7C480,53,600,43,720,42.7C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* How to Contribute Section with Interactive Steps */}
        <motion.div
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center mb-4 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
            >
              <FaRocket className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Jarayonni boshlash</span>
            </motion.div>

            <motion.h2
              variants={fadeIn}
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              How to Contribute
            </motion.h2>

            <motion.p
              variants={fadeIn}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              DevOps Netlivy’ga birinchi hissangizni qo‘shish uchun quyidagi amallarni bajaring. 
            </motion.p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 relative">
            {/* Step timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 transform -translate-x-1/2 rounded-full z-0"></div>

            {contributionSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className={`relative z-10 flex-1 ${index === activeStep ? "md:scale-105" : "md:scale-100"} transition-all duration-300`}
              >
                <div
                  className={`h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 ${
                    index === activeStep
                      ? "ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400 dark:ring-offset-gray-900"
                      : ""
                  }`}
                >
                  {/* Step number */}
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 dark:border-blue-400 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                    {index + 1}
                  </div>

                  <div className="flex flex-col items-center text-center pt-4">
                    <div
                      className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-${step.color}-100 dark:bg-${step.color}-900/30 text-${step.color}-600 dark:text-${step.color}-400 mb-6`}
                    >
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[80px]">
                      {step.description}
                    </p>
                    <a
                      href={step.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-5 py-2.5 rounded-lg bg-${step.color}-100 dark:bg-${step.color}-900/30 text-${step.color}-700 dark:text-${step.color}-300 hover:bg-${step.color}-200 dark:hover:bg-${step.color}-800/30 font-medium transition-colors`}
                    >
                      {step.linkText}
                      <HiOutlineArrowNarrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What You Can Contribute Section */}
        <motion.div
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center mb-4 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
            >
              <FaLightbulb className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Opportunities</span>
            </motion.div>

            <motion.h2
              variants={fadeIn}
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              What You Can Contribute
            </motion.h2>

            <motion.p
              variants={fadeIn}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              There are many ways to help improve the DevOps Cheatsheet
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contributionAreas.map((area, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border ${area.border} hover:shadow-xl transition-all duration-300`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${area.bg} flex items-center justify-center mb-6`}
                >
                  <div className={`${area.color}`}>{area.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {area.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          className="mb-24 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 lg:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center mb-4 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
              <FaRegSmile className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Contributor Stories</span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Hear From Our Contributors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-700 relative"
              >
                <div className="mb-6">
                  <FaComment className="w-8 h-8 text-blue-100 dark:text-blue-900 absolute -top-4 -left-4" />
                  <blockquote className="text-gray-700 dark:text-gray-300 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </div>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                    width={48}
                    height={48}
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-3xl"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

          <div className="relative p-12 md:p-16 text-center text-white">
            <FaUserAstronaut className="w-16 h-16 mx-auto mb-6 text-white/80" />

            <h2 className="text-3xl font-bold mb-6">
              Birinchi hissangizni qo'shishga tayyormisiz?
            </h2>

            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Xatolikni tuzatyapsizmi yoki yangi vositalar qo'llanmasini qo'shyapsizmi, har bir hissa DevOps Netlivy Cheatsheets-ni hamma uchun yaxshiroq qilishga yordam beradi. Bugun bizning o'sib borayotgan hamjamiyatimizga qo'shiling!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-md font-medium"
              >
                <FaCode className="w-5 h-5" />
                View on US
              </a>

              <Link
                href="/categories"
                className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors shadow-md font-medium border border-blue-600"
              >
                <FaBook className="w-5 h-5" />
                Browse Categories
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Guidelines Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mt-24 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-8 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-3xl -z-10"></div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <FaBook className="mr-3 text-blue-500" />
            Hissa qo'shish bo'yicha ko'rsatmalar
          </h2>

          <div className="prose max-w-none text-gray-600 dark:text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Hissangiz bizning xulq-atvor qoidalari va uslub ko'rsatmalarimizga muvofiqligiga ishonch hosil qiling",
                "Pull request yuborishdan oldin o'zgarishlaringizni mahalliy darajada sinab ko'ring",
                "Aniq majburiyat xabarlari va hujjatlar yangilanishlarini qo'shing",
                "Hissangiz haqidagi fikr-mulohazalar va savollarga javob bering",
                "Iloji bo'lsa, boshqa hissalarni ko'rib chiqishga yordam bering",
                "Yaxshiroq hujjatlar uchun tortish so'rovi shabloniga amal qiling",
                "Yangi funksiyalarni joriy qilishda tegishli testlarni qo'shing",
                "Zarur bo'lganda hujjatlarni yangilang",
              ].map((guideline, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-0.5 bg-green-100 dark:bg-green-900/30 rounded-full p-1 text-green-600 dark:text-green-400 flex-shrink-0">
                    <HiOutlineCheck className="w-4 h-4" />
                  </div>
                  <span>{guideline}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors"
            >
             Yana o'qing
              <HiOutlineArrowNarrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
