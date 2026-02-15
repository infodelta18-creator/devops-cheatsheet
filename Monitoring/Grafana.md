# Grafana Cheatsheet

![text](https://imgur.com/j07r4L6.png)

**1. Kirish:**

- **Grafana** - bu Prometheus, InfluxDB, Elasticsearch va boshqalar kabi bir nechta ma'lumotlar manbalaridan olingan ko'rsatkichlarni so'rash, vizualizatsiya qilish va ogohlantirish imkonini beruvchi ochiq manbali monitoring va kuzatish platformasi.

**2. Asosiy tushunchalar:**

- **Boshqaruv paneli:** Tarmoqqa joylashtirilgan panellar to'plami.
- **Panel:** Muayyan ma'lumotlar manbasidan olingan ma'lumotlarning vizualizatsiyasi (grafiklar, diagrammalar va boshqalar).
- **Ma'lumotlar manbai:** Grafana vizualizatsiya qilish uchun ko'rsatkichlarni taqdim etadigan ma'lumotlar bazasi yoki xizmat.
- **Ogohlantirish:** Metrikalar muayyan mezonlarga javob berganda bildirishnomalarni ishga tushirish shartlarini o'rnating.

**3. O'rnatish:**

- **Grafanani ishga tushirish:**

  ```bash
  sudo apt-get install -y adduser libfontconfig1
  wget https://dl.grafana.com/oss/release/grafana_7.5.7_amd64.deb
  sudo dpkg -i grafana_7.5.7_amd64.deb
  sudo systemctl start grafana-server
  sudo systemctl enable grafana-server
  ```

- **Docker:**

  ```bash
  docker run -d -p 3000:3000 --name=grafana grafana/grafana
  ```

**4. Ma'lumot manbalarini sozlash:**

- **Prometheusni ma'lumot manbai sifatida qo'shish:**
  1. **Konfiguratsiya > Ma'lumotlar manbalari** ga o'ting.
  2. Bosing **Add data source** va tanlang **Prometheus**.
  3. Prometheus serveringizning URL manzilini kiriting (e.g., `http://localhost:9090`).
  4. Bosing **Save & Test** ulanishni tekshirish uchun.

- **Elasticsearch’ni ma’lumot manbai sifatida qo‘shish:**
  1. Navigatsiya qiling **Configuration > Data Sources**.
  2. Bosing **Add data source** va tanlang **Elasticsearch**.
  3. URL manzilini, indeks nomini va vaqt maydonini kiriting.
  4. Bosing **Save & Test** ulanishni tekshirish uchun.

**5. Qurilish boshqaruv panellari (Building Dashboards):**

- **Yangi boshqaruv paneli yaratish:**
  1. Bosing **+** yon paneldagi belgini bosing va tanlang **Dashboard**.
  2. Bosing **Add new panel**.
  3. Ma'lumotlar manbasini tanlang va so'rov yozing (masalan, Prometheus uchun `rate(http_requests_total[5m])`).
  4. Vizualizatsiya turini tanlang (masalan, **Graph**, **Stat**, **Gauge**).
  5. Panelni va boshqaruv panelini saqlang.

- **Foydalanish Variables:**
  - **Variable yaratish:**
    1. Boring **Dashboard settings** > **Variables** > **New**.
    2. **Ism**, **Tur** (masalan, **So'rov**) va **So'rov** ni o'rnating.
    3. Panel so'rovlarida o'zgaruvchidan **`$variable_name`** sifatida foydalaning.

**6. Ogohlantirish (Alerting):**
 
- **Ogohlantirishlar yaratish:**

  1. Boshqaruv paneliga panel qo'shing.
  2. Ichida **Alert** yorliq, bosing **Create Alert**.
  3. O'rnating **Conditions** ogohlantirishni ishga tushirish uchun (masalan, metrik chegaradan o'tganda).
  4. Aniqlang **Evaluation Interval** va **No Data** variantlar.
  5. Elektron pochta, Slack yoki boshqa kanallar orqali bildirishnomalar yuborish uchun **Notifications** ni sozlang.

- **Ogohlantirishlarni boshqarish:**
  - Ogohlantirishlarni yon paneldagi **Ogohlantirish** bo'limi orqali markaziy ravishda boshqarish mumkin.

**7. Grafana plaginlari:**

- **Plaginlarni o'rnatish:**

  ```bash
  grafana-cli plugins install grafana-piechart-panel
  sudo systemctl restart grafana-server
  ```

- **Ommabop plaginlar:**
  - **Pie Chart Panel:** Ko'rsatkichlarni doira shaklidagi diagrammada ko'rsatish.
  - **Worldmap Panel:** Dunyo xaritasida ma'lumotlarni vizualizatsiya qiling.
  - **Alert List Panel:** Bir nechta manbalardan faol ogohlantirishlarni ko'rsatish.

**8. Boshqaruv paneli shabloni:**

- **Shablonlangan boshqaruv panellaridan foydalanish:**
  - Foydalanuvchi kiritishiga qarab o'zgarishi mumkin bo'lgan dinamik boshqaruv panellarini yaratish uchun o'zgaruvchilardan foydalaning.

- **Dinamik panellar:**
  - O'zgaruvchan qiymatlar asosida takrorlanadigan panellar yoki qatorlar yarating (masalan, har bir xost uchun ko'rsatkichlarni ko'rsatish).

**9. Grafanani sozlash:**

- **Mavzular:**
  - Boshqaruv paneli sozlamalarida **Preferences** orqali yorug' va qorong'i mavzular o'rtasida almashinish mumkin.


- **Maxsus brending:**
  - Maxsus logotiplar va ranglarni qo'shish orqali Grafana ko'rinishini o'zgartiring. Konfiguratsiya fayllari va CSS-ni tahrirlashni talab qiladi.

**10. Grafanani himoya qilish:**

- **Foydalanuvchi boshqaruvi:**
  - Foydalanuvchilarni qo'shing va ularga Tomoshabin, Muharrir yoki Administrator kabi rollarni tayinlang.

- **LDAP/SSO integratsiyasi:**
  - Grafana’ni foydalanuvchi autentifikatsiyasi uchun LDAP yoki bitta kirish (SSO) dan foydalanish uchun sozlang.

- **HTTPSni yoqish:**

  ```yaml
  [server]
  protocol = https
  cert_file = /path/to/cert.crt
  cert_key = /path/to/cert.key
  ```

**11. Murakkab so'rovlar va vizualizatsiyalar:**

- **PromQL bilan Grafana:**
  - Murakkabroq vizualizatsiyalar uchun ilg'or PromQL so'rovlaridan foydalaning.

- **Izohlar:**
  - Grafiklardagi muayyan hodisalarni belgilash uchun izohlar qo'shing, bu muammolarni o'zgarishlar yoki hodisalar bilan bog'lash uchun foydalidir.

**12. Grafana Loki:**

- **Loki bilan tanishish:**
  - Grafana Loki - bu Prometeydan ilhomlanib, gorizontal ravishda masshtablanadigan, yuqori darajada mavjud bo'lgan log agregatsiyasi tizimi.

- **Loki-ni sozlash:**

  ```bash
  docker run -d --name=loki -p 3100:3100 grafana/loki:2.2.0 -config.file=/etc/loki/local-config.yaml
  ```

- **Grafanada jurnallarga so'rov yuborish:**
  - **Loki** dan ma'lumotlar manbai sifatida foydalanib, metrikalar bilan birga jurnallarga so'rov yuboring va ularni vizualizatsiya qiling.

**13. Kubernetesdagi Grafana:**

- **Kubernetesda Grafanani joylashtirish:**

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: grafana
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: grafana
    template:
      metadata:
        labels:
          app: grafana
      spec:
        containers:
        - name: grafana
          image: grafana/grafana:7.5.7
          ports:
          - containerPort: 3000
  ```

**14. Grafana bilan bog'liq muammolarni bartaraf etish:**

- **Umumiy Issues:**
  - **No Data:** Ma'lumotlar manbai konfiguratsiyasi va so'rovlarini tekshiring.
  - **Slow Dashboards:** So'rovlarni optimallashtiring va vaqt oralig'ini qisqartiring.
  - **Plugin Errors:** Plaginlarning Grafana versiyangiz bilan mos kelishiga ishonch hosil qiling.

- **Nosozliklarni tuzatish:**
  - Xatolar haqida batafsil ma'lumot olish uchun `/var/log/grafana/grafana.log` manzilidagi jurnallarni ko'ring.
  - Ma'lumotlar manbasiga ulanish holatini tekshirish uchun **`curl`** dan foydalaning (masalan, Prometheus uchun `curl http://localhost:9090`).
