# CRI-O Cheatsheet

![text](https://imgur.com/iET0fW6.png)

## Mundarija

1. **CRI-O ga kirish**
   - CRI-O nima?
   - Arxitektura haqida umumiy ma'lumot
   - Asosiy xususiyatlar
2. **O'rnatish**
   - Tizim talablari
   - Linuxda CRI-O ni o'rnatish
   - O'rnatishdan keyingi konfiguratsiya
3. **Asosiy buyruqlar**
   - CRI-O CLI haqida umumiy ma'lumot
   - CRI-O ni ishga tushirish va to'xtatish
   - Konteynerlarni boshqarish
   - Jurnallarni ko'rish
4. **Konteynerlarni boshqarish**
   - Rasmlarni tortish
   - Ishlayotgan konteynerlar
   - Konteynerlarni to'xtatish va olib tashlash
   - Ishlayotgan konteynerlarni ko'rish
5. **Tarmoq**
   - Standart tarmoq konfiguratsiyasi
   - Maxsus tarmoqlarni sozlash
   - CRI-O bilan CNI plaginlaridan foydalanish
6. **Saqlash**
   - Konteyner saqlashni boshqarish
   - Saqlash parametrlarini sozlash
   - Doimiy saqlashni boshqarish
7. **Xavfsizlik**
   - Pod xavfsizlik siyosati (PSP)
   - SELinux va CRI-O
   - Seccomp profillari
   - AppArmor integratsiyasi
8. **Monitoring va jurnalga yozish**
   - Prometey bilan integratsiya
   - Jurnal to'plamini sozlash
   - Nosozliklarni tuzatish konteynerlari
9. **Kengaytirilgan konfiguratsiya**
   - CRI-O konfiguratsiya fayllari
   - Ish vaqti konfiguratsiyasi
   - Resurs limitlari va C guruhlari
   - Ishlash uchun sozlash
10. **Muammolarni bartaraf qilish; nosozliklarni TUZATISH**
    - Umumiy muammolar va tuzatishlar
    - CRI-O jurnallarini tahlil qilish
    - Konteynerlarni nosozliklarni tuzatishda muvaffaqiyatsizlikka uchradi
11. **Kubernetes bilan integratsiya**
    - CRI-O ni Kubernetes bilan sozlash
    - CRI-O K8s uchun konteyner ish vaqti sifatida
    - Kubernetesda CRI-O bilan ko'p ijaraga beriladigan uylar
12. **Eng yaxshi amaliyotlar**
    - Xavfsizlikning eng yaxshi amaliyotlari
    - Ishlashni optimallashtirish
    - Samarali resurslarni boshqarish
13. **Tez-tez so'raladigan savollar**
    - CRI-O haqida keng tarqalgan savollar
14. **Manbalar**
    - Rasmiy hujjatlar
    - Jamiyat resurslari

---

## 1. CRI-O ga kirish

### CRI-O nima?

- **CRI-O** Kubernetes uchun ochiq kodli, yengil konteyner ish vaqti. U Kubernetes va konteyner ish vaqti o'rtasida minimal va barqaror interfeysni ta'minlash uchun mo'ljallangan bo'lib, konteyner ish vaqti interfeysi (CRI) spetsifikatsiyalariga rioya qiladi.

### Arxitektura haqida umumiy ma'lumot

- **CRI-O** konteyner operatsiyalarini boshqarish uchun OCI bilan mos keladigan ish vaqtlaridan (masalan, runc) foydalanib, Kubernetes bilan to'g'ridan-to'g'ri integratsiyalashadi.Bu Kubernetes muhitida Docker kabi to'liq konteyner dvigateliga bo'lgan ehtiyojni almashtiradi.

### Asosiy xususiyatlar

- **Yengil**: To'liq konteyner dvigatellariga nisbatan minimal bog'liqliklar va kichikroq iz.
- **Moslik**: Kubernetes va Open Container Initiative (OCI) spetsifikatsiyalariga to'liq mos keladi.
- **Xavfsizlik**: Kengaytirilgan xavfsizlik uchun SELinux, AppArmor va seccomp bilan integratsiyalashgan.
- **Ishlash**: Kamroq qo'shimcha xarajatlar bilan ishlash uchun optimallashtirilgan.

---

## 2. O'rnatish

### Tizim talablari

- **Qo'llab-quvvatlanadigan OS**: CRI-O Fedora, CentOS va Ubuntu kabi turli xil Linux distributivlarini qo'llab-quvvatlaydi.
- **Yadro versiyasi**: Optimal moslik uchun Linux yadrongiz 4.19 yoki undan yuqori ekanligiga ishonch hosil qiling.

### Linuxda CRI-O ni o'rnatish

- **Fedora/CentOS**:

  ```bash
  sudo dnf install -y cri-o
  ```

- **Ubuntu**:

  ```bash
  sudo apt-get install -y cri-o
  ```

### O'rnatishdan keyingi konfiguratsiya

- **CRI-O ni ishga tushirish va yoqish**:

  ```bash
  sudo systemctl start crio
  sudo systemctl enable crio
  ```

- **O'rnatishni tasdiqlash**:

  ```bash
  crio --version
  ```

---

## 3. Asosiy buyruqlar

### CRI-O CLI haqida umumiy ma'lumot

- **`crio`**: CRI-O xizmati bilan o'zaro ishlash uchun asosiy buyruq.
- **`crictl`**: CRI-O orqali konteynerlar va tasvirlarni boshqarish uchun ishlatiladigan CLI vositasi.

### CRI-O ni ishga tushirish va to'xtatish

- **CRI-O ni boshlang**:

  ```bash
  sudo systemctl start crio
  ```

- **CRI-O ni to'xtating**:

  ```bash
  sudo systemctl stop crio
  ```

### Konteynerlarni boshqarish

- **Ishlayotgan konteynerlar ro'yxati**:

  ```bash
  sudo crictl ps
  ```

- **Konteynerni to'xtating**:

  ```bash
  sudo crictl stop <container_id>
  ```

- **Konteynerni olib tashlash**:

  ```bash
  sudo crictl rm <container_id>
  ```

### Jurnallarni ko'rish

- **CRI-O jurnallarini ko'rish**:

  ```bash
  sudo journalctl -u crio
  ```

---

## 4. Konteynerlarni boshqarish

### Tasvirlarni tortib olish

- **Rasmni torting**:

  ```bash
  sudo crictl pull <image_name>
  ```

### Ishlaydigan konteynerlar

- **Konteynerni ishga tushirish**:

  ```bash
  sudo crictl run <pod_config.json> <container_config.json>
  ```

### Konteynerlarni to'xtatish va olib tashlash

- **Konteynerni to'xtating**:

  ```bash
  sudo crictl stop <container_id>
  ```

- **Konteynerni olib tashlash**:

  ```bash
  sudo crictl rm <container_id>
  ```

### Ishlayotgan konteynerlarni ko'rish

- **Ro'yxat konteynerlari**:

  ```bash
  sudo crictl ps
  ```

---

## 5. Tarmoq

### Standart tarmoq konfiguratsiyasi

- **Standart tarmoq**: CRI-O standart holatda tarmoq uchun `cni0` ko'prigidan foydalanadi.

### Maxsus tarmoqlarni sozlash

- **CNI plaginlari**: CRI-O maxsus tarmoq sozlamalarini sozlash uchun turli xil CNI plaginlaridan foydalanishi mumkin.

### CRI-O bilan CNI plaginlaridan foydalanish

- **CNI plaginlarini o'rnatish**:

  ```bash
  sudo dnf install -y containernetworking-plugins
  ```

- **Plaginni sozlash**: CNI plagin konfiguratsiyangizni `/etc/cni/net.d/` fayliga qo'shing.

---

## 6. Saqlash

### Konteynerlarni saqlashni boshqarish

- **Standart xotira**: CRI-O sukut bo'yicha `overlay` xotira drayveridan foydalanadi.

### Saqlash parametrlarini sozlash

- **Saqlash drayverini o'zgartirish**: Saqlash drayverini o'zgartirish uchun `/etc/containers/storage.conf` faylini tahrirlang.

### Doimiy saqlashni boshqarish

- **O'rnatish hajmlari**: Doimiy saqlash hajmlarini konteynerlarga ulash uchun `--mount` parametridan foydalaning.

---

## 7. Xavfsizlik

### Pod xavfsizlik siyosati (PSP)

- **PSPlarni yoqish**: CRI-O boshqariladigan konteynerlarga xavfsizlik cheklovlarini qo'llash uchun Kubernetes-da PSPlarni sozlang.

### SELinux va CRI-O

- **SELinuxni amalga oshirish**: Xavfsizlikni yaxshilash uchun xost tizimida SELinux yoqilganligiga ishonch hosil qiling.

### Seccomp profillari

- **Seccomp ni yoqish**: CRI-O konteynerlar uchun tizim chaqiruvlarini cheklash uchun seccomp profillarini qo'llab-quvvatlaydi.

### AppArmor integratsiyasi

- **AppArmor profillari**: Xavfsizlik siyosatini amalga oshirish uchun CRI-O konteynerlari uchun AppArmor profillarini qo'llang.

---

## 8. Monitoring va jurnalga yozish

### Prometheus bilan integratsiya

- **Prometheus Metrics**: CRI-O Prometheus tomonidan monitoring uchun olib tashlanishi mumkin bo'lgan metrikalarni ochib beradi.

### Jurnal to'plamini sozlash

- **Jurnalni aylantirish**: Konteyner jurnallarini boshqarish uchun `/etc/crio/crio.conf` faylida jurnalni aylantirishni sozlang.

### Nosozliklarni tuzatish konteynerlari

- **Konteyner jurnallari**:

  ```bash
  sudo crictl logs <container_id>
  ```

---

## 9. Kengaytirilgan konfiguratsiya

### CRI-O konfiguratsiya fayllari

- **Asosiy konfiguratsiya fayli**: `/etc/crio/crio.conf`
- **Konfiguratsiyalarni o'zgartirish**: Ish vaqti, tarmoq va xotira uchun sozlamalarni sozlang.

### Ish vaqti konfiguratsiyasi

- **Ish vaqtini belgilang**: Konteynerning ish vaqtini (masalan, runc, kata) o'rnatish uchun `crio.conf` faylidagi `ish vaqti` bo'limidan foydalaning.

### Resurs limitlari va C guruhlari

- **Resurs limitlarini o'rnatish**: Konteyner konfiguratsiyasida protsessor va xotira limitlarini aniqlang.

### Ishlash uchun sozlash

- **Parametrlarni sozlash**: Ishlashni sozlash uchun `crio.conf` faylidagi `pids_limit` va `log_size_max` kabi parametrlarni o'zgartiring.

---

## 10. Muammolarni bartaraf etish

### Umumiy muammolar va tuzatishlar

- **Konteynerlar ishga tushmayapti**: Ish vaqti yoki konfiguratsiya muammolari bilan bog'liq xatolar uchun jurnallarni tekshiring.
- **Tarmoq bilan bog'liq muammolar**: CNI plagini konfiguratsiyalari va tarmoq sozlamalarini tekshiring.

### CRI-O jurnallarini tahlil qilish

- **Jurnallarni ko'rish**:

  ```bash
  sudo journalctl -u crio
  ```

### Konteynerlarni nosozliklarni tuzatishda muvaffaqiyatsizlikka uchradi

- **Chiqish kodini tekshiring**:

  ```bash
  sudo crictl inspect <container_id>
  ```

---

## 11. Kubernetes bilan integratsiya

### CRI-O ni Kubernetes yordamida sozlash

- **CRI-O ni standart ish vaqti sifatida o'rnating**: Kubernetes konfiguratsiyasini CRI-O ni standart konteyner ish vaqti sifatida ishlatish uchun o'zgartiring.

### CRI-O K8s uchun konteyner ish vaqti sifatida

- **O'rnatish**: CRI-O barcha Kubernetes tugunlariga o'rnatilgan va sozlanganligiga ishonch hosil qiling.

### Kubernetesda CRI-O bilan ko'p ijaraga beriladigan uylar

- **Nom maydoni izolyatsiyasi**: Ijarachilarning izolyatsiyasini ta'minlash uchun Kubernetes nom maydonlari va CRI-O xavfsizlik xususiyatlaridan foydalaning.

---

## 12. Eng yaxshi amaliyotlar

### Xavfsizlikning eng yaxshi amaliyotlari

- **SELinuxdan foydalaning**: CRI-O ishlaydigan barcha tugunlar uchun SELinuxni yoqing.
- **Resurslardan foydalanishni cheklash**: Resurslar tugashining oldini olish uchun protsessor va xotira chegaralarini belgilang.

### Ishlashni optimallashtirish

- **Ish vaqtini sozlash**: Yuqori unumdorlikdagi ish yuklamalari uchun ish vaqti parametrlarini sozlash.
- **Jurnallarni boshqarish**: Disk maydoni tugab qolishining oldini olish uchun jurnalni to'g'ri aylantirishni sozlang.

### Resurslarni samarali boshqarish

- **Resurs cheklovlari**: Klaster resurslaridan foydalanishni optimallashtirish uchun konteynerlarga resurs cheklovlarini qo'llang.

---

## 13. Tez-tez so'raladigan savollar

### CRI-O haqida keng tarqalgan savollar

- **

Savol: CRI-O Dockerdan qanday farq qiladi?
  **A**: CRI-O - bu Kubernetes uchun maxsus ishlab chiqilgan yengil konteyner ish vaqti, Docker esa to'liq funksiyali konteyner platformasi.

- **Savol**: CRI-O Kubernetessiz mustaqil ravishda ishlay oladimi?
  **A**: CRI-O Kubernetes muhitida ishlash uchun mo'ljallangan, ammo undan mustaqil operatsiyalar uchun `crictl` kabi vositalar bilan ham foydalanish mumkin.

---

## 14. Manbalar

### Rasmiy hujjatlar

- [CRI-O GitHub Repository](https://github.com/cri-o/cri-o)
- [CRI-O Hujjatlar](https://crio.readthedocs.io/)

### Jamiyat resurslari

- [Kubernetes CRI-O Integration Guide](https://kubernetes.io/docs/setup/production-environment/container-runtimes/#cri-o)
