# Running Club Nexus Locally: Step-by-Step Guide

## 📋 Prerequisites

1. **Visual Studio Code**

   - **Download:** [Visual Studio Code](https://code.visualstudio.com/)

2. **Node.js**

   - **Download:** [Node.js](https://nodejs.org/)

3. **XAMPP**

   - **Download:** [XAMPP](https://www.apachefriends.org/index.html)

4. **Composer**

   - **Download:** [Composer](https://getcomposer.org/download/)

5. **Git**
   - **Download:** [Git](https://git-scm.com/downloads)

---

## Test

- Ensure that you have all the required software installed as listed above.
  ```bash
  node -v
  php -v
  composer -v
  ```

---

## 🔧 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/jiliangarette/club-nexus.git
```

### 2. Navigate to the Project Directory

```bash
cd club-nexus
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

### 4. Generate Application Key

```bash
php artisan key:generate
```

### 5. Install Node.js Dependencies

```bash
npm install
```

### 6. Install PHP Dependencies

```bash
composer install
```

---

## 🚀 Running the Project Locally

### 1. Backend

```bash
php artisan serve
```

### 2. Websocket

```bash
php artisan reverb:start
```

### 3. Frontend

```bash
npm run dev
```

---

Open your web browser and navigate to:

```
http://127.0.0.1:8000/
```

---
