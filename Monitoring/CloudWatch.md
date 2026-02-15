# CloudWatch Cheatsheet

![text](https://imgur.com/BU5g7ce.png)

Amazon CloudWatch - bu AWS va gibrid bulutli ilovalar uchun mo'ljallangan keng qamrovli monitoring va boshqaruv xizmati. Ushbu qo'llanma asosiy tushunchalardan tortib ilg'or konfiguratsiyalargacha bo'lgan hamma narsani qamrab oladi, bu sizga CloudWatch-dan unumdorlikni kuzatish, muammolarni bartaraf etish va operatsion tushunchalar uchun foydalanishga yordam beradi.

---

## **1. CloudWatch’ga kirish**

### CloudWatch nima?

- Amazon CloudWatch - bu AWS resurslari va maxsus ilovalar uchun monitoring va kuzatuv xizmati.
- Metrikalar, jurnallar, signallar va boshqaruv panellari orqali amaliy tushunchalarni taqdim etadi.
- Infratuzilma va ilovalar darajasidagi monitoringni qo‘llab-quvvatlaydi.

### Asosiy xususiyatlar:

- **Metrics**: Asosiy ishlash ma'lumotlarini to'plang va kuzatib boring.
- **Logs**: Jurnallarni yig'ing, tahlil qiling va qidiring.
- **Alarms**: Avtomatlashtirilgan harakatlarni ishga tushirish uchun ko'rsatkichlar uchun chegara qiymatlarini o'rnating.
- **Dashboards**: Ma'lumotlarni real vaqt rejimida vizualizatsiya qiling.
- **CloudWatch Events**: AWS resurslaridagi o'zgarishlarga asoslangan tetik harakatlari.

---

## **2. CloudWatch arxitekturasiga umumiy nuqtai nazar**

- **Ma'lumot manbalari**:
  - AWS Xizmatlar: EC2, RDS, Lambda, etc.
  - CloudWatch Agent yordamida mahalliy serverlar yoki gibrid sozlamalar.
- **Asosiy komponentlar**:
  - **Metrics**: Miqdoriy ma'lumotlar nuqtalari (masalan, protsessordan foydalanish).
  - **Logs**: Ilova va tizim jurnallari.
  - **Alarms**: Bildirishnomalar yoki avtomatlashtirilgan javoblar.
  - **Dashboards**: Maxsus vizualizatsiyalar.
  - **Insights**: Kengaytirilgan jurnal tahlili.

---

## **3. CloudWatchni sozlash**

### CloudWatchga kirish

1. Boring **AWS Management Console**.
2. Navigatsiya qiling **CloudWatch** ostida **Management & Governance** bo'lim.

### CloudWatch Agentini O'rnatish

Maxsus ko'rsatkichlarni yoki mahalliy resurslarni kuzatish uchun:

1. CloudWatch Agentni o'zingizning nusxangizga o'rnating:

   ```bash
   sudo yum install amazon-cloudwatch-agent
   ```

2. Agentni sozlash:

   ```bash
   sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard
   ```

3. Agentni ishga tushiring:

   ```bash
   sudo /opt/aws/amazon-cloudwatch-agent/bin/start-amazon-cloudwatch-agent
   ```

### IAM ruxsatnomalarini sozlash

**CloudWatchFullAccess** siyosatini IAM roliga yoki CloudWatchni boshqaradigan foydalanuvchiga biriktiring.

---

## **4. Metrikalar monitoringi**

### Ko'rish ko'rsatkichlari

1. CloudWatch konsolida **Metrics** ga o'ting.
2. Nom maydonini tanlang (e.g., `AWS/EC2`, `AWS/Lambda`).
3. “CPUUtilization”, “DiskWriteOps” kabi koʻrsatkichlarni tanlang.

### Umumiy ko'rsatkichlar:

- **EC2**:
  - `CPUUtilization`
  - `DiskReadBytes`
  - `NetworkIn/Out`
- **RDS**:
  - `DatabaseConnections`
  - `ReadIOPS`
  - `WriteLatency`
- **Lambda**:
  - `Invocations`
  - `Duration`
  - `Errors`

### Maxsus metrikalar

Maxsus ko'rsatkichlarni yuborish uchun:

1. AWS CLI ni o'rnating.
2. Metrika nashr eting:

   ```bash
   aws cloudwatch put-metric-data --namespace "CustomNamespace" --metric-name "MetricName" --value 100
   ```

---

## **5. CloudWatch jurnallari**

### Jurnal guruhlari va oqimlarini sozlash

1. CloudWatch konsolida **Logs** ga o'ting.
2. **Log group** yarating (masalan, `/aws/lambda/my-function`).
3. Har bir dastur/xizmat guruh ostidagi **Log Stream** yozadi.

### Logs ni S3 ga eksport qilish

1. Boring **Logs** → Log guruhini tanlang.
2. Bosing **Actions** → **Export data to Amazon S3**.
3. Eksportni kerakli vaqt oralig'i bilan sozlang.

### CloudWatch Logs Insights yordamida log larni so'rov qilish

1. **Logs Insights** ga o'ting.
2. Tahlil uchun so'rovlar yozing:

   ```sql
   fields @timestamp, @message
   | filter @message like /ERROR/
   | sort @timestamp desc
   | limit 20
   ```

---

## **6. CloudWatch signallari**

### Signal yaratish

1. Boring **Alarms** CloudWatch konsolida.
2. Bosing **Create Alarm**.
3. Ko'rsatkichni tanlang (masalan, `CPUUtilization`).

5. Amalni tanlang (masalan, SNS bildirishnomasini yuboring).

### Signal holatlari:

- **OK**: Metrika belgilangan chegara ichida.
- **ALARM**: Metrika chegarani buzadi.
- **INSUFFICIENT DATA**: Ma'lumotlar mavjud emas.

### Kengaytirilgan signal konfiguratsiyalari

- Kompozit signallar: Bir nechta signallarni birlashtirish.
- Harakatlar:
  - SNS orqali xabar bering.
  - Lambda funksiyalarini ishga tushirish.
  - EC2 nusxalarini to'xtatish/boshlash.

---

## **7. CloudWatch boshqaruv panellari**

### Boshqaruv panelini yaratish

1. Boring **Dashboards** CloudWatch konsolida.
2. Bosing **Create Dashboard**.
3. Vidjetlarni qo'shish:
   - **Line** metrikalar uchun.
   - **Number** bitta qiymatlar uchun.
   - **Text** notalar uchun.

### Vidjetlarni sozlash

- Turli nom maydonlaridan metrikalarni tanlang.
- Vaqt diapazonlari va teranlikni sozlang.

### Misol: Ko'p xizmatli boshqaruv paneli

- **EC2 Metrics**: CPU, Disk, Network.
- **RDS Metrics**: Connections, IOPS.
- **Lambda Metrics**: Invocations, Errors.

---

## **8. CloudWatch tadbirlari (EventBridge)**

### Qoidalar yaratish

1. Navigatsiya qiling **Rules** ostida **Events** CloudWatch konsolida.
2. Hodisa naqshiga ega qoida yarating (masalan, EC2 holatini o'zgartirish).
3. Maqsad qo'shing (masalan, SNS, Lambda, Step Functions).

### Misol: Avtomatik o'chirish misoli

1. Tadbir shakli:

   ```json
   {
     "source": ["aws.ec2"],
     "detail-type": ["EC2 Instance State-change Notification"],
     "detail": {
       "state": ["stopped"]
     }
   }
   ```

2. Nishon: SNS bildirishnomasini yuboring.

---

## **9. Kengaytirilgan konfiguratsiyalar**

### Hisoblararo monitoring

1. Maqsadli hisobda CloudWatch’ga kirish huquqiga ega boʻlgan hisoblararo rol yarating.
2. `CloudWatch:ListMetrics` va `CloudWatch:GetMetricData` API'laridan foydalaning.

### Anomaliyani aniqlash

Ko'rsatkichlar uchun anomaliyani aniqlashni yoqish:

1. Boring **Metrics** → Metrikani tanlang.
2. Bosing **Actions** → **Enable anomaly detection**.

### Metrik matematika

Ko'rsatkichlar bo'yicha hisob-kitoblarni amalga oshiring:

- Misol: Turli holatlarda protsessordan foydalanishni birlashtirish.

  ```bash
  (m1+m2)/2
  ```

---

## **10. Boshqa xizmatlar bilan integratsiya**

### AWS Lambda

- CloudWatch’ga jurnallar yozish uchun `console.log()` dan foydalaning.
- “Xatolar” va “Drossellar” kabi Lambdaga xos koʻrsatkichlarni kuzatib boring.

### ECS/EKS

- Batafsil monitoring uchun CloudWatch Container Insights funksiyasini yoqing.
- Konteyner jurnallarini CloudWatch’ga yuborish uchun `awslogs` drayveridan foydalaning.

### Uchinchi tomon vositalari bilan integratsiya

- Foydalanish **DataDog** yoki **Grafana** vizualizatsiyani yaxshilash uchun.
- API yordamida CloudWatch metrikalarini ushbu platformalarga integratsiya qiling.

---

## **11. Xavfsizlikning eng yaxshi amaliyotlari**

### Logni saqlash

- Xarajatlarni kamaytirish uchun jurnallarni saqlash siyosatini o'rnating:

  ```bash
  aws logs put-retention-policy --log-group-name "/aws/lambda/my-function" --retention-in-days 30
  ```

### Nozik donador kirishni boshqarish

- Muayyan ko'rsatkichlar, log lar yoki boshqaruv panellariga kirishni cheklash uchun IAM siyosatlaridan foydalaning.

---

## **12. CloudWatch narxlari**

### Narxlash modeli

1. **Metrics**: Har bir metrika uchun, har oy uchun to'lov olinadi.
2. **Logs**:
   - Yutish: Yutilgan har bir GB uchun narx.
   - Saqlash: Har bir GB saqlangan joy narxi.
3. **Dashboards**: Har bir boshqaruv paneli uchun oyiga to'lov olinadi.

### Xarajatlarni optimallashtirish bo'yicha maslahatlar

- Ma'lumotlar to'plashni cheklash uchun metrik filtrlardan foydalaning.
- Jurnallar uchun qisqaroq saqlash muddatlarini belgilang.

---

## **13. Eng yaxshi amaliyotlar**

1. **Log guruhlarini tashkil qilish**:
   - Izchil nomlash konventsiyalaridan foydalaning (masalan, `/application/environment/service`).

2. **Signallardan oqilona foydalaning**:
   - Uyg'otish charchoqlarining oldini olish uchun juda ko'p signallardan saqlaning.
   - Tegishli ko'rsatkichlarni guruhlash uchun kompozit signallardan foydalaning.

3. **Avtomatlashtirilgan monitoring**:
   - CloudFormation yoki Terraform yordamida ogohlantirishlarni yaratish va boshqaruv panellarini avtomatlashtiring.

4. **Log saqlashni optimallashtirish**:
   - Uzoq muddatli saqlash va tahlil qilish uchun jurnallarni S3 ga eksport qiling.

5. **Anomaliyani aniqlashni yoqish**:
   - Muhim ko'rsatkichlar uchun anomaliyalarni aniqlashni avtomatlashtirish.

---

## **14. Adabiyotlar va resurslar**

- [CloudWatch Hujjatlar](https://docs.aws.amazon.com/cloudwatch/)
- [Metrik matematika sintaksisi qo'llanmasi](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/using-metric-math.html)
- [CloudWatch Narxlar](https://aws.amazon.com/cloudwatch/pricing/)
