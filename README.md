# Running Club Nexus Locally: Step-by-Step Guide

## 📋 Prerequisites

Before starting, ensure you have the following software installed:

1. **Visual Studio Code**

      - **Download:** [Visual Studio Code](https://code.visualstudio.com/)

2. **Node.js**

      - **Download:** [Node.js](https://nodejs.org/)
      - **Check Installation:** Open your terminal and run:
           ```bash
           node -v
           ```

3. **XAMPP**

      - **Download:** [XAMPP](https://www.apachefriends.org/index.html)
      - **Install** and start Apache and MySQL services.

4. **Composer**
      - **Download:** [Composer](https://getcomposer.org/download/)
      - **Check Installation:** Open your terminal and run:
           ```bash
           composer --version
           ```

---

## ⚠️ Additional Notes

- Ensure that you have all the required software installed as listed above.
- If you encounter any issues, check the versions of Node.js and PHP using these commands:
     ```bash
     node -v
     php -v
     ```

---

## 🔧 Setup Instructions

### 1. Clone the Repository

Open your terminal and run the following command to clone the project repository:

```bash
git clone https://github.com/jiliangarette/club-nexus.git
```

### 2. Navigate to the Project Directory

Change your directory to the cloned project folder:

```bash
cd club-nexus
```

### 3. Set Up Environment Variables

Copy the example environment configuration to create your `.env` file:

```bash
cp .env.example .env
```

### 4. Generate Application Key

Run the following command to generate a unique application key for your Laravel app:

```bash
php artisan key:generate
```

### 5. Install Node.js Dependencies

Install all necessary Node.js packages required for the frontend:

```bash
npm install
```

### 6. Install PHP Dependencies

Install all required PHP packages using Composer:

```bash
composer install
```

---

## 🚀 Running the Project Locally

### 1. Start the Laravel Development Server

In your terminal, run the command below to start the Laravel server:

```bash
php artisan serve
```

### 2. Start the Laravel Reverb WebSocket Server

Open a new terminal window (or tab) and run the following command to start the WebSocket server:

```bash
php artisan reverb:start
```

### 3. Compile Frontend Assets

In another terminal window, compile your frontend assets using the following command:

```bash
npm run dev
```

---

## 🌐 Accessing the Application

Open your web browser and navigate to:

```
http://127.0.0.1:8000/
```

---
