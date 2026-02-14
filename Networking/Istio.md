# Istio Cheatsheet

![text](https://imgur.com/QLlMSCp.png)

## **Umumiy ko'rinish**

Istio - bu ochiq manbali xizmat to'ri bo'lib, u mavjud taqsimlangan ilovalarga shaffof tarzda qatlamlanadi. U mikroservislarning bir-biri bilan ma'lumot almashishini nazorat qilish usulini taqdim etadi. Istio-ning asosiy xususiyatlariga trafikni boshqarish, xavfsizlik va kuzatuvchanlik kiradi.

### **Asosiy tushunchalar**

- **Xizmatlar tarmog'i:** Istio xizmatlar tarmog'ini yaratadi, bu mikroservislarning bir-biri bilan xavfsiz va samarali muloqot qilishiga imkon beruvchi infratuzilma qatlamidir. Shuningdek, u mikroservislarning o'ziga o'zgartirish kiritishni talab qilmasdan, transport oqimini boshqarish va monitoring qilish imkonini beradi.
  
- **Boshqaruv tekisligi va ma'lumotlar tekisligi: * * Istioning arxitekturasi ikki tekislikka bo'lingan:
  - **Boshqaruv tekisligi: * * proksi-serverlarni trafikni yo'naltirish, siyosatni amalga oshirish va telemetriyani yig'ish uchun boshqaradi va sozlaydi.
  - **Ma'lumotlar tekisligi: * * mikroservislarga sidecars sifatida joylashtirilgan elchi proksi-serverlaridan iborat bo'lib, xizmatlar o'rtasidagi barcha tarmoq trafigini boshqaradi.

### * * Asosiy Komponentlar**

- **Envoy Proxy:** Istio ma'lumotlar tekisligining asosiy komponenti. Envoy har bir xizmatga yonma-yon o'rnatiladi va barcha kiruvchi va chiquvchi trafikni ushlab turadi.

- **Uchuvchi:** Envoy proksi-serverlarining konfiguratsiyasini boshqaradi, marshrutlash qoidalari va siyosatlarini tarmoq bo'ylab taqsimlaydi.

- **Mikser:** Kirish nazorati va foydalanish siyosatini amalga oshiradi hamda telemetriya ma'lumotlarini to'playdi. U Envoy proksi-serverlari bilan o‘zaro aloqada bo‘lib, trafik shakllari va xavfsizlik haqida ma’lumot beradi.

- **Citadel:** Tarmoq ichidagi o‘zaro TLS (mTLS) va xizmat identifikatorlari uchun sertifikatlar va kalitlarni boshqaradi, bu esa xizmatlar o‘rtasidagi xavfsiz aloqani ta’minlaydi.

- **Galley:** Istio konfiguratsiyasini tekshirish komponenti. U konfiguratsiyalarning to'g'riligini ta'minlaydi va ularni tarmoq ichidagi tegishli komponentlarga taqsimlaydi.

### **Trafikni boshqarish**

- **VirtualService:** Trafikning xizmatga qanday yo'naltirilishini belgilovchi resurs. Bu so'rovlarni moslashtirish, trafikni taqsimlash va boshqalar kabi murakkab marshrutlash qoidalarini sozlash imkonini beradi.

- **DestinationRule:** Belgilangan joyga yo'naltirilgandan keyin trafikka tegishli siyosatlarni belgilaydi. Bu siyosatlar yukni muvozanatlash sozlamalari, ulanish hovuzlari o'lchamlari va chetlanishlarni aniqlashni o'z ichiga olishi mumkin.

- **Gateway:** To'rga kiruvchi tashqi trafikni boshqaradi. U klasterdan tashqaridagi trafikning to'rga qanday yo'naltirilishini va tegishli xizmatlarga yo'naltirilishini nazorat qiladi.

- **Sidecar:** Bu resurs mikroservislar bilan birga joylashtirilgan sidecar proksi-serverlarining xatti-harakatlarini sozlaydi. Bu trafikni boshqarish va resurslardan foydalanishni nozik nazorat qilish imkonini beradi.

### **Xavfsizlik**

- **mTLS (Mutual TLS):** Istio xizmatdan xizmatga aloqani ta'minlash uchun mTLS-ni qo'llab-quvvatlaydi. mTLS mijoz va serverning identifikatori autentifikatsiya qilinishini va ular orasidagi aloqa shifrlanganligini ta'minlaydi.

- **Avtorizatsiya siyosati:** Bu siyosatlar qaysi xizmatlar yoki foydalanuvchilar muayyan resurslarga kirishi mumkinligini aniqlab, kirishni boshqarish qoidalarini belgilaydi. Siyosatlar global miqyosda, nom maydoniga yoki ish yukiga qarab qo‘llanilishi mumkin.

- **Kirish/chiqish nazorati:** Istio xavfsizlik siyosatiga muvofiqligini ta'minlash uchun kiruvchi va chiquvchi trafikni boshqaradi. Kirish tashqi trafikning tarmoqqa qanday kirishini nazorat qiladi, chiqish esa trafikning tarmoqdan qanday chiqishini boshqaradi.

### **Kuzatuvchanlik**

- **Telemetriya:** Istio metrikalar, jurnallar va izlar kabi telemetriya ma'lumotlarini to'playdi, bu sizning mikroservislaringizning xatti-harakatlari haqida chuqur tushunchalar beradi. Bu ma'lumotlar ilovalarni kuzatish va disk raskadrovka qilish uchun zarurdir.

- **Prometheus:** Istio Prometheus bilan integratsiyalashgan bo'lib, u Envoy proksi-serverlaridan ko'rsatkichlarni yig'adi. Bu ko'rsatkichlarni Grafana kabi vositalar yordamida vizualizatsiya qilish mumkin.

- **Grafana:** Prometheus tomonidan to'plangan ko'rsatkichlarni aks ettiruvchi asboblar panelini yaratish uchun foydalaniladigan vizualizatsiya vositasi. Istio xizmat tarmog'ini kuzatish uchun oldindan tuzilgan Grafana boshqaruv panellarini taqdim etadi.

- **Jaeger/Zipkin:** Istio bilan integratsiyalashgan taqsimlangan kuzatuv vositalari. Ular so'rovning tarmoqdagi turli xizmatlar orqali o'tish yo'lini kuzatish imkonini beradi, bu esa unumdorlik bilan bog'liq muammolar va xatolarni aniqlashga yordam beradi.

### **Ilg'or tushunchalar**

- **Kanareykali joylashtirishlar:** Istio xizmatning yangi versiyasini foydalanuvchilarning kichik bir qismiga bosqichma-bosqich tarqatish imkonini beradi va uni to'liq joylashtirishdan oldin uning ishlashini kuzatib boradi.

- **Trafikni aks ettirish:** Bu xususiyat sizga jonli trafikning bir qismini ishlab chiqarish trafigiga ta'sir qilmasdan yangi xizmat versiyasiga aks ettirish imkonini beradi. Bu yangi versiyalarni real muhitda sinab ko'rish uchun foydalidir.

- **Tarmoqni uzish:** Bir vaqtning o'zida ulanishlar yoki so'rovlar sonini cheklash orqali xizmatlarning haddan tashqari yuklanishini oldini oladi. Agar chegaraga erishilsa, Istio xatolikni qaytarishi yoki trafikni zaxira xizmatiga yo'naltirishi mumkin.

- **Tezlikni cheklash:** Xizmatga so'rovlar yuborilish tezligini nazorat qiladi, ortiqcha yuklanishning oldini oladi. Tezlik chegaralari foydalanuvchi identifikatori yoki manba IP kabi turli omillarga qarab belgilanishi mumkin.

- **Kirish/chiqish siyosati:** Bu siyosatlar xizmat tarmog‘iga qanday trafik kirishiga yoki undan chiqib ketishiga ruxsat berilishini nazorat qiladi, oldindan belgilangan qoidalar asosida kirishni cheklash orqali xavfsizlikni oshiradi.

- **Xizmat yozuvlari:** To'rni tarmoqdan tashqaridagi xizmatlarga kengaytiring, bu ularga xuddi to'r ichida bo'lgandek munosabatda bo'lish imkonini beradi. Bu tashqi xizmatlarni boshqarish va himoya qilish uchun foydalidir.

### **Foydalanish misollari**

Xizmatning turli versiyalari o'rtasidagi trafikni boshqarishingiz kerak bo'lgan mikroservislar arxitekturasini ko'rib chiqing. Istio yordamida siz quyidagilarni qilishingiz mumkin:

1. **Yangi versiyani joylashtirish:** Virtual xizmatdan foydalanib, trafikning 10 foizini xizmatingizning yangi versiyasiga yo‘naltiring.
2. **Yangi versiyani kuzatib boring:** Yangi versiya kutilganidek ishlashini ta'minlash uchun telemetriya ma'lumotlarini to'plang.
3. **Trafikni asta-sekin oshiring:** Agar yangi versiya barqaror bo'lsa, trafik foizini asta-sekin oshiring.
4. **Agar kerak bo'lsa, orqaga qaytaring:** Muammolar aniqlansa, Istio-ning trafikni boshqarish imkoniyatlaridan foydalangan holda barcha trafikni tezda oldingi versiyaga qaytaring.