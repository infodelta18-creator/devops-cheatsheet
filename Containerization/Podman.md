# Podman Cheatsheet

![text](https://imgur.com/6x1bZIJ.png)

**1. Kirish:**

- **Podman** - bu Dockerga o'xshash ishlaydigan, ammo demonga bog'liq bo'lmagan ochiq kodli konteyner dvigateli. Bu konteynerlar va konteyner tasvirlari uchun Open Container Initiative (OCI) standartlarini qo'llab-quvvatlaydi.

**2. Asosiy tushunchalar:**

- **Pod:** Kubernetes Podga o'xshash, birgalikda ishlaydigan va resurslarni baham ko'radigan konteynerlar guruhi.
- **Rootless Containers:** Podman konteynerlarni root bo'lmagan foydalanuvchi sifatida ishga tushirishi mumkin.
- **Docker mosligi:** Podman buyruqlari Dockerga o'xshaydi, bu ikkalasi o'rtasida almashishni osonlashtiradi.

**3. O'rnatish:**

- **Fedora'da:**

  ```bash
  sudo dnf install podman
  ```
  
- **Ubuntu’da:**

  ```bash
  sudo apt-get -y install podman
  ```

**4. Podmanning asosiy buyruqlari:**

- **Konteynerni ishga tushirish:**

  ```bash
  podman run -dt -p 8080:80 nginx
  ```
  
- **Ishlayotgan konteynerlar ro'yxati:**

  ```bash
  podman ps
  ```
  
- **Konteynerni to'xtating:**

  ```bash
  podman stop container_id
  ```
  
- **Konteynerni olib tashlash:**

  ```bash
  podman rm container_id
  ```

- **Tasvir yarating:**

  ```bash
  podman build -t my-image:latest .
  ```

**5. Podman va Docker:**

- **Demon yo'q:** Podman markaziy demonga tayanmaydi; har bir konteyner izolyatsiya qilingan jarayondir.
- **Rootsiz rejim:** Xavfsizlikni oshirib, konteynerlarni root imtiyozlarisiz ishga tushirishga imkon beradi.
- **Podman Pods:** Konteynerlarni bitta tarmoq nom maydoni ostida guruhlash.

**6. Podmandagi podlar:**

- **Pod yarating:**

  ```bash
  podman pod create --name mypod -p 8080:80
  ```
  
- **Podda konteynerni ishga tushirish:**

  ```bash
  podman run -dt --pod mypod nginx
  ```

- **Podni tekshiring:**

  ```bash
  podman pod inspect mypod
  ```

- **Podni to'xtating:**

  ```bash
  podman pod stop mypod
  ```

**7. Tarmoq:**

- **Podman Tarmoq Buyrug'i:**

  ```bash
  podman network create mynetwork
  ```

- **Konteynerni tarmoqqa ulash:**

  ```bash
  podman run -dt --network mynetwork nginx
  ```

**8. Saqlash boshqaruvi:**

- **Jildni o'rnatish:**

  ```bash
  podman run -dt -v /host/data:/container/data nginx
  ```

- **Ro'yxat jildlari:**

  ```bash
  podman volume ls
  ```

- **Jild yaratish:**

  ```bash
  podman volume create myvolume
  ```

**9. Ildizsiz konteynerlar:**

- **Ildizsiz ishlayapti:**

  ```bash
  podman --rootless run -dt -p 8080:80 nginx
  ```

- **Ildizsiz rejimni tekshiring:**

  ```bash
  podman info --format '{{.Host.Rootless}}'
  ```

**10. Podman kompozitsiyasi:**

- **Podman Compose-ni o'rnating:**

  ```bash
  pip3 install podman-compose
  ```

- **Podman bilan Docker Compose dan foydalanish:**

  ```bash
  podman-compose up
  ```

**11. Podman bilan bog'liq muammolarni bartaraf etish:**

- **Podman jurnallarini tekshiring:**

  ```bash
  podman logs container_id
  ```

- **Tarmoq konfiguratsiyasini tekshiring:**

  ```bash
  podman network inspect mynetwork
  ```

- **Podman konteynerlarini nosozliklarni tuzatish:**

  ```bash
  podman exec -it container_id /bin/bash
  ```

**12. CI/CDdagi Podman:**

- **GitLab CI da Podmandan foydalanish:**

  ```yaml
  image: quay.io/podman/stable

  build:
    script:
      - podman build -t myimage .
      - podman push myimage registry.example.com/myimage:latest
  ```

**13. Xavfsizlikning eng yaxshi amaliyotlari:**

- **Konteynerlarni ildiz bo'lmagan sifatida ishga tushirish:**
- Rootsiz rejimdan foydalaning yoki konteynerda ildiz bo'lmagan foydalanuvchini ko'rsating.

  ```bash
  podman run -dt -u 1001 nginx
  ```

- **SELinux dan foydalaning:**
- Qo'llab-quvvatlanadigan tizimlarda qo'shimcha xavfsizlik uchun SELinux ni yoqing.

  ```bash
  podman run -dt --security-opt label=type:container_runtime_t nginx
  ```

**14. Dockerdan Podmanga o'tish:**

- **Docker moslik rejimi:**

  ```bash
  alias docker=podman
  ```

- **Docker rasmlarini import qilish:**

  ```bash
  podman pull docker-daemon:nginx:latest
  ```

**15. Kubernetesdagi Podman:**

- **CRI-O integratsiyasi:**
  - Podman CRI-O bilan Kubernetes uchun ish vaqti sifatida ishlatilishi mumkin, bu esa Kubernetes klasterlari bilan uzluksiz integratsiyani ta'minlaydi.
