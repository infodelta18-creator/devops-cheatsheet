import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Code,
  BarChart2,
  Database,
  Terminal,
  GitBranch,
  Server,
  Workflow,
  BookOpen,
  Puzzle,
  Award,
  Users,
  Zap,
  ArrowRight,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-10 -top-10 h-[300px] w-[300px] rounded-full bg-purple-400 blur-3xl"></div>
          <div className="absolute -right-10 -bottom-10 h-[300px] w-[300px] rounded-full bg-blue-400 blur-3xl"></div>

          {/* Animated code lines */}
          <div className="absolute top-20 right-20 text-xs text-white/30 font-mono hidden lg:block">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="my-1 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                $ docker-compose up -d
              </div>
            ))}
          </div>

          <div className="absolute bottom-20 left-20 text-xs text-white/30 font-mono hidden lg:block">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="my-1 animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                $ kubectl apply -f deployment.yaml
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-white">
                Begin your DevOps journey
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white">
              Getting Started with DevOps
            </h1>

            <p className="text-xl text-blue-100 mb-10">
              A step-by-step guide to modern DevOps practices, tools, and
              workflows
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#roadmap"
                className="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                View Roadmap
              </a>
              <Link
                href="/categories"
                className="px-6 py-3 bg-blue-700 text-white font-medium rounded-lg border border-blue-500 hover:bg-blue-800 transition-colors"
              >
                Explore Categories
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 200"
            className="w-full h-auto fill-gray-50 dark:fill-gray-900"
          >
            <path d="M0,128L60,133.3C120,139,240,149,360,144C480,139,600,117,720,117.3C840,117,960,139,1080,138.7C1200,139,1320,117,1380,106.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* What is DevOps Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 mb-4">
              <span className="text-sm font-medium">DevOps Fundamentals</span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              DevOps nima?
            </h2>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              DevOps - bu dasturiy ta'minotni ishlab chiqish (Dev) va IT operatsiyalarini (Ops) birlashtirgan amaliyotlar to'plami. Uning maqsadi tizimlarni ishlab chiqish hayot aylanishini qisqartirish va uzluksiz ishlashni ta'minlashdir. DevOps - Netlivy mahsuloti
            </p>

            <div className="space-y-4">
              {[
                {
                  text: "Ishlab chiqish va operatsion guruhlar o'rtasidagi hamkorlikni yaxshilash",
                  icon: <Users className="w-5 h-5" />,
                },
                {
                  text: "Xususiyatlar va tuzatishlarni tezroq yetkazib berish",
                  icon: <Zap className="w-5 h-5" />,
                },
                {
                  text: "Barqarorroq ish muhiti",
                  icon: <Server className="w-5 h-5" />,
                },
                {
                  text: "Resurslardan yaxshiroq foydalanish",
                  icon: <BarChart2 className="w-5 h-5" />,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-700 dark:text-blue-300">
                    {item.icon}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Plan
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Talablarni aniqlang va yo'l xaritasini tuzing
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Code
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Kodni yozing va ko'rib chiqing
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Build
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Artefaktlarni kompilyatsiya qiling va yarating
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                    <span className="font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Test
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Avtomatlashtirilgan sinov va sifat tekshiruvlari
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <span className="font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Deploy
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Ishlab chiqarish muhitiga chiqarish
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <span className="font-bold">6</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Monitor
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Kuzating va doimiy ravishda yaxshilang
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section id="roadmap" className="py-20 bg-gray-100 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 mb-4">
              <span className="text-sm font-medium">Step-by-Step Guide</span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              DevOps Learning Roadmap
            </h2>

            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              DevOps ko'nikmalarini asosiy mavzulardan tortib, ilg'or mavzulargacha o'zlashtirish uchun ushbu yo'naltirilgan yo'ldan boring
            </p>
          </div>

          <div className="relative">
            {/* Vertical line for timeline */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-blue-200 dark:bg-blue-900/50 transform md:translate-x-[-50%]"></div>

            <div className="space-y-16">
              {[
                {
                  position: "left",
                  level: "Beginner",
                  title: "Linux & Command Line Basics",
                  description:
                    "Linux operatsion tizimi va shell skriptlarining asoslarini o'rganing.",
                  icon: <Terminal className="w-6 h-6" />,
                  color: "blue",
                },
                {
                  position: "right",
                  level: "Beginner",
                  title: "Version Control with Git",
                  description:
                    "Master Git ish jarayoni, tarmoqlanish strategiyalari va hamkorlik.",
                  icon: <GitBranch className="w-6 h-6" />,
                  color: "green",
                },
                {
                  position: "left",
                  level: "Intermediate",
                  title: "Containerization with Docker",
                  description: "Konteynerlarni qurishni, joylashtirishni va boshqarishni o'rganing.",
                  icon: <Puzzle className="w-6 h-6" />,
                  color: "purple",
                },
                {
                  position: "right",
                  level: "Intermediate",
                  title: "CI/CD Pipelines",
                  description:
                    "Uzluksiz integratsiya va yetkazib berish ish oqimlarini amalga oshiring.",
                  icon: <Workflow className="w-6 h-6" />,
                  color: "yellow",
                },
                {
                  position: "left",
                  level: "Advanced",
                  title: "Infrastructure as Code",
                  description:
                    "Terraform va Ansible yordamida infratuzilmani ta'minlashni avtomatlashtiring.",
                  icon: <Code className="w-6 h-6" />,
                  color: "red",
                },
                {
                  position: "right",
                  level: "Advanced",
                  title: "Kubernetes Orchestration",
                  description:
                    "Kubernetes yordamida konteynerlashtirilgan ilovalarni joylashtiring va masshtablang.",
                  icon: <Server className="w-6 h-6" />,
                  color: "indigo",
                },
                {
                  position: "left",
                  level: "Expert",
                  title: "Monitoring & Observability",
                  description:
                    "Jurnallarni yuritish, monitoring qilish va ogohlantirish yechimlarini joriy etish.",
                  icon: <BarChart2 className="w-6 h-6" />,
                  color: "teal",
                },
                {
                  position: "right",
                  level: "Expert",
                  title: "Cloud Platforms",
                  description:
                    "Master AWS, Azure yoki GCP bulut xizmatlari va arxitekturasi.",
                  icon: <Database className="w-6 h-6" />,
                  color: "orange",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`relative flex items-center ${item.position === "left" ? "md:justify-start" : "md:justify-end"} flex-col md:flex-row`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-900 border-4 border-blue-500 dark:border-blue-600 transform translate-x-[-50%] z-10"></div>

                  {/* Content card */}
                  <div
                    className={`relative ml-12 md:ml-0 ${item.position === "right" ? "md:ml-12" : "md:mr-12"} bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 w-full md:w-[calc(50%-2rem)] max-w-xl`}
                  >
                    {/* Level badge */}
                    <div
                      className={`absolute top-0 ${item.position === "left" ? "right-0" : "left-0"} transform translate-y-[-50%] px-3 py-1 rounded-full bg-${item.color}-100 dark:bg-${item.color}-900/30 text-${item.color}-700 dark:text-${item.color}-300 text-sm font-medium`}
                    >
                      {item.level}
                    </div>

                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-lg bg-${item.color}-100 dark:bg-${item.color}-900/30 flex items-center justify-center text-${item.color}-600 dark:text-${item.color}-400`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {item.description}
                        </p>
                        <Link
                          href={`/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          <span>Learn more</span>
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Essential Tools Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 mb-4">
              <span className="text-sm font-medium">Muhim resurslar</span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              DevOps Toolkit: Must-Have Tools
            </h2>

            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Har bir DevOps muhandisi tanish bo'lishi kerak bo'lgan ushbu muhim vositalarni o'rganing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Git",
                category: "Version Control",
                icon: <GitBranch className="w-6 h-6" />,
                description:
                  "Manba kodidagi o'zgarishlarni kuzatish uchun tarqatilgan versiyani boshqarish tizimi.",
                link: "/Version-Control/Github",
              },
              {
                name: "Docker",
                category: "Containerization",
                icon: <Puzzle className="w-6 h-6" />,
                description:
                  "Konteynerlarda ilovalarni ishlab chiqish, yetkazib berish va ishga tushirish uchun platforma.",
                link: "/Containerization/Docker",
              },
              {
                name: "Jenkins",
                category: "CI/CD",
                icon: <Workflow className="w-6 h-6" />,
                description:
                  "Kodni yaratish, sinovdan o'tkazish va joylashtirish uchun ochiq kodli avtomatlashtirish serveri.",
                link: "/CI-CD/Jenkins",
              },
              {
                name: "Kubernetes",
                category: "Orchestration",
                icon: <Server className="w-6 h-6" />,
                description:
                  "Joylashtirish va masshtablashni avtomatlashtirish uchun konteyner orkestratsiya tizimi.",
                link: "/Containerization/Kubernetes",
              },
              {
                name: "Terraform",
                category: "Infrastructure as Code",
                icon: <Code className="w-6 h-6" />,
                description:
                  "Infratuzilmani xavfsiz qurish, o'zgartirish va versiyalash vositasi.",
                link: "/Infrastructure-Management/Terraform",
              },
              {
                name: "Prometheus",
                category: "Monitoring",
                icon: <BarChart2 className="w-6 h-6" />,
                description:
                  "Ishonchlilik va miqyoslash imkoniyati uchun mo'ljallangan monitoring va ogohlantirish vositalari to'plami.",
                link: "/Monitoring/Prometheus",
              },
            ].map((tool, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-700"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      {tool.icon}
                    </div>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                      {tool.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {tool.description}
                  </p>

                  <Link
                    href={tool.link}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-all duration-300"
                  >
                    <span className="font-medium">Learn more</span>
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Help Section */}
      <section className="py-20 bg-blue-50 dark:bg-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 mb-4">
                  <span className="text-sm font-medium">Yordam kerak?</span>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Join our Netlivy Community
                </h2>

                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                  Netlivy jamoasi bilan bog'laning, savollar bering, bilimlaringizni baham ko'ring va birgalikda rivojlaning.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      text: "Eksklyuziv resurslar va qo'llanmalarga kirish",
                      icon: <BookOpen className="w-5 h-5" />,
                    },
                    {
                      text: "Tajribali mutaxassislarning bevosita yordami",
                      icon: <HelpCircle className="w-5 h-5" />,
                    },
                    {
                      text: "Doimiy vebinarlar va o'quv sessiyalari",
                      icon: <Award className="w-5 h-5" />,
                    },
                    {
                      text: "Sanoat mutaxassislari bilan tarmoq",
                      icon: <Users className="w-5 h-5" />,
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 text-green-500 dark:text-green-400">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://instagram.com/car1movvvvv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Join Community
                  </a>
                  <Link
                    href="/contribute"
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Contribute to Cheatsheet
                  </Link>
                </div>
              </div>

              <div className="hidden md:block relative bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800">
                <div className="absolute inset-0 opacity-20">
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern
                        id="smallGrid"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 20 0 L 0 0 0 20"
                          fill="none"
                          stroke="white"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#smallGrid)" />
                  </svg>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-24 h-24 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-4">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      5000+ Members
                    </h3>
                    <p className="text-blue-100">
                      Join our growing community of DevOps professionals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 mb-4">
              <span className="text-sm font-medium">Common Questions</span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tez-tez so'raladigan savollar
            </h2>

            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              DevOps bilan ishlashni boshlash haqida eng keng tarqalgan savollarga javoblarni toping
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Netlivy jamoasida bo'lish uchun qanday ko'nikmalarga ega bo'lishim kerak?",
                answer:
                  "Yaxshi Netlivy jamoasi aʼzosi bo'lishingiz uchun Linux boshqaruvi, tarmoq asoslari, dasturlash/skriptlash (Python, Bash), bulut platformalari, konteynerlar, CI/CD, kod sifatida infratuzilma va monitoring bo'yicha ko'nikmalarga ega bo'lishingiz kerak.",
              },
              {
                question: "DevOpsni o'rganish qancha vaqt oladi?",
                answer:
                  "DevOpsni o'rganish vaqti sizning tajribangiz va fidoyiligingizga qarab o'zgaradi. Texnik ma'lumot bilan siz 3-6 oy ichida asoslarni o'zlashtira olasiz. Mohir bo'lish odatda 1-2 yil davom etadi.",
              },
              {
                question: "Avval Docker yoki Kubernetesni o'rganishim kerakmi?",
                answer:
                  "Kubernetesga o'tishdan oldin Docker bilan boshlashingiz kerak. Docker sizga Kubernetesni tushunish uchun asosiy bo'lgan konteynerizatsiya tushunchalarini o'rgatadi. Docker bilan ishlashni o'rganganingizdan so'ng, Kuberne",
              },
              {
                question:
                  "Avval qaysi bulut provayderini o'rganishim kerak - AWS, Azure yoki GCP?",
                answer:
                  "AWS ko'pincha bozorda ustunlik qilishi va keng hujjatlarga ega bo'lishi sababli yangi boshlanuvchilar uchun tavsiya etiladi. Biroq, eng yaxshi tanlov sizning martaba maqsadlaringiz va mahalliy mehnat bozoriga bog'liq. Siz o'rganadigan asosiy tushunchalar ",
              },
              {
                question: "DevOps yaxshi martaba yo'limi?",
                answer:
                  "Ha, DevOps - bu kuchli talab, raqobatbardosh maosh va o'sish imkoniyatlariga ega ajoyib martaba yo'li. Tashkilotlar bulutli va avtomatlashtirish texnologiyalarini qabul qilishda davom etar ekan, DevOpsning ya'ni Netlivyning malakali mutaxassislariga ehtiyoj ortib bormoqda.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Hali ham savollar bor? Biz yordam beramiz!
            </p>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-all duration-300"
            >
              <span className="font-medium">Contact our team</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
