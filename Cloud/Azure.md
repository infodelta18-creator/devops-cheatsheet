# Azure Cheatsheet

![text](https://imgur.com/f7RWwnx.png)

**1. Kirish:**

- **Microsoft Azure** - bu hisoblash, tahlil, saqlash va tarmoq kabi keng ko'lamli xizmatlarni taklif qiluvchi bulutli hisoblash platformasi.

**2. Core Azure xizmatlari:**

- **Hisoblash:**
  - **Azure Virtual Machines:**
    - Ishlaydigan ilovalar uchun kengaytiriladigan virtual serverlar.
    - Asosiy tushunchalar: VM o'lchamlari, Resurs guruhlari, Virtual tarmoqlar, Disklar.
    - Misol:

      ```bash
      az vm create --resource-group myResourceGroup --name myVM --image UbuntuLTS --admin-username azureuser --generate-ssh-keys
      ```

  - **Azure funksiyalari:**
    - Hodisalarga asoslangan kodni ishga tushirish uchun serversiz hisoblash xizmati.
    - Asosiy tushunchalar: Funksiyalar, Triggerlar, Bog'lanishlar.
    - Misol:

      ```bash
      func init MyFunctionProj --dotnet
      func new --name MyHttpTrigger --template "HTTP trigger" --authlevel "anonymous"
      ```

  - **Azure Kubernetes xizmati (AKS):**
    - Konteynerlashtirilgan ilovalarni ishga tushirish uchun boshqariladigan Kubernetes xizmati.
    - Asosiy tushunchalar: Klasterlar, Tugunlar, Podlar, Xizmatlar.
    - Misol:

      ```bash
      az aks create --resource-group myResourceGroup --name myAKSCluster --node-count 1 --enable-addons monitoring --generate-ssh-keys
      ```

- **Saqlash:**
  - **Azure Blob Storage:**
    - Bulut uchun obyektlarni saqlash yechimi.
    - Asosiy tushunchalar: Saqlash hisoblari, konteynerlar, bloklar, kirish darajalari.
    - Misol:

      ```bash
      az storage account create --name mystorageaccount --resource-group myResourceGroup --location eastus --sku Standard_LRS
      az storage container create --name mycontainer --account-name mystorageaccount
      az storage blob upload --container-name mycontainer --file myfile.txt --name myfile.txt --account-name mystorageaccount
      ```

  - **Azure fayllari:**
    - SMB protokoli yordamida bulutda fayl almashinuvlarini boshqaradi.
    - Asosiy tushunchalar: Fayl almashish, kataloglar, suratlar.
    - Misol:

      ```bash
      az storage share create --name myshare --account-name mystorageaccount
      ```

  - **Azure Disk Xotirasi:**
    - VMlar uchun yuqori samarali disk xotirasi.
    - Asosiy tushunchalar: Boshqariladigan disklar, disk turlari (standart HDD, standart SSD, premium SSD).
    - Misol:

      ```bash
      az disk create --resource-group myResourceGroup --name myDisk --size-gb 128 --sku Premium_LRS
      ```

- **Database:**
  - **Azure SQL Database:**
    - Boshqariladigan relyatsion ma'lumotlar bazasi xizmati.
    - Asosiy tushunchalar: Ma'lumotlar bazalari, serverlar, elastik pullar, DTU/vCores.
    - Misol:

      ```bash
      az sql db create --resource-group myResourceGroup --server myServer --name myDatabase --service-objective S0
      ```

  - **Cosmos DB:**
    - Global miqyosda tarqalgan, ko'p modelli ma'lumotlar bazasi xizmati.
    - Asosiy tushunchalar: Ma'lumotlar bazalari, Konteynerlar, Bo'lim kalitlari, Muvofiqlik darajalari.
    - Misol:

      ```bash
      az cosmosdb create --name myCosmosDBAccount --resource-group myResourceGroup --kind MongoDB --locations regionName=eastus
      ```

  - **MySQL/PostgreSQL uchun Azure ma'lumotlar bazasi:**
    - Boshqariladigan MySQL/PostgreSQL xizmati.
    - Asosiy tushunchalar: Serverlar, Ma'lumotlar bazalari, Zaxira nusxalarini saqlash, Ishlash darajalari.
    - Misol:

      ```bash
      az mysql server create --resource-group myResourceGroup --name mydemoserver --location eastus --admin-user myadmin --admin-password mypassword --sku-name GP_Gen5_2
      ```

**3. Tarmoq:**

- **Azure virtual tarmog'i (VNet):**
  - Azure’da izolyatsiya qilingan tarmoq muhitini ta’minlaydi.
  - Asosiy tushunchalar: Subnetlar, Tarmoq xavfsizligi guruhlari, VPN shlyuzi, Piring.
  - Misol:

    ```bash
    az network vnet create --resource-group myResourceGroup --name myVnet --address-prefix 10.0.0.0/16 --subnet-name mySubnet --subnet-prefix 10.0.1.0/24
    ```

- **Azure yuk balanslashtiruvchisi:**
  - Kiruvchi trafikni bir nechta VMlar bo'ylab taqsimlaydi.
  - Asosiy tushunchalar: Frontend IP, Backend pullari, Yuklarni muvozanatlash qoidalari.
  - Misol:

    ```bash
    az network lb create --resource-group myResourceGroup --name myLoadBalancer --frontend-ip-name myFrontEnd --backend-pool-name myBackEndPool
    ```

- **Azure ilova shlyuzi:**
  - HTTP va HTTPS trafikini boshqarish uchun veb-trafik yuklamasini muvozanatlashtiruvchi.
  - Asosiy tushunchalar: Tinglovchi, Qoidalar, HTTP sozlamalari, SSL sertifikatlari.
  - Misol:

    ```bash
    az network application-gateway create --name myAppGateway --resource-group myResourceGroup --capacity 2 --sku Standard_v2 --vnet-name myVnet --subnet mySubnet
    ```

- **Azure DNS:**
  - DNS domenlaringizni joylashtiradi va Microsoft Azure infratuzilmasidan foydalangan holda nom aniqligini ta'minlaydi.
  - Asosiy tushunchalar: DNS zonalari, yozuvlar, NS yozuvlari, yozuvlar.
  - Misol:

    ```bash
    az network dns zone create --resource-group myResourceGroup --name mydomain.com
    az network dns record-set a add-record --resource-group myResourceGroup --zone-name mydomain.com --record-set-name www --ipv4-address 10.0.0.4
    ```

**4. Xavfsizlik va identifikatsiya:**

- **Azure Active Directory (AAD):**
  - Shaxsni aniqlash va kirishni boshqarish xizmati.
  - Asosiy tushunchalar: Foydalanuvchilar, Guruhlar, Rollar, Boshqariladigan identifikatorlar, Shartli kirish.
  - Misol:

    ```bash
    az ad user create --display-name "My User" --user-principal-name myuser@mydomain.com --password "P@ssw0rd!"
    ```

- **Azure kalit ombori:**
  - Sirlar, kalitlar va sertifikatlarni xavfsiz saqlang va ularga kiring.
  - Asosiy tushunchalar: Omborlar, Sirlar, Kalitlar, Sertifikatlar, Kirish siyosati.
  - Misol:

    ```bash
    az keyvault create --name myKeyVault --resource-group myResourceGroup --location eastus
    az keyvault secret set --vault-name myKeyVault --name MySecret --value "MySecretValue"
    ```

- **Azure xavfsizlik markazi:**
  - Yagona infratuzilma xavfsizligini boshqarish tizimi.
  - Asosiy tushunchalar: Xavfsizlik holati, Tavsiyalar, Xavfsiz ball, Vaqtida VMga kirish.
  - Misol:

    ```bash
    az security assessment create --name myAssessment --status "Healthy" --description "This is a custom assessment."
    ```

- **Azure siyosati:**
  - Tashkiliy standartlarni joriy etish va muvofiqlikni keng miqyosda baholash.
  - Asosiy tushunchalar: Ta'riflar, Tashabbuslar, Topshiriqlar.
  - Misol:

    ```bash
    az policy assignment create --name myPolicyAssignment --scope /subscriptions/{subscription-id}/resourceGroups/{resource-group-name} --policy /subscriptions/{subscription-id}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}
    ```

**5. Boshqaruv vositalari:**

- **Azure Resurs Menejeri (ARM):**
  - Azure’ning joylashtirish va boshqarish xizmati.
  - Asosiy tushunchalar: ARM shablonlari, resurslar, resurs guruhlari, joylashtirishlar.
  - Misol:

    ```bash
    az group create --name myResourceGroup --location eastus
    az deployment group create --resource-group myResourceGroup --template-file azuredeploy.json
    ```

- **Azure Monitor:**
  - Telemetriya ma'lumotlarini to'plash, tahlil qilish va ular bo'yicha harakat qilish uchun keng qamrovli monitoring xizmati.
  - Asosiy tushunchalar: Metrikalar, jurnallar, ogohlantirishlar, dastur haqida ma'lumot, jurnal tahlili.
  - Misol:

    ```bash
    az monitor alert create --name myAlert --resource-group myResourceGroup --target /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Compute/virtualMachines/{vm-name} --condition "avg Percentage CPU > 75"
    ```

- **Azure avtomatlashtirish:**
  - Tez-tez, ko'p vaqt talab qiladigan va xatolarga moyil bulutli boshqaruv vazifalarini avtomatlashtiring.
  - Asosiy tushunchalar: Runbooks, Kerakli holat konfiguratsiyasi (DSC), Gibrid ishchi guruhlari.
  - Misol:

    ```bash
    az automation account create --name myAutomationAccount --resource-group myResourceGroup --location eastus
    az automation runbook create --name myRunbook --automation-account-name myAutomationAccount --resource-group myResourceGroup --type PowerShellWorkflow
    ```

- **Azure maslahatchisi:**
  - Azure joylashtirishlaringizni optimallashtirish uchun eng yaxshi amaliyotlarga amal qilishga yordam beradigan shaxsiylashtirilgan bulut maslahatchisi.
  - Asosiy tushunchalar: Tavsiyalar, Narx, Ishlash, Xavfsizlik, Yuqori mavjudlik.
  - Misol:
    - Azure portali orqali kirish.

**6. Murakkab mavzular:**

- **Cost Management:**
  - Cost Management + Billing yordamida Azure xarajatlaringizni kuzatib boring va optimallashtiring.
  - Misol:

    ```bash
    az consumption budget create --amount 1000 --time-grain Monthly --start-date 2024-08-

01 --end-date 2024-08-31 --name myBudget --resource-group myResourceGroup
    ```

- **Avtomatik masshtablash:**
  - Talabga qarab VM nusxalari sonini avtomatik ravishda sozlang.
  - Asosiy tushunchalar: Masshtab to'plamlari, Masshtablash qoidalari, Metrikalar.
  - Misol:

    ```bash
    az vmss create --resource-group myResourceGroup --name myScaleSet --image UbuntuLTS --upgrade-policy-mode automatic --admin-username azureuser --generate-ssh-keys
    ```

- **Serversiz arxitekturalar:**
  - Serversiz yechimlar uchun Azure Funksiyalari, Logic Apps va Event Griddan foydalaning.
  - Asosiy tushunchalar: Triggerlar, Bog'lanishlar, Ish oqimlari, Tadbir obunalari.
  - Misol:

    ```bash
    az eventgrid event-subscription create --name myEventSubscription --source-resource-id /subscriptions/{subscription-id}/resourceGroups/{resource-group}/providers/Microsoft.Storage/storageAccounts/{storage-account-name} --endpoint https://myfunction.azurewebsites.net/runtime/webhooks/eventgrid?functionName=myfunction
    ```

**7. Eng yaxshi amaliyotlar:**

- **Xavfsizlik:**
  - Azure Security Center’dan foydalaning, ma’lumotlarni shifrlang, RBAC’ni qo‘llang, Azure Monitor bilan kuzatib boring va xavfsiz kodlash amaliyotlarini amalga oshiring.
  
- **Ishonchlilik:**
  - Mavjudlik to'plamlari, mavjudlik zonalaridan foydalaning, zaxira nusxalarini sozlang va falokatdan keyin tiklash xizmatlaridan foydalaning.

- **Ishlash samaradorligi:**
  - Tegishli VM o'lchamlarini tanlang, keshlash xizmatlaridan foydalaning va ma'lumotlar bazalarini optimallashtiring.

- **Xarajatlarni optimallashtirish:**
  - Rezervlangan nusxalardan (RI) foydalaning, xarajatlarni kuzatib boring va resurslarni optimallashtiring.

- **Operatsion mukammallik:**
  - ARM yordamida joylashtirishni avtomatlashtiring, operatsiyalarni kuzatib boring va infratuzilmadan kod sifatida foydalaning (IaC).
