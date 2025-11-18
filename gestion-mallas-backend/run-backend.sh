#!/bin/bash

echo "=============================="
echo "  Iniciando Backend (Node)"
echo "=============================="

# Ir al directorio donde está este script
cd "$(dirname "$0")"

# Instalar dependencias (si ya están instaladas, npm lo resuelve igual)
echo "📦 Instalando dependencias del backend..."
npm install

# Levantar el servidor
echo "🚀 Backend corriendo en http://localhost:3000"
npm start
