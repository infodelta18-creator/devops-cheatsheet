# SonarQube Cheatsheet

![text](https://imgur.com/l49w71S.png)

**1. Kirish:**

- **SonarQube** kod sifatini doimiy ravishda tekshirish uchun mashhur ochiq kodli platforma bo'lib, xatolar, kod hidlari va xavfsizlik zaifliklarini aniqlash uchun kodni statik tahlil qilish bilan avtomatik ko'rib chiqishlarni amalga oshiradi.

**2. O'rnatish:**

- **SonarQube ni o'rnatish:**
  - Dockerda:

    ```bash
    docker run -d --name sonarqube -p 9000:9000 sonarqube
    ```

  - Linuxda qo'lda o'rnatish:

    ```bash
    wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-8.9.0.43852.zip
    unzip sonarqube-8.9.0.43852.zip
    cd sonarqube-8.9.0.43852/bin/linux-x86-64
    ./sonar.sh start
    ```

- **SonarQube ishga tushirilmoqda:**
  - SonarQube’ga kirish `http://localhost:9000`.
  - Standart hisob ma'lumotlari: `admin/admin`.

**3. SonarQube-ni sozlash:**

- **Ma'lumotlar bazasi konfiguratsiyasi:**
  - SonarQube PostgreSQL, MySQL yoki Oracle kabi ma'lumotlar bazasini talab qiladi.
  - `sonar.properties` faylida ma'lumotlar bazasi ulanishini sozlang:

    ```properties
    sonar.jdbc.url=jdbc:postgresql://localhost/sonarqube
    sonar.jdbc.username=sonar
    sonar.jdbc.password=sonar
    ```

- **Sifat profillarini sozlash:**
  - Sifat profillari SonarQube kod tahlili uchun foydalanadigan qoidalar to'plamini belgilaydi.
  - Foydalanuvchi interfeysining **Sifat profillari** bo'limida profillar yarating yoki sozlang.

**4. Yugurish tahlili:**

- **SonarQube skaneridan foydalanish:**
  - Skanerni o'rnating:

    ```bash
    npm install -g sonarqube-scanner
    ```

  - Skanerlashni ishga tushiring:

    ```bash
    sonar-scanner \
      -Dsonar.projectKey=my-project \
      -Dsonar.sources=. \
      -Dsonar.host.url=http://localhost:9000 \
      -Dsonar.login=admin \
      -Dsonar.password=admin
    ```

- **CI/CD bilan integratsiya:**
  - Kod tahlilini avtomatlashtirish uchun SonarQube-ni Jenkins, GitLab CI yoki boshqa CI/CD vositalari bilan integratsiya qiling.

**5. SonarQube plaginlari:**

- **Plaginlarni o'rnatish:**
  - SonarQube’da **Administratsiya > Bozor** bo‘limiga o‘ting va plaginlarni qidiring.
  - Ommabop plaginlar qatoriga SonarLint, SonarCSS va SonarTS kiradi.

- **SonarQube va IDE integratsiyasi:**
  - **SonarLint** - bu real vaqt rejimida kod sifati bo'yicha fikr-mulohazalarni olish uchun IntelliJ, Eclipse va VS Code kabi IDElar bilan integratsiyalashgan plagin.

**6. Kengaytirilgan xususiyatlar:**

- **Kod qamrovi:**
  - SonarQube sinov qamrovi haqida hisobot berish uchun Java uchun Jacoco va JavaScript uchun Istanbul kabi kod qamrovi vositalari bilan integratsiyalashgan.

- **Xavfsizlik zaifliklari:**
  - SonarQube zaifliklarni aniqlaydi va OWASP va SANS standartlariga asoslangan holda tuzatish bo'yicha ko'rsatmalar beradi.

**7. Foydalanuvchilar va ruxsatnomalarni boshqarish:**

- **Foydalanuvchi boshqaruvi:**
  - **Xavfsizlik** bo'limiga foydalanuvchilar va guruhlarni qo'shing.
  - **Admin**, **Foydalanuvchi** yoki **Kod ko'ruvchi** kabi rollarni tayinlang.

- **LDAP/SSO integratsiyasi:**
  - Markazlashtirilgan foydalanuvchi autentifikatsiyasi uchun `sonar.properties` da LDAP yoki SSO ni sozlang.

**8. Monitoring va hisobot berish:**

- **Loyiha boshqaruv panellari:**
  - SonarQube har bir loyiha uchun batafsil boshqaruv panellarini taqdim etadi, kod qamrovi, takrorlanishlar va vaqt o'tishi bilan muammolar kabi ko'rsatkichlarni ko'rsatadi.

- **Maxsus hisobotlar:**
  - Boshqaruv yoki muvofiqlik maqsadlari uchun batafsil ko'rsatkichlar va tendentsiyalar bilan maxsus hisobotlarni yarating.

**9. SonarQube masshtablash:**

- **Yuqori darajadagi mavjudlik:**
  - SonarQube dasturini klaster rejimida bir nechta tugunlar va yuk balanslashtiruvchisini sozlash orqali ishga tushiring.
  - Klaster sozlamalarini `sonar.properties` faylida sozlang.

- **Ishlashni optimallashtirish:**
  - SonarQube’ni kattaroq joylashtirish uchun alohida ma’lumotlar bazasidan foydalaning va serverga yetarli resurslarni ajrating.

**10. SonarQube bilan bog'liq muammolarni bartaraf etish:**

- **Umumiy muammolar:**
  - **Xotira tugab qoldi:** `sonar.properties` da JVM uyum hajmini oshiring.
  - **Muvaffaqiyatsiz skanerlashlar:** Batafsil xato xabarlari uchun `logs/` katalogidagi jurnallarni tekshiring.

- **Nosozliklarni tuzatish:**
  - `sonar.properties` da disk raskadrovka jurnalini yoqish:

    ```properties
    sonar.log.level=DEBUG
    ```
