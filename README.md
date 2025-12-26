# 🎬 Movie Catalog - Frontend (Vue.js + Vite)

This is the web interface for the Movie Catalog application. It is built with **Vue 3**, **TypeScript**, and **Vite**, featuring a modern UI inspired by top streaming platforms.

## 🚀 Features

* **Dynamic Movie Grid**: Displays movies fetched from the FastAPI backend.
* **Modern UI**: Styled with Inter font and high-quality imagery.
* **Responsive Design**: Optimized for different screen sizes.
* **Environment Agnostic**: Swaps between local and production APIs automatically.

## 🛠️ Technologies Used

* **Vue 3**: Composition API for a modern reactive structure.
* **Vite**: Ultra-fast frontend build tool.
* **Axios**: For handling HTTP requests to the backend.
* **TypeScript**: For better code quality and type safety.
* **Inter Font**: For a clean, professional aesthetic.

## 📥 Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/joaopedro08-dev/films-frontend.git](https://github.com/joaopedro08-dev/films-frontend.git)
   cd films-frontend
2. **Configure Environment Variables: Create a .env file in the root folder:**
   ```bash
   VITE_API_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)
3. **Install Dependencies:**
   ```bash
   npm install
4. **Run Development Server:**
   ```bash
   npm run dev

## 🌐 Deployment (Vercel)

This project is optimized for deployment on Vercel.

1. Connect your GitHub repository to Vercel.
2. Add Environment Variable: Set VITE_API_URL to your live Render URL: https://filmes-backend-pal2.onrender.com.
3. Build Configuration:
   * Build Command: npm run build
   * Output Directory: dist

## 📄 Project Structure
* src/services/api.ts: Centralized Axios configuration using environment variables.
* src/components/: Reusable Vue components (Movie cards, Navbar, etc.).
