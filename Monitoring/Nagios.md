# Nagios Cheatsheet

![text](https://imgur.com/O9DGMee.png)

**1. Kirish:**

- **Nagios** - bu tizimlar, tarmoqlar va infratuzilmani kompleks monitoringini ta'minlaydigan kuchli ochiq kodli monitoring vositasi. U o'zining mustahkamligi, moslashuvchanligi va keng qamrovli plagin tizimi bilan mashhur.

**2. O'rnatish:**

- **Nagios Core ni o'rnatish:**

  ```bash
  sudo apt-get update
  sudo apt-get install -y build-essential libgd2-xpm-dev openssl libssl-dev xinetd apache2-utils unzip
  wget https://assets.nagios.com/downloads/nagioscore/releases/nagios-4.4.6.tar.gz
  tar -xzf nagios-4.4.6.tar.gz
  cd nagios-4.4.6/
  ./configure --with-httpd-conf=/etc/apache2/sites-enabled
  make all
  sudo make install
  sudo make install-commandmode
  sudo make install-init
  sudo make install-config
  sudo make install-webconf
  ```

- **Nagiosni boshlash:**

  ```bash
  sudo systemctl start nagios
  sudo systemctl enable nagios
  ```

**3. Konfiguratsiya:**

- **Asosiy konfiguratsiya:**
  - Nagios konfiguratsiya fayllari odatda `/usr/local/nagios/etc/` da joylashgan.

- **Xostni aniqlash:**

  ```cfg
  define host {
    use             linux-server
    host_name       myserver
    alias           My Linux Server
    address         192.168.1.1
    }
  ```

- **Xizmatni aniqlash:**

  ```cfg
  define service {
    use                     generic-service
    host_name               myserver
    service_description     HTTP
    check_command           check_http
    }
  ```

**4. Nagios plaginlari:**

- **Plaginlarni o'rnatish:**

  ```bash
  wget https://nagios-plugins.org/download/nagios-plugins-2.3.3.tar.gz
  tar -xzf nagios-plugins-2.3.3.tar.gz
  cd nagios-plugins-2.3.3/
  ./configure
  make
  sudo make install
  ```

- **Umumiy plaginlar:**
  - **check_ping:** Tarmoq ulanishini kuzatib boradi.
  - **check_http:** HTTP serverlarini kuzatib boradi.
- **check_disk:** Diskdan foydalanishni kuzatib boradi.

**5. Bildirishnomalar:**

- **Elektron pochta orqali bildirishnomalarni sozlash:**
  - `/usr/local/nagios/etc/objects/contacts.cfg` faylida elektron pochta sozlamalarini sozlang:

  ```cfg
  define contact {
    contact_name                    nagiosadmin
    use                             generic-contact
    alias                           Nagios Admin
    email                           nagios@yourdomain.com
  }
  ```

- **Xabarnoma buyruqlari:**
  - Bildirishnomalar qanday yuborilishini aniqlash uchun `notify-host-by-email` va `notify-service-by-email` kabi buyruqlardan foydalaning.

**6. Veb-interfeys:**

- **Nagios veb-interfeysiga kirish:**
  - Nagios veb-interfeysiga odatda `http://<sizning-server-ip>/nagios` manzili orqali kirish mumkin.
  - Standart hisob ma'lumotlari: `nagiosadmin` va o'rnatish paytida o'rnatilgan parol.

- **Interfeysni sozlash:**
  - `/usr/local/nagios/share` faylidagi fayllarni tahrirlash orqali mavzu va tartibni o'zgartiring.

**7. Masofaviy xostlarni kuzatish:**

- **NRPE (Nagios masofaviy plagin ijrochisi):**
- **NRPE o'rnatilmoqda:**

    ```bash
    sudo apt-get install nagios-nrpe-server nagios-plugins
    sudo systemctl start nagios-nrpe-server
    ```

  - **NRPE ni sozlash:**
    - Ruxsat berilgan xostlar va kuzatiladigan xizmatlarni aniqlash uchun `/etc/nagios/nrpe.cfg` faylini tahrirlang.

    ```cfg
    allowed_hosts=127.0.0.1,192.168.1.100
    command[check_disk]=/usr/lib/nagios/plugins/check_disk -w 20% -c 10% -p /dev/sda1
    ```

  - **NRPE bilan monitoring:**
    - NRPE yordamida masofaviy xostni kuzatish uchun Nagios-ga xizmat qo'shing.

    ```cfg
    define service {
      use                     generic-service
      host_name               remotehost
      service_description     Disk Usage
      check_command           check_nrpe!check_disk
    }
    ```

**8. Nagios XI:**

- **Nagios XI ga kirish:**
  - Nagios XI - bu Nagios Core ning tijorat versiyasi bo'lib, u yanada qulay interfeys, hisobot berish va ilg'or monitoring imkoniyatlari kabi qo'shimcha funktsiyalarni taqdim etadi.

- **Nagios Core’dan farqlari:**
- Oʻrnatilgan sehrgarlar, osonroq konfiguratsiya va kengroq qoʻllab-quvvatlash.

**9. Ilg'or Nagios konsepsiyalari:**

- **Passiv tekshiruvlar:**
- Nagios tekshiruvlarni boshlay olmaydigan, ammo tizim natijalarni Nagiosga yuborishi mumkin bo'lgan tizimlarni kuzatish uchun foydali.

- **Tarqatilgan monitoring:**
  - Bir nechta Nagios serverlarini o'rnatish va ularni markaziy Nagios serveriga ma'lumotlarni yuborish uchun sozlash orqali taqsimlangan monitoringni amalga oshirish.

**10. Nagiosni himoya qilish:**

- **HTTPS ni yoqish:**
- Apache ni HTTPS orqali Nagios ga xizmat ko'rsatish uchun sozlang.

  ```bash
  sudo a2enmod ssl
  sudo service apache2 restart
  ```

  - SSL sertifikatlaridan foydalanish uchun `/etc/apache2/sites-available/nagios.conf` faylida Nagios konfiguratsiyasini yangilang.

- **Foydalanuvchi autentifikatsiyasi:**
  - Nagios veb-interfeysiga foydalanuvchilarning kirishini boshqarish uchun `.htpasswd` fayllaridan foydalaning.

**11. Nagios bilan bog'liq muammolarni bartaraf etish:**

- **Umumiy muammolar:**
  - **Xizmat tekshiruvi bajarilmadi:** Plaginlarning bajarilishi mumkinligiga va yo'llarning to'g'riligiga ishonch hosil qiling.
  - **Elektron pochta xabarnomalari ishlamayapti:** Pochta serveri konfiguratsiyasini tekshiring va "pochta jurnali"da xatolar bor-yo'qligini tekshiring.

- **Nosozliklarni tuzatish:**
  - Muammolarni bartaraf etish uchun `/usr/local/nagios/var/nagios.log` manzilidagi Nagios jurnal faylidan foydalaning.
- Plagin chiqishini tekshirish uchun tekshiruvlarni qo'lda bajaring.

  ```bash
  /usr/local/nagios/libexec/check_http -I 127.0.0.1
  ```

**12. Nagios va Docker:**

- **Dockerda Nagiosni ishga tushirish:**

  ```bash
  docker run --name nagios -p 0.0.0.0:8080:80 jasonrivers/nagios
  ```

- **Dockerized Nagios’ni sozlash:**
- Maxsus konfiguratsiyalar va plaginlarni qo‘shish uchun jildlarni o‘rnatish.

  ```bash
  docker run --name nagios -v /path/to/nagios.cfg:/usr/local/nagios/etc/nagios.cfg jasonrivers/nagios
  ```
