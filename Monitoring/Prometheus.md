# Prometheus Cheatsheet

![text](https://imgur.com/nthHFQk.png)

**1. Kirish:**

- **Prometheus** - bu ochiq manbali tizimlarni kuzatish va ogohlantirish vositasi bo'lib, ayniqsa Kubernetes kabi dinamik, bulutga asoslangan muhitlarni kuzatish uchun juda mos keladi. U sozlangan so'nggi nuqtalardan ko'rsatkichlarni olish uchun tortish modelidan foydalanadi.

**2. Asosiy tushunchalar:**

- **Metrics:** Vaqt o'tishi bilan to'plangan ma'lumotlar nuqtalari, odatda vaqt qatorlari shaklida.
- **PromQL:** To'plangan ko'rsatkichlarni so'rash uchun ishlatiladigan Prometheus so'rovlar tili.
- **Exporters:** Prometheus qirib oladigan formatda metriklarni oshkor qiladigan komponentlar.
- **Alertmanager:** Prometheus tomonidan yaratilgan ogohlantirishlarni boshqaradi.

**3. O'rnatish:**

- **Prometey ni ishlatish:**

  ```bash
  wget https://github.com/prometheus/prometheus/releases/download/v2.30.0/prometheus-2.30.0.linux-amd64.tar.gz
  tar xvfz prometheus-*.tar.gz
  cd prometheus-*
  ./prometheus --config.file=prometheus.yml
  ```

- **Docker:**

  ```bash
  docker run -p 9090:9090 prom/prometheus
  ```

**4. Prometheus konfiguratsiyasi:**

- **Asosiy `prometheus.yml` konfiguratsiyasi:**

  ```yaml
  global:
    scrape_interval: 15s

  scrape_configs:
    - job_name: 'prometheus'
      static_configs:
        - targets: ['localhost:9090']
  ```

- **Maqsadlarni qo'shish:**

  ```yaml
  - job_name: 'node_exporter'
    static_configs:
      - targets: ['localhost:9100']
  ```

**5. Prometheus so'rovlar tili (PromQL):**

- **Asosiy so'rovlar:**

  ```promql
  up
  rate(http_requests_total[5m])
  ```

- **Agregatsiyalar:**

  ```promql
  sum(rate(http_requests_total[5m]))
  avg_over_time(http_requests_total[5m])
  ```

- **Yozib olish qoidalari:**

  ```yaml
  groups:
  - name: example
    rules:
    - record: job:http_inprogress_requests:sum
      expr: sum(http_inprogress_requests) by (job)
  ```

**6. Eksportchilar:**

- **Node Exporter:** Tizim darajasidagi ko'rsatkichlarni to'playdi.

  ```bash
  wget https://github.com/prometheus/node_exporter/releases/download/v1.2.2/node_exporter-1.2.2.linux-amd64.tar.gz
  tar xvfz node_exporter-*.tar.gz
  ./node_exporter
  ```

- **Custom Exporter:** Python yordamida maxsus eksportchi yozish.

  ```python
  from prometheus_client import start_http_server, Gauge
  import random
  import time

  g = Gauge('random_number', 'A random number')

  def generate_random_number():
      while True:
          g.set(random.random())
          time.sleep(5)

  if __name__ == '__main__':
      start_http_server(8000)
      generate_random_number()
  ```

**7. Ogohlantirishlar va Ogohlantirish menejeri:**

- **Ogohlantirish qoidalari:**

  ```yaml
  groups:
  - name: example
    rules:
    - alert: HighMemoryUsage
      expr: node_memory_Active_bytes / node_memory_MemTotal_bytes * 100 > 90
      for: 5m
      labels:
        severity: critical
      annotations:
        summary: "High memory usage detected on {{ $labels.instance }}"
        description: "Memory usage is above 90% for more than 5 minutes."
  ```

- **Alertmanager konfiguratsiyasi:**

  ```yaml
  global:
    resolve_timeout: 5m

  route:
    group_by: ['alertname']
    receiver: 'email'

  receivers:
  - name: 'email'
    email_configs:
    - to: 'your-email@example.com'
      from: 'prometheus@example.com'
      smarthost: 'smtp.example.com:587'
      auth_username: 'username'
      auth_password: 'password'
  ```

**8. Prometey Federatsiyasi:**

- **Federatsiyani tashkil qilish:**

  ```yaml
  scrape_configs:
  - job_name: 'federate'
    honor_labels: true
    metrics_path: '/federate'
    params:
      match[]:
        - '{job="prometheus"}'
    static_configs:
      - targets:
        - 'prometheus-server-1:9090'
        - 'prometheus-server-2:9090'
  ```

**9. Prometheus yordamida Kubernetesni kuzatish:**

- **Prometeyni Kubernetesga joylashtirish (deploy) :**

  ```yaml
  apiVersion: monitoring.coreos.com/v1
  kind: Prometheus
  metadata:
    name: prometheus
  spec:
    replicas: 1
    serviceAccountName: prometheus
    serviceMonitorSelector:
      matchLabels:
        team: frontend
    resources:
      requests:
        memory: 400Mi
    storage:
      volumeClaimTemplate:
        spec:
          storageClassName: standard
          resources:
            requests:
              storage: 50Gi
  ```

- **ServiceMonitor misoli:**

  ```yaml
  apiVersion: monitoring.coreos.com/v1
  kind: ServiceMonitor
  metadata:
    name: example-monitor
  spec:
    selector:
      matchLabels:
        app: example
    endpoints:
      - port: web
  ```

**10. Ilg'or Prometey kontseptsiyalari:**

- **Thanos:** Prometeyni uzoq muddatli saqlash, global so'rovlar va namuna olish bilan kengaytiradi.
- **Cortex:** Xizmat sifatida ko'p ijarachi, gorizontal ravishda kengaytiriladigan Prometey.

**11. Prometheus Xavfsizlik:**

- **Asosiy autentifikatsiya:**

  ```yaml
  basic_auth:
    username: admin
    password: admin
  ```

- **TLS/SSL konfiguratsiyasi:**

  ```yaml
  tls_config:
    ca_file: /etc/prometheus/certs/ca.crt
    cert_file: /etc/prometheus/certs/prometheus.crt
    key_file: /etc/prometheus/certs/prometheus.key
  ```

**12. Prometey bilan bog'liq muammolarni bartaraf etish:**

- **Umumiy Issues:**
  - **High Cardinality Metrics:** Juda ko'p noyob vaqt seriyalari Prometeyni yengib chiqishi mumkin.
  - **Slow Queries:** Yuqori kardinallikdan qochish va samarali agregatlardan foydalanish orqali so'rovlarni optimallashtiring.

- **Nosozliklarni tuzatish:**
  - Konfiguratsiya fayllarini tekshirish uchun **`protocol`** buyruq qatori vositasidan foydalaning.
  - **Prometheus UI** so'rovlarni tuzatish va vaqt qatori ma'lumotlarini tekshirish uchun interfeysni taqdim etadi.
