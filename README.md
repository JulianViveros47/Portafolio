# 🌐 Portafolio Personal — Eider Julian Viveros Yace

Bienvenido a mi portafolio personal.  
Aquí podrás ver mis proyectos, habilidades y experiencias como **Desarrollador de Software**, con un enfoque en el desarrollo web full stack.

---

## 🧠 Descripción general

Este portafolio fue desarrollado con tecnologías modernas del entorno web y backend.  
Incluye integración de APIs, componentes dinámicos, diseño adaptable y conexión a bases de datos locales.

---

## ⚙️ Tecnologías utilizadas

- **Frontend:** HTML5, CSS3, JavaScript, React  
- **Backend:** PHP / Laravel  
- **Base de datos:** MySQL / MariaDB  
- **Entorno local:** XAMPP  
- **Control de versiones:** Git y GitHub  

---

## 📦 Requisitos previos

Antes de comenzar, asegúrate de tener instalado en tu computadora:

- [XAMPP](https://www.apachefriends.org/es/index.html) (Apache + MySQL)
- [Git](https://git-scm.com/downloads)
- [Composer](https://getcomposer.org/)
- [Node.js y npm](https://nodejs.org/)
- Un navegador moderno (Chrome, Edge, Brave, Firefox…)

---

## 🚀 Instalación paso a paso

Sigue estos pasos para ejecutar el proyecto localmente:

### 1️⃣ Clonar el repositorio

Abre una terminal (Git Bash o PowerShell) y ejecuta:

```bash
git clone https://github.com/JulianViveros47/Portafolio.git
```

### 2️⃣ Mover el proyecto a la carpeta de XAMPP

Copia la carpeta descargada dentro de:


C:\xampp\htdocs\


Debería quedar así:

C:\xampp\htdocs\Portafolio

### 3️⃣ Instalar dependencias de Laravel (si aplica)

Abre una terminal dentro del proyecto (C:\xampp\htdocs\Portafolio) y ejecuta:

```bash
composer install
```

Luego, si el proyecto tiene migraciones, ejecútalas con:

```bash
php artisan migrate
```

### 7️⃣ Instalar dependencias del frontend

```bash
npm install
```

### 8️⃣ Iniciar los servidores de desarrollo

Para Laravel:

```bash
php artisan serve
```

Esto levantará el backend en:

http://127.0.0.1:8000


Para React / Vite (frontend):

```bash
npm run dev
```

Esto normalmente abrirá el frontend en:

http://localhost:5173

### 9️⃣ Ver el proyecto en el navegador

Abre tu navegador y visita:

http://localhost/Portafolio