# Linkerd Cheatsheet

![text](https://imgur.com/xyQcgGf.png)

## **Umumiy ko'rinish**

Linkerd - bu kuzatish, xavfsizlik va ishonchlilik uchun kuchli xususiyatlarni ta'minlagan holda ishlatish uchun qulay bo'lgan engil xizmat tarmog'i. Ba'zi boshqa xizmat tarmoqlaridan farqli o'laroq, Linkerd minimal konfiguratsiya va ishlashga qaratilgan.

### **Asosiy tushunchalar**

- **Service Mesh:** Linkerd mikroservislar o'rtasida xavfsiz, ishonchli va kuzatilishi mumkin bo'lgan aloqani ta'minlaydigan infratuzilma qatlamini taqdim etadi. U shaffof ishlaydi va xizmatlaringizga minimal o'zgarishlar kiritishni talab qiladi.

- **Boshqaruv tekisligi:** Linkerd boshqaruv tekisligi xizmat tarmog'ining konfiguratsiyasi va xatti-harakatlarini boshqaradi. U siyosatlarni boshqarish, telemetriyani yig'ish va sertifikatlar berish uchun komponentlarni o'z ichiga oladi.

- **Ma'lumotlar tekisligi:** Ma'lumotlar tekisligi har bir xizmatga yonma-yon o'rnatilgan engil proksilardan iborat. Ushbu proksi-serverlar barcha kiruvchi va chiquvchi trafikni boshqaradi, mTLS, qayta urinishlar va yuklarni muvozanatlash kabi xususiyatlarni taqdim etadi.

### **Trafikni boshqarish**

- **Marshrutlash:** Linkerd xizmatdan xizmatga aloqa qilish uchun marshrutlashni avtomatik ravishda boshqaradi. U qayta urinishlar va vaqt tugashlarini boshqaradi, bu esa so'rovlarning samarali va ishonchli yo'naltirilishini ta'minlaydi.

- **Yuklarni muvozanatlash:** Linkerd har qanday alohida misolni haddan tashqari yuklamaslik uchun trafikni mavjud xizmat namunalari bo'ylab taqsimlaydi. U trafikni samarali muvozanatlash uchun tasodifiy va eng kam so'rov kabi algoritmlardan foydalanadi.

- **Trafikni taqsimlash:** Linkerd sizga xizmatning turli versiyalari o'rtasida trafikni taqsimlash imkonini beradi. Bu kanareykalarni joylashtirish uchun foydalidir, bunda trafikning kichik bir qismi to'liq ishga tushirilgunga qadar yangi versiyaga yuboriladi.

### **Xavfsizlik**

- **mTLS:** Linkerd xizmatlar orasidagi barcha aloqalar uchun o'zaro TLS (mTLS) ni taqdim etadi. Bu barcha trafik shifrlanganligini va mijoz ham, server ham autentifikatsiya qilinganligini ta'minlaydi.

- **Identifikatsiya xizmati:** Linkerd proksi-serverlar uchun TLS sertifikatlarini chiqaradigan va yangilaydigan identifikatsiya xizmatini o'z ichiga oladi. Bu xizmat mTLS uchun ishlatiladigan kriptografik identifikatorlarni boshqaradi.

- **Avtorizatsiya:** Linkerdning mTLS ham avtorizatsiya mexanizmi sifatida ishlaydi, bu faqat vakolatli xizmatlar bir-biri bilan muloqot qilishini ta'minlaydi. Bu ruxsatsiz kirishning oldini olish orqali xavfsizlikni oshiradi.

### **Kuzatuvchanlik**

- **Metrikalar:** Linkerd kechikish, muvaffaqiyat darajasi va so'rovlar hajmi kabi ko'rsatkichlarni avtomatik ravishda to'playdi va ko'rsatadi. Bu ko'rsatkichlar xizmatlaringizning salomatligi va ishlashini kuzatish uchun zarurdir.

- **Prometheus integratsiyasi:** Linkerd Prometheus bilan muammosiz integratsiyalashgan bo'lib, bu sizga ko'rsatkichlarni qirqib olish va vizualizatsiya qilish imkonini beradi. Prometheusdan Linkerd ko'rsatkichlariga asoslangan ogohlantirishlarni yaratish uchun foydalanish mumkin.

- **Grafana boshqaruv panellari:** Linkerd ko'rsatkichlarni vizualizatsiya qilish uchun oldindan tuzilgan Grafana boshqaruv panellarini taqdim etadi. Ushbu boshqaruv panellari xizmat ko'rsatish samaradorligi haqida tushuncha beradi va muammolarni aniqlashga yordam beradi.

- **Taqsimlangan kuzatuv:** Linkerd turli xizmatlar orqali o'tadigan so'rovlarni kuzatish imkonini beruvchi taqsimlangan kuzatuvni qo'llab-quvvatlaydi. Bu xizmatlarning o'zaro ta'sirini tushunish va muammolarni aniqlashga yordam beradi.

### **Ilg'or tushunchalar**

- **Xizmat profillari:** Xizmat profillari xizmatlar uchun kutilayotgan xatti-harakatlarni, masalan, qayta urinishlar, vaqt tugashi va trafikni shakllantirishni aniqlash imkonini beradi. Ular trafikni qanday boshqarish ustidan nozik nazoratni ta'minlaydi.

- **Tap API:** Tap API real vaqt rejimida jonli trafikni ko'rishni ta'minlaydi. Siz undan so'rovlar va javoblarni tekshirish uchun foydalanishingiz mumkin, bu esa uni nosozliklarni tuzatish va monitoring qilish uchun kuchli vositaga aylantiradi.

- **Trafikni o'zgartirish:** Linkerd trafikni o'zgartirishni qo'llab-quvvatlaydi, bu sizga trafikni xizmatning bir versiyasidan boshqasiga bosqichma-bosqich o'tkazish imkonini beradi. Bu, ayniqsa, yangilanishlarni xavfsiz tarqatish uchun foydalidir.

- **Ko'p klasterli qo'llab-quvvatlash:** Linkerd o'z xizmat tarmog'ini bir nechta Kubernetes klasterlari bo'ylab kengaytirishi mumkin, bu sizga turli muhitlarni qamrab oluvchi xizmatlarni boshqarish imkonini beradi. Bu yuqori mavjudlik va tabiiy ofatlarni tiklash uchun foydalidir.

- **Siyosatni amalga oshirish:** Linkerd sizga trafik marshrutini, kirishni nazorat qilish va tezlikni cheklashni boshqaradigan siyosatlarni belgilash imkonini beradi. Ushbu siyosatlar xizmatlarning turli sharoitlarda kutilganidek ishlashiga yordam beradi.

### **Foydalanish misollari**

Aytaylik, siz mikroservislar ilovasini boshqarasiz, bunda minimal qo'shimcha xarajatlar bilan kuzatuvchanlik va xavfsizlikni ta'minlash uchun engil xizmat tarmog'i kerak bo'ladi:

1. **Soddalashtirilgan joylashtirish:** Linkerd-ni minimal konfiguratsiya bilan o'rnating va avtomatik mTLS va yuk balansidan avtomatik ravishda foydalanishni boshlang.
2. **Kanareykalar nashrlari:** Trafikni bo'lishdan foydalanib, xizmatning yangi versiyasiga trafikni bosqichma-bosqich yo'naltiring va to'liq joylashtirish xavfini kamaytiring.
3. **Haqiqiy vaqtda monitoring:** Jonli trafikni kuzatish va so‘rovlar bilan bog‘liq muammolarni tezda aniqlash uchun Tap API’dan foydalaning.
4. **Xavfsiz aloqa:** Murakkab sertifikat boshqaruviga ehtiyoj sezmasdan, xizmatdan xizmatga aloqani ta'minlash uchun Linkerd's mTLS xizmatiga ishoning.
5. **Klasterlararo boshqaruv:** Yuqori mavjudlik va tabiiy ofatlarni bartaraf etishni ta'minlash uchun Linkerd xizmat tarmog'ini bir nechta Kubernetes klasterlari bo'ylab kengaytiring.