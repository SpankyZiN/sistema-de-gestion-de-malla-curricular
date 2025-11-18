#!/bin/bash

echo "=============================="
echo "   Iniciando Frontend (React)"
echo "=============================="

# Ir al directorio donde está este script
cd "$(dirname "$0")"

# Instalar dependencias (si ya están, no rompe nada)
echo "📦 Instalando dependencias del frontend..."
npm install

# Levantar el frontend
echo "🌐 Frontend corriendo en http://localhost:5173"
npm run dev
