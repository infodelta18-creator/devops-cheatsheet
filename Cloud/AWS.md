# AWS Cheatsheet

![text](https://imgur.com/DDbwilK.png)

**1. Kirish:**

- **Amazon Web Services (AWS)** - bu butun dunyo bo'ylab ma'lumotlar markazlaridan 200 dan ortiq to'liq xususiyatli xizmatlarni taklif qiluvchi keng qamrovli bulutli platforma. AWS hisoblash, saqlash, ma'lumotlar bazalari, mashinani o'rganish, xavfsizlik va boshqalar uchun bulutli yechimlarni taqdim etadi.

**2. Asosiy AWS xizmatlari:**

- **Hisoblash:**
  - **EC2 (Elastic Compute Cloud):**
    - Ilovalarni ishga tushirish uchun virtual serverlar.
    - Instansiya turlari: Umumiy maqsad, Hisoblash optimallashtirilgan, Xotira optimallashtirilgan va boshqalar.
    - Asosiy tushunchalar: AMI, Instance turlari, Kalit juftliklari, Xavfsizlik guruhlari, EBS hajmlari.
    - Misol:

      ```bash
      aws ec2 run-instances --image-id ami-12345678 --instance-type t2.micro --key-name MyKeyPair
      ```

  - **Lambda:**
    - Serverlarni taqdim etmasdan yoki boshqarmasdan kodni ishga tushirish uchun serversiz hisoblash.
    - Asosiy tushunchalar: Funksiyalar, Hodisa manbalari, IAM rollari.
    - Misol:

      ```bash
      aws lambda create-function --function-name my-function --runtime python3.8 --role arn:aws:iam::123456789012:role/execution_role --handler my_function.handler --zip-file fileb://my-deployment-package.zip
      ```

  - **ECS/EKS (Elastic Container Service/Elastic Kubernetes Service):**
    - ECS: To'liq boshqariladigan konteyner orkestrlash xizmati.
    - EKS: Kubernetesni AWSda ishga tushirish uchun boshqariladigan Kubernetes xizmati.
    - Asosiy tushunchalar: Klasterlar, Vazifalar, Xizmatlar, Fargate.
    - Misol:

      ```bash
      aws ecs create-cluster --cluster-name my-cluster
      ```

- **Saqlash:**
  - **S3 (Simple Storage Service):**
    - Kengaytiriladigan obyektlarni saqlash xizmati.
    - Asosiy tushunchalar: Chelaklar, Obyektlar, Saqlash Sinflari, Hayotiy Aylanish Siyosati.
    - Misol:

      ```bash
      aws s3 mb s3://my-bucket
      aws s3 cp my-file.txt s3://my-bucket/
      ```

  - **EBS (Elastic Block Store):**
    - EC2 nusxalari bilan foydalanish uchun saqlashni bloklash.
    - Asosiy tushunchalar: Jildlar, Suratlar, Jild turlari (gp2, io1, st1 va boshqalar).
    - Misol:

      ```bash
      aws ec2 create-volume --size 10 --region us-east-1 --availability-zone us-east-1a --volume-type gp2
      ```

  - **Muzlik:**
    - Ma'lumotlarni arxivlash va zaxiralash uchun uzoq muddatli, xavfsiz va bardoshli saqlash.
    - Asosiy tushunchalar: Omborlar, Arxivlar, Qidiruv siyosati.
    - Misol:

      ```bash
      aws glacier create-vault --vault-name my-vault --account-id -
      ```

- **Ma'lumotlar bazasi (Database):**
  - **RDS (Relational Database Service):**
    - Turli xil dvigatellarni (MySQL, PostgreSQL, Oracle, SQL Server va boshqalar) qo'llab-quvvatlaydigan boshqariladigan relyatsion ma'lumotlar bazasi xizmati.
    - Asosiy tushunchalar: Ma'lumotlar bazasi nusxalari, suratlar, xavfsizlik guruhlari, Multi-AZ.
    - Misol:

      ```bash
      aws rds create-db-instance --db-instance-identifier mydbinstance --db-instance-class db.t2.micro --engine mysql --master-username admin --master-user-password password --allocated-storage 20
      ```

  - **DynamoDB:**
    - Boshqariladigan NoSQL ma'lumotlar bazasi xizmati.
    - Asosiy tushunchalar: Jadvallar, Elementlar, Atributlar, Birlamchi kalit, Global/Lokal ikkilamchi indekslar.
    - Misol:

      ```bash
      aws dynamodb create-table --table-name MyTable --attribute-definitions AttributeName=Id,AttributeType=N --key-schema AttributeName=Id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
      ```

  - **Aurora:**
    - Bulut uchun yaratilgan, yuqori unumdorlik va mavjudlikni ta'minlaydigan MySQL va PostgreSQL bilan mos keladigan relyatsion ma'lumotlar bazasi.
    - Asosiy tushunchalar: Klasterlar, Replikalar, Global ma'lumotlar bazalari.
    - Misol:

      ```bash
      aws rds create-db-cluster --db-cluster-identifier my-cluster --engine aurora-mysql --master-username admin --master-user-password password
      ```

**3. Tarmoq:**

- **VPC (Virtual Private Cloud):**
  - AWS resurslarini ishga tushirish uchun izolyatsiya qilingan tarmoq muhiti.
  - Asosiy tushunchalar: Subnetlar, Marshrut jadvallari, Internet shlyuzlari, NAT shlyuzlari, Xavfsizlik guruhlari, NACLlar.
  - Misol:

    ```bash
    aws ec2 create-vpc --cidr-block 10.0.0.0/16
    aws ec2 create-subnet --vpc-id vpc-12345678 --cidr-block 10.0.1.0/24
    ```

- **Yo'nalish 53 (Route 53):**
  - Kengaytiriladigan DNS va domen nomini ro'yxatdan o'tkazish xizmati.
  - Asosiy tushunchalar: Xostlangan zonalar, rekordlar to'plami, tibbiy ko'riklar, yo'l harakati qoidalari.
  - Misol:

    ```bash
    aws route53 create-hosted-zone --name example.com --caller-reference unique-string
    ```

- **CloudFront:**
  - Kontentni global miqyosda past kechikish bilan yetkazib berish uchun kontent yetkazib berish tarmog'i (CDN).
  - Asosiy tushunchalar: Tarqalishlar, Kelib chiqishi, Xulq-atvori, Chegara joylashuvi.
  - Misol:

    ```bash
    aws cloudfront create-distribution --origin-domain-name mybucket.s3.amazonaws.com
    ```

- **Elastic Load Balancing (ELB):**
  - Kiruvchi trafikni EC2 nusxalari kabi bir nechta maqsadlarga taqsimlaydi.
  - Asosiy tushunchalar: Yuk balanslashtiruvchilari (ALB, NLB, CLB), Maqsadli guruhlar, Tinglovchilar.
  - Misol:

    ```bash
    aws elbv2 create-load-balancer --name my-load-balancer --subnets subnet-12345678 subnet-87654321 --security-groups sg-12345678
    ```

**4. Xavfsizlik va shaxsni aniqlash:**

- **IAM (Identity and Access Management):**
  - Foydalanuvchilar, guruhlar, rollar va ruxsatlarni boshqaradi.
  - Asosiy tushunchalar: Foydalanuvchilar, Guruhlar, Rollar, Siyosat, MFA, Kirish kalitlari.
  - Misol:

    ```bash
    aws iam create-user --user-name myuser
    aws iam attach-user-policy --user-name myuser --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
    ```

- **KMS (Key Management Service):**
  - Shifrlash kalitlarini yaratish va boshqarish uchun boshqariladigan xizmat.
  - Asosiy tushunchalar: CMKlar (mijozlar uchun asosiy kalitlar), taxalluslar, grantlar, asosiy siyosatlar.
  - Misol:

    ```bash
    aws kms create-key --description "My CMK"
    ```

- **CloudTrail:**
  - AWS hisoblari bo'ylab foydalanuvchi faolligi va API foydalanishini kuzatib boradi.
  - Asosiy tushunchalar: Yo'llar, Jurnallar, S3 chelaklari, Ma'lumotlar.
  - Misol:

    ```bash
    aws cloudtrail create-trail --name MyTrail --s3-bucket-name my-bucket
    ```

**5. Boshqaruv vositalari:**

- **CloudFormation:**
  - AWS resurslarini modellashtirish va sozlash uchun kod xizmati sifatida infratuzilma.
  - Asosiy tushunchalar: Shablonlar, Steklar, Resurslar, Chiqishlar, Parametrlar.
  - Misol:

    ```bash
    aws cloudformation create-stack --stack-name my-stack --template-body file://template.json
    ```

- **CloudWatch:**
  - AWS resurslari va ilovalari uchun monitoring va kuzatuv xizmati.
  - Asosiy tushunchalar: Metrikalar, signallar, jurnallar, hodisalar, boshqaruv panellari.
  - Misol:

    ```bash
    aws cloudwatch put-metric-alarm --alarm-name my-alarm --metric-name CPUUtilization --namespace AWS/EC2 --statistic Average --period 300 --threshold 80 --comparison-operator GreaterThanOrEqualToThreshold --evaluation-periods 1 --alarm-actions arn:aws:sns:us-east-1:123456789012:my-topic
    ```

- **AWS Config:**
  - AWS resurslarining konfiguratsiyalarini baholash, audit qilish va baholash xizmati.
  - Asosiy tushunchalar: Qoidalar, Resurslar, Agregatorlar, Konfiguratsiya Yozuvchisi.
  - Misol:

    ```bash
    aws configservice put-configuration-recorder --configuration-recorder name=my-recorder,roleARN=arn:aws:iam::123456789012:role/my-role
    ```

- **Ishonchli maslahatchi:**
  - AWSning eng yaxshi amaliyotlariga rioya qilgan holda resurslaringizni taqdim etishda sizga yordam beradigan real vaqt rejimida ko'rsatmalar beradi.
  - Asosiy tushunchalar: Tekshiruvlar, Tavsiyalar.
  - Misol:
    - AWS boshqaruv konsoli orqali kirish.

**6. Murakkab mavzular:**

- **Cost Management:**
  - Xarajatlarni kuzatib borish va optimallashtirish uchun AWS Cost Explorer, Budgets va Cost & Foydalanish hisobotlaridan foydalaning.
  - Misol:

    ```bash
    aws ce get-cost-and-usage --time-period Start=2024-08-01,End=2024-08-31 --granularity MONTHLY --metrics "BlendedCost"
    ```

- **Auto Scaling:**
  - Resurslaringiz hajmini talabga qarab avtomatik ravishda sozlang.
  - Asosiy tushunchalar: Avtomatik masshtablash guruhlari, masshtablash siyosati, ishga tushirish konfiguratsiyalari.
  - Misol:

    ```bash
    aws autoscaling create-auto-scaling-group --auto-scaling-group-name my-asg --launch-configuration-name my-lc --min-size 1 --max-size 10 --desired-capacity 2 --vpc-zone-identifier subnet-12345678
    ```

- **Serversiz arxitekturalar:**
  - Serversiz ilovalarni yaratish uchun AWS Lambda, API Gateway va DynamoDB dan foydalaning.
  - Asosiy tushunchalar: Funksiyalar, APIlar, jadvallar, hodisalar, triggerlar.
  - Misol:

    ```bash
    aws apigateway create-rest-api --name 'My API'
    ```

**7. Best

 Practices:**

- **Xavfsizlik:**
  - IAM rollari va siyosatlaridan foydalaning, MFA ni yoqing, ma'lumotlarni dam olish va uzatish paytida shifrlang, CloudTrail bilan kuzatib boring va eng kam imtiyoz printsipini qo'llang.
  
- **Ishonchlilik:**
  - Muvaffaqiyatsizlikka tayyorlaning, bir nechta mavjudlik zonalaridan (AZ) foydalaning, zaxira nusxalarini yarating va avtomatik masshtablashni sozlang.

- **Ishlash samaradorligi:**
  - To'g'ri o'lchamdagi nusxalar, tegishli saqlash sinflaridan foydalaning va boshqariladigan xizmatlardan foydalaning.

- **Xarajatlarni optimallashtirish:**
  - Rezervlangan nusxalardan (RI), Spot nusxalaridan foydalaning va to'lovlarni muntazam ravishda ko'rib chiqing.

- **Operatsion mukammallik:**
  - Jarayonlarni avtomatlashtirish, operatsiyalarni kuzatish va infratuzilmadan kod sifatida foydalanish (IaC).
