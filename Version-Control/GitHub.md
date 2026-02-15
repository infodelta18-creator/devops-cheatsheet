# Github Cheatsheet

![text](https://imgur.com/c189VXy.png)

**GitHub** - bu versiyani boshqarish, hamkorlik, CI/CD avtomatlashtirish va DevOps ish jarayonlari uchun kuchli platforma. Ushbu cheat varaq GitHub-dan foydalanish bo'yicha chuqur qo'llanmani taqdim etadi, unda asosiy operatsiyalar va ilg'or xususiyatlar yoritilgan.

---

## 1. **GitHubga kirish**

### GitHub nima?

GitHub - bu versiyalarni boshqarish uchun Gitdan foydalanadigan va quyidagilar uchun vositalarni taqdim etadigan veb-asoslangan platforma:

- Hamkorlikdagi dasturiy ta'minotni ishlab chiqish
- CI/CD avtomatlashtirish
- Loyihalar boshqaruvi
- Kodni ko'rib chiqish va DevOps integratsiyasi

### Asosiy xususiyatlar

- **Git Repositories**: Git bilan markazlashtirilgan kod xostingi.
- **Hamkorlik**: Pull requests, kodni ko'rib chiqish va muhokamalar.
- **Amallar**: GitHub Actions yordamida ish jarayonlarini avtomatlashtirish.
- **Loyiha boshqaruvi**: Agile ish oqimlari uchun forumlar, muammolar va bosqichlar.
- **Xavfsizlik**: Dependabot ogohlantirishlari va zaifliklar uchun kodni skanerlash.

---

## 2. **Ishni boshlash**

### Hisob yaratish

1. Ro'yxatdan o'ting [GitHub](https://github.com/).
2. Jamoa bilan hamkorlik qilish uchun tashkilot yarating yoki unga qo'shiling.

### SSH kalitlarini qo'shish

1. SSH kalitini yarating:

   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```

2. Kalitni GitHub hisobingizga qo'shing:
   - Go to **Settings** → **SSH and GPG keys** → Add Key.

###  Repository yaratish

1. Go to **Repositories** → **New**.
2. Repozitoriya nomini, tavsifini va ko'rinishini sozlang.
3. Agar kerak bo'lsa, `.gitignore` faylini yoki litsenziyasini qo'shing.

---

## 3. **GitHub’ning asosiy operatsiyalari**

###  Repository klonlash 

```bash
git clone git@github.com:username/repository.git
```

### Committing va Pushing Changes

```bash
# Bosqich o'zgarishlari
git add .
# Commit changes
git commit -m "Initial commit"
# Push changes
git push origin main
```

### Pulling Changes

```bash
git pull origin main
```

---

## 4. **Branching va Merging**

### Yaratish va Switching Branches

```bash
# Yangi branch yarating
git checkout -b feature-branch
# Mavjudga branchga o'tish
git checkout main
```

### Pushing a Branch

```bash
git push origin feature-branch
```

###  Branchlarni birlashtirish 

1. Oching **Pull Request** on GitHub:
   - Navigatsiya qiling repository → **Pull Requests** → **New Pull Request**.
2. O'zgarishlarni ko'rib chiqing va birlashtiring.

###  Branchni o'chirish

```bash
# Mahalliy o'chirish
git branch -d feature-branch
# Masofadan boshqarish pultidan o'chirish
git push origin --delete feature-branch
```

---

## 5. **GitHub Issues va Project Boards**

###  Issue yaratish

1. Boring **Issues** → **New Issue**.
2. Sarlavha, tavsif qo'shing va yorliqlar yoki vakillarni tayinlang.

### Loyiha taxtalarini avtomatlashtirish

- ** Issues qo'shish avtomatik ravishda**:
  1. Loyihaga o'ting.
  2. "Add issues in progress." kabi avtomatlashtirish qoidalarini o'rnating.

### Linking Pull Requests dan  Issues ga

PR tavsiflarida kalit so'zlardan foydalaning:

```text
Fixes #issue_number
Closes #issue_number
```

---

## 6. **GitHub Actions (CI/CD)**

GitHub Actions - bu CI/CD uchun ish jarayonini avtomatlashtirish vositasi.

### `.github/workflows/<workflow>.yml` asoslari

#### Misol ish jarayoni:

```yaml
name: CI Pipeline

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3
      - name: Install Dependencies
        run: npm install
      - name: Run Tests
        run: npm test
```

### Workflow Triggerlar

- **push**: majburiyat yuborilganda ish jarayonini ishga tushiradi.
- **pull_request**: Pull so'rovlari bo'yicha ishga tushiriladi.
- **schedule**: Cron jadvaliga muvofiq ishga tushiriladi.

### Managing Secrets

1. Go to **Settings** → **Secrets and variables** → **Actions**.
2. Add variables like `AWS_ACCESS_KEY_ID` yoki `DOCKER_PASSWORD`.
### Example with Secrets

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to AWS
        run: aws s3 sync ./build s3://my-bucket
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

---

## 7. **GitHub paketlari**

### GitHub'dan Docker registri sifatida foydalanish

1. Autentifikatsiya qilish:

   ```bash
   docker login ghcr.io -u USERNAME -p TOKEN
   ```

2. Build va Push:

   ```bash
   docker build -t ghcr.io/username/image-name:tag .
   docker push ghcr.io/username/image-name:tag
   ```

### GitHub paketlaridan o'rnatish

- `package.json` (Node.js) ga qaramlikni qo'shing:

  ```json
  "dependencies": {
    "package-name": "github:username/repository"
  }
  ```

---

## 8. **Advanced GitHub Features**

###  Branches ni himoya qilish

1. Go to **Settings** → **Branches**.
2. Filialni himoya qilish qoidalarini yoqish (masalan, majburan majburlashning oldini olish, PR sharhlarini talab qilish).

### Kodni ko'rib chiqishni avtomatlashtirish

- Kodni avtomatik ko'rib chiqish uchun **CodeCov** yoki **LGTM** kabi GitHub ilovalaridan foydalaning.

### Dependabot bilan qaramlikni boshqarish

1. **Insights** → **Mustahkamlik grafigi** ostida Dependabot-ni yoqing.
2. Dependabot eskirgan qaramliklarni yangilash uchun tortish so'rovlarini yaratadi.

---

## 9. **GitHub Xavfsizlik**

### Kodni skanerlash

1. Yoqish **Code Scanning Alerts** ostida **Security**.
2. Ish oqimlariga skanerlash amallarini qo'shing:

   ```yaml
   - name: CodeQL Analysis
     uses: github/codeql-action/analyze@v2
   ```

### Secret Scanning

- GitHub ochiq omborlarni sizib chiqqan sirlarni tekshiradi va ombor egasini ogohlantiradi.

### Yoqish 2FA

1. Go to **Settings** → **Account Security** → Ikki faktorli autentifikatsiyani yoqish.

---

## 10. **GitHub CLI (gh)**

### GitHub CLI ni o'rnatish

```bash
brew install gh  # macOS
sudo apt install gh  # Linux
```

### Autentifikatsiya qilinmoqda

```bash
gh auth login
```

### Common Commands

-  Repository ni klonlash:

  ```bash
  gh repo clone username/repository
  ```

-  Pull Request yaratish:

  ```bash
  gh pr create --title "Feature Update" --body "Details of PR"
  ```

- List Issues:

  ```bash
  gh issue list
  ```

---

## 11. **GitHub API**

### API dan foydalanish

Shaxsiy kirish tokenidan foydalanib autentifikatsiya qiling:

```bash
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user/repos
```

### Misol:  Issue yaratish

```bash
curl -X POST -H "Authorization: token YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{"title": "Bug Report", "body": "Description of the bug"}' \
https://api.github.com/repos/username/repository/issues
```

---

## 12. **GitHubning eng yaxshi amaliyotlari**

- **Tavsiflovchi topshiriq xabarlaridan foydalaning**:

  ```text
  Fix bug in login page #123
  ```

- **Enable Branch Protections** funksiyasini yoqing.

- Pull requests uchun GitHub Actions yordamida **Automate Testing**.
- **Issues va Labels dan foydalanish** loyihani samarali kuzatish uchun.

---

## Adabiyotlar va resurslar

1. [GitHub Hujjatlar](https://docs.github.com/)
2. [GitHub CLI Hujjatlar](https://cli.github.com/manual/)
3. [GitHub Harakatlar qo'llanmasi](https://docs.github.com/en/actions)
