# Helm Cheatsheet

![text](https://imgur.com/nDW9BHK.png)

**1. Kirish:**

- **Helm** Kubernetes uchun paket menejeri bo'lib, sizga hatto eng murakkab Kubernetes ilovalarini aniqlash, o'rnatish va yangilashda yordam beradi. Kubernetes resurslarini paketlash uchun jadvallardan foydalanadi.

**2. Asosiy tushunchalar:**

- **Grafik:** Kubernetes resurslari to'plamini tavsiflovchi fayllar to'plami.
- **Chiqarilish sanasi:** Kubernetes klasterida ishlaydigan diagrammaning namunasi.
- **Omborxona:** Diagrammalarni to'plash va ulashish mumkin bo'lgan joy.

**3. Dubulg'ani o'rnatish:**

- **Dulg'ani o'rnatish:**

  ```bash
  curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
  ```

- **Helm omborini qo'shish:**

  ```bash
  helm repo add stable https://charts.helm.sh/stable
  helm repo update
  ```

**4. Dubulg'a buyruqlari:**

- **Jadval o'rnatish:**

  ```bash
  helm install my-release stable/nginx
  ```

- **Chiqarilganlar ro'yxati:**

  ```bash
  helm list
  ```

- **Relizni yangilash:**

  ```bash
  helm upgrade my-release stable/nginx
  ```

- **Relizni o'chirish:**

  ```bash
  helm uninstall my-release
  ```

- **Grafiklarni qidirish:**

  ```bash
  helm search repo nginx
  ```

**5. Grafik tuzilishi:**

- **Asosiy grafik tuzilishi:**

  ```
  my-chart/
  ├── Chart.yaml
  ├── values.yaml
  ├── charts/
  ├── templates/
  │   ├── deployment.yaml
  │   ├── service.yaml
  │   └── _helpers.tpl
  ```

- **Chart.yaml:**

  ```yaml
  apiVersion: v2
  name: my-chart
  description: A Helm chart for Kubernetes
  version: 0.1.0
  ```

- **qiymatlar.yaml:**

  ```yaml
  replicaCount: 3
  image:
    repository: nginx
    tag: stable
  ```

- **Andoza namunasi (joylashtirish.yaml):**

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: {{ .Release.Name }}-nginx
  spec:
    replicas: {{ .Values.replicaCount }}
    selector:
      matchLabels:
        app: {{ .Release.Name }}-nginx
    template:
      metadata:
        labels:
          app: {{ .Release.Name }}-nginx
      spec:
        containers:
        - name: nginx
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
  ```

**6. Rulet hayot aylanishi:**

- **Yangi jadval yaratish:**

  ```bash
  helm create my-chart
  ```

- **Shablon yaratish:**
- **Barcha shablon qiymatlarini ro'yxatlash:**

    ```bash
    helm template my-release my-chart
    ```
  
  - **Jadvalni chizish:**

    ```bash
    helm lint my-chart
    ```

**7. Helm omborlari:**

- **Mahalliy Helm omborini yaratish:**

  ```bash
  helm repo index ./charts --url http://example.com/charts
  ```
  
- **Porsiya jadvallari:**

  ```bash
  helm serve --address 0.0.0.0:8879
  ```

**8. Dubulg'a ilgaklari:**

- **O'rnatishdan oldin ilgakning namunasi:**

  ```yaml
  apiVersion: batch/v1
  kind: Job
  metadata:
    name: "{{ .Release.Name }}-preinstall"
    annotations:
      "helm.sh/hook": pre-install
  spec:
    template:
      spec:
        containers:
        - name: preinstall
          image: busybox
          command: ['sh', '-c', 'echo Hello Helm']
        restartPolicy: Never
  ```

**9. Helm va CI/CD:**

- **Jenkins quvur liniyasida Helmdan foydalanish:**

  ```groovy
  pipeline {
    agent any
    stages {
      stage('Deploy') {
        steps {
          script {
            sh "helm upgrade --install my-release ./my-chart"
          }
        }
      }
    }
  }
  ```

**10. Murakkab Dubulg'a Konsepsiyalari:**

- **Subchartlar:** Tegishli Kubernetes resurslarini birgalikda paketlash uchun subchartlardan foydalaning.
- **Charts Museum:** Helm diagrammalarini saqlash va boshqarish uchun Helm ombori serveri.
- **Helmfile:** Helm jadvallarini joylashtirish uchun deklarativ spetsifikatsiya.

**11. Dubulg'a xavfsizligi:**

- **Chart imzolash:**
- Butunlikni ta'minlash uchun Helm jadvallarini imzolang va tasdiqlang.

  ```bash
  helm package --sign --key <key> --keyring <keyring> my-chart
  helm verify my-chart-0.1.0.tgz
  ```

- **RBAC:** Kubernetes RBAC yordamida Helm relizlariga kirishni boshqarish.

**12. Muammolarni bartaraf etish bo'yicha yordamchi dastur:**

- **Grafik o'rnatishda xatolarni tuzatish:**

  ```bash
  helm install --debug --dry-run my-release ./my-chart
  ```

- **Helmning chiqarilish tarixini tekshirish:**

  ```bash
  helm history my-release
  ```

- **Relizni qaytarish:**

  ```bash
  helm rollback my-release 1
  ```
