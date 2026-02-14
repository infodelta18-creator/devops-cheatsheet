# 🧑‍🍳 Chef Cheat Sheet

[![chef-cheat.png](https://i.postimg.cc/SsthzhnB/chef-cheat.png)](https://postimg.cc/hzxwHNbs)

## 📘 Kirish

Chef - bu Ruby va Erlang tillarida yozilgan konfiguratsiyani boshqarish vositasi. Bu serverlar va infratuzilmani sozlash, joylashtirish va boshqarish jarayonini avtomatlashtiradi.

---

## 🟢 Boshlang'ich daraja

### 🔹 Asosiy tushunchalar

* **Tugun**: Chef tomonidan boshqariladigan mashina (jismoniy/virtual).
* **Oshpazlik kitobi**: Retseptlar va boshqa konfiguratsiya fayllari to'plami.
* **Retsept**: Konfiguratsiya uchun asosiy birlik — resurslarni aniqlash uchun Ruby kodini o'z ichiga oladi.
* **Resurs**: `pack`, `service`, `file` va boshqalar kabi konfiguratsiya bayonoti.
* **Ish ro'yxati**: Tugunga qo'llaniladigan retseptlar/rollar ro'yxati.

---

## 🍳 Oshpaz buyruqlari

<details>
<summary>🟢 Boshlang'ich buyruqlar (Click to Expand)</summary>

### 🔹 Versiyani tekshiring

```bash
chef --version
```

### 🔹 Oshpazlik kitobini yarating

```bash
chef generate cookbook my_cookbook
```

### 🔹 Retsept yaratish

```bash
chef generate recipe my_cookbook default
```

### 🔹 Chef Clientni ishga tushirish (Mahalliy rejim)

```bash
chef-client --local-mode --runlist 'recipe[my_cookbook]'
```

### 🔹 Ruby sintaksisini tekshirish

```bash
ruby -c recipes/default.rb
```

</details>

---

<details>
<summary>🟡 Oraliq buyruqlar (Click to Expand)</summary>

### 🔹  O'rnatish tuguni

```bash
knife bootstrap <IP_ADDRESS> -x user -P password --node-name node1
```

### 🔹 Oshpazlik kitobini serverga yuklang

```bash
knife cookbook upload my_cookbook
```

### 🔹 Tugun ma'lumotlarini ko'rsatish

```bash
knife node show node1
```

### 🔹 Chef Client dasturini masofaviy tugunda ishga tushiring

```bash
knife ssh 'name:node1' 'sudo chef-client' -x user
```

</details>

---

<details>
<summary>🔴 Murakkab buyruqlar (Click to Expand)</summary>

### 🔹 Tugunlarni yoki ma'lumotlar paketlarini qidirish

```bash
knife search node 'role:web'
knife data bag show users
```

### 🔹 Tugun yoki rolni tahrirlash

```bash
knife node edit node1
knife role edit webserver
```

### 🔹 Rol yoki muhitni yarating

```bash
chef generate role webserver
chef generate environment dev
```

### 🔹 Rollarni/Muhitlarni Yuklash (env)

```bash
knife role from file roles/webserver.rb
knife environment from file environments/dev.rb
```

### 🔹 Sinov oshpazlik kitobi (ChefSpec, InSpec)

```bash
chef exec rspec
chef exec inspec exec test/integration/default
```

</details>

---

### 🔹 Oshpazni sozlash

```bash
# Chef ish stantsiyasini o'rnating
curl -LO https://packages.chef.io/files/stable/chef-workstation/latest/el/7/chef-workstation-*.rpm
sudo rpm -Uvh chef-workstation-*.rpm
```

```bash
# O'rnatishni tasdiqlash
chef -v
```

---

### 🔹 Oshpazlik kitobini yarating

```bash
chef generate cookbook my_cookbook
cd my_cookbook
```

---

### 🔹 Asosiy retsept

```ruby
# recipes/default.rb
package 'nginx'

service 'nginx' do
  action [:enable, :start]
end
```

```bash
# Retseptni mahalliy mashinada ishga tushiring (Test Kitchen or chef-run)
chef-run 'localhost' my_cookbook
```

---

### 🔹 Umumiy resurslar

| Resource  | Example                                        |
| --------- | ---------------------------------------------- |
| `package` | `package 'nginx'`                              |
| `service` | `service 'nginx' { action [:start, :enable] }` |
| `file`    | `file '/etc/motd' { content 'Hello Chef' }`    |
| `user`    | `user 'deploy' { shell '/bin/bash' }`          |

---

## 🟡 O'rta daraja

### 🔸 Atributlar

```ruby
# attributes/default.rb
default['my_cookbook']['greeting'] = 'Welcome to Chef!'

# Use in recipe
file '/etc/motd' do
  content node['my_cookbook']['greeting']
end
```

---

### 🔸 Shablonlar

Shablonlar konfiguratsiya fayllarini boshqarish uchun ishlatiladigan ERB fayllari.

```bash
# generate template
mkdir templates/default
touch templates/default/index.html.erb
```

```erb
<!-- templates/default/index.html.erb -->
<h1>Hello <%= node['hostname'] %>!</h1>
```

```ruby
# recipes/default.rb
template '/var/www/html/index.html' do
  source 'index.html.erb'
end
```

---

### 🔸 Ma'lumotlar paketlari

```bash
# Ma'lumotlar paketi va elementini yarating
pichoqli ma'lumotlar paketi foydalanuvchilarni yaratish
foydalanuvchilar user1.json faylidan pichoqli ma'lumotlar paketi
```

```json
// users/user1.json
{
  "id": "user1",
  "uid": "1001",
  "shell": "/bin/bash"
}
```

```ruby
# Retseptda foydalaning
user_data = data_bag_item('users', 'user1')

user user_data['id'] do
  uid user_data['uid']
  shell user_data['shell']
end
```

---

### 🔸 Rollar

```bash
# Rol faylini yarating
pichoq roli veb-server yaratish
```

```json
{
  "name": "webserver",
  "run_list": [
    "recipe[my_cookbook::default]"
  ]
}
```

---

### 🔸 Atrof-muhit

Dev, test, prod o'rtasidagi farqlarni boshqarish uchun ishlatiladi.

```bash
# Atrof-muhit yarating (environment)
pichoq muhiti ishlab chiqaruvchini yaratadi
```

```json
{
  "name": "dev",
  "default_attributes": {
    "my_cookbook": {
      "greeting": "Welcome to Dev Environment"
    }
  }
}
```

---

## 🔴 Ilg'or daraja

### 🔹 Maxsus resurslar

```bash
# inside cookbooks/my_cookbook/resources/hello.rb
resource_name :hello

property :name, String, name_property: true

action :create do
  file "/tmp/#{name}" do
    content "Hello, #{name}!"
  end
end
```

```ruby
# recipes/default.rb
hello 'chef_user'
```

---

### 🔹 ChefSpec (Unit Testing)

```ruby
# spec/unit/recipes/default_spec.rb
require 'chefspec'

describe 'my_cookbook::default' do
  let(:chef_run) { ChefSpec::SoloRunner.new.converge(described_recipe) }

  it 'installs nginx' do
    expect(chef_run).to install_package('nginx')
  end
end
```

Run tests:

```bash
rspec
```

---

### 🔹 Sinov oshxonasi (Integration Testing)

```bash
# .kitchen.yml
driver:
  name: vagrant

provisioner:
  name: chef_zero

platforms:
  - name: ubuntu-20.04

suites:
  - name: default
    run_list:
      - recipe[my_cookbook::default]
```

```bash
kitchen converge
kitchen verify
```

---

### 🔹 Siyosat fayllari

Berkshelf va runlists ga alternativa.

```bash
chef generate policyfile my_policy
```

```ruby
# Policyfile.rb
name 'my_policy'
run_list 'my_cookbook::default'
default_source :supermarket
cookbook 'my_cookbook', path: '.'
```

```bash
chef install
chef push my_org my_policy.lock.json
```

---

### 🔹 Chef Automate

Chef Automate foydalanuvchi interfeysi va muvofiqlik, ko'rinish va ish jarayoni imkoniyatlarini taqdim etadi.

* Boshqaruv panellarini sozlash
* Auditlar uchun InSpec bilan integratsiya qiling
* Oshpazlik kitobi CI/CD uchun ish oqimi quvurlari

---

### 🔹 Pichoq uchlari

```bash
knife bootstrap IP_ADDRESS -x user -P password --node-name NODE_NAME
knife node list
knife cookbook upload my_cookbook
knife role from file webserver.json
```

---

## 📌 Eng yaxshi amaliyotlar

* Oshpazlik kitoblarini modulli va qayta foydalanish mumkin holda saqlang.
* Bog'liqliklarni boshqarish uchun Berkshelf yoki Policyfiles dan foydalaning.
* Barqarorlik uchun testlar yozing (ChefSpec/Test Kitchen).
* Qattiq kodlashdan saqlaning; atributlar yoki ma'lumotlar paketlaridan foydalaning.
* LWRP'lardan ko'ra maxsus resurslarni afzal ko'ring.
