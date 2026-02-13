# GitLab CI Cheatsheet

![](https://imgur.com/dbufti0.png)

**1. Kirish:**

- GitLab CI/CD to'liq DevOps platformasi bo'lgan GitLabning bir qismi bo'lib, sizga CI/CD quvurlarini to'g'ridan-to'g'ri GitLab omboringizda `.gitlab-ci.yml` faylidan foydalanib aniqlash imkonini beradi.

**2. Asosiy tushunchalar:**

- **Quvur liniyasi:** Ishlarni ketma-ket yoki parallel ravishda bajaradigan bosqichlar seriyasi.
- **Ish:** Sinovlarni bajarish yoki kodni joylashtirish kabi alohida ish birligi.
- **Bosqich:** Guruh

**3. Asosiy `.gitlab-ci.yml` Misol:**

- **YAML sintaksisi:**

  ```yaml
  stages:
    - build
    - test
    - deploy

  build-job:
    stage: build
    script:
      - echo "Building the project..."
      - make

  test-job:
    stage: test


    script:
      - echo "Running tests..."
      - make test

  deploy-job:
    stage: deploy
    script:
      - echo "Deploying the project..."
      - make deploy
  ```

**4. Yuguruvchilar:**

- **Umumiy yuguruvchilar:** GitLab tomonidan taqdim etiladi va barcha loyihalar uchun mavjud.
- **Maxsus yuguruvchilar:** Muayyan loyiha yoki guruhga ro'yxatdan o'tgan maxsus yuguruvchilar.
- **Teglar:** Belgilash uchun teglardan foydalaning

  ```yaml
  artifacts:
    paths:
      - build/
    expire_in: 1 week
  ```

- **Keshlash:** Avval yuklab olingan bog'liqliklardan qayta foydalanish orqali ishlarni tezlashtirish.

  ```yaml
  cache:
    paths:
      - node_modules/
  ```

**6. Muhitlar va joylashtirishlar:**

- **Muhitlar:** Joylashtirishlarni tashkil qilish va boshqarish uchun muhitlarni aniqlang.

  ```yaml
  deploy-job:
    stage: deploy
    environment:
      name: production
      url: https://myapp.com
    script:
      - echo "Deploying to production..."
      - ./deploy.sh
  ```

- **Qo'lda joylashtirish:** Ishni boshlashdan oldin qo'lda tasdiqlash talab qilinadi.

  ```yaml
  deploy-job:
    stage: deploy
    script:
      - ./deploy.sh
    when: manual
  ```

**7. Kengaytirilgan `.gitlab-ci.yml` xususiyatlari:**

- **YAML langarlari:** YAML konfiguratsiyangizning qismlaridan qayta foydalaning.

  ```yaml
  .default-job: &default-job
    script:
      - echo "Default job script"

  job1:
    <<: *default-job

  job2:
    <<: *default-job
  ```

- **O'z ichiga oladi:** Konfiguratsiyangizni tartibga solish uchun boshqa YAML fayllarini qo'shing.

  ```yaml
  include:
    - local: '/templates/.gitlab-ci-template.yml'
  ```

**8. Xavfsizlik va muvofiqlik:**

- **Maxfiy o'zgaruvchilar:** GitLab CI/CD da maxfiy ma'lumotlarni xavfsiz saqlang.

  ```yaml
  deploy-job:
    script:
      - deploy --token $CI_DEPLOY_TOKEN
  ```

- **Himoyalangan filiallar:** Muayyan ishlarni faqat himoyalangan filiallarda bajarishni cheklash.

**9. Muammolarni bartaraf etish:**

- **Quvur liniyasi jurnallari:** Nosozliklarni bartaraf etish uchun har bir ish uchun batafsil jurnallarga kirish.
- **Qayta urinish.- **Protected Branches:** Restrict certain jobs to run only on protected branches.


**10. Eng yaxshi amaliyotlar:**

- **Modulli quvurlar:** Yaxshiroq tashkil etish uchun quvuringizni bosqichlarga ajrating.
- **CI/CD shablonlaridan foydalaning:** Umumiy CI/CD vazifalari uchun GitLabning o'rnatilgan shablonlaridan foydalaning.
