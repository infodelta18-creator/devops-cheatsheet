# Kubernetes Cheatsheet

![text](https://imgur.com/aYuSIvY.png)

## Batafsil maqolani ko'rib chiqing [Dev.to](https://dev.to/prodevopsguytech/kubernetes-commands-for-devops-engineers-124o)

## 1. Kubernetesga kirish

### Kubernetes nima?

- **Kubernetes** - bu konteynerlashtirilgan ilovalarni joylashtirish, masshtablash va boshqarishni avtomatlashtiradigan ochiq kodli konteyner orkestrlash platformasi.

### Asosiy tushunchalar

- **Klaster**: Konteynerlashtirilgan ilovalarni ishga tushiradigan tugunlar deb ataladigan ishchi mashinalar to'plami.
- **Tugun**: Kubernetes klasteridagi bitta mashina.
- **Pod**: Bir yoki bir nechta konteynerni o'z ichiga olishi mumkin bo'lgan eng kichik joylashtiriladigan birlik.
- **Xizmat**: Podlar to'plamini namoyish qilish uchun barqaror tarmoq nuqtasi.
- **Nomlar maydoni**: Klaster resurslarini bir nechta foydalanuvchilar o'rtasida taqsimlash usuli.
- **Kubelet**: Konteynerlarning Podda ishlayotganini ta'minlaydigan har bir tugunda ishlaydigan agent.
- **Kubectl**: Kubernetes klasterlari bilan o'zaro ishlash uchun buyruq satri vositasi.

---

## 2. Kubernetesning asosiy operatsiyalari

### Kubernetes klasterini yaratish

- **Minikube**: Sinov uchun bitta tugunli Kubernetes klasterini sozlang.

  ```bash
  minikube start
  ```

### `kubectl` bilan ishlash

- **Klaster ma'lumotlarini olish**:

  ```bash
  kubectl cluster-info
  ```

- **Klasterdagi barcha tugunlarni oling**:

  ```bash
  kubectl get nodes
  ```

### Podlarni boshqarish

- **Pod yaratish**:

  ```bash
  kubectl run mypod --image=nginx
  ```

- **Barcha podlarni ro'yxatlash**:

  ```bash
  kubectl get pods
  ```

- **Podni tasvirlab bering**:

  ```bash
  kubectl describe pod mypod
  ```

- **Podni o'chirish**:

  ```bash
  kubectl delete pod mypod
  ```

### Nomlar maydonidan foydalanish

- **Barcha nomlar maydonlarini ro'yxatlash**:

  ```bash
  kubectl get namespaces
  ```

- **Nom maydonini yaratish**:

  ```bash
  kubectl create namespace mynamespace
  ```

- **Nom maydonini o'chirish**:

  ```bash
  kubectl delete namespace mynamespace
  ```

---

## 3. Joylashtirish va masshtablash

### Joylashtirishlar

- **Joylashtirishni yaratish(Deploy)**:

  ```bash
  kubectl create deployment myapp --image=nginx
  ```

- **Joylashtirish holatini ko'rish**:

  ```bash
  kubectl get deployments
  ```

- **Joylashtirishni yangilash**:

  ```bash
  kubectl set image deployment/myapp nginx=nginx:1.16
  ```

- **Joylashtirishni orqaga qaytarish**:

  ```bash
  kubectl rollout undo deployment/myapp
  ```

### Ilovalarni masshtablash

- **Joylashtirishni masshtablash**:

  ```bash
  kubectl scale deployment myapp --replicas=3
  ```

- **Gorizontal Pod Autoscaler (HPA) yordamida avtomatik masshtablash**:

  ```bash
  kubectl autoscale deployment myapp --min=1 --max=5 --cpu-percent=80
  ```

---

## 4. Xizmatlar va tarmoqlar

### Xizmatlar

- **Xizmat ko'rsatuvchi podni namoyish eting**:

  ```bash
  kubectl expose pod mypod --port=80 --target-port=8080
  ```

- **Joylashtirish uchun xizmat yaratish**:

  ```bash
  kubectl expose deployment myapp --type=NodePort --port=80
  ```

- **Barcha xizmatlar ro'yxati**:

  ```bash
  kubectl get services
  ```

### Tarmoq

- **Klaster tarmog'ini tushunish**: Kubernetes Podlar orasidagi tarmoq aloqasini qisqacha bayon qiladi.
- **Tarmoq siyosatlari**: Tarmoq siyosatlari yordamida Pod aloqasini cheklash.

  ```yaml
  apiVersion: networking.k8s.io/v1
  kind: NetworkPolicy
  metadata:
    name: mynetworkpolicy
    namespace: mynamespace
  spec:
    podSelector:
      matchLabels:
        role: db
    policyTypes:
    - Ingress
    - Egress
    ingress:
    - from:
      - podSelector:
          matchLabels:
            role: frontend
    egress:
    - to:
      - podSelector:
          matchLabels:
            role: backend
  ```

---

## 5. Doimiy saqlash

### Hajmlar

- **Doimiy jild yaratish**:

  ```yaml
  apiVersion: v1
  kind: PersistentVolume
  metadata:
    name: mypv
  spec:
    capacity:
      storage: 1Gi
    accessModes:
      - ReadWriteOnce
    hostPath:
      path: "/mnt/data"
  ```

- **Doimiy hajmdagi da'vo yaratish**:

  ```yaml
  apiVersion: v1
  kind: PersistentVolumeClaim
  metadata:
    name: mypvc
  spec:
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 1Gi
  ```

### StorageClasss

- **StorageClass yaratish**:

  ```yaml
  apiVersion: storage.k8s.io/v1
  kind: StorageClass
  metadata:
    name: mystorageclass
  provisioner: kubernetes.io/aws-ebs
  parameters:
    type: gp2
  ```

---

## 6. ConfigMaps va sirlari

### ConfigMaps

- **Fayldan ConfigMap yarating**:

  ```bash
  kubectl create configmap myconfig --from-file=config.txt
  ```

- **ConfigMap ni ko'rish**:

  ```bash
  kubectl get configmap myconfig -o yaml
  ```

- **Podda ConfigMap dan foydalaning**:

  ```yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: mypod
  spec:
    containers:
    - name: mycontainer
      image: nginx
      envFrom:
      - configMapRef:
          name: myconfig
  ```

### Sirlar

- **Haqiqiy qiymatdan sir yarating**:

  ```bash
  kubectl create secret generic mysecret --from-literal=username=admin
  ```

- **Sirni ko'rish**:

  ```bash
  kubectl get secret mysecret -o yaml
  ```

- **Podda sirdan foydalaning**:

  ```yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: mypod
  spec:
    containers:
    - name: mycontainer
      image: nginx
      envFrom:
      - secretRef:
          name: mysecret
  ```

---

## 7. Kirish nazoratchilari

### Kirishni sozlash

- **Kirish kontrollerini o'rnatish**: Kirish kontrollerini o'rnatish uchun Helm diagrammasi yoki YAML manifestidan foydalaning (masalan, NGINX kirish kontrolleri).

  ```bash
  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
  ```

### Kirish resurslarini sozlash

- **Kirish resursini yaratish**:

  ```yaml
  apiVersion: networking.k8s.io/v1
  kind: Ingress
  metadata:
    name: myingress
  spec:
    rules:
    - host: myapp.example.com
      http:
        paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: myapp-service
              port:
                number: 80
  ```

- **Kirish bilan TLS tugashi**:

  ```yaml
  apiVersion: networking.k8s.io/v1
  kind: Ingress
  metadata:
    name: myingress
  spec:
    tls:
    - hosts:
      - myapp.example.com
      secretName: mytlssecret
    rules:
    - host: myapp.example.com
      http:
        paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: myapp-service
              port:
                number: 80
  ```

---

## 8. Kubernetes xavfsizligi

### Rolga asoslangan kirishni boshqarish (RBAC)

- **Rol yaratish**:

  ```yaml
  apiVersion: rbac.authorization.k8s.io/v1
  kind: Role
  metadata:
    namespace: mynamespace
    name: myrole
  rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "watch", "list"]
  ```

- **Foydalanuvchiga rolni bog'lash**:

  ```yaml
  apiVersion: rbac.authorization.k8s.io/v1
  kind: RoleBinding
  metadata:
    name: myrolebinding
    namespace: mynamespace
  subjects:
  - kind: User
    name: myuser
    apiGroup: rbac.authorization.k8s.io
  roleRef:
    kind: Role
    name: myrole
    apiGroup: rbac.authorization.k8s.io
  ```

### Pod xavfsizlik siyosati (PSP)

- **PSP yaratish**:

  ```yaml
  apiVersion: policy/v1beta1
  kind: PodSecurityPolicy
  metadata:
    name: mypsp
  spec:
    privileged: false
    seLinux:
      rule: RunAsAny
    supplementalGroups:
      rule: RunAsAny
    runAsUser:
      rule: RunAsAny
    fsGroup:
      rule: RunAsAny
    volumes:
    - '*'
  ```

### Tarmoq siyosatlari

- **Tarmoq siyosatini yaratish**:

  ```yaml
  apiVersion: networking.k8s.io/v1
  kind: NetworkPolicy
  metadata:
    name: allow-db
    namespace: mynamespace
  spec:
    podSelector:
      matchLabels:
        role: db
    policyTypes:


    - Ingress
    ingress:
    - from:
      - podSelector:
          matchLabels:
            role: frontend
  ```

### Kubernetes API serverini himoyalash

- **API Server Auditini Yoqish**:
- Audit parametrlarini qo'shish uchun API server manifestini tahrirlash.

  ```yaml
  - --audit-log-path=/var/log/kubernetes/audit.log
  - --audit-policy-file=/etc/kubernetes/audit-policy.yaml
  ```

---

## 9. Kengaytirilgan Kubernetes

### Maxsus resurs ta'riflari (CRD)

- **Maxsus resurs ta'rifini yarating**:

  ```yaml
  apiVersion: apiextensions.k8s.io/v1
  kind: CustomResourceDefinition
  metadata:
    name: myresources.example.com
  spec:
    group: example.com
    versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
    scope: Namespaced
    names:
      plural: myresources
      singular: myresource
      kind: MyResource
      shortNames:
      - mr
  ```

### Operatorlar

- **Operatorlarga kirish**: Operatorlar - bu Kubernetes API-ni kengaytirish orqali murakkab holatli ilovalarni boshqarish uchun mo'ljallangan Kubernetes ilovalari.
- **Operator yaratish**:
- Operatorni qurish va uni yaratish uchun Operator SDK dan foydalaning.

  ```bash
  operator-sdk init --domain=example.com --repo=github.com/example/memcached-operator
  operator-sdk create api --group=cache --version=v1 --kind=Memcached --resource --controller
  ```

### Istio bilan xizmat ko'rsatish tarmog'i

- **Istio-ni o'rnatish**:

  ```bash
  istioctl install --set profile=demo
  ```

- **Istio yordamida ilovani joylashtirish**:
  - Istio yonma-yon in'ektsiyasini yoqish uchun nom maydoniga izoh qo'shing.

  ```bash
  kubectl label namespace mynamespace istio-injection=enabled
  ```

  - Ilovani izohli nomlar maydoniga joylashtiring.
- **Istio bilan trafikni boshqarish**:
- Trafikni marshrutlashni boshqarish uchun VirtualService va DestinationRule yarating.

  ```yaml
  apiVersion: networking.istio.io/v1alpha3
  kind: VirtualService
  metadata:
    name: myapp
  spec:
    hosts:
    - myapp.example.com
    http:
    - route:
      - destination:
          host: myapp
          subset: v1
  ```
  
### Monitoring va jurnalga yozish

- **Prometey va Grafana**:
- **Prometeyni o'rnating**:

    ```bash
    kubectl apply -f https://github.com/prometheus-operator/prometheus-operator/blob/main/bundle.yaml
    ```

  - **Grafanani o'rnatish**:

    ```bash
    kubectl apply -f https://raw.githubusercontent.com/grafana/grafana/main/deploy/kubernetes/grafana-deployment.yaml
    ```

  - **Grafana’da metrikalarni ko‘rish**: Grafana boshqaruv paneliga kiring va Prometheus’dan foydalanish uchun ma’lumot manbalarini sozlang.

- **ELK Stack bilan jurnalga yozish**:
  - **ELK Stackni joylashtirish**: Elasticsearch, Logstash va Kibana’ni joylashtirish uchun Helm yoki maxsus YAML manifestlaridan foydalaning.

    ```bash
    helm install elk-stack stable/elastic-stack
    ```

  - **Jurnallarni yig'ish uchun Fluentd ni sozlang**:
    - Barcha tugunlardan jurnallarni to'plash va ularni Elasticsearch-ga yuborish uchun Fluentd-ni DaemonSet sifatida joylashtiring.

### Yuqori darajadagi mavjudlik va tabiiy ofatlardan keyin tiklanish

- **Kubernetes yuqori mavjudligi (HA)**:
  - **HA asosiy tugunlari**: Mavjudligini ta'minlash uchun bir nechta asosiy tugunlarni sozlang.
  - **HA va boshqalar klasteri**: Kubernetes holatini ortiqcha saqlash uchun HA va boshqalar klasteridan foydalaning.

- **Ofatlardan keyin tiklash**:
- **Zaxiralash va tiklash va boshqalar**:
    - Etcd klasterining suratlarini olish uchun `etcdctl` dan foydalaning.

    ```bash
    etcdctl snapshot save /path/to/backup
    ```

    - Zarur bo'lganda suratdan tiklang.

### Federatsiya

- **Ko'p klasterli federatsiya**:
  - **Federatsiyani sozlash**: Bitta boshqaruv tekisligidan bir nechta klasterlarni boshqarish uchun Kubernetes Federation v2 dan foydalaning.

  ```bash
  kubefedctl join mycluster --cluster-context=mycluster-context --host-cluster-context=host-cluster-context
  ```

  - **Federatsiyalangan resurslarni joylashtirish**: Federatsiya API yordamida bir nechta klasterlarni qamrab oluvchi resurslarni joylashtirish.

---

## 10. Adabiyotlar

### Rasmiy hujjatlar

- [Rasmiy Kubernetes  Documentation](https://kubernetes.io/docs/)

### Jamiyat resurslari

- [Kubernetes Slack](http://slack.k8s.io/)
- [Kubernetes GitHub Repository](https://github.com/kubernetes/kubernetes)
- [Kubernetes Blog](https://kubernetes.io/blog/)
