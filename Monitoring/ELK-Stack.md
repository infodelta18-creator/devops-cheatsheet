# ELK Stack Cheatsheet

![text](https://imgur.com/wLayBA4.png)

**1. Kirish:**

- **ELK Stack** ochiq manbali vositalarning kuchli to‘plamidir: qidiruv va tahlil uchun **Elasticsearch**, ma’lumotlarni qayta ishlash uchun **Logstash** va vizualizatsiya uchun **Kibana**. U koʻpincha maʼlumotlar yigʻish uchun **Beats** va qoʻshimcha funksiyalar uchun **X-Pack** bilan kengaytiriladi.

**2. Elasticsearch:**

- **Elasticsearch-ni o'rnatish:**

  ```bash
  wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.10.2-x86_64.rpm
  sudo rpm -ivh elasticsearch-7.10.2-x86_64.rpm
  sudo systemctl start elasticsearch
  sudo systemctl enable elasticsearch
  ```

- **Asosiy konfiguratsiya:**
  - Edit `/etc/elasticsearch/elasticsearch.yml`:

  ```yaml
  network.host: localhost
  http.port: 9200
  ```

- **Asosiy so'rovlar:**

  ```bash
  curl -X GET "localhost:9200/_cat/indices?v"
  curl -X GET "localhost:9200/my-index/_search?q=user:john"
  ```

- **Indekslash hujjatlari:**

  ```bash
  curl -X POST "localhost:9200/my-index/_doc/1" -H 'Content-Type: application/json' -d'
  {
    "user": "john",
    "message": "Salom, Elasticsearch!"
  }'
  ```

- **Elasticsearch klasteri:**
  - `elasticsearch.yml` faylida `cluster.name`, `node.name` va `discovery.seed_hosts` parametrlarini o'rnatish orqali ko'p tugunli klasterlarni sozlang.

**3. Logstash:**

- **Logstashni o'rnatish:**

  ```bash
  wget https://artifacts.elastic.co/downloads/logstash/logstash-7.10.2.rpm
  sudo rpm -ivh logstash-7.10.2.rpm
  sudo systemctl start logstash
  sudo systemctl enable logstash
  ```

- **Logstash konfiguratsiyasi:**

  ```yaml
  input {
    file {
      path => "/var/log/syslog"
      start_position => "beginning"
    }
  }
  filter {
    grok {
      match => { "message" => "%{SYSLOGLINE}" }
    }
  }
  output {
    elasticsearch {
      hosts => ["localhost:9200"]
      index => "syslog-%{+YYYY.MM.dd}"
    }
  }
  ```

- **Logstash ishga tushirish:**

  ```bash
  sudo systemctl start logstash
  ```

- **Logstash bilan Beatsdan foydalanish:**
  - Ma'lumotlarni qayta ishlash uchun Logstashga yuborish uchun **Filebeat**, **Metricbeat** yoki **Packetbeat** dan foydalaning.

**4. Kibana:**

- **Kibana o'rnatish:**

  ```bash
  wget https://artifacts.elastic.co/downloads/kibana/kibana-7.10.2-x86_64.rpm
  sudo rpm -ivh kibana-7.10.2-x86_64.rpm
  sudo systemctl start kibana
  sudo systemctl enable kibana
  ```

- **Asosiy konfiguratsiya:**
  - Edit `/etc/kibana/kibana.yml`:

  ```yaml
  server.port: 5601
  server.host: "localhost"
  elasticsearch.hosts: ["http://localhost:9200"]
  ```

- **Vizualizatsiyalarni yaratish:**
  1. Kibana interfeysida **Visualize** ga o'ting.
  2. Vizualizatsiya turini tanlang (masalan, chiziqli diagramma, doiraviy diagramma).
  3. Ma'lumot manbasini tanlang va so'rovlaringizni sozlang.
  4. Vizualizatsiyani saqlang va boshqaruv paneliga qo'shing.

- **Kibana boshqaruv panellari:**
  - Monitoring va tahlil qilish uchun foydali bo'lgan bir nechta vizualizatsiyalarni bitta ko'rinishga birlashtirish uchun boshqaruv panellaridan foydalaning.

**5. Beats:**

- **Filebeat:**
  - **Filebeat o'rnatish:**

    ```bash
    wget https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.10.2-x86_64.rpm
    sudo rpm -ivh filebeat-7.10.2-x86_64.rpm
    sudo systemctl start filebeat
    sudo systemctl enable filebeat
    ```

  - **Filebeat ni sozlash:**

    ```yaml
    filebeat.inputs:
    - type: log
      paths:
        - /var/log/syslog

    output.elasticsearch:
      hosts: ["localhost:9200"]
    ```

  - **Filebeat ishga tushirish:**

    ```bash
    sudo systemctl start filebeat
    ```

- **Metricbeat:**
  - Tizim va MySQL, Docker va boshqalar kabi xizmatlardan metriklarni to'playdi.

- **Packetbeat:**
  - Tarmoq trafikini qayd etadi va protokollarni tahlil qiladi.

**6. ELK Stackdagi xavfsizlik:**

- **Elasticsearch’da HTTPS’ni yoqish:**

  ```yaml
  xpack.security.enabled: true
  xpack.security.http.ssl.enabled: true
  xpack.security.http.ssl.keystore.path: /path/to/keystore.jks
  ```

- **Foydalanuvchi autentifikatsiyasi:**
  - Foydalanuvchilar, rollar va ruxsatlarni boshqarish uchun **X-Pack** dan foydalaning.

**7. Kubernetesdagi ELK stack:**

- **Deploying ELK Stack:**
  - Osonroq boshqarish va masshtablash uchun ELK stackini Kubernetes-ga joylashtirish uchun Helm jadvallaridan foydalaning.

**8. ELK Stack bilan bog'liq muammolarni bartaraf etish:**

- **Umumiy muammolar:**
  - **Xotiradan yuqori foydalanish:** Elasticsearch’da uyum hajmini optimallashtirish.
  - **Logstash Performance:** yo'l liniyasi ishchilarini sozlang

 va partiya hajmi.

- **Nosozliklarni tuzatish:**
  - Elasticsearch (`/var/log/elasticsearch/`), Logstash (`/var/log/logstash/`) va Kibana (`/var/log/kibana/`) uchun jurnallarni tekshiring.
  - Elasticsearch so'nggi nuqtalarini sinab ko'rish va xizmatlarning ishlashini ta'minlash uchun `curl` dan foydalaning.