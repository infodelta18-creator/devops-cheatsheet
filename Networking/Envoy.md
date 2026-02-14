# Envoy Cheatsheet

![text](https://imgur.com/iw5sG1a.png)

## **Umumiy ko'rinish**

Envoy - bu yuqori unumdorlikka ega, ochiq manbali chekka va xizmat ko'rsatish proksi-serveridir. Dastlab Lyft tomonidan ishlab chiqilgan Envoy hozirda mikroservislar aloqasini boshqarish uchun, ayniqsa xizmat tarmoqlari ichida keng qo'llaniladi. Envoy yuklarni muvozanatlash, xavfsizlik, kuzatuvchanlik va marshrutlash kabi vazifalarni bajaradi.

### **Asosiy tushunchalar**

- **Proksi:** Envoy proksi sifatida ishlaydi, xizmatlar o'rtasida o'tiradi va barcha kiruvchi va chiquvchi trafikni boshqaradi. U oldindan belgilangan konfiguratsiyalar asosida so'rovlarni ushlab turadi, qayta ishlaydi va yo'naltiradi.

- **Tinglovchi:** Tinglovchi - bu Envoy kiruvchi ulanishlarni qanday qabul qilishi kerakligini belgilaydigan konfiguratsiya. U Envoy tinglaydigan port va protokollarni (masalan, HTTP, TCP) belgilaydi.

- **Klaster:** Envoyda klaster Envoy trafikni uzatuvchi yuqori oqim xizmatlari guruhini ifodalaydi. Klaster odatda xizmatning bir nechta misollaridan iborat bo'lib, Envoy ularga so'rovlarni tarqatish imkonini beradi.

- **Marshrut:** Marshrutlar so'rovlarni Envoy tomonidan qanday qayta ishlanishi va yuborilishini belgilaydi. Marshrut kiruvchi so'rovlarni URL yo'llari yoki sarlavhalar kabi turli mezonlarga asoslanib tegishli klasterga moslashtiradi.

### **Trafikni boshqarish**

- **Yuklarni muvozanatlash:** Envoy trafikni xizmat ko'rsatish misollari bo'ylab taqsimlash uchun bir nechta yuklarni muvozanatlash algoritmlarini taqdim etadi. Umumiy algoritmlarga aylanma, eng kam so'rov va halqa-xesh kiradi. Yuklarni muvozanatlash hech qanday misol juda ko'p trafik bilan to'lib ketmasligini ta'minlaydi.

- **Qayta urinishlar:** Envoy sozlanishi mumkin bo'lgan siyosatlar asosida muvaffaqiyatsiz so'rovlarni avtomatik ravishda qayta urinib ko'rishi mumkin. Misol uchun, agar yuqori oqim xizmati javob bermasa, Envoy so'rovni boshqa misolda qayta urinib ko'rishi mumkin.

- **O'chirgichlar:** O'chirgichlar bir vaqtning o'zida ulanishlar yoki so'rovlar sonini cheklash orqali xizmatning haddan tashqari yuklanishiga yo'l qo'ymaydi. Agar xizmat belgilangan chegaralardan oshib ketsa, Envoy xizmat tiklanmaguncha unga trafik yuborishni to'xtatadi.

- **Tariflarni cheklash:** Envoy sizga kiruvchi so'rovlar uchun tarif chegaralarini belgilash imkonini beradi, ma'lum bir davrda qancha so'rovlarga ruxsat berilishini nazorat qiladi. Bu xizmatlarning suiiste'mol qilinishi yoki ortiqcha yuklanishining oldini olish uchun foydalidir.

### **Xavfsizlik**

- **TLS ni tugatish:** Envoy TLS ni tugatish, kiruvchi trafikni shifrlash va chiquvchi trafikni shifrlash bilan shug'ullanishi mumkin. Bu sizning xizmatlaringizdagi xavfsiz aloqalarni boshqarishni osonlashtiradi.

- **mTLS (Mutual TLS):** Envoy xizmatdan xizmatga aloqani ta'minlash uchun o'zaro TLSni qo'llab-quvvatlaydi. Bu aloqa almashayotgan ikkala tomon ham bir-birini autentifikatsiya qilishini va ularning aloqasi shifrlanganligini ta'minlaydi.

- **RBAC (Rolga asoslangan kirishni boshqarish):** Envoy oldindan belgilangan rollar va ruxsatnomalar asosida xizmatlarga kirishni nazorat qilish uchun RBACni amalga oshiradi. Bu qo'shimcha xavfsizlik qatlamini qo'shib, faqat vakolatli xizmatlar yoki foydalanuvchilar muayyan resurslarga kirishini ta'minlaydi.

### **Kuzatuvchanlik**

- **Metrikalar:** Envoy tarmoq trafigi, jumladan so‘rovlar soni, kechikish, xato stavkalari va boshqalar haqida batafsil ma’lumotlarni taqdim etadi. Bu ko‘rsatkichlar xizmatlaringizning holati va ishlashini kuzatish uchun zarurdir.

- **Kirish jurnallari:** Envoy har bir so'rov uchun batafsil kirish jurnallarini yaratadi. Bu jurnallar so'rovning kelib chiqishi, javob holati va yuzaga kelgan xatolar haqidagi ma'lumotlarni o'z ichiga oladi. Kirish jurnallari audit va disk raskadrovka uchun qimmatlidir.

- **Kuzatuv:** Envoy Jaeger va Zipkin kabi taqsimlangan kuzatuv tizimlari bilan integratsiyalashgan. Kuzatuv so‘rovning turli xizmatlar orqali o‘tishining batafsil ko‘rinishini taqdim etadi, bu sizga ilovangizdagi qiyinchiliklar va nosozliklarni aniqlashga yordam beradi.

### **Ilg‘or tushunchalar**

- **Filtr zanjirlari:** Elchining filtr zanjirlari soʻrovlarni murakkab qayta ishlash imkonini beradi. Filtrlar turli shartlarga asoslanib soʻrovlarni oʻzgartirishi, yoʻnaltirishi yoki rad etishi mumkin. Umumiy filtrlarga autentifikatsiya, tezlikni cheklash va soʻrovni oʻzgartirish kiradi.

- **xDS API'lari bilan dinamik konfiguratsiya:** Envoy xDS (masalan, ADS, CDS, LDS, RDS, EDS) deb nomlanuvchi API'lar to'plami orqali dinamik konfiguratsiyani qo'llab-quvvatlaydi. Ushbu API'lar Envoyga real vaqt rejimida konfiguratsiyani qayta ishga tushirmasdan yangilash imkonini beradi. Bu qobiliyat xizmatlar doimiy ravishda o'zgarib turadigan muhitlar uchun juda muhimdir.

- **Sidecar proksi:** Xizmatlar tarmog'ida Envoy odatda har bir mikroservis bilan birga sidecar proksi sifatida o'rnatiladi. Sidecar xizmatga kiruvchi va chiquvchi barcha trafikni ushlab turadi, bu esa xavfsizlik, kuzatuvchanlik va trafikni boshqarish imkoniyatlarini ta'minlaydi.

### **Misoldan Foydalanish Holati**

Tasavvur qiling-a, siz to'lov, inventarizatsiya va foydalanuvchi xizmatlari kabi bir nechta mikroservislarga ega elektron tijorat dasturini ishlayapsiz. Mana qanday

 Elchi yordam berishi mumkin:

1. **Xavfsiz aloqa:** Mikroservislar o'rtasidagi barcha trafikni shifrlash uchun Envoyning TLS tugatish imkoniyatidan foydalaning.
2. **Yuklarni muvozanatlash:** kiruvchi so'rovlarni elchining dumaloq yuklarni muvozanatlash yordamida to'lov xizmatining bir nechta holatlarida teng ravishda taqsimlang.
3. **Tarifni cheklash:** kirish urinishlarida tarif chegarasini belgilash orqali foydalanuvchi xizmatini suiiste'mol qilishdan himoya qiling.
4. **Kuzatuvchanlik:** elchi o'lchovlari yordamida barcha mikroservislarning sog'lig'ini kuzatib boring va ogohlantirish uchun Prometey bilan integratsiya qiling.
5. **Chidamlilik:** yuqori tirbandlik davrida inventarizatsiya xizmati to'lib ketishining oldini olish uchun o'chirgichlardan foydalaning.