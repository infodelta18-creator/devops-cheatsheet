# CircleCI Cheatsheet

![](https://imgur.com/s6aXKl9.png)

**1. Kirish:**

- CircleCI - bu tez va samarali ishlab chiqish ish oqimlarini ta'minlaydigan, qurish, sinovdan o'tkazish va joylashtirish jarayonlarini avtomatlashtiradigan uzluksiz integratsiya va yetkazib berish platformasi.

**2. Asosiy tushunchalar:**

- **Vazifa:** Buildda bajarilishi kerak bo'lgan qadamlar to'plami.
- **Bosqich:** Vazifa ichidagi bitta buyruq yoki skript.
- **Ish jarayoni:** Vazifalar tartibini va ularning bog'liqliklarini belgilaydi.

**3. Asosiy `.circleci/config.yml` Misol:**

- **YAML sintaksisi:**

  ```yaml
  version: 2.1

  jobs:
    build:
      docker:
        - image: circleci/node:14
      steps:
        - checkout
        - run: npm install
        - run: npm test

    deploy:
      docker:
        - image: circleci/node:14
      steps:
        - checkout
        - run: npm run deploy

  workflows:
    version: 2
    build_and_deploy:
      jobs:
        - build
        - deploy
  ```

**4. Ijrochilar:**

- **Docker:** Docker konteynerlarida ishlarni bajarish.

  ```yaml
  docker:
    - image: circleci/node:14
  ```

- **Mashina:** Linux virtual mashinasida vazifalarni bajarish.

  ```yaml
  machine:
    image: ubuntu-2004:202101-01
  ```

- **macOS:** iOS versiyalari uchun macOS’da ishlarni bajaring.

  ```yaml
  macos:
    xcode: "12.4.0"
  ```

**5. Qayta ishlatiladigan konfiguratsiyalar:**

- **Buyruqlar:** Bir nechta vazifalarda qadamlarni qayta ishlatish.

  ```yaml
  commands:
    setup:
      steps:
        - checkout
        - run: npm install

  jobs:
    build:
      docker:
        - image: circleci/node:14
      steps:
        - setup
        - run: npm test
  ```

- **Ijrochilar:** Muhit konfiguratsiyasidan qayta foydalaning.

  ```yaml
  executors:
    node-executor:
      docker:
        - image: circleci/node:14

  jobs:
    build:
      executor: node-executor
      steps:
        - checkout
        - run: npm install
  ```

**6. Keshlash va artefaktlar:**

- **Keshlash:** Bog'liqliklarni keshlash orqali tuzilishlarni tezlashtirish.

  ```yaml
  - restore_cache:
      keys:
        - v1-dependencies-{{ checksum "package-lock.json" }}
  - save_cache:
      paths:
        - node_modules
      key: v1-dependencies-{{ checksum "package-lock.json" }}
  ```

- **Artefaktlar:** Keyinchalik foydalanish uchun yig'ish natijalari va boshqa ma'lumotlarni saqlang.

  ```yaml
  - store_artifacts:
      path: ./build
      destination: build_output
  ```

**7. Ish jarayonlari:**

- **Ketma-ket vazifalar:** Ketma-ket bajariladigan vazifalarni aniqlang.

  ```yaml
  workflows:
    version: 2
    build_and_deploy:
      jobs:
        - build
        - deploy
  ```

- **Parallel ishlar:** Quvur liniyasi bajarilishini tezlashtirish uchun ishlarni parallel ravishda bajaring.

  ```yaml
  workflows:
    version: 2
    test-and-deploy:
      jobs:
        - test
        - deploy
  ```

**8. Atrof-muhit o'zgaruvchilari:**

- **Loyiha darajasidagi o'zgaruvchilar:** CircleCI loyiha sozlamalarida muhit o'zgaruvchilarini o'rnating.
- **Kontekst o'zgaruvchilari:** Atrof-muhitni xavfsiz saqlash va boshqarish uchun kontekstlardan foydalaning

  ```yaml
  jobs:
    build:
      docker:
        - image: circleci/node:14
      environment:
        NODE_ENV: production
  ```

**9. Kengaytirilgan CircleCI xususiyatlari:**

- **Orbs:** Uchinchi tomon vositalari bilan integratsiyani osonlashtiradigan CircleCI konfiguratsiyasining qayta ishlatiladigan paketlari.

  ```yaml
  orbs:
    aws-s3: circleci/aws-s3@4.2.0

  jobs:
    deploy:
      steps:
        - aws-s3/copy:
            from: "build/"
            to: "s3://my-bucket/"
  ```

- **Shartli bosqichlar:** Oldingi bosqichlarning muvaffaqiyati yoki muvaffaqiyatsizligiga qarab bosqichlarni shartli ravishda bajaring.

  ```yaml
  - run:
      name: Deploy only if tests pass
      command: ./deploy.sh
      when: on_success
  ```


**10. Eng yaxshi amaliyotlar:**

- **Parallelizm:** Sinovlar va boshqa vazifalarni bir vaqtning o'zida bajarish orqali yig'ish vaqtini qisqartirish uchun parallelizmdan foydalaning.
- **Modul konfiguratsiyalari:** CircleCI konfiguratsiyangizni tahlil qiling. 