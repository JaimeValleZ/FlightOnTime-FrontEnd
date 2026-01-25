# ✈️ GoFly - Predicción de Retrasos de Vuelos (Front-End)

Bienvenido al repositorio del Front-End de **GoFly**. Esta aplicación web permite a los usuarios predecir posibles retrasos en vuelos utilizando modelos de Machine Learning, presentada con una interfaz moderna y amigable.

## 🛠️ Tecnologías

* **Framework:** Angular
* **Estilos:** Tailwind CSS
* **Alertas:** SweetAlert2

---

## ⚠️ Requisitos Previos (Back-End)

**IMPORTANTE:** Para que la aplicación funcione correctamente, es **obligatorio** tener en ejecución los servicios de backend antes de iniciar este front-end.

Por favor, asegúrate de desplegar y ejecutar los siguientes servicios:

1.  **Back-End Principal (Spring Boot):**
    * 🔗 [Repositorio FlightOnTime (Java)](https://github.com/JaimeValleZ/FlightOnTime.git)
2.  **Microservicio de Predicción (Python/ML):**
    * 🔗 [Repositorio MicroServicioML (Python)](https://github.com/GP-Core/microServicioML.git)

---

## 🚀 Instalación y Configuración

Sigue estos pasos para configurar el entorno de desarrollo local.

### 1. Instalar dependencias generales
Instala los paquetes base de Node.js necesarios para el proyecto:

```bash
npm install
```
2. Configurar Tailwind CSS

Ejecuta los siguientes comandos para instalar el motor de estilos y generar los archivos de configuración:

```Bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```
3. Instalar componentes de UI
Instala la librería para el manejo de alertas visuales (SweetAlert2):

```Bash
npm install sweetalert2
```
💻 Ejecución del Proyecto
Una vez instaladas todas las dependencias y asegurándote de que los Back-Ends están corriendo, puedes iniciar el servidor de desarrollo de Angular:

```Bash
ng serve
```
Una vez compilado, abre tu navegador y navega a: 👉 http://localhost:4200/

📂 Estructura del Proyecto
src/app: Contiene la lógica y componentes de Angular.

tailwind.config.js: Configuración de estilos.

angular.json: Configuración del CLI de Angular.

Hecho con ❤️ por el equipo de GoFly.


---

## 🌐 Despliegue del Front-End (Producción)

El Front-End de GoFly se despliega en Render utilizando un Dockerfile, lo que permite construir y ejecutar la aplicación Angular de forma consistente y reproducible en un entorno productivo.

🐳 Despliegue con Dockerfile

El proyecto incluye un Dockerfile multi-stage que:

Compila la aplicación Angular en una imagen Node.js (node:18-alpine).

Genera los archivos estáticos en la carpeta dist.

Ejecuta la aplicación como un Web Service en Render utilizando Node.js.

Este enfoque garantiza:

Independencia del entorno local.

Builds reproducibles.

Facilidad para escalar o redeplegar la aplicación.

⚙️ Render — Web Service

En Render, el Front-End se configura como un Web Service:

Runtime: Docker

Puerto expuesto: 4200

Start Command: definido directamente en el Dockerfile

Variables para configurar la URL del backend (API Gateway)

Render se encarga automáticamente de:

Construir la imagen Docker.

Ejecutar el contenedor.

Exponer la aplicación vía HTTPS.

Gestionar redeploys automáticos en cada push al repositorio.

🔗 Comunicación con el Back-End

El Front-End se comunica con los servicios backend desplegados en la nube mediante HTTP/HTTPS:

API Gateway (Spring Boot): expuesto públicamente.

Microservicio de predicción ML (Python): consumido a través del backend.

Las URLs del backend se configuran como variables de entorno en Render, evitando valores hardcodeados y facilitando el cambio entre entornos (desarrollo / producción).

🧪 Desarrollo Local vs Producción
Entorno	Ejecución
Local (rama docker)	a traves de Docker, instrucciones en el siguiente repo: https://github.com/JulioChaverra/GoFly.git (rama main)

Producción	Dockerfile + Web Service (Render)

En desarrollo local se utiliza el servidor de Angular (ng serve), mientras que en producción la aplicación se construye y ejecuta dentro de un contenedor Docker administrado por Render.
