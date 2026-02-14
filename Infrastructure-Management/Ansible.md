# 📜 **Ansible Cheatsheet**  

![ansible](https://imgur.com/XwECXoK.png)

## **🔹 Ansiblega kirish**  

### ✅ Ansible nima?  

Ansible - bu quyidagilar uchun ishlatiladigan **ochiq kodli avtomatlashtirish vositasi**:  
✅ **Konfiguratsiyani boshqarish** (masalan, serverlarga dasturiy ta'minotni o'rnatish va boshqarish)  
✅ **Ilovalarni joylashtirish** (masalan, veb-ilovani bir nechta serverlarga joylashtirish)  
✅ **Orkestratsiya** (masalan, yuklama balanslashtiruvchisi + ma'lumotlar bazasi kabi ko'p bosqichli ilovalarni boshqarish)  
✅ **Ta'minot** (masalan, AWS, Azure, GCP bilan bulutli infratuzilmani sozlash)  

### ✅ Nima uchun Ansible’dan foydalanish kerak?  

🔹 **Agentsiz:** Maqsadli mashinalarga agentlarni o'rnatish shart emas (SSH va WinRM dan foydalanadi)  
🔹 **Idempotent:** Keraksiz o'zgarishlarsiz bir necha marta ishlaydi  
🔹 **Odam o'qiy oladigan:** YAML o'yin daftarlaridan foydalanadi  
🔹 **Kross-platformalar:** **Linux, Windows, macOS, Cloud Servers** da ishlaydi  

---

## **🛠️ 1. O'rnatish va sozlash Ansible**  

### ✅ Linuxda Ansible-ni o'rnatish  

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y ansible

# CentOS/RHEL
sudo yum install -y ansible
```

### ✅ O'rnatishni tekshirish  

```bash
ansible --version
```

### ✅ Inventarizatsiya faylini sozlash  

**Inventarizatsiya fayli** (`/etc/ansible/hosts`) Ansible’ga qayerga ulanish kerakligini aytadi. Misol:  

```ini
[webservers]
server1 ansible_host=192.168.1.10 ansible_user=ubuntu
server2 ansible_host=192.168.1.11 ansible_user=ubuntu

[dbservers]
db1 ansible_host=192.168.1.20 ansible_user=root
```

### ✅ `ping` yordamida ulanishni tekshirish  

```bash
ansible all -m ping
```

📌 Muvaffaqiyatli bo'lsa, quyidagilarni ko'rasiz:  

```bash
server1 | SUCCESS => {"changed": false, "ping": "pong"}
server2 | SUCCESS => {"changed": false, "ping": "pong"}
```

---

## **🚀 2. Maxsus buyruqlarni bajarish (qo'llanmasiz tezkor vazifalar)**  

✅ **Diskdan foydalanishni tekshiring**  

```bash
ansible all -m command -a "df -h"
```

✅ **Tizimning ish vaqtini tekshirish**  

```bash
ansible all -m command -a "uptime"
```

✅ **Masofaviy xostlarda katalog yarating**  

```bash
ansible all -m file -a "path=/opt/newdir state=directory"
```

✅ **Fayllarni masofaviy serverlarga nusxalash**  

```bash
ansible all -m copy -a "src=/tmp/file.txt dest=/home/ubuntu/file.txt"
```

✅ **Barcha veb-serverlarga paketni (masalan, nginx) o'rnatish**  

```bash
ansible webservers -m apt -a "name=nginx state=present" --become
```

✅ **Xizmatni qayta ishga tushiring (masalan, nginx)**  

```bash
ansible webservers -m service -a "name=nginx state=restarted" --become
```

---

## **📜 3. Ansible Playbooks (Avtomatlashtirish skriptlari) yozish**  

✅ **Playbook nima?**  
**Playbook** - bu konfiguratsiyani **avtomatlashtirish** vazifalarini o'z ichiga olgan YAML fayli.  

### **🔹 Asosiy o'yin daftariga misol**  

```yaml
- name: Install and Start Nginx
  hosts: webservers
  become: yes  # Run as sudo
  tasks:
    - name: Install Nginx
      apt:
        name: nginx
        state: present

    - name: Start Nginx
      service:
        name: nginx
        state: started
```

✅ **O'yin daftarchasini ishga tushiring**  

```bash
ansible-playbook playbook.yml
```

---

## **🔹 4. Ansibleda o'zgaruvchilardan foydalanish**  

✅ **O'yin daftarida o'zgaruvchilarni aniqlang**  

```yaml
- name: Install a Package with a Variable
  hosts: webservers
  vars:
    package_name: nginx
  tasks:
    - name: Install Package
      apt:
        name: "{{ package_name }}"
        state: present
```

✅ **O'rnatilgan Ansible Facts dan foydalaning**  

```bash
ansible all -m setup
```

Playbook’dagi faktlardan foydalanishga misol:  

```yaml
- name: Display System Information
  hosts: all
  tasks:
    - debug:
        msg: "This server is running {{ ansible_distribution }} {{ ansible_distribution_version }}"
```

---

## **🔹 5. Tsikllar va shartli shartlar**  

✅ **Tsikl namunasi (Bir nechta paketlarni o'rnatish)**  

```yaml
- name: Install Multiple Packages
  hosts: webservers
  become: yes
  tasks:
    - name: Install Packages
      apt:
        name: "{{ item }}"
        state: present
      loop:
        - nginx
        - curl
        - unzip
```

✅ **Shartli ijro**  

```yaml
- name: Restart Nginx Only If Needed
  hosts: webservers
  become: yes
  tasks:
    - name: Check if Nginx is Running
      shell: pgrep nginx
      register: nginx_running
      ignore_errors: yes

    - name: Restart Nginx
      service:
        name: nginx
        state: restarted
      when: nginx_running.rc == 0
```

---

## **📂 6. Ansible Roles (Katta loyihalar uchun eng yaxshi amaliyotlar)**  

✅ **Mumkin bo'lgan rol tuzilmasini yarating**  

```bash
ansible-galaxy init my_role
```

📌 Bu quyidagicha tuzilgan katalog yaratadi:  

```plaintext
mening_rolim/
├── tasks/
│   └── main.yml
├── handlers/
│   └── main.yml
├── templates/
├── files/
├── vars/
│   └── main.yml
├── defaults/
│   └── main.yml
├── meta/
│   └── main.yml
├── README.md
```

✅ **O'yin daftarida rollardan foydalaning**  

```yaml
- name: Deploy Web Server
  hosts: webservers
  roles:
    - nginx_role
```

---

## **🔐 7. Ansible Vault (Sirlarni shifrlash)**  

✅ **Shifrlangan fayl yarating**  

```bash
ansible-vault create secrets.yml
```

✅ **Shifrlangan faylni tahrirlash**  

```bash
ansible-vault edit secrets.yml
```

✅ **Playbooksda Vaultdan foydalaning**  

```yaml
- name: Deploy with Encrypted Secrets
  hosts: webservers
  vars_files:
    - secrets.yml
  tasks:
    - debug:
        msg: "The secret password is {{ secret_password }}"
```

✅ **Playbook’ni Vault parol so‘rovi bilan ishga tushiring**  

```bash
ansible-playbook playbook.yml --ask-vault-pass
```

---

## **🎯 8. Foydali Ansible buyruqlari**  

✅ **O'yin daftari sintaksisini tekshiring**  

```bash
ansible-playbook playbook.yml --syntax-check
```

✅ **Quruq ishga tushirish (o'zgarishlarni amalga oshirmasdan sinov)**  

```bash
ansible-playbook playbook.yml --check
```

✅ **Barcha mavjud modullar ro'yxati**  

```bash
ansible-doc -l
```

✅ **Muayyan modul uchun yordam oling**  

```bash
ansible-doc apt
```

---

## 🎯 **Xulosa**  

Ushbu **Ansible Cheatsheet** boshlang'ichdan yuqori darajagacha bo'lgan **bosqichma-bosqich qo'llanma** ni taqdim etadi.  

🚀 **Keyingi qadamlar:**  
✅ **Haqiqiy o'yin daftarlari bilan mashq qiling**  
✅ **Yaxshiroq tuzilish uchun rollardan foydalaning**  
✅ **Ansible Vault bilan hisob ma'lumotlarini himoya qiling**  
✅ **Bulutli infratuzilmani avtomatlashtirish Terraform + Ansible**  

🔗 **Cheatsheet to'plamiga hissa qo'shing:** [Press](https://netlivys.vercel.app)  
