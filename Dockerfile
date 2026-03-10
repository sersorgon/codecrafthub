# =============================================================
# Dockerfile - user-management-service
# =============================================================
# Imagen base: Node.js 20 en su variante ligera Alpine
# Alpine reduce el tamaño final de la imagen considerablemente
FROM node:20-alpine

# Metadatos de la imagen
LABEL maintainer="sersorgon"
LABEL description="User Management Service - Node.js + Express + MongoDB"

# Establece el directorio de trabajo dentro del contenedor
# Todos los comandos siguientes se ejecutarán desde este directorio
WORKDIR /app

# Copia primero solo los archivos de dependencias
# Esto aprovecha la caché de Docker: si no cambian package*.json,
# no se reinstalan las dependencias en cada build
COPY package*.json ./

# Instala solo las dependencias de producción (excluye devDependencies)
RUN npm install --omit=dev

# Copia el resto del código fuente al contenedor
COPY . .

# Expone el puerto en el que escucha la aplicación
# (debe coincidir con el valor de PORT en .env)
EXPOSE 5000

# Comando de arranque de la aplicación
CMD ["node", "src/app.js"]
