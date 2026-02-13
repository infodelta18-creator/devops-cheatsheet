# Docker Cheatsheet

![text](https://imgur.com/XHwJp6U.png)

## [Dev.to] saytidagi batafsil maqolani ko'rib chiqing (https://dev.to/prodevopsguytech/docker-commands-from-beginner-to-advanced-for-devops-engineers-bb3)

## 1. Dockerga kirish

### Docker nima?

- **Docker** - bu konteynerizatsiya texnologiyasidan foydalangan holda ilovalarni joylashtirish, masshtablash va boshqarishni avtomatlashtiradigan ochiq kodli platforma. Konteynerlar - bu dasturiy ta'minotni ishga tushirish uchun zarur bo'lgan barcha narsalarni, jumladan, kod, ish vaqti, tizim vositalari, kutubxonalar va sozlamalarni o'z ichiga olgan yengil, ko'chma va barqaror muhitlar.

### Asosiy tushunchalar

- **Docker Engine**: Dockerning asosiy komponenti, konteynerlarni ishga tushirish uchun mas'ul.
- **Rasm**: Ilovani ishga tushirish uchun zarur bo'lgan barcha narsalarni o'z ichiga olgan yengil, mustaqil va bajariladigan dasturiy ta'minot to'plami.
- **Konteyner**: Xost tizimining yadrosini ulashadigan Docker tasvirining ish vaqtidagi nusxasi.
- **Dockerfile**: Docker tasvirini yig'ish uchun bir qator buyruqlarni o'z ichiga olgan skript.
- **Registry**: Docker Hub kabi Docker tasvirlari uchun saqlash va tarqatish tizimi.
- **Docker Compose**: YAML faylidan foydalangan holda ko'p konteynerli Docker ilovalarini aniqlash va ishga tushirish vositasi.

---

## 2. Dockerni o'rnatish

### Dockerni Linuxda o'rnatish

- **Docker Engineni o'rnatish**:

  ```bash
  sudo apt-get update
  sudo apt-get install docker-ce docker-ce-cli containerd.io
  ```

- **Docker xizmatini ishga tushiring**:

  ```bash
  sudo systemctl start docker
  sudo systemctl enable docker
  ```

### Dockerni macOS-ga o'rnating

- **Docker Desktopni o'rnatish**:
  - Docker Desktop dasturini [Docker rasmiy veb-saytidan] (https://www.docker.com/products/docker-desktop) yuklab oling va o'rnating.

### Dockerni Windows-ga o'rnating

- **Docker Desktopni o'rnatish**:
- Docker Desktopni [Docker rasmiy veb-saytidan] (https://www.docker.com/products/docker-desktop) yuklab oling va o'rnating.

---

## 3. Dockerning asosiy operatsiyalari

### Docker tasvirlari bilan ishlash

- **Tasvirni qidirish**:

  ```bash
  docker search nginx
  ```

- **Docker Hub’dan rasmni tortib oling**:

  ```bash
  docker pull nginx
  ```

- **Barcha rasmlarni ro'yxatlash**:

  ```bash
  docker images
  ```

- **Rasmni olib tashlash**:

  ```bash
  docker rmi nginx
  ```

### Docker konteynerlari bilan ishlash

- **Konteynerni ishga tushirish**:

  ```bash
  docker run -d -p 80:80 --name mynginx nginx
  ```

- **Ishlayotgan konteynerlar ro'yxati**:

  ```bash
  docker ps
  ```

- **Barcha konteynerlarni ro'yxatlash (to'xtatilganlarni ham qo'shib hisoblaganda)**:

  ```bash
  docker ps -a
  ```

- **Ishlayotgan konteynerni to'xtatish**:

  ```bash
  docker stop mynginx
  ```

- **Konteynerni olib tashlash**:

  ```bash
  docker rm mynginx
  ```

### Docker tarmoqlari

- **Barcha tarmoqlarni ro'yxatlash**:

  ```bash
  docker network ls
  ```

- **Yangi tarmoq yaratish**:

  ```bash
  docker network create mynetwork
  ```

- **Konteynerni tarmoqqa ulang**:

  ```bash
  docker network connect mynetwork mynginx
  ```

- **Konteynerni tarmoqdan uzib qo'yish**:

  ```bash
  docker network disconnect mynetwork mynginx
  ```

---

## 4. Docker tasvirlarini yaratish

### Dockerfile asoslari

- **Dockerfile namunasi**:

  ```Dockerfile
# Rasmiy Node.js ish vaqtidan ota-ona tasviri sifatida foydalaning
FROM tugun:14

  # Ishchi katalogni konteynerga o'rnating
WORKDIR /app

  # Joriy katalog tarkibini /app manzilidagi konteynerga nusxalash. NUSXA . /app

  # Ko'rsatilgan barcha kerakli paketlarni o'rnating package.json
  RUN npm install

  # 8080 portini ushbu konteynerdan tashqaridagi dunyo uchun mavjud qiling
  EXPOSE 8080

  # Atrof-muhit o'zgaruvchisini aniqlang
ENV NODE_ENV production

  # Node yordamida app.js ni ishga tushiring
CMD ["node", "app.js"]
```

### Dockerfile’dan rasm yaratish

- **Rasm yaratish**:

  ```bash
  docker build -t mynodeapp .
  ```

### Tasvir teglarini boshqarish

- **Tasvir tegini qo'shish**:

  ```bash
  docker tag mynodeapp myrepo/mynodeapp:v1.0
  ```

- **Tasvirni Docker Hubga yuborish**:

  ```bash
  docker push myrepo/mynodeapp:v1.0
  ```

---

## 5. Docker Compose

### Docker Compose’ga kirish

- **Docker Compose** ko'p konteynerli Docker ilovalarini aniqlash va ishga tushirish vositasidir. Siz ilovangiz xizmatlarini sozlash uchun YAML faylidan foydalanasiz va keyin barcha xizmatlarni yaratish va ishga tushirish uchun bitta buyruqdan foydalanasiz.

### `docker-compose.yml` faylining namunasi

```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: example
```

### Docker Compose buyruqlari

- **Xizmatlarni ishga tushirish**:

  ```bash
  docker-compose up
  ```

- **Xizmatlarni to'xtatish**:

  ```bash
  docker-compose down
  ```

- **Ko'lamli xizmatlar**:

  ```bash
  docker-compose up --scale web=3
  ```

### Docker Compose yordamida hajmlarni boshqarish

- **Hajmlarni aniqlash**:

  ```yaml
  services:
    web:
      image: nginx
      volumes:
        - ./webdata:/usr/share/nginx/html
  ```

---

## 6. Docker hajmlari va saqlash

### Docker hajmlarini tushunish

- **Jildlar** Docker konteynerlari tomonidan yaratilgan va ishlatiladigan ma'lumotlarni saqlash uchun afzal ko'rilgan mexanizmdir.

### Jildlarni boshqarish

- **Jild yaratish**:

  ```bash
  docker volume create myvolume
  ```

- **Barcha jildlarni ro'yxatlash**:

  ```bash
  docker volume ls
  ```

- **Jildni tekshirish**:

  ```bash
  docker volume inspect myvolume
  ```

- **Jildni olib tashlash**:

  ```bash
  docker volume rm myvolume
  ```

### O'rnatish hajmlari

- **Ovozni konteynerga o'rnatish**:

  ```bash
  docker run -d -p 80:80 --name mynginx -v myvolume:/usr/share/nginx/html nginx
  ```

### Bog'lash moslamalari

- **Bog'lash moslamasidan foydalaning**:

  ```bash
  docker run -d -p 80:80 --name mynginx -v /path/to/local/dir:/usr/share/nginx/html nginx
  ```

---

## 7. Docker Tarmoqlari

### Tarmoq Usullari

- **Ko'prik tarmog'i**: Konteynerlarga bir xil xostda aloqa o'rnatish imkonini beruvchi standart tarmoq drayveri.
- **Xost Tarmog'i**: Konteyner va Docker xosti o'rtasidagi tarmoq izolyatsiyasini olib tashlaydi.
- **Qoplama Tarmog'i**: Bir to'dada bir nechta Docker xostlari o'rtasida tarmoq ulanishini yoqadi.

### Tarmoqlar bilan ishlash

- **Foydalanuvchi tomonidan belgilangan ko'prik tarmog'ini yaratish**:

  ```bash
  docker network create mynetwork
  ```

- **Tarmoqda konteynerni ishga tushirish**:

  ```bash
  docker run -d --name mynginx --network=mynetwork nginx
  ```

- **Tarmoqni tekshirish**:

  ```bash
  docker network inspect mynetwork
  ```

### Docker’dagi DNS

- Docker konteynerlari oʻrnatilgan DNS serveridan foydalanib, bir-birining xost nomlarini IP manzillariga oʻzgartirishi mumkin.

---

## 8. Docker xavfsizligi

### Docker xavfsizligini ta'minlash

- **Eng kam imtiyozli foydalanuvchi**: Konteynerlarni har doim root bo'lmagan foydalanuvchi sifatida ishga tushiring.

  ```Dockerfile
  FROM nginx
  USER www-data
  ```

- **Ishonchli tasvirlardan foydalaning**: Rasmiy tasvirlardan yoki ishonchli manbalardan olingan tasvirlardan foydalaning.
- **Dockerni yangilab turing**: Xavfsizlik yamoqlaridan foydalanish uchun Dockerni muntazam ravishda eng so'nggi versiyasiga yangilab turing.

### Docker Content Trust

- **Docker Content Trust (DCT) ni yoqish**:

  ```bash
  export DOCKER_CONTENT_TRUST=1
  ```

### Sirlarni boshqarish

- **Docker Swarmda sir yaratish**:

  ```bash
  echo "mysecretpassword" | docker secret create my_secret -
  ```

- **Xizmatda maxfiy ma'lumotlardan foydalanish**:

  ```bash
  docker service create --name myservice --secret my_secret nginx
  ```

### Docker Daemonini Xavfsizlantirish

- **Docker API'sini Xavfsizlantirish uchun TLS dan foydalanish**:
- TLS sertifikatlarini yaratish va Docker daemonini ulardan xavfsiz aloqa uchun foydalanish uchun sozlash.

### Konteyner resurslarini cheklash

- **Xotirani cheklash**:

  ```bash
  docker run -d --name mynginx --memory="256m" nginx
  ```

- **CPU chegarasi**:

  ```bash
  docker run -d --name mynginx --cpus="1.0" nginx
  ```

---

## 9. Kengaytirilgan Docker xususiyatlari

### Docker Swarm

- **Swarmni ishga tushiring**:

  ```bash
  docker swarm init
  ```

- **Ommaga qo'shiling**:

  ```bash
  docker swarm join --token SWMTKN-1-xxxx
  ```

- **Stekni joylashtirish**:

  ```bash
  docker stack deploy -c docker-compose.yml mystack
  ```

### Ko'p bosqichli tuzilmalar

- **Ko'p bosqichli Dockerfile misoli**:

  ```Dockerfile
  # First Stage
  FROM golang:1.16 as builder
  WORKDIR /app
  COPY . .
  RUN go build -o myapp

  # Second Stage
  FROM alpine:latest
  WORKDIR /app
  COPY --from=builder /app/myapp .
  CMD ["./myapp"]
  ```

### Docker plaginlari

- **O'rnatilgan plaginlar ro'yxati**:

  ```bash
  docker plugin ls
  ```

- **Plaginni o'rnatish

**:

  ```bash
  docker plugin install vieux/sshfs
  ```

### Docker Daemon konfiguratsiyasi

- **Docker Daemonni sozlash**:
- Docker daemonni sozlash uchun `/etc/docker/daemon.json` faylini tahrirlang.

  ```json
  {
    "log-driver": "json-file",
    "log-level": "warn",
    "storage-driver": "overlay2"
  }
  ```

- **Daemon konfiguratsiyasini qayta yuklash**:

  ```bash
  sudo systemctl reload docker
  ```

---

## 10. Monitoring va jurnalga yozish

### Docker jurnallari

- **Konteyner jurnallarini ko'rish**:

  ```bash
  docker logs mynginx
  ```

- **Jurnallarni kuzatib boring**:

  ```bash
  docker logs -f mynginx
  ```

### Konteynerlarni kuzatish

- **Resurslardan foydalanishni tekshirish**:

  ```bash
  docker stats mynginx
  ```

- **Docker tadbirlari**:
- Docker tadbirlarini real vaqt rejimida kuzatib boring.

  ```bash
  docker events
  ```

### Monitoring vositalari bilan integratsiya

- **Prometheus va Grafana**: Docker konteynerlarini kuzatish uchun cAdvisor va Prometheus Node Exporter dan foydalaning.

  ```bash
  docker run -d --name=cadvisor --volume=/:/rootfs:ro --volume=/var/run:/var/run:ro --volume=/sys:/sys:ro --volume=/var/lib/docker/:/var/lib/docker:ro --volume=/dev/disk/:/dev/disk:ro --publish=8080:8080 google/cadvisor:latest
  ```

---

## 11. Dockerning eng yaxshi amaliyotlari

### Dockerfilening eng yaxshi amaliyotlari

- **Tasvir hajmini minimallashtirish**: Ko'p bosqichli yig'ishlar va ingichka asosiy tasvirlardan foydalaning.
- **Build Cache’dan foydalaning**: Kesh qatlamlaridan maksimal darajada foydalanish uchun Dockerfile ko'rsatmalarini tartibga soling.
- **`.dockerignore`** dan foydalaning: `.dockerignore` fayli yordamida keraksiz fayllarni tuzish kontekstidan chiqarib tashlang.

### Konteynerlarni boshqarish bo'yicha eng yaxshi amaliyotlar

- **O'zgarmas infratuzilma**: Konteynerlarni o'zgarmas deb hisoblang, ishlayotgan konteynerlarni o'zgartirish o'rniga ularni almashtiring.
- **Konteynerlarni davlatsiz saqlang**: Konteynerlarni tashqi ma'lumotlar saqlanib qoladigan davlatsiz qilib loyihalashtiring.
- **STDOUT/STDERR ga kirish**: Konteynerlarning osonroq agregatsiya va tahlil qilish uchun STDOUT/STDERR ga kirishini ta'minlang.

### Xavfsizlikning eng yaxshi amaliyotlari

- **Rasmlarni muntazam ravishda skanerlang**: Zaifliklarni aniqlash uchun tasvirlarni skanerlash uchun `trivy` kabi vositalardan foydalaning.
- **Nomlar maydonidan foydalaning**: Konteyner resurslarini ajratish va xavfsizlikni oshirish uchun nomlar maydonidan foydalaning.
- **Cheklash imkoniyatlari**: Konteynerlardan keraksiz imkoniyatlarni olib tashlang.

  ```bash
  docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE nginx
  ```

---

## 12. Docker bilan bog'liq muammolarni bartaraf etish

### Umumiy muammolar

- **Konteyner darhol chiqadi**:
- Docker jurnallarida xatolar bor-yo'qligini tekshiring.

  ```bash
  docker logs <container_id>
  ```

- **Tasvir yaratishda xatoliklar**:
- Tasvirni keshsiz qayta tiklash uchun `--keshsiz` opsiyasidan foydalanib nosozliklarni tuzatish.

  ```bash
  docker build --no-cache -t myimage .
  ```

- **Tarmoq bilan bog'liq muammolar**:
- Tarmoq sozlamalari va ulanishni tekshiring.

  ```bash
  docker network inspect <network_name>
  ```

### Muammolarni bartaraf etish uchun foydali Docker buyruqlari

- **Konteynerni tekshiring**:

  ```bash
  docker inspect <container_id>
  ```

- **Ishlayotgan konteynerni kiriting**:

  ```bash
  docker exec -it <container_id> /bin/bash
  ```

- **Resurslardan foydalanishni tekshirish**:

  ```bash
  docker stats
  ```

---

## 13. Adabiyotlar

### Rasmiy hujjatlar

- [Docker hujjatlari](https://docs.docker.com/)

### Jamiyat resurslari

- [Docker Hub](https://hub.docker.com/)
- [Docker GitHub ombori](https://github.com/docker/docker-ce)
- [Docker forumlari](https://forums.docker.com/)
