# GitLab Cheatsheet

![text](https://imgur.com/QJ7J3qs.png)

**GitLab** - bu veb-ga asoslangan DevOps platformasi bo'lib, u manba kodini boshqarish, CI/CD, loyihalarni boshqarish va joylashtirishni avtomatlashtirish uchun mustahkam vositalar to'plamini taqdim etadi. Ushbu cheat varaqda asosiy foydalanishdan tortib ilg'or GitLab funksiyalarigacha bo'lgan hamma narsa qamrab olingan.

---

## 1. **GitLabga kirish**

### GitLab nima?

GitLab - bu quyidagilar uchun integratsiyalashgan vositalarni taklif qiluvchi ochiq kodli DevOps platformasi:

- Manba boshqaruvi (Git)
- Uzluksiz integratsiya/uzluksiz joylashtirish (CI/CD)
- Muammolarni kuzatish va loyihalarni boshqarish
- Konteyner registri va DevSecOps

### Asosiy xususiyatlar

- **Git Repository Management**: Tarqatilgan versiyani boshqarish va kodni ko'rib chiqishni boshqaradi.
- **CI/CD Quvurlari**: Sinov, integratsiya va joylashtirishni avtomatlashtiradi.
- **DevSecOps**: Bogʻliqliklar, konteyner tasvirlari va kod uchun oʻrnatilgan xavfsizlik skanerlashi.
- **Konteyner registri**: Docker konteynerlarini boshqarish.

---

## 2. **GitLabning asosiy sozlamalari**

### Ro'yxatdan o'tish va loyiha yaratish

1. **Ro'yxatdan o'tish**: Tashrif buyuring [GitLab](https://gitlab.com/) va hisob yarating.
2. **Loyiha yarating**:
   - Boring **Projects** → **New Project**.
   - Choose **Blank Project**, **Import**, or **Template**.
   - Ko'rinishni sozlash (Private, Internal, or Public).

### SSH kalitlarini qo'shish

1. SSH kalitini yarating:

   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```

2. Ommaviy kalitni nusxalash:

   ```bash
   cat ~/.ssh/id_rsa.pub
   ```

3. GitLab-ga kalit qo'shing:
   - Boring **User Settings** → **SSH Keys** → Ommaviy kalitni joylashtiring.

---

## 3. **GitLab Asosiy tushunchalar**

### Klonlash Repository

```bash
git clone git@gitlab.com:username/projectname.git
```

### O'zgarishlarni amalga oshirish

```bash
# Stage files
git add .
# Commit files
git commit -m "Initial commit"
# Push changes
git push origin main
```

### Branch

- Yaratish  branch:

  ```bash
  git checkout -b feature-branch
  ```

- Push branch:

  ```bash
  git push origin feature-branch
  ```

### Birlashtirish so'rovlari (MRs)

1. GitLab-dagi loyihangizga o'ting.
2. **Birlashtirish so'rovlari** → **Yangi birlashtirish so'rovi** ga o'ting.
3. Manba va maqsadli filiallarni tanlang va MR yarating.

---

## 4. **GitLab CI/CD bilan ishlash**

### `.gitlab-ci.yml` asoslari

The `.gitlab-ci.yml` file defines the CI/CD pipeline.

#### Namuna fayli:

```yaml
stages:
  - build
  - test
  - deploy

build_job:
  stage: build
  script:
    - echo "Building the project"
    - ./build-script.sh

test_job:
  stage: test
  script:
    - echo "Running tests"
    - ./test-script.sh

deploy_job:
  stage: deploy
  script:
    - echo "Deploying to production"
    - ./deploy-script.sh
```

### Pipeline Hayot davrasi

1. **Stages**: Bosqichlarni aniqlang (e.g., `build`, `test`, `deploy`).
2. **Jobs**: Har bir bosqichda vazifalarni aniqlang.
3. **Runners**: Quvur ishlarini bajarish (umumiy yoki maxsus).

###  Pipeline ishlatish

- O'zgarishlarni filialga surish:

  ```bash
  git push origin branch-name
  ```

- Yo'llarni tekshirish:
  - GitLab-da **CI/CD** → **Pipelines** ga o'ting.

---

## 5. **O'rta darajadagi GitLab xususiyatlari**

### GitLab yuguruvchilari

- Yuguruvchilar CI/CD vazifalarini bajaradilar.
- **Umumiy yuguruvchilar**: GitLab tomonidan taqdim etilgan.
- **Maxsus yuguruvchilar**: O'z-o'zidan joylashtirilgan.

#### Maxsus yuguruvchini ro'yxatdan o'tkazing:

1. GitLab Runner-ni o'rnating:

   ```bash
   sudo apt install gitlab-runner
   ```

2. Yuguruvchini ro'yxatdan o'tkazing:

   ```bash
   gitlab-runner register
   ```

   - GitLab URL manzilini, ro'yxatdan o'tish tokenini, ijrochini (masalan, `shell`, `docker`) va teglarni kiriting.

### Boshqaruv Variables

- **Atrof-muhit o'zgaruvchilarini o'rnatish**:
  1. Boring **Settings** → **CI/CD** → **Variables**.
  2. Qo'shish variables (e.g., `AWS_ACCESS_KEY`, `DOCKER_PASSWORD`).
  
- `.gitlab-ci.yml` da foydalaning:

  ```yaml
  script:
    - echo $MY_VARIABLE
  ```

### Artefaktlar

Artefaktlar ish natijalarini saqlaydi.

```yaml
test_job:
  stage: test
  script:
    - ./run-tests
  artifacts:
    paths:
      - test-results/
```

---

## 6. **GitLabning ilg'or xususiyatlari**

### GitLab sahifalari

Statik veb-saytlarni to'g'ridan-to'g'ri GitLab-da joylashtiring.

#### Misol `.gitlab-ci.yml` Sahifalar uchun:

```yaml
pages:
  stage: deploy
  script:
    - mkdir .public
    - cp -r * .public
  artifacts:
    paths:
      - public
```

### Konteyner registri

- GitLab konteyner saqlash uchun o'rnatilgan Docker registrini taqdim etadi.
- **Rasmni bosing**:

  ```bash
  docker build -t registry.gitlab.com/username/projectname:tag .
  docker login registry.gitlab.com
  docker push registry.gitlab.com/username/projectname:tag
  ```

### GitLab Kubernetes integratsiyasi

- Joylashtirish uchun Kubernetes klasterlarini GitLab bilan integratsiya qiling.
- Klasteringizni ulash uchun **Operatsiyalar** → **Kubernetes** ga o'ting.

#### Dubulg'a yordamida joylashtirish:

```yaml
deploy:
  stage: deploy
  script:
    - helm install my-app ./helm-chart
```

---

## 7. **GitLab’dagi xavfsizlik**

### SAST (Static Application Security Testing)

- Zaifliklarni tekshirish uchun SAST ni yoqing:

  ```yaml
  include:
    - template: Security/SAST.gitlab-ci.yml
  ```

### DAST (Dynamic Application Security Testing)

- Ish vaqtidagi zaifliklarni skanerlashni amalga oshiring:

  ```yaml
  include:
    - template: Security/DAST.gitlab-ci.yml
  ```

### Secret Aniqlash

- Qattiq kodlangan sirlarni aniqlang:

  ```yaml
  include:
    - template: Security/Secret-Detection.gitlab-ci.yml
  ```

---

## 8. **Monitoring va Analytics**

### Pipeline Analysis

- Quvur liniyasi samaradorligini ko'rib chiqish uchun **Analytics** → **CI/CD** → **Quvur liniyasi** ga o'ting.

### Kodni qoplash

- `.gitlab-ci.yml` da qamrov hisobotlarini yoqish:

  ```yaml
  test_job:
    stage: test
    script:
      - ./run-tests
    coverage: '/Code Coverage: \d+%/'
  ```

### Konteynerni skanerlash

- Zaifliklar uchun Docker rasmlarini skanerlang:

  ```yaml
  include:
    - template: Security/Container-Scanning.gitlab-ci.yml
  ```

---

## 9. **GitLab zaxira nusxasi va tiklash**

### GitLab’ni zaxiralash

- O'z-o'zidan joylashtirilgan GitLab uchun ishga tushiring:

  ```bash
  gitlab-backup create
  ```

- Zaxira nusxalari omborlar, CI/CD jurnallari, yuklamalar va sozlamalarni o'z ichiga oladi.

### GitLabni tiklash

- Zaxira nusxasini tiklash:

  ```bash
  gitlab-restore restore BACKUP_FILE=backup_filename
  ```

---

## 10. **GitLab bilan bog'liq muammolarni bartaraf etish**

### Umumiy xatolar

- **Pipeline Muvaffaqiyatsizliklar**:
  - **CI/CD** → **Ishlar** bo'limidagi quvur liniyasi jurnallarini tekshiring.
- **Yuguruvchi bilan bog'liq muammolar**:
  - Yuguruvchi faol ekanligiga ishonch hosil qiling: `gitlab-runner status`.
- **Ruxsat xatolari**:
  - SSH kaliti va omborga kirishni tekshiring.

### Nosozliklarni tuzatish CI/CD Pipelines

- Batafsil jurnalni qo'shish:

  ```yaml
  script:
    - echo "Debugging info"
    - set -x
    - ./my-script.sh
  ```

---

## 11. **GitLabning eng yaxshi amaliyotlari**

- **Dallanma strategiyalaridan foydalaning**:
  - Hamkorlikni soddalashtirish uchun GitLab Flow yoki GitFlow ni amalga oshiring.
- **Xavfsiz CI/CD Pipelines**:
  - Maxfiy ma'lumotlarni boshqarish uchun muhit o'zgaruvchilaridan foydalaning.
- **Sharhlarni avtomatlashtirish**:
  - Birlashtirish so'rovi shablonlari va kod egalaridan foydalaning.
- **GitLab shablonlaridan foydalanish**:
  - Vaqtni tejash uchun oldindan tayyorlangan `.gitlab-ci.yml` shablonlaridan foydalaning.
- **Monitordan foydalanish**:
  - Loyiha va quvur liniyasi tahlillarini muntazam ravishda tekshirib turing.

---

## 12. **Foydali GitLab CLI buyruqlari**

### Asosiy Commands

- **Kirish GitLab CLI**:

  ```bash
  glab auth login
  ```

- **Ro'yxat Repositories**:

  ```bash
  glab repo list
  ```

- **Yaratish Issue**:

  ```bash
  glab issue create --title "Bug report" --description "Details here"
  ```

---

## References va Resources

1. [GitLab Hujjatlar](https://docs.gitlab.com/)
2. [GitLab CI/CD Misollar](https://docs.gitlab.com/ee/ci/examples/)
3. [GitLab CLI](https://github.com/profclems/glab)
