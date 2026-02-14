# Trivy Cheatsheet

![text](https://imgur.com/TYu7qw7.png)

**1. Kirish:**

- **Trivy** - bu konteyner tasvirlari, fayl tizimlari va Git omborlari uchun zaifliklar, noto'g'ri konfiguratsiyalar va sirlarni aniqlaydigan keng qamrovli va foydalanish oson xavfsizlik skaneri.

**2. O'rnatish:**

- **Trivy-ni o'rnatish:**
  - Homebrew yordamida macOS’da:

    ```bash
    brew install aquasecurity/trivy/trivy
    ```

  - Linuxda:

    ```bash
    sudo apt-get install wget apt-transport-https gnupg lsb-release
    wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
    echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list.d/trivy.list
    sudo apt-get update
    sudo apt-get install trivy
    ```

  - Windows’da:
    - Ikkilik faylni yuklab oling [GitHub nashrlar](https://github.com/aquasecurity/trivy/releases).

**3. Asosiy foydalanish:**

- **Docker tasvirini skanerlash:**

  ```bash
  trivy image nginx:latest
  ```

  - Ushbu buyruq ma'lum zaifliklarni aniqlash uchun "nginx:latest" Docker tasvirini skanerlaydi.

- **Fayl tizimini skanerlash:**

  ```bash
  trivy fs /path/to/directory
  ```

  - Ushbu buyruq belgilangan katalogni zaifliklar va noto'g'ri konfiguratsiyalar uchun tekshiradi.

- **Git omborini skanerlash:**

  ```bash
  trivy repo https://github.com/user/repository
  ```

  - Ushbu buyruq butun GitHub omborini zaifliklar uchun tekshiradi.

**4. Skanerlash imkoniyatlari:**

- **Jiddiylik darajalari:** - Natijalarni og'irlik darajasiga qarab filtrlang:

    ```bash
    trivy image --severity HIGH,CRITICAL nginx:latest
    ```

  - Bu buyruq chiqishni faqat yuqori va muhim zaifliklar bilan cheklaydi.

- **Tuzatilmagan zaifliklarni e'tiborsiz qoldiring:**

  ```bash
  trivy image --ignore-unfixed nginx:latest
  ```

  - Ma'lum tuzatishlarsiz zaifliklarni chiqarib tashlaydi.

- **Chiqish formatlari:**
  - JSON:

    ```bash
    trivy image -f json -o results.json nginx:latest
    ```

  - Jadval (standart):

    ```bash
    trivy image -f table nginx:latest
    ```

**5. Kengaytirilgan foydalanish:**

- **Zaiflik ma'lumotlar bazasini yangilashni sozlash:**

  ```bash
  trivy image --skip-update nginx:latest
  ```

  - Skanerlashdan oldin zaiflik ma'lumotlar bazasini yangilashni o'tkazib yuboradi.

- **Trivy'dan Docker bilan foydalanish:**
  - Trivy ni Docker konteyneri sifatida ishga tushirish:

    ```bash
    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image nginx:latest
    ```

  - Rasmni to'g'ridan-to'g'ri registrdan olish orqali skanerlash:

    ```bash
    trivy image --docker-username <username> --docker-password <password> myregistry.com/myimage:tag
    ```

- **CI/CD quvurlari haqida qiziqarli ma'lumotlar:**
  - Qurilish bosqichlarida zaifliklarni skanerlashni avtomatlashtirish uchun Trivy-ni CI/CD ish oqimlariga integratsiya qiling.

**6. Trivy noto'g'ri konfiguratsiyasini aniqlash:**

- **Noto'g'ri konfiguratsiyalarni skanerlash:**

  ```bash
  trivy config /path/to/configuration/files
  ```

  - Xavfsizlikdagi noto'g'ri konfiguratsiyalarni aniqlash uchun konfiguratsiya fayllarini (masalan, Kubernetes, Terraform) skanerlaydi.

**7. Arzimas narsalar va sirlarni aniqlash:**

- **Sirlarni qidirish:**

  ```bash
  trivy fs --security-checks secrets /path/to/code
  ```

  - Kod bazasida parollar, API kalitlari va tokenlar kabi qattiq kodlangan sirlarni aniqlaydi.

**8. Boshqa vositalar bilan integratsiya:**

- **Trivi va Harbor:**

  - Trivy bulutga asoslangan registr bo'lgan [Harbor](https://goharbor.io/) ichida zaifliklarni skaneri sifatida ishlatilishi mumkin.

- **Trivy va Kubernetes:**
  - Trivy Kubernetes resurslarini zaifliklar va noto'g'ri konfiguratsiyalarni tekshirishi mumkin.

**9. Qiziqarli hisobotlar:**

- **Hisobotlarni yaratish:**
  - HTML Report:

    ```bash
    trivy image -f json -o report.json nginx:latest
    trivy report --input report.json --format html --output report.html
    ```

  - Jiddiylik bo'yicha batafsil hisobotlar:

    ```bash
    trivy image --severity HIGH,CRITICAL --format table nginx:latest
    ```

**10. Muammolarni bartaraf etish bo'yicha maslahatlar:**

- **Umumiy muammolar:**
  - **Sekin skanerlash:** Agar ma'lumotlar bazasi yangilanishlari zarur bo'lmasa, ularni o'tkazib yuborishni ko'rib chiqing.
  - **Tarmoq muammolari:** Tarmog'ingiz Trivy zaifliklari ma'lumotlar bazasiga kirishga ruxsat berishiga ishonch hosil qiling.

- **Nosozliklarni tuzatish:**
  - Batafsil jurnallarni ko'rish uchun `--debug` bayrog'idan foydalaning:

    ```bash
    trivy image --debug nginx:latest
    ```
