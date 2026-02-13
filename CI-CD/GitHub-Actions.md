# GitHub Actions Cheatsheet

![](https://imgur.com/GMwRo18.png)

**1. Kirish:**

- GitHub Actions - bu to'g'ridan-to'g'ri GitHub omborlariga integratsiyalashgan kuchli CI/CD va avtomatlashtirish vositasi bo'lib, sizga kodingizni yaratish, sinovdan o'tkazish va joylashtirish imkonini beradi.

**2. Asosiy tushunchalar:**

- **Ish jarayoni:** YAMLda aniqlangan va `push`, `pull_request` va boshqalar kabi hodisalar tomonidan ishga tushiriladigan avtomatlashtirilgan jarayon.
- **Vazifa:** Xuddi shu ishga tushirgichda bajariladigan qadamlar to'plami.
- **Bosqich:** Alohida vazifa, masalan, skriptni ishga tushirish yoki qaramlikni o'rnatish.
- **Ishga tushirishchi:** Ish jarayonida vazifalarni bajaradigan server GitHub-hosting yoki o'z-o'zini hosting qilish mumkin.

**3. Asosiy ish jarayoniga misol:**

- **YAML sintaksisi:**

  ```yaml
  name: CI Workflow

  on:
    push:
      branches:
        - main
    pull_request:
      branches:
        - main

  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - name: Set up Node.js
          uses: actions/setup-node@v3
          with:
            node-version: '14'
        - run: npm install
        - run: npm test
  ```

**4. Umumiy harakatlar:**

- **harakatlar/to'lov:** `$GITHUB_WORKSPACE` ostidagi omboringizni tekshiradi.
- **actions/setup-node:** Node.js muhitini sozlaydi.
- **actions/upload-artifact:** Keyinchalik foydalanish uchun tuzilgan artefaktlarni yuklaydi.
- **actions/cache:** `node_modules` yoki `Maven` kabi bog'liqliklarni keshlaydi.

**5. Triggerlar:**

- **yoqilgan: surish:** Surish sodir bo'lganda ish jarayonini ishga tushiradi.
- **yoqilgan: pull_request:** Pull so'rovi ochilganda ish jarayonini ishga tushiradi.
- **yoqilgan: jadval:** cron sintaksisidan foydalanib, ish jarayonini ma'lum vaqtlarda ishga tushirishni rejalashtirish.

**6. Atrof-muhit o'zgaruvchilari:**

- **Atrof-muhit o'zgaruvchilarini o'rnatish:**

  ```yaml
  env:
    NODE_ENV: production
    DEBUG: true
  ```

- **Kirish sirlari:**

  ```yaml
  env:
    MY_SECRET: ${{ secrets.MY_SECRET }}
  ```

**7. Matritsa tuzilmalari:**

- **Misol:**

  ```yaml
  jobs:
    build:
      runs-on: ubuntu-latest
      strategy:
        matrix:
          node-version: [12, 14, 16]
      steps:
        - uses: actions/checkout@v3
        - name: Set up Node.js
          uses: actions/setup-node@v3
          with:
            node-version: ${{ matrix.node-version }}
        - run: npm install
        - run: npm test
  ```

**8. Artefaktlar va keshlash:**

- **Artefaktlarni yuklash:**

  ```yaml
  - name: Upload build artifacts
    uses: actions/upload-artifact@v3
    with:
      name: my-artifact
      path: ./build
  ```

- **Keshlash bog'liqliklari:**

  ```yaml
  - name: Cache Node.js modules
    uses: actions/cache@v3
    with:
      path: node_modules
      key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
      restore-keys: |
        ${{ runner.os }}-node-
  ```

**9. Qayta foydalanish mumkin bo'lgan ish oqimlari:**

- **Qayta foydalanish mumkin bo'lgan ish oqimini aniqlang:**

  ```yaml
  name: Reusable CI Workflow

  on:
    workflow_call:
      inputs:
        node-version:
          required: true
          type: string

  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - name: Set up Node.js
          uses: actions/setup-node@v3
          with:
            node-version: ${{ inputs.node-version }}
        - run: npm install
        - run: npm test
  ```

- **Qayta foydalanish mumkin bo'lgan ish oqimini chaqiring:**

  ```yaml
  jobs:
    call-workflow:
      uses: ./.github/workflows/reusable-workflow.yml
      with:
        node-version: '14'
  ```

**10. Eng yaxshi amaliyotlar:**

- **Modulli ish oqimlari:** Murakkab ish oqimlarini kichikroq, qayta ishlatiladigan qismlarga ajrating.
- **Muhitlardan foydalanish:** GitHub Actions’da qo‘lda tasdiqlash bilan joylashtirish uchun muhitlardan foydalanish.
- **Maxfiy boshqaruv:** Maxfiy ma'lumotlar uchun har doim GitHub Secrets’dan foydalaning va ularni hech qachon qattiq kodlamang.
