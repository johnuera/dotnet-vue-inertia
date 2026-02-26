# Dotnet - Vue - Inertia + Daisy UI

A full-stack web application built using ASP.NET Core and Vue, connected via Inertia.js, and styled with DaisyUI + TailwindCSS.

---

## 🚀 Setup Instructions

### 1️⃣ Environment File

Before starting, copy the sample environment file:

```bash
cp .env.sample .env
```

Update the `.env` file with your local configuration values if needed.

---

### 2️⃣ Update `launchSettings.json` for Production

If you want to run the application in **Production mode**, update:

```
Properties/launchSettings.json
```

Change the `ASPNETCORE_ENVIRONMENT` value to `"Production"`:

```json
{
  "profiles": {
    "VueInertiaNet": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Production"
      }
    }
  }
}
```

> ⚠️ Make sure you rebuild frontend assets (`npm run build`) when running in Production.

---

# 🐳 Docker Setup (Recommended for Production)

This project includes a multi-stage Docker build that:

* Builds Vue (Vite) into `wwwroot`
* Publishes ASP.NET Core
* Runs the app in Production mode

---

## 🔨 Build Docker Image

From the project root:

```bash
docker build -t vueinertianet .
```

---

## ▶ Run Docker Container

```bash
docker run -p 5000:5000 --env-file .env vueinertianet
```

Then open:

```
http://localhost:5000
```

---

## 🐳 Using Docker Compose (Optional)

If you have `docker-compose.yml`:

```bash
docker compose up --build
```

---

## 🖥 Development (Without Docker)

You need **two terminals** running simultaneously.

---

### ▶ Terminal 1 (Vite Dev Server)

```bash
npm install
npm run dev
```

---

### ▶ Terminal 2 (ASP.NET Core Backend)

```bash
dotnet restore
dotnet run
```

Then open:

```
http://localhost:5000
```

(or the URL shown by `dotnet run`)

---

## 🏗 Production Build (Manual)

Build frontend assets first:

```bash
npm run build
dotnet run
```

In non-Development environments, the Razor root view loads compiled assets from:

```
wwwroot/manifest.json
```

---

## 🛠 Tech Stack

### Backend

* **ASP.NET Core** – Web API & server-side framework
* **.NET 8** – Application runtime

### Frontend

* **Vue 3** – Progressive JavaScript framework
* **Inertia.js** – Connects ASP.NET Core with Vue without building a separate API
* **Vite** – Frontend build tool and dev server

### Styling

* **Tailwind CSS** – Utility-first CSS framework
* **DaisyUI** – Tailwind CSS component library

---

## 📦 Project Architecture

* ASP.NET Core serves as the backend and routing layer
* Inertia.js bridges backend responses directly to Vue pages
* Vue handles frontend rendering
* Vite compiles and bundles frontend assets
* Production assets are loaded from `wwwroot`

---
 