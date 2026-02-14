# 🤖 Puppet Cheat Sheet

[![puppet-cheat.png](https://i.postimg.cc/HkpyTqyw/puppet-cheat.png)](https://postimg.cc/8j05Hnwc)

## 📘 Kirish

[Puppet](https://puppet.com)  

Puppet ham **agent-master**, ham **agentless (bolt)** arxitekturalarini qo'llab-quvvatlaydi, bu esa uni keng ko'lamli muhitlar uchun kuchli qiladi.

---

## 🧠 Asosiy tushunchalar

| Muddat         | Tavsif                                                                |
| ------------ | -------------------------------------------------------------------------- |
| **Manifest** | Kerakli tizim holatini tavsiflovchi Puppet DSL (.pp) da yozilgan fayl.    |
| **Module**   | Tuzilma bo'yicha tartiblangan manifestlar, shablonlar, fayllar va boshqalar to'plami. |
| **Class**    | Puppet kodining qayta ishlatiladigan bloki.                                             |
| **Resource** | Biror narsani tavsiflovchi asosiy birlik (paket yoki xizmat kabi).           |
| **Facts**    | Tizim ma'lumotlari to'plangan **Facter**.                                 |
| **Catalog**  | Tugunga xos manifestlarning kompilyatsiya qilingan versiyasi.                      |
| **Node**     | Mijoz mashinasi boshqarilmoqda.                                            |

---

## 🧾 Puppet Commands

<details>
<summary>🟢 Boshlang'ich buyruqlar (Click to Expand)</summary>

### 🔹 Versiyani tekshiring

```bash
puppet --version
```

### 🔹 Manifestni mahalliy ravishda qo'llang

```bash
puppet apply example.pp
```

### 🔹 Manifest sintaksisini tasdiqlash

```bash
puppet parser validate example.pp
```

### 🔹 Format Manifestlari (Linting)

```bash
puppet parser validate example.pp
puppet-lint example.pp
```

### 🔹 Mavjud faktlar ro'yxati

```bash
facter
facter os
```

### 🔹 Yordamni ko'rish

```bash
puppet help
puppet help apply
```

</details>

---

<details>
<summary>🟡 Oraliq buyruqlar (Click to Expand)</summary>

### 🔹 Puppet Resurs (Tekshirish yoki boshqarish)

```bash
puppet resource <type>
puppet resource user root
puppet resource service ssh
```

### 🔹 Yangi modul skeletini yaratish

```bash
puppet module generate yourname-modulename
```

### 🔹 Modulni o'rnating

```bash
puppet module install puppetlabs-apache
```

### 🔹 O'rnatilgan modullar ro'yxati

```bash
puppet module list
```

### 🔹 Joriy qo'g'irchoq konfiguratsiyasini tekshiring

```bash
puppet config print
puppet config print all
```

</details>

---

<details>
<summary>🔴 Murakkab buyruqlar (Click to Expand)</summary>

### 🔹 Agent buyruqlari

```bash
puppet agent -t
puppet agent -t --debug
```

### 🔹 Sertifikatlarni boshqarish

```bash
puppetserver ca list
puppetserver ca sign --certname node.example.com
puppetserver ca revoke --certname node.example.com
puppetserver ca clean --certname node.example.com
```

### 🔹 PuppetDB So'rov

```bash
puppet query 'inventory[certname] { facts.os.name = "Ubuntu" }'
```

### 🔹 Vazifani Bolt bilan ishga tushirish

```bash
bolt command run "uptime" --targets localhost
bolt plan run myplan
```

### 🔹 Testing & Debugging

```bash
puppet apply --noop file.pp
puppet apply --debug file.pp
puppet lookup varname
puppet describe <type>
```

### 🔹 System & Config

```bash
puppet config print <setting>
puppet facts show
puppet module search apache
puppet doc <module>
puppet resource --to_yaml
```

</details>

---

## 🟢 Boshlang'ich daraja

### 🔹 O'rnatish Puppet (Agent/Master)

```bash
# O'rnatish Puppet (Debian/Ubuntu)
sudo apt install puppet

# Versiyani tekshiring
puppet --version
```

---

### 🔹 Birinchi Manifest Misoli

```puppet
# hello.pp
file { '/tmp/hello.txt':
  ensure  => present,
  content => "Hello from Puppet!",
}
```

Uni ishga tushiring:

```bash
puppet apply hello.pp
```

---

### 🔹 Resurs turlari

| Turi        | Example                             |
| ----------- | ----------------------------------- |
| **file**    | Fayllar, kataloglar, simvolik havolalarni boshqarish |
| **package** | Dasturiy ta'minotni o'rnatish, olib tashlash            |
| **service** | Xizmat ishlayotganiga/to'xtatilganiga ishonch hosil qiling |
| **user**    | Tizim foydalanuvchilarini boshqarish                 |

```puppet
# Nginx ni o'rnating va uning ishlashiga ishonch hosil qiling
package { 'nginx':
  ensure => installed,
}

service { 'nginx':
  ensure => running,
  enable => true,
}
```

---

### 🔹 O'zgaruvchilar (Variables)

```puppet
$greeting = "Hello, World"
notice($greeting)
```

---

### 🔹 Shartli shartlar

```puppet
if $osfamily == 'Debian' {
  notice("Debian-based system")
} else {
  notice("Other OS")
}
```

---

## 🟡 O'rta daraja

### 🔸 Faktlar va faktlar

Tizim faktlarini ko'rish:

```bash
facter
facter os
```

Manifestlarda foydalanish:

```puppet
if $facts['os']['family'] == 'RedHat' {
  package { 'httpd': ensure => installed }
}
```

---

### 🔸 Sinflar

```puppet
class apache {
  package { 'apache2': ensure => installed }
  service { 'apache2': ensure => running }
}
```

Bunga qo'shing:

```puppet
include apache
```

---

### 🔸 Modullar

```bash
puppet module generate yourname-apache
puppet module install puppetlabs-apache
```

Tuzilma:

```
apache/
├── manifests/
│   └── init.pp
├── files/
├── templates/
```

Foydalanish:

```puppet
class { 'apache': }
```

---

### 🔸 Templates (ERB)

Fayl: `templates/vhost.erb`

```erb
<VirtualHost *:80>
  ServerName <%= @servername %>
</VirtualHost>
```

Manifest:

```puppet
file { '/etc/httpd/conf.d/vhost.conf':
  content => template('apache/vhost.erb'),
}
```

---

### 🔸 Puppet Apply va Agent

| Mode      | Usage                                  |
| --------- | -------------------------------------- |
| **Apply** | Manifestlarning mahalliy qo'llanilishi               |
| **Agent** | Masterga ulanadi va katalogni qo'llaydi |

---

## 🔴 Ilg'or daraja

### 🔹 Puppet Master-Agent Setup

* **Puppet server**: Infratuzilmani boshqaruvchi markaziy server.
* **Agent**: Serverdan konfiguratsiyani oladigan tugun.

```bash
# Agentda
puppet agent -t
```

Sertifikatlarga imzo qo'ying:

```bash
puppetserver ca list
puppetserver ca sign --certname <agent-fqdn>
```

---

### 🔹 Environments

Dev, staging, prod konfiguratsiyalarini ajratish uchun ishlatiladi.

Katalog tuzilishi:

```
/etc/puppetlabs/code/environments/
├── production/
│   └── manifests/
├── development/
```

---

### 🔹 Hiera (Hierarchical Data Lookup)

YAMLda tashqi ma'lumotlarni sozlash:

```yaml
# hiera.yaml
version: 5
defaults:
  datadir: data
  data_hash: yaml_data

# data/common.yaml
apache::port: 80
```

Kirish Puppet:

```puppet
$port = lookup('apache::port')
```

---

### 🔹 PuppetDB

Katalog, faktlar va hisobot ma'lumotlari uchun markaziy saqlash joyi.

So'rov:

```puppet
query_nodes(['=', 'catalog_environment', 'production'])
```

---

### 🔹 Bolt (Agentless Task Runner)

```bash
bolt command run 'uptime' --targets localhost
bolt plan run myplan
```

Rejalarni YAML yoki Puppet DSL da yozing.

---

## 📌 Foydali qo'g'irchoq CLI buyruqlari

| Command                          | Tavsif                   |
| -------------------------------- | ----------------------------- |
| `puppet apply <file.pp>`         | Manifestni mahalliy ravishda qo'llang      |
| `puppet agent -t`                | Trigger agenti ishga tushirildi             |
| `puppet resource <type> <name>`  | Joriy resurs holatini ko'rish   |
| `puppet module install <name>`   | Modulni o'rnating              |
| `puppet config print all`        | Barcha konfiguratsiya sozlamalarini chop eting     |
| `puppet parser validate file.pp` | Manifest sintaksisini tasdiqlash   |
| `facter`                         | Tizim faktlarini ko'rsatish             |
| `puppet doc <module>`            | Modul hujjatlarini yarating |

---

## 📚 O'quv resurslari

* 📘 [Rasmiy Docs](https://puppet.com/docs/puppet/latest/puppet_index.html)
* 📦 [Temirchilik modullari](https://forge.puppet.com/)
* 🧪 [Bolt (Task Yuguruvchi)](https://puppet.com/docs/bolt/latest/bolt.html)
* 📖 [Puppet DSL Cheat Sheet](https://puppet.com/docs/puppet/latest/lang_summary.html)
* 🧠 [Qo'g'irchoqbozlik bo'yicha bepul kurslarni o'rganing](https://learn.puppet.com)

---
