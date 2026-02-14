# HashiCorp Vault Cheatsheet

![text](https://imgur.com/322q6Pi.png)

**1. Kirish:**

- **HashiCorp Vault** - bu maxfiy ma'lumotlarni xavfsiz saqlash va ularga kirish uchun mo'ljallangan vositadir. U parollar, API kalitlari va sertifikatlar kabi maxfiy ma'lumotlarni boshqarishi mumkin.

**2. O'rnatish:**

- **Vaultni o'rnatish:**
  - Homebrew yordamida macOS’da:

    ```bash
    brew install vault
    ```

  - Linuxda:

    ```bash
    wget https://releases.hashicorp.com/vault/1.9.0/vault_1.9.0_linux_amd64.zip
    unzip vault_1.9.0_linux_amd64.zip
    sudo mv vault /usr/local/bin/
    ```

  - Windows’da:
    - Ikkilik faylni yuklab oling [rasmiy HashiCorp releases](https://www.vaultproject.io/downloads).

**3. Asosiy foydalanish:**

- **Vaultni ishga tushirish:**

  ```bash
  vault operator init
  ```

  - Ushbu buyruq Vault serverini ishga tushiradi, ochilmagan kalitlar va ildiz tokenini yaratadi.

- **Omborni ochish:**

  ```bash
  vault operator unseal <unseal-key-1>
  vault operator unseal <unseal-key-2>
  vault operator unseal <unseal-key-3>
  ```

  - Boshlash paytida berilgan tugmalar yordamida Vaultni oching.

- **Sirlarni saqlash:**

  ```bash
  vault kv put secret/my-secret password="mypassword"
  ```

  - Bu buyruq Vaultda "maxfiy/mening-maxfiy" yo'lida maxfiy ma'lumot saqlaydi.

- **Sirlarni olish:**

  ```bash
  vault kv get secret/my-secret
  ```

  - “secret/my-secret”da saqlangan sirni oladi.

**4. Kengaytirilgan foydalanish:**

- **Dinamik sirlar:**
  - Vault maxfiy ma'lumotlarni dinamik ravishda yaratishi mumkin, masalan, talab bo'yicha yaratilgan ma'lumotlar bazasi hisob ma'lumotlari.
  - Misol: MySQL hisob ma'lumotlarini yaratish:

    ```bash
    vault write database/roles/my-role db_name=mydb creation_statements="CREATE USER '{{name}}'@'%' IDENTIFIED BY '{{password}}';" default_ttl="1h" max_ttl="24h"
    vault read database/creds/my-role
    ```

- **Maxfiy dvigatellar:**
  - Vault KV, AWS, GCP va boshqalar kabi bir nechta maxfiy dvigatellarni qo'llab-quvvatlaydi.
  - Maxfiylik mexanizmini yoqing:

    ```bash
    vault secrets enable aws
    ```

  - AWS sirlar dvigatelini sozlang va undan foydalaning:

    ```bash
    vault write aws/config/root access_key=<AWS_ACCESS_KEY> secret_key=<AWS_SECRET_KEY>
    vault write aws/roles/my-role credential_type=iam_user policy_arns=arn:aws:iam::aws:policy/ReadOnlyAccess
    ```

**5. Autentifikatsiya usullari:**

- **Autentifikatsiya usullarini yoqish:**
  - Vault AppRole, LDAP va AWS kabi turli xil autentifikatsiya usullarini qo'llab-quvvatlaydi.
  - Autentifikatsiya usulini yoqish:

    ```bash
    vault auth enable approle
    ```

- **AppRole autentifikatsiyasini sozlash:**
  - Rol yarating:

    ```bash
    vault write auth/approle/role/my-role token_policies="default" token_ttl=1h token_max_ttl=4h
    ```

  - Rol identifikatori va maxfiy identifikatorni oling:

    ```bash
    vault read auth/approle/role/my-role/role-id
    vault write -f auth/approle/role/my-role/secret-id
    ```

**6. Siyosat va kirishni boshqarish:**

- **Siyosatlarni yaratish:**
  - Maxfiy ma'lumotlarga kirishni nazorat qilish siyosatini belgilang:

    ```hcl
    path "secret/data/*" {
      capabilities = ["create", "read", "update", "delete", "list"]
    }
    ```

  - Siyosatni qo'llang:

    ```bash
    vault policy write my-policy my-policy.hcl
    ```

**7. Ishlab chiqarishdagi omborxona:**

- **Yuqori darajadagi mavjudlik (HA):**
  - Vault, Consul kabi saqlash serverlaridan foydalangan holda HA konfiguratsiyalarini qo'llab-quvvatlaydi.
  - Konsul konfiguratsiyasiga misol:

    ```bash
    storage "consul" {
      address = "127.0.0.1:8500"
      path    = "vault/"
    }
    ```

- **Ishlash replikatsiyasi:**
  - Vault Enterprise o'qishlarni masshtablash uchun ishlash replikatsiyasini qo'llab-quvvatlaydi.

**8. Integratsiyalar va avtomatlashtirish:**

- **Terraform integratsiyasi:**
  - Foydalaning [Terraform Vault provayderi](https://registry.terraform.io/providers/hashicorp/vault/latest/docs) Vault resurslarini boshqarish uchun.
  - Terraform konfiguratsiyasiga misol:

    ```hcl
    provider "vault" {}

    resource "vault_generic_secret" "example" {
      path = "secret/example"
      data_json = <<EOT
    {
      "password": "mypassword"
    }
    EOT
    }
    ```

- **CI/CD integratsiyasi:**
  - Qurilish jarayonlariga sirlarni dinamik ravishda kiritish uchun Vaultni CI/CD quvurlari bilan integratsiya qiling.

**9. Monitoring va audit:**

- **Audit qurilmalarini yoqish:** - Audit qurilmasini yoqish:

    ```bash
    vault audit enable file file_path=/var/log/vault_audit.log
    ```

- **Vault monitoringi:**
- Prometheus va Grafana kabi vositalar yordamida Vaultning holati va ish faoliyatini kuzatib boring.

**10. Xavfsizlik omboridagi muammolarni bartaraf etish:**

- **Umumiy muammolar:**
  - **Yo'qolgan kalitlarni ochish:** Agar yo'qolgan kalitlar yo'qolsa, zaxira nusxalari mavjud bo'lmaguncha, Vault ma'lumotlarini tiklab bo'lmaydi.
  - **Tokenning amal qilish muddati:** Foydalanish paytida amal qilish muddati tugashining oldini olish uchun autentifikatsiya uchun ishlatiladigan tokenlarning tegishli TTL sozlamalariga ega ekanligiga ishonch hosil qiling.

- **Nosozliklarni tuzatish:**
  - Batafsil jurnalni sozlash orqali yoqing `VAULT_LOG_LEVEL` environment variable:

    ```bash
    export VAULT_LOG_LEVEL=debug
    ```
