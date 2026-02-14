# 🧾 Terraform Cheat Sheet (Boshlang'ich → Ilg'or)

![text](https://imgur.com/FwmjyK1.png)

## 📘 **Kirish**

Terraform tomonidan [HashiCorp](https://www.hashicorp.com/products/terraform) bu **HCL (HashiCorp Konfiguratsiya tili)** da yozilgan konfiguratsiya fayllari orqali bulutli, mahalliy va SaaS infratuzilmasini taʼminlash va boshqarish uchun foydalaniladigan **kod sifatida ochiq manbali infratuzilma (IaC)** vositasidir. Terraform yordamida siz infratuzilmani **deklarativ formatda** aniqlaysiz, bu versiyalarni yaratish, qayta ishlatish, avtomatlashtirish va muhitlar bo'ylab izchillik imkonini beradi.

## 🔹 **Asosiy tushunchalar**

| Muddat            | Tavsif                                                            |
| -------------- | ---------------------------------------------------------------------- |
| **Providers**  | Muayyan bulut platformasini (masalan, AWS) boshqarish uchun mas'ul bo'lgan plagin. |
| **Resources**  | EC2, S3 va boshqalar kabi infratuzilma komponentlari.                           |
| **Variables**  | Kirish qiymatlari konfiguratsiyaga o'tkazildi.                                |
| **Outputs**    | Terraform bajarilgandan so'ng qaytaradigan qiymatlar.                         |
| **State File** | Terraform boshqaradigan resurslarni kuzatib boradi.                            |

---

## 🌍 Terraform buyruqlari

<details>
<summary>🟢 Boshlang'ich buyruqlar (Click to Expand)</summary>

### 🔹 Versiyani tekshiring

```bash
terraform version
```

### 🔹 Ishchi katalogni ishga tushiring

```bash
terraform init
```

### 🔹 Konfiguratsiyani tasdiqlash

```bash
terraform validate
```

### 🔹 Kodni formatlash

```bash
terraform fmt
```

### 🔹 Yordamni ko'rsatish

```bash
terraform -help
terraform plan -help
```

</details>

---

<details>
<summary>🟡 Oraliq buyruqlar (Click to Expand)</summary>

### 🔹 Reja infratuzilmasidagi o'zgarishlar

```bash
terraform plan
```

### 🔹 Infratuzilma o'zgarishlarini qo'llang

```bash
terraform apply
```

### 🔹 Infratuzilmani yo'q qilish

```bash
terraform destroy
```

### 🔹 Chiqish o'zgaruvchilari (Output Variables)

```bash
terraform output
terraform output my_variable
```

### 🔹 Shtatni boshqarish

```bash
terraform state list
terraform state show <resource>
```

</details>

---

<details>
<summary>🔴 Murakkab buyruqlar (Click to Expand)</summary>

### 🔹 Maqsadli resurslar

```bash
terraform apply -target=aws_instance.example
terraform destroy -target=module.vpc
```

### 🔹 Modullar bilan ishlash

```bash
terraform get
terraform init -upgrade
```

### 🔹 Orqa tomon konfiguratsiyasi

```bash
terraform init -backend-config="key=my-state.tfstate"
```

### 🔹 Mavjud infratuzilmani import qilish

```bash
terraform import aws_instance.example i-12345678
```

### 🔹 Grafik bog'liqlik daraxti

```bash
terraform graph | dot -Tpng > graph.png
```

</details>

---

## 🟢 **Boshlang'ich buyruqlar**

### 🔹 `terraform versiya`

Terraformning o'rnatilgan versiyasini ko'rsatadi.

```bash
terraform version
```

---

### 🔹 `terraform init`

Ishchi katalogni provayder plaginlari va orqa tomon konfiguratsiyasi bilan ishga tushiradi.

```bash
terraform init
```

💡 `.tf` fayllaringizni yozgandan so'ng, buni har bir loyiha uchun bir marta ishga tushiring.

---

### 🔹 `terraform tasdiqlash`

Konfiguratsiya fayllaringizni sintaksis xatolari uchun tekshiradi.

```bash
terraform validate
```

---

### 🔹 `terraform reja`

Terraform ularni qo'llamasdan qanday harakatlarni *bajarishini* ko'rsatadi.

```bash
terraform plan
```

📌 Infratuzilma o'zgarishlarini oldindan ko'rish uchun har bir "qo'llash" dan oldin foydalaning.

---

### 🔹 `terraform qo'llash`

Kerakli infratuzilma holatiga erishish uchun o'zgarishlarni qo'llaydi.

```bash
terraform apply
```

* Siz quyidagilar bilan avtomatik tasdiqlashingiz mumkin:

```bash
terraform apply -auto-approve
```

---

### 🔹 `terraform yo'q qilish`

Konfiguratsiya fayllarida belgilangan infratuzilmani olib tashlaydi.

```bash
terraform destroy
```

* Avtomatik tasdiqlash:

```bash
terraform destroy -auto-approve
```

---

### 🔹 `terraform fmt`

`.tf` fayllarini avtomatik ravishda kanonik uslubga formatlaydi.

```bash
terraform fmt
```

* Barchasini rekursiv ravishda formatlash:

```bash
terraform fmt -recursive
```

---

## 🟡 **Oraliq buyruqlar**

### 🔹 `terraform show`

Joriy yoki saqlangan holatning inson tomonidan o'qilishi mumkin bo'lgan natijasini ko'rsatadi.

```bash
terraform show
terraform show terraform.tfstate
```

---

### 🔹 `terraform chiqish`

Qo'llanilgandan keyin chiqish o'zgaruvchilarining qiymatlarini chop etadi.

```bash
terraform output
terraform output instance_ip
```

---

### 🔹 `terraform shtat ro'yxati`

Joriy holat faylida kuzatilgan barcha resurslar ro'yxatini ko'rsatadi.

```bash
terraform state list
```

---

### 🔹 `terraform state show`

Shtatdagi ma'lum bir resurs haqida ma'lumotlarni ko'rsatadi.

```bash
terraform state show aws_instance.example
```

---

### 🔹 `terraform taint`

Keyingi safar resursni qayta tiklashga majbur qiladi.

```bash
terraform taint aws_instance.example
```

---

### 🔹 `terraform dog'sizlantirish`

Resursdan dog'larni olib tashlaydi.

```bash
terraform untaint aws_instance.example
```

---

### 🔹 `terraform import`

Mavjud infratuzilmani Terraform holatiga keltiradi.

```bash
terraform import aws_instance.example i-0abcd1234efgh5678
```

---

### 🔹 `terraform grafik`

Bog'liqlik grafigini yaratadi (DOT formatida).

```bash
terraform graph | dot -Tpng > graph.png
```

---

### 🔹 `terraform provayderlar`

Joriy konfiguratsiyada ishlatiladigan barcha provayderlar ro'yxatini ko'rsatadi.

```bash
terraform providers
```

---

### 🔹 `terraform ish maydoni` commands

Bir nechta ish joylarini (masalan, dev, staging, prod) boshqarish uchun ishlatiladi.

```bash
terraform workspace new dev
terraform workspace select dev
terraform workspace list
```

---

## 🔴 **Kengaytirilgan buyruqlar**

### 🔹 `terraform plan -out=tfplan`

Bajarish rejasini faylga saqlaydi.

```bash
terraform plan -out=tfplan
```

Keyin uni keyinroq qo'llang:

```bash
terraform apply tfplan
```

---

### 🔹 `terraform qo'llash -target=resource`

Faqat ma'lum resurslarni qo'llang.

```bash
terraform apply -target=aws_instance.example
```

---

### 🔹 `terraform state mv`

Shtatdagi resurslarni ko'chiradi/nomini o'zgartiradi.

```bash
terraform state mv aws_instance.old aws_instance.new
```

---

### 🔹 `terraform state rm`

Resursni holatdan olib tashlaydi (uni bulutda yo'q qilmaydi).

```bash
terraform state rm aws_instance.example
```

---

### 🔹 `terraform konsol`

HCL ifodalarini baholash uchun interaktiv konsolni ochadi.

```bash
terraform console
> var.instance_type
```

---

### 🔹 `terraform login`

Terraform Cloud yoki Enterprise’ga autentifikatsiya qiladi.

```bash
terraform login
```

---

### 🔹 `terraform logout`

Terraform Cloud’dan chiqish.

```bash
terraform logout
```

---

### 🔹 `terraform majburiy qulfni ochish`

Muvaffaqiyatsiz operatsiyadan so'ng holat faylini majburan ochadi.

```bash
terraform force-unlock <LOCK_ID>
```

---

## 📌 **Umumiy buyruq ish oqimlari**

### 🛠 Yangi loyiha

```bash
terraform init
terraform plan
terraform apply
```

### 🔁 O'zgarish qiling

```bash
terraform fmt
terraform validate
terraform plan
terraform apply
```

### 🧽 Infraqizilni yo'q qiling

```bash
terraform destroy
```

Ajoyib — mana bu yerda "Terraform.md" cheat varag'ining to'liq versiyasi, yuqori qismida **kirish ma'lumotlari** va pastki qismida **qo'shimcha o'quv resurslari** mavjud bo'lib, omboringiz uchun juda mos keladi:

---

## 🧠 **Maslahatlar va eng yaxshi amaliyotlar**

* `.tfstate` fayllarini **xavfsiz** saqlang (masofaviy qulflash uchun S3 + DynamoDB dan foydalaning)
* Sezgir kirish o'zgaruvchilari uchun `terraform.tfvars` yoki `.auto.tfvars` dan foydalaning
* Chiqishlarda `sensitive = true` yordamida sirlarni belgilang
* Qayta ishlatiladigan kod uchun **modullar** dan foydalaning
* "Qo'llash"dan oldin har doim "terraform rejasi"ni ishga tushiring
* `required_providers` ichidagi versiya qulflash provayderlari

---

## 📚 **O'quv resurslari**

* 🔗 [Rasmiy Docs](https://developer.hashicorp.com/terraform/docs)
* 📘 [Terraform registri](https://registry.terraform.io/)
* 🎓 [Terraformni o'rganing (Bepul)](https://learn.hashicorp.com/terraform)
* 🧪 [Checkov - IaC Skanerlash](https://www.checkov.io/)
* 📖 [Terraform CLI Malumotnoma](https://developer.hashicorp.com/terraform/cli)
