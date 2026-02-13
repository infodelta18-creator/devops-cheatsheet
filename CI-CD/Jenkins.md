# Jenkins Cheatsheet

![](https://imgur.com/jWGs9lH.png)

**1. Kirish:**

- Jenkins - bu dasturiy ta'minotni ishlab chiqishning yaratish, sinovdan o'tkazish va joylashtirish bilan bog'liq qismlarini avtomatlashtirishga yordam beradigan, uzluksiz integratsiyani osonlashtiradigan ochiq kodli avtomatlashtirish serveri.

**2. O'rnatish:**

- **Docker o'rnatish:**

  ```bash
  docker run -d -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts
  ```

- **To'g'ridan-to'g'ri o'rnatish:**

- **Ubuntu/Debian uchun:**

    ```bash
    wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
    sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
    sudo apt update
    sudo apt install jenkins
    ```

  - **CentOS/RHEL uchun:**

    ```bash
    sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
    sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
    sudo yum install jenkins
    ```

- **Jenkins’ga kirish:**
- Veb-brauzeringizda `http://localhost:8080` ga tashrif buyuring.

**3. Jenkins Quvuri:**

- **Deklarativ Quvuri:**

  ```groovy
  pipeline {
      agent any
      environment {
          MY_VAR = "value"
      }
      stages {
          stage('Checkout') {
              steps {
                  checkout scm
              }
          }
          stage('Build') {
              steps {
                  sh 'make'
              }
          }
          stage('Test') {
              steps {
                  sh 'make test'
              }
          }
          stage('Deploy') {
              steps {
                  sh 'make deploy'
              }
          }
      }
      post {
          success {
              echo 'Pipeline completed successfully!'
          }
          failure {
              echo 'Pipeline failed.'
          }
      }
  }
  ```

- **Ssenariy asosida tuzilgan quvur liniyasi:**

  ```groovy
  node {
      stage('Checkout') {
          checkout scm
      }
      stage('Build') {
          sh 'make'
      }
      stage('Test') {
          sh 'make test'
      }
      stage('Deploy') {
          sh 'make deploy'
      }
  }
  ```

**4. Jenkinsning keng tarqalgan buyruqlari:**

- **Jenkinsni qayta ishga tushiring:**

  ```bash
  sudo systemctl restart jenkins
  ```

- **Jenkinsni CLI dan boshqarish:**

  ```bash
  java -jar jenkins-cli.jar -s http://localhost:8080/ list-jobs
  ```

**5. Foydali Jenkins plaginlari:**

- **Moviy Okean:** Jenkins quvur liniyalari uchun zamonaviy foydalanuvchi interfeysi.
- **Git:** Git versiya boshqaruvini Jenkinsga integratsiya qilish.
- **Quvur liniyasi:** Quvur liniyasini kod sifatida yoqadi.
- **Ishonch yorliqlarini bog'lash:** Ishonch yorliqlarini xavfsiz boshqarish
- **SonarQube skaneri:** Kod sifatini tekshirishni birlashtiradi.
- **Slack bildirishnomasi:** Slack’ga quvur liniyasi holati haqida bildirishnomalarni yuboring.

**6. Eng yaxshi amaliyotlar:**

- **Quvur liniyasi kodi sifatida:** Izchil va versiya nazorati ostidagi tuzilmalar uchun har doim `Jenkinsfile` da belgilangan Jenkins quvur liniyasidan foydalaning.
- **Parametrlardan foydalaning:** Quvur liniyasini moslashuvchan va qayta ishlash uchun parametrlardan foydalaning.

  ```groovy
  parameters {
      string(name: 'ENV', defaultValue: 'dev', description: 'Environment')
  }
  ```

- **Jenkins xavfsizligini ta'minlash:** Plaginlarni muntazam ravishda yangilab turing, RBAC dan foydalaning va Jenkins nusxasini HTTPS bilan himoyalang.

**7. Jenkins konfiguratsiyasi:**

- **Jenkinsni boshqarish:**
- **Jenkinsni boshqarish** ostidagi Jenkins boshqaruv panelidan global sozlamalarni boshqarish va sozlash.
- **Asboblarni sozlash:** JDK, Maven va boshqa vositalarni global miqyosda **Global Asboblar Konfiguratsiyasi** da sozlang. - **Jenkinsfile Konfiguratsiyasi:**
  - Omboringizda saqlangan "Jenkinsfile" ichidagi quvur bosqichlaringizni, muhitingizni va agentlaringizni aniqlang.

**8. Kengaytirilgan Jenkins:**

- **Parallel bosqichlar:**

  ```groovy
  pipeline {
      agent any
      stages {
          stage('Parallel') {
              parallel {
                  stage('Unit Tests') {
                      steps {
                          sh 'make test'
                      }
                  }
                  stage('Integration Tests') {
                      steps {
                          sh 'make integration-test'
                      }
                  }
              }
          }
      }
  }
  ```

- **Umumiy kutubxonalar:** Umumiy kutubxonalardan foydalangan holda loyihalar bo'ylab quvur liniyasi kodini markazlashtiring va qayta ishlating.

## **Muammolarni bartaraf etish**

### **Umumiy muammolar**

1. Jenkins boshlamaydi**
   ```bash
   # Check logs
   sudo tail -f /var/log/jenkins/jenkins.log
   
   # Check permissions
   sudo chown -R jenkins:jenkins /var/lib/jenkins
   ```

2. **Quvur liniyasidagi nosozlik**
   ```groovy
   // Add error handling
   pipeline {
       agent any
       stages {
           stage('Build') {
               steps {
                   script {
                       try {
                           sh 'make build'
                       } catch (exc) {
                           echo 'Build failed!'
                           throw exc
                       }
                   }
               }
           }
       }
   }
   ```

3. **Plagin bilan bog'liq muammolar**
   - Plagin keshini tozalash:
     ```bash
     rm -rf $JENKINS_HOME/plugins/*.jpi
     rm -rf $JENKINS_HOME/plugins/*.hpi
     ```
   - Plagin yangilanishlaridan so'ng Jenkinsni qayta ishga tushiring

## **Foydali plaginlar**

1. **Quvur liniyasi**
   - Pipeline Graph View
   - Pipeline Stage View
   - Blue Ocean

2. **Manba boshqaruvi**
   - Git
   - GitHub Integratsiya
   - BitBucket Integratsiya

3. **Yaratish vositalari**
   - Maven Integratsiya
   - Gradle
   - NodeJS

4. **Sinov**
   - JUnit
   - Cobertura
   - SonarQube Scanner

5. **Joylashtirish**
   - Docker
   - Kubernetes
   - AWS
