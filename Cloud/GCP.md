# GCP Cheatsheet

![text](https://imgur.com/2MpF0w5.png)

**1. Kirish:**

- **Google Cloud Platform (GCP)** - bu Google tomonidan taqdim etiladigan bulutli hisoblash xizmatlari to'plami. U hisoblash, saqlash, ma'lumotlar bazalari, mashinani o'rganish va boshqalar kabi bir qator xizmatlarni taqdim etadi.

**2. Asosiy GCP xizmatlari:**

- **Hisoblash:**
  - **Google hisoblash mexanizmi (GCE):**
    - Google infratuzilmasida ishlaydigan kengaytiriladigan virtual mashinalar.
    - Asosiy tushunchalar: Mashina turlari, tasvirlar, suratlar, doimiy disklar.
    - Misol:

      ```bash
      gcloud compute instances create my-instance --zone=us-central1-a --machine-type=e2-medium --image-family=debian-10 --image-project=debian-cloud
      ```

  - **Google Kubernetes dvigateli (GKE):**
    - Konteynerlashtirilgan ilovalarni ishga tushirish uchun boshqariladigan Kubernetes xizmati.
    - Asosiy tushunchalar: Klasterlar, Tugunlar, Podlar, Xizmatlar, Joylashtirishlar.
    - Misol:

      ```bash
      gcloud container clusters create my-cluster --zone us-central1-a --num-nodes 3
      ```

  - **Cloud funksiyalari:**
    - Hodisalarga javoban kodni bajarish uchun serversiz muhit.
    - Asosiy tushunchalar: Funksiyalar, Triggerlar, Hodisa manbalari.
    - Misol:

      ```bash
      gcloud functions deploy my-function --runtime python39 --trigger-http --allow-unauthenticated
      ```

- **Saqlash:**
  - **Google bulutli xotirasi:**
    - Ma'lumotlarni saqlash va ularga kirish uchun obyektlarni saqlash xizmati.
    - Asosiy tushunchalar: Chelaklar, Obyektlar, Sinflar (Standart, Yaqin chiziq, Coldline, Arxiv).
    - Misol:

      ```bash
      gsutil mb gs://my-bucket
      gsutil cp my-file.txt gs://my-bucket/
      ```

  - **Doimiy disklar:**
    - VM nusxalari uchun bardoshli, yuqori samarali blokli saqlash.
    - Asosiy tushunchalar: Disk turlari (Standart, SSD, Balanslangan), Snapshotlar, Zonal/Mintaqaviy disklar.
    - Misol:

      ```bash
      gcloud compute disks create my-disk --size=100GB --type=pd-ssd --zone=us-central1-a
      ```

  - **Fayllar ombori:**
    - Fayl tizimi interfeysini talab qiladigan ilovalar uchun to'liq boshqariladigan fayllarni saqlash xizmati.
    - Asosiy tushunchalar: Instanslar, Tiers (Asosiy, Yuqori miqyosli, Korxona).
    - Misol:

      ```bash
      gcloud filestore instances create my-filestore-instance --zone=us-central1-a --tier=STANDARD --file-share=name="my-share",capacity=1TB --network=name="default"
      ```

- **Ma'lumotlar bazasi (Database):**
  - **Cloud SQL:**
    - MySQL, PostgreSQL va SQL Serverni qo'llab-quvvatlaydigan boshqariladigan relyatsion ma'lumotlar bazasi xizmati.
    - Asosiy tushunchalar: Instansiyalar, Zaxira nusxalari, Ishdan chiqish, Ta'mirlash oynalari.
    - Misol:

      ```bash
      gcloud sql instances create my-instance --database-version=MYSQL_8_0 --tier=db-f1-micro --region=us-central1
      ```

  - **Cloud Kalit:**
    - Kengaytiriladigan, global miqyosda tarqalgan va kuchli izchil ma'lumotlar bazasi xizmati.
    - Asosiy tushunchalar: Instansiyalar, Ma'lumotlar bazalari, Sxemalar, Tugunlar.
    - Misol:

      ```bash
      gcloud spanner instances create my-instance --config=regional-us-central1 --nodes=1 --description="My Spanner Instance"
      ```

  - **Firestore:**
    - Mobil, veb va serverlarni ishlab chiqish uchun NoSQL hujjatlar ma'lumotlar bazasi.
    - Asosiy tushunchalar: To'plamlar, Hujjatlar, So'rovlar, Indekslar.
    - Misol:

      ```bash
      gcloud firestore databases create --region=us-central
      ```

**3. Tarmoq:**

- **VPC (Virtual Private Cloud):**
  - GCP ichidagi izolyatsiya qilingan tarmoq muhitlari.
  - Asosiy tushunchalar: Subnetlar, Marshrutlar, Xavfsizlik devorlari, VPN, O'zaro bog'lanish.
  - Misol:

    ```bash
    gcloud compute networks create my-vpc --subnet-mode=custom
    gcloud compute networks subnets create my-subnet --network=my-vpc --region=us-central1 --range=10.0.0.0/24
    ```

- **Cloud yuklarni muvozanatlash:**
  - Trafikni bir nechta holatlarda taqsimlash uchun global yuklarni muvozanatlash xizmati.
  - Asosiy tushunchalar: Frontendlar, Backendlar, URL xaritalari, Sog'liqni saqlash tekshiruvlari.
  - Misol:

    ```bash
    gcloud compute forwarding-rules create my-rule --global --target-http-proxy=my-proxy --ports=80
    ```

- **Cloud DNS:**
  - Google bilan bir xil infratuzilmada ishlaydigan boshqariladigan DNS xizmati.
  - Asosiy tushunchalar: Boshqariladigan zonalar, DNS yozuvlari, siyosatlar.
  - Misol:

    ```bash
    gcloud dns managed-zones create my-zone --dns-name="example.com." --description="My DNS zone"
    gcloud dns record-sets transaction start --zone=my-zone
    gcloud dns record-sets transaction add --zone=my-zone --name="www.example.com." --ttl=300 --type=A "1.2.3.4"
    gcloud dns record-sets transaction execute --zone=my-zone
    ```

- **Cloud CDN:**
  - Veb va video kontentni butun dunyo bo'ylab yetkazib berish uchun kontent yetkazib berish tarmog'i.
  - Asosiy tushunchalar: Orqa tomonlar, Kesh rejimlari, Imzolangan URL manzillar.
  - Misol:

    ```bash
    gcloud compute url-maps create my-url-map --default-service=my-backend-service
    gcloud compute backend-buckets create my-backend-bucket --gcs-bucket-name=my-bucket
    gcloud compute backend-buckets add-backend --url-map=my-url-map --default-backend-bucket=my-backend-bucket
    ```

**4. Xavfsizlik va shaxsni aniqlash:**

- **Identifikatsiya va kirishni boshqarish (IAM):**
  - Resurslarga kirishni nozik nazorat bilan boshqaring.
  - Asosiy tushunchalar: Rollar, Ruxsatnomalar, Siyosat, Xizmat Hisoblari.
  - Misol:

    ```bash
    gcloud projects add-iam-policy-binding my-project --member="user:example@gmail.com" --role="roles/editor"
    ```

- **Cloud Shaxs:**
  - Xizmatlar bo'ylab foydalanuvchilar va guruhlar uchun identifikatsiyani boshqarish.
  - Asosiy tushunchalar: Katalog, Guruhlar, Xavfsizlik sozlamalari, OAuth.
  - Misol:
    - Google Admin Console orqali boshqariladi.

- **Bulutli kalitlarni boshqarish xizmati (KMS):**
  - Kriptografik kalitlarni yaratish, boshqarish va ulardan foydalanish.
  - Asosiy tushunchalar: Kalit halqalar, kalitlar, versiyalar, siyosatlar.
  - Misol:

    ```bash
    gcloud kms keyrings create my-keyring --location=global
    gcloud kms keys create my-key --keyring=my-keyring --location=global --purpose=encryption
    ```

- **Bulutli xavfsizlik qo'mondonlik markazi (SCC):**
  - GCP uchun xavfsizlik va xavflarni boshqarish platformasi.
  - Asosiy tushunchalar: Topilmalar, Aktivlar, Manbalar, Xavfsizlik va sog'liqni saqlash tahlili.
  - Misol:
    - GCP konsoli orqali boshqariladi.

**5. Boshqaruv vositalari:**

- **Deployment Menejer:**
  - GCP resurslarini boshqarish uchun kod xizmati sifatida infratuzilma.
  - Asosiy tushunchalar: Shablonlar, Joylashtirishlar, Resurslar.
  - Misol:

    ```bash
    gcloud deployment-manager deployments create my-deployment --config=config.yaml
    ```

- **Stackdriver (endi Operations Suite tarkibiga kiradi):**
  - GCP uchun monitoring, jurnalga yozish va diagnostika vositasi.
  - Asosiy tushunchalar: Metrikalar, jurnallar, ogohlantirishlar, boshqaruv panellari.
  - Misol:

    ```bash
    gcloud logging write my-log "This is a log entry" --severity=ERROR
    ```

- **Cloud Konsol:**
  - GCP resurslarini boshqarish uchun veb-ga asoslangan interfeys.
  - Asosiy tushunchalar: Boshqaruv panellari, bulutli qobiq, muharrir.

- **Cloud Qobiq:**
  - Barcha GCP resurslariga kirish imkoniyatiga ega buyruq satri interfeysi.
  - Misol:

    ```bash
    gcloud config set project my-project
    ```

**6. Murakkab mavzular:**

- **Xarajatlarni boshqarish:**
  - Hisob-kitob hisobotlari va byudjetlaridan foydalanib, GCP xarajatlaringizni kuzatib boring va optimallashtiring.
  - Misol

:
    ```bash
    gcloud beta billing budgets create --billing-account=012345-67890A-BCDEF0 --display-name="My Budget" --amount=500USD
    ```

- **Avtomatik masshtablash:**
  - Talabga qarab VM nusxalari sonini avtomatik ravishda sozlang.
  - Asosiy tushunchalar: Instance Groups, Autoscaler, Metrics.
  - Misol:

    ```bash
    gcloud compute instance-groups managed set-autoscaling my-group --max-num-replicas 10 --min-num-replicas 1 --target-cpu-utilization 0.6
    ```

- **Serversiz arxitekturalar:**
  - Serversiz yechimlar uchun Cloud Functions, Cloud Run va Pub/Sub dan foydalaning.
  - Asosiy tushunchalar: Triggerlar, Hodisalar, Konteynerlar, Masshtablash.
  - Misol:

    ```bash
    gcloud run deploy my-service --image=gcr.io/my-project/my-image --platform managed
    ```

**7. Eng yaxshi amaliyotlar:**

- **Xavfsizlik:**
  - IAM siyosatlaridan foydalaning, ma'lumotlarni shifrlang, SCC bilan kuzatib boring, xavfsizlikning eng yaxshi amaliyotlarini qo'llang.
  
- **Ishonchlilik:**
  - Bir nechta zonalar/mintaqalardan foydalaning, o'chirib qo'yishni sozlang va zaxira nusxalarini yarating.

- **Ishlash samaradorligi:**
  - Tegishli mashina turlarini tanlang, keshlashdan foydalaning, ma'lumotlar bazalarini optimallashtiring.

- **Xarajatlarni optimallashtirish:**
  - Majburiy foydalanish shartnomalaridan foydalaning, xarajatlarni kuzatib boring va resurslarni optimallashtiring.

- **Operatsion mukammallik:**
  - Joylashtirishlarni avtomatlashtirish, operatsiyalarni kuzatish va infratuzilmadan kod sifatida foydalanish (IaC).
