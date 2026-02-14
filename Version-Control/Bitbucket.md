# BitBucket Cheatsheet

![text](https://imgur.com/7PDN0aZ.png)

Atlassian tomonidan ishlab chiqilgan Bitbucket Git-ga asoslangan manba kodlari ombori hosting xizmatidir. U jamoalar uchun mo'ljallangan va Jira, Trello va Confluence kabi boshqa Atlassian vositalari bilan kuchli integratsiyani ta'minlaydi. Ushbu cheatsheet Bitbucket-ni asosiy operatsiyalardan tortib kengaytirilgan funksiyalargacha o'zlashtirish uchun batafsil qo'llanmani taqdim etadi.

---

## **1. Bitbucketga kirish**

### Bitbucket nima?

- Bitbucket - bu versiyalarni boshqarish, CI/CD quvurlari va loyihalar hamkorligi uchun Git-ga asoslangan platforma.
- U **xususiy** va **ommaviy omborlarni** qo'llab-quvvatlaydi.
- Atlassian vositalari (masalan, Jira) va o'rnatilgan CI/CD quvurlari bilan uzluksiz integratsiyasi bilan mashhur.

### Asosiy xususiyatlar

- Git omborini xosting qilish
- **Bitbucket Pipelines** orqali o'rnatilgan CI/CD
- Muammolarni kuzatish uchun Jira integratsiyasi
- Filial ruxsatnomalari va kodni ko'rib chiqish vositalari
- Mercurialni qo'llab-quvvatlaydi (eskirgan)

---

## **2. Ishni boshlash**

### Bitbucket hisobini yaratish

1. Boring [Bitbucket](https://bitbucket.org/) va hisob qaydnomasiga ro'yxatdan o'ting.
2. Ixtiyoriy ravishda, yaxshiroq integratsiya uchun Atlassian hisobingizni bog'lang.

### SSH kalitlarini sozlash

1. SSH kalitini yarating:

   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```

2. Bitbucket-ga ochiq kalitni qo'shing:
   - Navigatsiya qiling **Personal Settings** → **SSH Keys** → **Add Key**.

### Creating a Repository

1. Bitbucket-ga kiring.
2. Go to **Repositories** → **Create Repository**.
3. Sozlash:
   - Repository nomi
   - Kirish darajasi (Private/Public)
   - Repository Turi (Git)

---

## **3. Asosiy operatsiyalar**

### Klonlash  Repository

```bash
git clone git@bitbucket.org:username/repository.git
```

### Staging, Committing, and Pushing

```bash
# Stage changes
git add .
# Commit changes
git commit -m "Initial commit"
# Push changes
git push origin main
```

### O'zgarishlarni tortish

```bash
git pull origin main
```

---

## **4. Tarmoqlanish va birlashish**

### Filiallarni yaratish va almashtirish

```bash
# Create a new branch
git checkout -b feature-branch
# Switch to an existing branch
git checkout main
```

### Pushing a Branch

```bash
git push origin feature-branch
```

### Creating a Pull Request (PR)

1. Bitbucketni oching va  **Pull Requests**.
2. Bosing **Create Pull Request**.
3. Filiallarni tanlang, sharhlovchilarni qo'shing va tavsif bering.

### Birlashish Pull Requests

1. Tasdiqlang PR.
2. Variantlar yordamida birlashtirish:
   - **Merge Commit**: Barcha commitlarni butun holda saqlaydi.
   - **Squash Merge**: Barcha topshiriqlarni bittaga birlashtiradi.
   - **Rebase**: Tarixni qayta yozadi.

---

## **5. Bitbucket yo'llar (CI/CD)**

### Umumiy ma'lumot

Bitbucket Pipelines - bu qurilishlar, sinovlar va joylashtirishlarni avtomatlashtirish uchun o'rnatilgan CI/CD xizmati.

### Yo'llarni yoqish

1. Go to the repository settings → **Pipelines**.
2. Yo'l liniyalarini yoqing va `.bitbucket-pipelines.yml` faylini sozlang.

### Namuna yo'l liniyasi konfiguratsiyasi

```yaml
pipelines:
  default:
    - step:
        name: Build and Test
        image: node:14
        script:
          - npm install
          - npm test
    - step:
        name: Deploy to Production
        script:
          - echo "Deploying to production..."
```

### Kalit triggerlar

- **default**: Itarilganda istalgan shoxchada ishlaydi.
- **branches**: Muayyan tarmoqlar uchun triggerlarni sozlaydi.
- **tags**: Versiya teglari uchun joylashtirishni avtomatlashtiradi.

### Variables va Secrets

1. Go to **Repository Settings** → **Pipelines** → **Environment Variables**.
2. `AWS_ACCESS_KEY` kabi sezgir o'zgaruvchilarni qo'shing.

#### Foydalanish Variables ichida Pipelines

```yaml
script:
  - echo "Using secret: $AWS_ACCESS_KEY"
```

---

## **6. Filial ruxsatnomalari va kirishni boshqarish**

### Branch Ruxsatnomalar

1. Go to **Repository Settings** → **Branch Permissions**.
2.  Qoidalarni qo'shing:
   - "main" tomonga to'g'ridan-to'g'ri itarishlarning oldini oling.
   - Birlashtirishdan oldin kamida 2 ta kodni ko'rib chiqish talab qilinadi.

### Foydalanuvchi rollari

- **Admin**: Omborlar va ruxsatnomalar ustidan to'liq nazorat.
- **Write**: Kodni surish va tortib olish mumkin.
- **Read**: Omborlarga faqat o'qish uchun kirish.

---

## **7. Jira bilan integratsiya**

### Omborni Jira bilan bog'lash

1. Go to **Repository Settings** → **Jira Settings**.
2. Repozitoriyani Jira loyihasiga ulang.

### Muammolarni kuzatishni avtomatlashtirish

- Jira muammo kalitlarini commit xabarlariga qo'shing:

  ```text
  PROJ-123: Fix login page bug
  ```

- Jira avtomatik ravishda commitlarni, pull requestlarni va joylashtirishlarni (deploy) bog'laydi.

---

## **8. Kodni ko'rib chiqish va sifat**

### Foydalanish Pull Requests uchun Code Review

1. Pull request yaratishda sharhlovchilarni tayinlang.
2. Muammolarni ta'kidlash uchun izohlarni qatorga qo'shing.

### Kod sifati vositalarini integratsiyalash

- Statik kod tahlili uchun kanallaringizga **SonarCloud** yoki **CodeClimate** kabi vositalarni qo'shing.
- Misol: SonarCloudni Bitbucket quvur liniyalariga qo'shish:

  ```yaml
  - pipe: sonarsource/sonarcloud-scan:1.4.0
    variables:
      SONAR_TOKEN: $SONAR_TOKEN
  ```

---

## **9. Bitbucket API**

### Autentifikatsiya qilinmoqda

Shaxsiy token yarating:

1. Go to **Personal Settings** → **Access Management** → **Create App Password**.

Use the token in API calls:

```bash
curl -u username:app_password https://api.bitbucket.org/2.0/repositories
```

### Umumiy API tugash nuqtalari

- Ro'yxat repositories:

  ```bash
  curl -X GET https://api.bitbucket.org/2.0/repositories/{username}
  ```

- Create an issue:

  ```bash
  curl -X POST -u username:app_password \
  -H "Content-Type: application/json" \
  -d '{"title": "Bug in Login Page", "content": {"raw": "Description"}}' \
  https://api.bitbucket.org/2.0/repositories/{username}/{repo}/issues
  ```

---

## **10. Kengaytirilgan xususiyatlar**

###  Bitbucket Pipelines bilan deploy

Track deployment environments:

1. Boring **Deployments** → Configure environments (e.g., Dev, Staging, Prod).

Joylashtirish bosqichlarini qo'shing `.bitbucket-pipelines.yml`:

```yaml
pipelines:
  branches:
    main:
      - step:
          name: Deploy to Staging
          deployment: staging
          script:
            - ./deploy.sh staging
```

### Monorepo qo'llab-quvvatlashi

Bitta omborda bir nechta xizmatlarni joylashtiring:

- Alohida xizmat ko'rsatish tuzilmalari uchun quvur liniyalaridan foydalaning:

  ```yaml
  pipelines:
    default:
      - step:
          name: Build Service A
          script:
            - cd services/service-a && npm install && npm test
  ```

### Mirror Repositories

Bitbucket va GitHub o'rtasidagi omborni aks ettirish:

```bash
git remote add bitbucket git@bitbucket.org:username/repo.git
git push bitbucket --mirror
```

---

## **11. Xavfsizlik va eng yaxshi amaliyotlar**

### Ikki faktorli autentifikatsiyani amalga oshirish (2FA)

1. Boring **Personal Settings** → **Security** → Yoqing (Enable) 2FA.

### Maxfiy skanerlash (Secret Scanning)

Bitbucket qattiq kodlangan hisob ma'lumotlarini skanerlaydi va foydalanuvchilarni ogohlantiradi.

### Bog'liqlikni skanerlash (Dependency Scanning)

Zaifliklarni aniqlash uchun **Snyk** yoki **Dependabot** kabi Atlassian vositalaridan foydalaning.

---

## **12. Best Practices**

1. **Branch Nomlash konventsiyasi**:
   - Quyidagi kabi prefikslardan foydalaning `feature/`, `bugfix/`, and `release/`.

   ```text
   feature/add-login-form
   bugfix/fix-authentication-error
   ```

2. **Commit Xabarlar**:
   - Quyidagi kabi formatga amal qiling:

     ```text
     [PROJ-123] Kirish funksiyasidagi xatoni tuzatish
     ```

   - commit xabarlarida Jira muammolariga murojaat qiling.

3. **Hamma narsani avtomatlashtirish**:
   -  Pipelinesdan foydalanish  CI/CD uchun.
   - Astarlash, sinovdan o'tkazish va joylashtirishni(deploy) avtomatlashtirish.

4. **Foydalanish Pull Request Templates**:
   - Qo'shish `.bitbucket/pull_request_template.md` PR tavsiflarini standartlashtirish.

---

## **13. Adabiyotlar va resurslar**

- [Bitbucket Hujjatlar](https://bitbucket.org/product/)
- [Bitbucket API Hujjatlar](https://developer.atlassian.com/bitbucket/api/2/reference/)
- [Pipelines Qo'llanma](https://bitbucket.org/product/features/pipelines)
