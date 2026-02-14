# OpenShift Cheatsheet

![text](https://imgur.com/2HuS6vE.png)

## Mundarija

1. **OpenShiftga kirish**
   - OpenShift nima?
   - Asosiy xususiyatlar
   - OpenShift nashrlari
   - Arxitektura haqida umumiy ma'lumot
2. **O'rnatish va sozlash**
   - Tizim talablari
   - OpenShift o'rnatilmoqda
   - OpenShift CLI (`oc`) ni sozlash
   - O'rnatishdan keyingi konfiguratsiya
3. **Asosiy tushunchalar**
   - Loyihalar va nomlar maydoni
   - Podlar, xizmatlar va marshrutlar
   - Joylashtirishlar va Joylashtirish Konfiguratsiyalari
   - StatefulSets va DaemonSets
   - OpenShift tuzilmalari va tasvir oqimlari
   - ConfigMaps va sirlar
4. **Foydalanuvchilarni boshqarish**
   - Foydalanuvchilarni yaratish va boshqarish
   - Rolga asoslangan kirishni boshqarish (RBAC)
   - Xizmat hisoblari
   - Kvotalar va limitlarni boshqarish
5. **Tarmoq**
   - OpenShift SDN haqida umumiy ma'lumot
   - Kirish va chiqish trafikini boshqarish
   - Marshrutlar va DNS ni sozlash
   - Pod xavfsizligi uchun tarmoq siyosatlari
6. **Saqlash**
   - Doimiy hajmlar va doimiy hajmdagi da'volar
   - StorageClasss va Dinamik Ta'minot
   - Holatli ilovalar uchun saqlashni boshqarish
   - NFS va GlusterFS integratsiyasi
7. **Xavfsizlik**
   - OpenShift xavfsizlik kontekst cheklovlari (SCC)
   - SELinuxni OpenShift bilan ishlatish
   - TLS yordamida marshrutlarni himoya qilish
   - OpenShift muvofiqligi va xavfsizlik auditi
8. **Ilova hayot aylanishini boshqarish**
   - `oc new-app` yordamida ilovalar yaratish
   - Ilovalarni joylashtirishni boshqarish
   - Rolling yangilanishlari va orqaga qaytarishlar
   - Moviy-yashil va kanareykalarni joylashtirish
9. **Monitoring va jurnalga yozish**
   - Prometey va Grafana bilan monitoring
   - Elasticsearch, Fluentd va Kibana (EFK) bilan jurnal yuritish
   - Ogohlantirishlar va bildirishnomalarni sozlash
   - Podlar va konteynerlarni nosozliklarni tuzatish
10. **Kengaytirilgan konfiguratsiya**
    - OpenShift shablonlarini sozlash
    - Cheklovlar va so'rovlar bilan resurslarni boshqarish
    - Gorizontal Pod Autoscalers (HPA) yordamida avtomatik masshtablashni sozlash
    - OpenShift SDN ni sozlash
11. **CI/CD yoli**
    - Tekton bilan OpenShift yollari
    - Jenkinsni OpenShift bilan integratsiya qilish
    - BuildConfigs yordamida qurilishlarni avtomatlashtirish
    - Uzluksiz yetkazib berish strategiyalari
12. **OpenShift xizmat ko'rsatish tarmog'i**
    - Istio va Service Meshga kirish
    - OpenShift xizmat tarmog'ini sozlash
    - Istio bilan trafikni boshqarish
    - Kiali va Jaeger bilan monitoring va kuzatuv
13. **Serversiz hisoblash**
    - OpenShift Serversiz Umumiy Tasavvur
    - Knative yordamida serversiz ilovalarni joylashtirish
    - Serversiz funksiyalarni avtomatik masshtablash
14. **Gibrid bulut va ko'p bulutli joylashtirishlar**
    - OpenShift 4.x gibrid bulut imkoniyatlari
    - OpenShiftni bir nechta bulutlarga joylashtirish
    - ACM yordamida ko'p klasterli joylashtirishlarni boshqarish
15. **Muammolarni bartaraf etish va eng yaxshi amaliyotlar**
    - Umumiy muammolar va tuzatishlar
    - OpenShift operatsiyalari uchun eng yaxshi amaliyotlar
    - Ishlashni sozlash
16. **FAQs**
    - OpenShift haqida keng tarqalgan savollar
17. **Manbalar**
    - Rasmiy hujjatlar
    - Jamiyat resurslari

---

## 1. OpenShiftga kirish

### OpenShift nima?

- **OpenShift** Red Hat tomonidan ishlab chiqilgan korporativ Kubernetes platformasi bo‘lib, konteyner orkestrini, DevOps vositalarini va keng miqyosda ilovalarni ishlab chiqish, joylashtirish va boshqarish uchun mustahkam ekotizimni taklif etadi.

### Asosiy xususiyatlar

- **Integratsiyalashgan dasturchi vositalari**: CI/CD quvurlarini, manbadan tasvirga (S2I) tuzilmalarini va dasturchi muhitlarini qo'llab-quvvatlaydi.
- **Korxona xavfsizligi**: Rolga asoslangan kirishni boshqarish (RBAC), tarmoq siyosati va xavfsizlik kontekst cheklovlarini (SCC) o'z ichiga oladi.
- **Miqyoslash imkoniyati**: Ilovalar va klasterlar uchun avtomatik masshtablash xususiyatlari.
- **Ko'p bulutli va gibrid bulut**: Ilovalarni bir nechta bulutli muhitlarda joylashtirish va boshqarish.

### OpenShift nashrlari

- **OpenShift konteyner platformasi (OCP)**: To'liq funksiyali korporativ versiya.
- **OpenShift Online**: Red Hat tomonidan boshqariladigan OpenShift xizmati.
- **OpenShift Dedicated**: OpenShift konteyner platformasining boshqariladigan versiyasi.
- **OKD (OpenShift Kubernetes Distribution)**: Ochiq kodli, hamjamiyat tomonidan qo'llab-quvvatlanadigan versiya.

### Arxitektura haqida umumiy ma'lumot

- **Asosiy tugunlar**: API so'rovlarini qayta ishlash, klaster holatini boshqarish va ish yuklamalarini rejalashtirish.
- **Ishchi tugunlar**: Asosiy tugunlar tomonidan boshqariladigan konteynerlashtirilgan ilovalarni ishga tushiradi.
- **etcd**: Klaster holatini saqlaydigan taqsimlangan kalit-qiymat ombori.
- **SDN**: Tarmoqni boshqarish uchun OpenShift dasturiy ta'minoti bilan belgilangan tarmoq.

---

## 2. O'rnatish va sozlash

### Tizim talablari

- **Operatsion tizim**: RHEL, CentOS yoki Fedora.
- **Xotira**: Bitta tugunli o'rnatish uchun kamida 16 GB operativ xotira.
- **Xotira**: Kamida 50 GB disk maydoni.
- **CPU**: 4 yoki undan ko'p yadro.

### OpenShift o'rnatilmoqda

- **Bitta tugunli klaster (CodeReady konteynerlari)**:

  ```bash
  crc setup
  crc start
  ```

- **Ko'p tugunli klaster (OpenShift o'rnatuvchisi)**:

  ```bash
  openshift-install create cluster
  ```

### OpenShift CLI (`oc`) ni sozlash

- **`oc` CLI ni o'rnatish**:

  ```bash
  sudo dnf install -y openshift-clients
  ```

- **Klasterga kirish**:

  ```bash
  oc login https://<master-url>:6443 --token=<token>
  ```

### O'rnatishdan keyingi konfiguratsiya

- **O'rnatishni tasdiqlash**:

  ```bash
  oc status
  ```

- **Standart loyihani sozlash**:

  ```bash
  oc new-project <project-name>
  ```

---

## 3. Asosiy tushunchalar

### Loyihalar va nomlar fazosi

- **Yangi loyiha yaratish**:

  ```bash
  oc new-project myproject
  ```

- **Switch loyihasi**:

  ```bash
  oc project myproject
  ```

### Podlar, xizmatlar va marshrutlar

- **Pod yarating**:

  ```bash
  oc run myapp --image=myimage
  ```

- **Xizmatni namoyish qilish**:

  ```bash
  oc expose pod myapp --port=8080
  ```

- **Yo'nalish yarating**:

  ```bash
  oc expose service myapp
  ```

### Joylashtirishlar va Joylashtirish Konfiguratsiyalari

- **Joylashtirishni yaratish**:

  ```bash
  oc create deployment myapp --image=myimage
  ```

- **Joylashtirishni yangilash**:

  ```bash
  oc set image deployment/myapp myapp=mynewimage
  ```

### StatefulSets va DaemonSets

- **StatefulSet yaratish**:

  ```bash
  oc create -f statefulset.yaml
  ```

- **DaemonSet yaratish**:

  ```bash
  oc create daemonset myds --image=mydaemonimage
  ```

### OpenShift tuzilmalari va tasvir oqimlari

- **Qurilishni boshlang**:

  ```bash
  oc start-build mybuild
  ```

- **ImageStream yaratish**:

  ```bash
  oc create imagestream myimage
  ```

### ConfigMaps va sirlari

- **ConfigMap yarating**:

  ```bash
  oc create configmap myconfig --from-file=config.yaml
  ```

- **Sir yarating**:

  ```bash
  oc create secret generic mysecret --from-literal=password=secret
  ```

---

## 4. Foydalanuvchilarni boshqarish

### Foydalanuvchilarni yaratish va boshqarish

- **Yangi foydalanuvchi yaratish**:

  ```bash
  oc create user myuser
  ```

- **Loyihaga foydalanuvchi tayinlash**:

  ```bash
  oc adm policy add-role-to-user admin myuser -n myproject
  ```

### Rollarga asoslangan kirishni boshqarish (RBAC)

- **Rol yaratish**:

  ```bash
  oc create role myrole --verb=get --verb=list --resource=pods
  ```

- **Foydalanuvchiga rol tayinlash**:

  ```bash
  oc adm policy add-role-to-user myrole myuser -n myproject
  ```

### Xizmat hisoblari

- **Xizmat hisobini yaratish**:

  ```bash
  oc create serviceaccount myserviceaccount
  ```

- **Xizmat hisobiga rol tayinlash**:

  ```bash
  oc adm policy add-cluster-role-to-user cluster-admin -z myserviceaccount
  ```

### Kvotalar va limitlarni boshqarish

- **Resurs kvotasini yaratish**:

  ```bash
  oc create quota myquota --hard=cpu=2,memory=4Gi -n myproject
  ```

- **Loyiha uchun limitlarni belgilash**:

  ```bash
  oc create limitrange mylimits --default=cpu=500m,memory=1Gi -n myproject
  ```

---

## 5. Tarmoq

### OpenShift SDN haqida umumiy ma'lumot

- **Standart Tarmoq**: OpenShift sukut bo'yicha OpenShift SDN dan foydalanadi, bu esa podlar va xizmatlarni ulash uchun tarmoq imkoniyatlarini taqdim etadi.

### Kirish va chiqish trafikini boshqarish

- **Kirish qoidasini yarating**:

  ```bash
  oc create route edge myroute --service=myservice --hostname=myapp.example.com
  ```

### Marshrutlar va DNS ni sozlash

- **Marshrut yaratish**:

  ```bash
  oc expose service myservice --hostname=myapp.example.com
  ```

- **Yo'nalish holatini tekshirish**:

  ```bash
  oc get routes
  ```

### Pod xavfsizligi uchun tarmoq siyosatlari

- **Tarmoq siyosatini yarating**:

  ```bash
  oc create -f networkpolicy.yaml
  ```

---

## 6

. Saqlash

### Doimiy hajmlar va doimiy hajmdagi da'volar

- **Doimiy jild yaratish**:

  ```bash
  oc create -f persistentvolume.yaml
  ```

- **Doimiy hajmdagi da'vo yaratish**:

  ```bash
  oc create -f persistentvolumeclaim.yaml
  ```

### StorageClasss va Dinamik Ta'minot

- **StorageClass yaratish**:

  ```bash
  oc create -f storageclass.yaml
  ```

- **Dinamik ta'minotdan foydalaning**: OpenShift StorageClass asosida avtomatik ravishda xotirani ta'minlay oladi.

### Holatli ilovalar uchun saqlashni boshqarish

- **Holatli to'plamga doimiy jildni tayinlang**:

  ```yaml
  volumeClaimTemplates:
  - metadata:
      name: myvolume
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: "mystorageclass"
      resources:
        requests:
          storage: 1Gi
  ```

### NFS va GlusterFS integratsiyasi

- **NFS dan foydalanish**: NFS ni saqlash serveri sifatida sozlang va NFS sozlamalari bilan PersistentVolumes yarating.
- **GlusterFS dan foydalaning**: GlusterFS klasterini joylashtiring va OpenShift ni uni saqlash serveri sifatida ishlatish uchun sozlang.

---

## 7. Xavfsizlik

### OpenShift xavfsizlik kontekst cheklovlari (SCC)

- **Mavjud SCClarni ko'rish**:

  ```bash
  oc get scc
  ```

- **Xizmat hisobiga SCC tayinlang**:

  ```bash
  oc adm policy add-scc-to-user privileged -z myserviceaccount -n myproject
  ```

### SELinuxni OpenShift bilan ishlatish

- **SELinuxni yoqish**:

  ```bash
  setenforce 1
  ```

- **OpenShift uchun SELinux ni sozlash**: OpenShift uchun to'g'ri SELinux siyosatlari o'rnatilganligiga ishonch hosil qiling.

### TLS yordamida marshrutlarni himoyalash

- **TLS marshrutini yaratish**:

  ```bash
  oc create route edge myroute --service=myservice --cert=tls.crt --key=tls.key --ca-cert=ca.crt
  ```

### OpenShift muvofiqligi va xavfsizlik auditi

- **Xavfsizlik tekshiruvini ishga tushiring**:

  ```bash
  oc adm diagnostics security
  ```

- **Muvofiqlik operatori**: Xavfsizlikka muvofiqlikni tekshirishni avtomatlashtirish uchun OpenShift'ning Muvofiqlik operatoridan foydalaning.

---

## 8. Ilova hayot aylanishini boshqarish

### `oc new-app` yordamida ilovalar yaratish

- **Git omboridan ilova yaratish**:

  ```bash
  oc new-app https://github.com/myorg/myrepo.git --name=myapp
  ```

### Ilovalarni joylashtirishni boshqarish

- **Joylashtirish konfiguratsiyasini yaratish**:

  ```bash
  oc create -f deploymentconfig.yaml
  ```

- **Yangi joylashtirishni ishga tushirish**:

  ```bash
  oc rollout latest dc/myapp
  ```

### Rolling yangilanishlari va qaytarishlar

- **Rolling yangilanishini amalga oshirish**:

  ```bash
  oc set image dc/myapp myapp=mynewimage
  ```

- **Oldingi versiyaga qaytish**:

  ```bash
  oc rollout undo dc/myapp
  ```

### Moviy-yashil va kanareykalarni joylashtirish

- **Moviy-yashil joylashtirish**: Ikkita alohida muhitni (ko'k va yashil) yarating va marshrutlar yordamida ular o'rtasida trafikni almashtiring.
- **Kanareykalarni joylashtirish**: Bir nechta marshrutlar va xizmatlardan foydalangan holda trafikni asta-sekin yangi versiyaga o'tkazish.

---

## 9. Monitoring va jurnalga yozish

### Prometheus va Grafana bilan monitoring

- **Prometheusga kirish**: Odatda `<openshift-master>:9090` manzilida mavjud.
- **Grafanaga kirish**: Monitoring > Boshqaruv panellari ostidagi OpenShift veb-konsoli orqali kirish.

### Elasticsearch, Fluentd va Kibana (EFK) yordamida jurnal yuritish

- **Kibana’da jurnallarni ko‘rish**: OpenShift veb-konsoli orqali Kibana’ga kirish.
- **Jurnallarni qidirish**:

  ```bash
  oc logs -f <pod-name>
  ```

### Ogohlantirishlar va bildirishnomalarni sozlash

- **Prometheusda ogohlantirishlarni sozlash**: Prometheusda ogohlantirish qoidalarini o'rnatish.
- **Xabarnoma kanallari bilan integratsiya**: Slack, elektron pochta va boshqalar kabi kanallarga bildirishnomalarni yuborish uchun Alertmanagerdan foydalaning.

### Podlar va konteynerlarni nosozliklarni tuzatish

- **Pod jurnallarini olish**:

  ```bash
  oc logs <pod-name>
  ```

- **Ishlayotgan podda buyruqlarni bajarish**:

  ```bash
  oc exec -it <pod-name> -- /bin/bash
  ```

---

## 10. Kengaytirilgan konfiguratsiya

### OpenShift shablonlarini sozlash

- **Yangi shablon yaratish**:

  ```bash
  oc create -f template.yaml
  ```

- **Shablon yaratish**:

  ```bash
  oc process -f template.yaml | oc create -f -
  ```

### Resurslarni limitlar va so'rovlar bilan boshqarish

- **Resurs limitlarini belgilash**:

  ```yaml
  resources:
    requests:
      memory: "64Mi"
      cpu: "250m"
    limits:
      memory: "128Mi"
      cpu: "500m"
  ```

### Gorizontal Pod Autoscalers (HPA) yordamida avtomatik masshtablashni sozlash

- **HPA yaratish**:

  ```bash
  oc autoscale dc/myapp --min=1 --max=10 --cpu-percent=80
  ```

### OpenShift SDN ni sozlash

- **SDN ni sozlash**: SDN konfiguratsiyasini OpenShift veb-konsoli orqali yoki SDN bilan bog'liq resurslarni tahrirlash orqali o'zgartirish.

---

## 11. CI/CD quvurlari

### Tekton bilan OpenShift quvurlari

- **Tektonni o'rnatish**:

  ```bash
  oc apply -f tekton-pipelines.yaml
  ```

- **Tekton quvur liniyasini yaratish**:

  ```bash
  oc create -f pipeline.yaml
  ```

### Jenkinsni OpenShift bilan integratsiya qilish

- **Jenkinsni joylashtirish**:

  ```bash
  oc new-app jenkins-ephemeral
  ```

- **Jenkins quvur liniyasini yarating**:

  ```bash
  oc create -f jenkins-pipeline.yaml
  ```

### BuildConfigs yordamida qurilishlarni avtomatlashtirish

- **BuildConfig yarating**:

  ```bash
  oc create -f buildconfig.yaml
  ```

- **Yig'ishni ishga tushirish**:

  ```bash
  oc start-build mybuildconfig
  ```

### Uzluksiz yetkazib berish strategiyalari

- **Jenkins bilan CI/CD ni amalga oshirish**: Jenkinsda OpenShift bilan integratsiyalashgan holda dasturning butun hayot aylanishini boshqarish uchun quvurlarni yaratish.
- **GitOps uchun Tektondan foydalaning**: Tekton quvurlari yordamida GitOps tamoyillaridan foydalangan holda joylashtirishlarni avtomatlashtiring.

---

## 12. OpenShift xizmat ko'rsatish tarmog'i

### Istio va xizmat ko'rsatish tarmog'iga kirish

- **Service Mesh haqida umumiy ma'lumot**: OpenShift Service Mesh Istio-ga asoslangan bo'lib, mikroservislar uchun trafikni boshqarish, xavfsizlik va kuzatuvni ta'minlaydi.

### OpenShift xizmat ko'rsatish tarmog'ini sozlash

- **Xizmat ko'rsatish tarmog'i komponentlarini o'rnatish**:

  ```bash
  oc apply -f servicemesh-install.yaml
  ```

- **Xizmat ko'rsatish tarmog'ini boshqarish tekisligini yarating**:

  ```bash
  oc apply -f controlplane.yaml
  ```

### Istio bilan trafikni boshqarish

- **Virtual xizmat yarating**:

  ```bash
  oc create -f virtualservice.yaml
  ```

- **Trafikni ajratishni sozlash**:

  ```yaml
  http:
  - route:
    - destination:
        host: myservice
        subset: v1
      weight: 50
    - destination:
        host: myservice
        subset: v2
      weight: 50
  ```

### Kiali va Jaeger bilan monitoring va kuzatuv

- **Kirish Kiali**: Odatda OpenShift veb-konsoli orqali Service Mesh bo'limida mavjud.
- **Kuzatuv uchun Jaegerdan foydalaning**: Jaegerda mikroservislar uchun taqsimlangan kuzatuvlarni ko'rish.

---

## 13. Serversiz hisoblash

### OpenShift Serversiz Umumiy Tasavvur

- **OpenShiftdagi Knative**: OpenShift Serverless Knative asosida yaratilgan bo'lib, nolga tenglashtirilgan funksiyalar va ilovalarni joylashtirish uchun serversiz imkoniyatlarni taqdim etadi.

### Knative yordamida serversiz ilovalarni joylashtirish

- **Knative xizmatini yarating**:

  ```bash
  oc create -f knative-service.yaml
  ```

### Serversiz avtomatik masshtablash funksiyalari

- **Avtomatik masshtablashni sozlash**:

  ```yaml
  spec:
    autoscaler:
      minReplicas: 1
      maxReplicas: 5
  ```

---

## 14. Gibrid bulut va ko'p bulutli joylashtirishlar

### OpenShift 4.x gibrid bulut imkoniyatlari

- **Bir nechta bulutlarda joylashtirish**: OpenShift AWS, Azure, GCP va mahalliy muhitlarda joylashtirishni qo'llab-quvvatlaydi.

### OpenShiftni bir nechta bulutlar bo'ylab joylashtirish

- **Red Hat Advanced Cluster Management (ACM) dan foydalaning**: Turli muhitlarda bir nechta OpenShift klasterlarini boshqaring.
- **Ko'p bulutli joylashtirishlarni sozlash**: Ilovalarni bir nechta OpenShift klasterlariga joylashtirish uchun ACM dan foydalaning.

### ACM yordamida ko'p klasterli joylashtirishlarni boshqarish

- **ACM ni o'rnatish**:

  ```bash
  oc apply -f acm-install.yaml
  ```

- **Bir nechta klasterlarni boshqarish**: Bir nechta klasterlardagi sog'liqni saqlash, konfiguratsiya va ish yukini boshqarishni nazorat qilish uchun ACM dan foydalaning.

---

## 15. Muammolarni bartaraf etish va eng yaxshi amaliyotlar

### Umumiy muammolar va ularni hal qilish yo'llari

- **Nosozliklarni tuzatish podlari**:

  ```bash
  oc describe pod <pod-name>
  ```

- **Tarmoq muammolari**: Marshrutlar va tarmoq siyosatlarining holatini tekshiring.

### OpenShift operatsiyalari uchun eng yaxshi amaliyotlar

- **RBAC dan foydalaning**: Kirishni cheklash uchun rolga asoslangan kirishni boshqarish to'g'ri amalga oshirilganligiga ishonch hosil qiling.
- **Resurslardan foydalanishni kuzatish**: Resurslardan foydalanish va masshtablash ehtiyojlarini kuzatib borish uchun monitoring vositalaridan foydalaning.

### Ishlashni sozlash

- **Resurs so'rovlari va limitlarini optimallashtirish**: Ortiqcha ta'minotni oldini olish uchun protsessor va xotira uchun tegishli limitlar va so'rovlarni o'rnating.
- **SDN ni sozlash**: Tarmoqning optimal ishlashi uchun SDN konfiguratsiyalarini sozlang.

---

## 16. Tez-tez so'raladigan savollar



### OpenShift haqida keng tarqalgan savollar

- **OpenShift va Kubernetes o'rtasidagi farq nima?**
  - OpenShift - bu integratsiyalashgan CI/CD, ishlab chiquvchi vositalari va korxona xavfsizligi kabi qo'shimcha funksiyalarga ega korporativ Kubernetes platformasi.

- **OpenShiftni qanday yangilayman?**
  - OpenShiftni yangilash klaster yangilanishini boshlash uchun OpenShift CLI yoki veb-konsolidan foydalanishni o'z ichiga oladi.

---

## 17. Adabiyotlar

### Rasmiy hujjatlar

- [OpenShift Hujjatlar](https://docs.openshift.com/)
- [Red Hat OpenShift Blog](https://cloud.redhat.com/blog/)

### Jamiyat resurslari

- [OpenShift Umumiy](https://commons.openshift.org/)
- [Red Hat Developer](https://developers.redhat.com/)
